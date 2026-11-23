import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useMemo, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import { PUBLISHED_SITE, resolveDoc, targetPath } from './docTarget';
import '../css/custom.css';

const toDocSlug = (docId = '') => docId.replace(/\.mdx$/i, '').replace(/^\d{1,3}-/, '');

/**
 * "Equation N" linked to the equation.
 *
 * Same document:  <EquationReference equationKey="my-doc-eq-3" />
 *
 * Another document (number read from that document's own numbering, so it updates when the
 * other document renumbers):
 *   <EquationReference doc="web-applications/system-response/cle-common-methods-screening"
 *                      page="initiation" equationKey="cle-common-methods-screening-eq-8"
 *                      fallback="Equation 8" />
 *   - `page` makes the link a checked site link (recommended).
 *   - `fallback` is shown while the other document is not in the build (unmerged branch or
 *     inactive); the link then goes to the published site and the build log shows a warning.
 */
const EquationReference = ({ equationKey, doc, version, page, fallback }) => {
  const [equationInfo, setEquationInfo] = useState(null);
  const ownReportId = useReportId();
  const countersBase = useBaseUrl('counters/');
  const docsRouteBase = useBaseUrl('docs');

  const target = doc ? resolveDoc(doc, version) : null;
  const reportId = target ? target.reportId : ownReportId;

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${countersBase}${reportId}.json`;
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
  }, [reportId, equationKey, countersBase]);

  const targetId = equationKey;

  const docSlug = useMemo(() => toDocSlug(equationInfo?.docId), [equationInfo?.docId]);

  const targetDocPath = useMemo(() => {
    if (!equationInfo?.parentDocPath || !docSlug) return '';
    return `${docsRouteBase}/${equationInfo.parentDocPath}/${docSlug}`;
  }, [equationInfo?.parentDocPath, docSlug, docsRouteBase]);

  const isSamePage = useMemo(() => {
    const normalize = (p) => (p?.endsWith('/') ? p.slice(0, -1) : p || '');
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    return targetDocPath && normalize(currentPath) === normalize(targetDocPath);
  }, [targetDocPath]);

  const href = useMemo(() => {
    if (!equationInfo) return '#';
    return isSamePage ? `#${targetId}` : `${targetDocPath}#${targetId}`;
  }, [equationInfo, isSamePage, targetDocPath, targetId]);

  // ── Another document ──
  if (target) {
    const label = equationInfo ? `Equation ${equationInfo.equationNumber}` : fallback || 'Equation';
    const path = page ? targetPath(target.docBase, page, equationKey) : null;
    if (!target.inBuild) {
      return path ? (
        <a href={`${PUBLISHED_SITE}${path}`} data-cross-doc="unchecked" className="whitespace-nowrap font-usace text-normal">
          {label}
        </a>
      ) : (
        <span className="whitespace-nowrap font-usace text-normal">{label}</span>
      );
    }
    if (path) {
      return (
        <Link to={path} className="whitespace-nowrap font-usace text-normal" title={equationInfo ? `Jump to ${label}` : undefined}>
          {label}
        </Link>
      );
    }
    return (
      <a href={href} className="whitespace-nowrap font-usace text-normal">
        {label}
      </a>
    );
  }

  // ── Same document (unchanged behavior) ──
  if (!equationInfo) return <span className="whitespace-nowrap font-usace text-normal">Equation</span>;

  return (
    <a href={href} className="whitespace-nowrap font-usace text-normal" title={`Jump to Equation ${equationInfo.equationNumber}`}>
      Equation {equationInfo.equationNumber}
    </a>
  );
};

export default EquationReference;
