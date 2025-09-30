import { useEffect, useMemo, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

const STATIC_BASE = '/RMC-Software-Documentation';
const DOCS_ROUTE_BASE = '/RMC-Software-Documentation/docs';

const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

const EquationReference = ({ equationKey }) => {
  const [equationInfo, setEquationInfo] = useState(null);
  const reportId = useReportId();

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${STATIC_BASE}/counters/${reportId}.json`;
    (async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await res.json();
        const found = data?.equations?.[equationKey] ?? null;
        if (found) setEquationInfo(found);
        else console.warn(`Equation key "${equationKey}" not found in ${jsonPath}`);
      } catch (e) {
        console.error('Error loading counters:', e);
      }
    })();
  }, [reportId, equationKey]);

  const targetId = equationKey;

  const docSlug = useMemo(() => toDocSlug(equationInfo?.docId), [equationInfo?.docId]);

  const targetDocPath = useMemo(() => {
    if (!equationInfo?.parentDocPath || !docSlug) return '';
    return `${DOCS_ROUTE_BASE}/${equationInfo.parentDocPath}/${docSlug}`;
  }, [equationInfo?.parentDocPath, docSlug]);

  const isSamePage = useMemo(() => {
    const normalize = (p) => (p?.endsWith('/') ? p.slice(0, -1) : p || '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return targetDocPath && normalize(currentPath) === normalize(targetDocPath);
  }, [targetDocPath]);

  const href = useMemo(() => {
    if (!equationInfo) return '#';
    return isSamePage ? `#${targetId}` : `${targetDocPath}#${targetId}`;
  }, [equationInfo, isSamePage, targetDocPath, targetId]);

  if (!equationInfo) return <span>Loading...</span>;

  return (
    <a
      href={href}
      className="font-usace text-normal"
      title={`Jump to Equation ${equationInfo.equationNumber}`}
    >
      Equation {equationInfo.equationNumber}
    </a>
  );
};

export default EquationReference;
