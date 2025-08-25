import { useLocation } from '@docusaurus/router';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

/* -------------------- tiny store (per-doc citations) -------------------- */

const usedCitations = new Map(); // Map<docId, Set<citationKey>>
const listeners = new Set(); // Set<() => void>

// Per-doc cached snapshots so getSnapshot returns a stable reference
const snapshots = new Map(); // Map<docId, string[]>
const EMPTY = Object.freeze([]); // stable empty snapshot

function emitIfChanged(docId, changed) {
  if (!changed) return;
  const set = usedCitations.get(docId);
  snapshots.set(docId, set && set.size ? Array.from(set) : EMPTY);
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshotFor(docId) {
  if (!snapshots.has(docId)) snapshots.set(docId, EMPTY);
  return snapshots.get(docId);
}

function getServerSnapshot() {
  return EMPTY;
}

export function addCitation(docId, key) {
  if (!docId || !key) return;
  if (!usedCitations.has(docId)) usedCitations.set(docId, new Set());
  const set = usedCitations.get(docId);
  const before = set.size;
  set.add(key);
  emitIfChanged(docId, set.size !== before);
}

export function removeCitation(docId, key) {
  if (!docId || !key) return;
  const set = usedCitations.get(docId);
  if (!set) return;
  const before = set.size;
  const removed = set.delete(key);
  emitIfChanged(docId, removed && set.size !== before);
}

export function resetCitations(docId) {
  if (!docId) return;
  const had = usedCitations.get(docId)?.size || 0;
  usedCitations.set(docId, new Set());
  emitIfChanged(docId, had !== 0 || snapshots.get(docId) !== EMPTY);
}

export function useUsedCitations(docId) {
  return useSyncExternalStore(subscribe, () => getSnapshotFor(docId), getServerSnapshot);
}

/* ------------------------------ component ------------------------------- */

const Citation = ({ citationKey }) => {
  const [citationNumber, setCitationNumber] = useState('?');
  const [citationData, setCitationData] = useState(null);
  const location = useLocation();
  const pathname = location.pathname; // treat as docId
  const reportId = useReportId ? useReportId() : null;

  const reportPath = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, '/RMC-Software-Documentation/bibliographies/')
    .replace(/\/[^/]*$/, '');
  const bibFilePath = `${reportPath}/bib.json`;
  const countersFilePath = reportId
    ? `/RMC-Software-Documentation/counters/${reportId}.json`
    : null;

  // Number comes from counters (original logic)
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!countersFilePath || !citationKey) return;
      try {
        const response = await fetch(countersFilePath);
        const counters = await response.json();
        const entry = counters?.citations?.[citationKey];
        if (entry && isMounted) setCitationNumber(entry.citationNumber);
      } catch (error) {
        console.error('Error fetching counters file:', error);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [citationKey, countersFilePath]);

  // Optional: keep bib lookup (unchanged)
  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!bibFilePath || !citationKey) return;
      try {
        const response = await fetch(bibFilePath);
        const data = await response.json();
        const citation = data.find((c) => c.citationKey === citationKey);
        if (citation && isMounted) setCitationData(citation);
      } catch (error) {
        console.error('Error fetching bibliography:', error);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, [citationKey, bibFilePath]);

  // Register/unregister with the store (fixes timing issues)
  useEffect(() => {
    if (!citationKey) return;
    addCitation(pathname, citationKey);
    return () => removeCitation(pathname, citationKey);
  }, [pathname, citationKey]);

  return (
    <span className="font-usace text-[inherit]">
      <a
        href={`#footnote-${citationKey}`}
        className="text-ifm-link no-underline hover:text-ifm-link-hover"
      >
        [{citationNumber}]
      </a>
    </span>
  );
};

export default Citation;
