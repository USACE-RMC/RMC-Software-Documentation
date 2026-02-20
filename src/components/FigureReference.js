import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

const STATIC_BASE = '/RMC-Software-Documentation'; // for /static assets like /counters
const DOCS_ROUTE_BASE = '/RMC-Software-Documentation/docs'; // for doc pages

// strip ".mdx" and any leading "digits-" prefix (e.g., "05-schmertmann" -> "schmertmann")
const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

const SHOW_DELAY = 300; // ms before popover appears
const HIDE_DELAY = 100; // ms grace period when leaving

const FigReference = ({ figKey, suffix }) => {
  const [figInfo, setFigInfo] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const reportId = useReportId();
  const showTimer = useRef(null);
  const hideTimer = useRef(null);

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

  const cancelTimers = useCallback(() => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  const handleEnter = useCallback(() => {
    cancelTimers();
    showTimer.current = setTimeout(() => setShowPopover(true), SHOW_DELAY);
  }, [cancelTimers]);

  const handleLeave = useCallback(() => {
    cancelTimers();
    hideTimer.current = setTimeout(() => setShowPopover(false), HIDE_DELAY);
  }, [cancelTimers]);

  // Clean up timers on unmount
  useEffect(() => cancelTimers, [cancelTimers]);

  if (!figInfo) return <span className="font-usace text-normal whitespace-nowrap">Figure</span>;

  const imgSrc = figInfo.src ? `${STATIC_BASE}/${figInfo.src}` : '';

  return (
    <span className="relative inline whitespace-nowrap" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <a href={href} className="font-usace text-normal" title={`Jump to Figure ${figInfo.figNumber}`}>
        Figure {figInfo.figNumber}
        {suffix ? ` ${suffix}` : ''}
      </a>

      {showPopover && imgSrc && (
        <span
          className="absolute left-0 top-full z-50 mt-2 w-max max-w-[420px] rounded border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-600 dark:bg-gray-800"
          role="tooltip"
        >
          <img src={imgSrc} alt={figInfo.caption || ''} className="block h-auto max-w-full rounded" />
          <span className="mt-2 block font-usace text-caption italic text-gray-500 dark:text-gray-400">
            Figure {figInfo.figNumber}: {figInfo.caption}
          </span>
        </span>
      )}
    </span>
  );
};

export default FigReference;
