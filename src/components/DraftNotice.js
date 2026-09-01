import { useLocation } from '@docusaurus/router';
import latestVersions from '@site/static/versions/latestVersions.json';
import { draftDocs } from '../draftDocs';

/**
 * Draft status marking for documents flagged `draft: true` in docConfig.js.
 *
 * Two surfaces, one message:
 *  - DraftStatusStrip — a slim strip at the top of the content column that sticks
 *    below the site header, so the status stays visible regardless of scroll
 *    position or deep-link entry point. It is deliberately bounded by the content
 *    column rather than the viewport: a full-bleed bar reads as site-wide chrome,
 *    while a column-width bar reads as status for this document.
 *  - DraftPrintFrame — wraps the document body in a table whose thead/tfoot the
 *    browser repeats on every printed sheet, marking each physical page.
 *
 * The strip is hidden in print and the frame is inert on screen (display: contents),
 * so each surface only renders in the medium it is meant for.
 */

export const DRAFT_STATUS_TEXT = 'This document is pending final approval by the RMC Director.';

function getDocInfo(pathname) {
  const stripped = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, '')
    .replace(/^\/docs\//, '')
    .replace(/^docs\//, '');
  const match = stripped.match(/^(.+?)\/(v\d+\.\d+(?:\.\d+)?)(?:\/|$)/);
  if (!match) return null;
  return { docBasePath: match[1], version: match[2] };
}

function isDraftPath(pathname) {
  const info = getDocInfo(pathname);
  if (!info) return false;
  const isFlagged = draftDocs.some((base) => info.docBasePath === base || info.docBasePath.startsWith(base + '/'));
  if (!isFlagged) return false;
  const latest = latestVersions[info.docBasePath];
  if (!latest) return true;
  return info.version === latest;
}

/** True when the current route is the latest version of a doc flagged `draft: true`. */
export function useIsDraftDoc() {
  const location = useLocation();
  return isDraftPath(location.pathname);
}

/**
 * Slim status strip at the top of the content column.
 *
 * Renders nothing unless the current route is a draft doc, so it can be dropped
 * into the layout unconditionally.
 *
 * The outer anchor is the sticky element and carries an opaque page-coloured
 * band, so the gap between the header and the strip is preserved while scrolling
 * without document text showing through it.
 */
export const DraftStatusStrip = () => {
  const isDraft = useIsDraftDoc();
  if (!isDraft) return null;

  return (
    <div className="draft-strip-anchor">
      <div className="draft-strip" role="note" aria-label="Document status">
        {DRAFT_STATUS_TEXT}
      </div>
    </div>
  );
};

/**
 * Repeats the draft band at the top and bottom of every printed page.
 *
 * Browsers repeat `thead` and `tfoot` across page breaks, which is the only
 * cross-browser way to get a running header/footer — `@page` margin boxes are
 * unsupported in Chrome and Firefox. On screen the whole table collapses via
 * `display: contents`, so it generates no boxes and leaves layout untouched.
 */
export const DraftPrintFrame = ({ children }) => {
  const isDraft = useIsDraftDoc();
  if (!isDraft) return <>{children}</>;

  return (
    <table className="draft-print-frame">
      <thead>
        <tr>
          <td>
            <div className="draft-print-frame__band" aria-hidden="true">
              {DRAFT_STATUS_TEXT}
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{children}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>
            <div className="draft-print-frame__band draft-print-frame__band--foot" aria-hidden="true">
              {DRAFT_STATUS_TEXT}
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default DraftStatusStrip;
