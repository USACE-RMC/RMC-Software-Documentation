import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useMemo, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';

// strip ".mdx" and any leading "digits-" prefix (e.g., "05-schmertmann" -> "schmertmann")
const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

const TableReference = ({ tableKey }) => {
  const [tableInfo, setTableInfo] = useState(null);
  const reportId = useReportId();
  const countersBase = useBaseUrl('counters/');
  const docsRouteBase = useBaseUrl('docs');

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${countersBase}${reportId}.json`;
    (async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await res.json();
        const found = data?.tables?.[tableKey] ?? null;
        if (found) setTableInfo(found);
        else console.warn(`Table key "${tableKey}" not found in ${jsonPath}`);
      } catch (e) {
        console.error('Error loading counters:', e);
      }
    })();
  }, [reportId, tableKey, countersBase]);

  const targetId = tableKey;

  const docSlug = useMemo(() => toDocSlug(tableInfo?.docId), [tableInfo?.docId]);

  const targetDocPath = useMemo(() => {
    if (!tableInfo?.parentDocPath || !docSlug) return '';
    return `${docsRouteBase}/${tableInfo.parentDocPath}/${docSlug}`;
  }, [tableInfo?.parentDocPath, docSlug, docsRouteBase]);

  const isSamePage = useMemo(() => {
    const normalize = (p) => (p?.endsWith('/') ? p.slice(0, -1) : p || '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return targetDocPath && normalize(currentPath) === normalize(targetDocPath);
  }, [targetDocPath]);

  const href = useMemo(() => {
    if (!tableInfo) return '#';
    return isSamePage ? `#${targetId}` : `${targetDocPath}#${targetId}`;
  }, [tableInfo, isSamePage, targetDocPath, targetId]);

  if (!tableInfo) return <span className="font-usace text-normal whitespace-nowrap">Table</span>;

  return (
    <a
      href={href}
      className="font-usace text-normal whitespace-nowrap"
      title={`Jump to Table ${tableInfo.tableNumber}`}
    >
      Table {tableInfo.tableNumber}
    </a>
  );
};

export default TableReference;
