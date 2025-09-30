import { useEffect, useMemo, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

const STATIC_BASE = '/RMC-Software-Documentation'; // for /static assets like /counters
const DOCS_ROUTE_BASE = '/RMC-Software-Documentation/docs'; // for doc pages

// strip ".mdx" and any leading "digits-" prefix (e.g., "05-schmertmann" -> "schmertmann")
const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

const FigReference = ({ figKey }) => {
  const [figInfo, setFigInfo] = useState(null);
  const reportId = useReportId();

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${STATIC_BASE}/counters/${reportId}.json`;
    (async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await res.json();
        const found = data?.figures?.[figKey] ?? null;
        if (found) setFigInfo(found);
        else console.warn(`Figure key "${figKey}" not found in ${jsonPath}`);
      } catch (e) {
        console.error('Error loading counters:', e);
      }
    })();
  }, [reportId, figKey]);

  const targetId = figKey;

  const docSlug = useMemo(() => toDocSlug(figInfo?.docId), [figInfo?.docId]);

  const targetDocPath = useMemo(() => {
    if (!figInfo?.parentDocPath || !docSlug) return '';
    return `${DOCS_ROUTE_BASE}/${figInfo.parentDocPath}/${docSlug}`;
  }, [figInfo?.parentDocPath, docSlug]);

  const isSamePage = useMemo(() => {
    const normalize = (p) => (p?.endsWith('/') ? p.slice(0, -1) : p || '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return targetDocPath && normalize(currentPath) === normalize(targetDocPath);
  }, [targetDocPath]);

  const href = useMemo(() => {
    if (!figInfo) return '#';
    return isSamePage ? `#${targetId}` : `${targetDocPath}#${targetId}`;
  }, [figInfo, isSamePage, targetDocPath, targetId]);

  if (!figInfo) return <span>Loading…</span>;

  return (
    <a href={href} className="font-usace text-normal" title={`Jump to Figure ${figInfo.figNumber}`}>
      Figure {figInfo.figNumber}
    </a>
  );
};

export default FigReference;
