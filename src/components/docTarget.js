import reportIdMap from '@site/src/reportIdMap';

/**
 * Resolves a link target in another document (used by DocLink and EquationReference's `doc` prop).
 *
 * `doc` is the document's folder under docs/, without the version, e.g.
 *   "web-applications/system-response/cle-common-methods-screening"
 *
 * The generated src/reportIdMap.js lists every document version in the current build, so it tells
 * us whether the target exists here:
 *   - in this build  -> a site-relative link, which Docusaurus's broken-link check verifies
 *   - not in build   -> an absolute link to the published site (not checked), plus a build warning.
 *                       This is the transition state while the target is on an unmerged branch or
 *                       flagged inactive.
 */
export const PUBLISHED_SITE = 'https://usace-rmc.github.io/RMC-Software-Documentation';

const versionKey = (v) =>
  v
    .replace(/^v/, '')
    .split('.')
    .map((n) => parseInt(n, 10) || 0);
const cmpVersion = (a, b) => {
  const [x, y] = [versionKey(a), versionKey(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
  }
  return 0;
};

const warned = new Set();
function warnOnce(msg) {
  if (warned.has(msg)) return;
  warned.add(msg);
  // Printed in the build log (SSR) and the browser console.
  console.warn(msg);
}

/**
 * @returns {{ inBuild: boolean, version: string, reportId: string|null, docBase: string }}
 */
export function resolveDoc(doc, version) {
  const clean = String(doc || '')
    .replace(/^\/?(docs\/)?/, '')
    .replace(/\/$/, '');
  const builtVersions = Object.keys(reportIdMap)
    .filter((k) => k.startsWith(`${clean}/`) && /^v\d+\.\d+(\.\d+)?$/.test(k.slice(clean.length + 1)))
    .map((k) => k.slice(clean.length + 1))
    .sort(cmpVersion);

  const wanted = version ? (String(version).startsWith('v') ? String(version) : `v${version}`) : null;
  const picked = wanted || builtVersions[builtVersions.length - 1] || 'v1.0';
  const inBuild = builtVersions.includes(picked);
  if (!inBuild) {
    warnOnce(`[cross-doc] "${clean}/${picked}" is not in this build; linking to the published site instead (link not checked).`);
  }
  return {
    inBuild,
    version: picked,
    reportId: inBuild ? reportIdMap[`${clean}/${picked}`] : null,
    docBase: `${clean}/${picked}`,
  };
}

/** Path of a page of the target doc, without the site base ("/docs/<doc>/<version>/<page>#anchor"). */
export function targetPath(docBase, page, anchor) {
  const p = String(page || '')
    .replace(/^\/+/, '')
    .replace(/\.mdx?$/, '')
    .replace(/^\d{1,3}-/, '');
  return `/docs/${docBase}${p ? `/${p}` : ''}${anchor ? `#${anchor}` : ''}`;
}
