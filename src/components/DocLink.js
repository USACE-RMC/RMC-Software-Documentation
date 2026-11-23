import Link from '@docusaurus/Link';
import { PUBLISHED_SITE, resolveDoc, targetPath } from './docTarget';

/**
 * Link to a page (and optional heading) in another document on this site.
 *
 *   <DocLink doc="web-applications/system-response/cle-common-methods-screening" page="initiation"
 *            anchor="crest-crack-models-headwater-gate">headwater gate</DocLink>
 *
 * - Target document in this build: an ordinary site link. The build fails if the page does not
 *   exist and warns if the heading does not, so renamed pages and headings are caught.
 * - Target not in this build (its branch is unmerged, or it is inactive): a link to the published
 *   site, and a "[cross-doc]" warning in the build log. Nothing to change when the target merges.
 *
 * `version` is optional; without it the link goes to the newest version in the build (v1.0 when
 * the document is not in the build).
 */
const DocLink = ({ doc, version, page, anchor, children }) => {
  const target = resolveDoc(doc, version);
  const path = targetPath(target.docBase, page, anchor);
  if (target.inBuild) return <Link to={path}>{children}</Link>;
  return (
    <a href={`${PUBLISHED_SITE}${path}`} data-cross-doc="unchecked">
      {children}
    </a>
  );
};

export default DocLink;
