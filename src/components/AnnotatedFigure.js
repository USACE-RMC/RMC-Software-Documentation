import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import imageDimensions from '../imageDimensions';
import ZoomableImage from './ZoomableImage';
import '../css/custom.css';
import '../css/tables.css';

/**
 * AnnotatedFigure: a screenshot with numbered callouts drawn by the site, plus the regions table
 * built from the same list.
 *
 *   <AnnotatedFigure
 *     figKey="dst-users-guide-fig-results-map-page"
 *     src="/figures/.../results-map-page.png"          // screenshot WITHOUT burned-in numbers
 *     alt="The Results Map page ..."
 *     caption="The Results Map page with a structure selected."
 *     tableKey="dst-users-guide-table-consequences-results-map-regions"
 *     tableCaption="Results Map page regions"
 *     callouts={[
 *       { n: 1, x: 32.66, y: 23.61, region: 'Function cards', text: 'One card per consequence function...' },
 *       ...
 *     ]}
 *   />
 *
 * x and y are the centre of each marker as a percentage of the image's width and height, measured
 * from its top-left corner, so markers stay on target at any display size. They can come from:
 *   - the dev-server picker: open the page with ?pick-callouts, click each spot, copy the list;
 *   - a capture script's "<image>.callouts.json", passed as positions={...} (import the JSON);
 *     entries in `callouts` then only need n, region and text, and are matched by n.
 *
 * Hovering or focusing a marker highlights its table row and the reverse; selecting one scrolls
 * to the other. Screen readers get each marker as a button named "Callout n: region" that is
 * described by its table row, and the figure is described by the table.
 */
const AnnotatedFigure = ({
  figKey,
  src,
  alt,
  caption,
  width = '80%',
  background = 'filled',
  id,
  zoom = true,
  callouts = [],
  positions,
  tableKey,
  tableCaption,
  tableAlt,
  numberHeader = '#',
  regionHeader = 'Region',
  descriptionHeader = 'Description',
}) => {
  const reportId = useReportId();
  const countersBase = useBaseUrl('counters/');
  const imgUrl = useBaseUrl(src);
  const [figNumber, setFigNumber] = useState(null);
  const [tableNumber, setTableNumber] = useState(null);
  const [active, setActive] = useState(null);
  const frameRef = useRef(null);

  const figureId = id || figKey;
  const tableId = tableKey || `${figureId}-regions`;
  const rowId = (n) => `${figureId}-callout-${n}`;
  const markerId = (n) => `${figureId}-marker-${n}`;

  const brokenLinks = useBrokenLinks();
  brokenLinks.collectAnchor(figureId);
  brokenLinks.collectAnchor(tableId);

  const dims = imageDimensions[String(src || '').replace(/^\//, '')];

  // Merge positions (e.g. from a capture script's JSON) into the callout list by number.
  const items = useMemo(() => {
    const pos = new Map((Array.isArray(positions) ? positions : positions?.callouts || []).map((p) => [Number(p.n), p]));
    return (callouts || [])
      .map((c) => {
        const p = pos.get(Number(c.n)) || {};
        return { ...c, n: c.n, x: c.x ?? p.x, y: c.y ?? p.y };
      })
      .sort((a, b) => Number(a.n) - Number(b.n));
  }, [callouts, positions]);
  items.forEach((c) => brokenLinks.collectAnchor(rowId(c.n)));

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `${countersBase}${reportId}.json`;
    (async () => {
      try {
        const res = await fetch(jsonPath);
        if (!res.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await res.json();
        const f = data?.figures?.[figKey];
        if (f) setFigNumber(f.figNumber);
        else console.warn(`Figure key "${figKey}" not found in ${jsonPath}`);
        if (tableKey) {
          const t = data?.tables?.[tableKey];
          if (t) setTableNumber(t.tableNumber);
          else console.warn(`Table key "${tableKey}" not found in ${jsonPath}`);
        }
      } catch (e) {
        console.error('Error loading counters:', e);
      }
    })();
  }, [reportId, figKey, tableKey, countersBase]);

  // ── Dev-only picker: /page?pick-callouts ──
  const [picking, setPicking] = useState(false);
  const [picks, setPicks] = useState([]);
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') return;
    setPicking(new URLSearchParams(window.location.search).has('pick-callouts'));
  }, []);
  const onPick = useCallback((e) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.round(((e.clientX - r.left) / r.width) * 10000) / 100;
    const y = Math.round(((e.clientY - r.top) / r.height) * 10000) / 100;
    setPicks((p) => [...p, { n: p.length + 1, x, y }]);
  }, []);
  const pickJson = `[\n${picks.map((p) => `  { n: ${p.n}, x: ${p.x}, y: ${p.y} },`).join('\n')}\n]`;

  const jumpTo = (elementId) => {
    const el = typeof document !== 'undefined' ? document.getElementById(elementId) : null;
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  const markers = (inDialog) =>
    items
      .filter((c) => typeof c.x === 'number' && typeof c.y === 'number')
      .map((c) => (
        <button
          key={`${inDialog ? 'z' : 'm'}-${c.n}`}
          id={inDialog ? undefined : markerId(c.n)}
          type="button"
          className={`callout-marker${active === c.n ? 'is-active' : ''}`}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          aria-label={`Callout ${c.n}: ${typeof c.region === 'string' ? c.region : ''}`}
          aria-describedby={rowId(c.n)}
          onMouseEnter={() => setActive(c.n)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(c.n)}
          onBlur={() => setActive(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActive(c.n);
            if (!inDialog) jumpTo(rowId(c.n));
          }}
        >
          {c.n}
        </button>
      ));

  const imgBgClass = background === 'transparent' ? '' : 'bg-surface-page dark:bg-white';
  const renderHTML = (content) => ({ __html: content });
  const cell = (v) => (typeof v === 'string' ? { dangerouslySetInnerHTML: renderHTML(v) } : { children: v });

  return (
    <>
      <figure
        id={figureId}
        className="my-[1em] ml-0 mr-auto w-full justify-items-start border-y border-border-color py-5"
        aria-describedby={items.length ? tableId : undefined}
      >
        <div ref={frameRef} className="callout-frame" style={{ maxWidth: width }}>
          <ZoomableImage
            src={imgUrl}
            alt={alt}
            className={`block h-auto max-w-full ${imgBgClass}`}
            width={dims?.width}
            height={dims?.height}
            caption={`${figNumber ? `Figure ${figNumber}` : 'Figure'}: ${caption}`}
            enabled={zoom && !picking}
            overlay={markers(true)}
          />
          {markers(false)}
          {picking && (
            <div className="callout-pick-layer" onClick={onPick} title="Click to place the next callout">
              {picks.map((p) => (
                <span key={p.n} className="callout-marker callout-marker--pick" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  {p.n}
                </span>
              ))}
            </div>
          )}
        </div>
        <figcaption className="mt-[1em] max-w-full text-left font-usace text-caption italic text-gray-500 dark:text-gray-400">
          {figNumber ? `Figure ${figNumber}` : 'Figure'}: {caption}
        </figcaption>
        {picking && (
          <div className="callout-pick-panel not-prose">
            <strong>Callout picker</strong> (dev server only). Click the image at the centre of each callout, in order.
            <pre>{pickJson}</pre>
            <button type="button" onClick={() => navigator.clipboard?.writeText(pickJson)}>
              Copy
            </button>{' '}
            <button type="button" onClick={() => setPicks((p) => p.slice(0, -1))}>
              Undo
            </button>{' '}
            <button type="button" onClick={() => setPicks([])}>
              Clear
            </button>
          </div>
        )}
      </figure>

      {items.length > 0 && (
        <div id={tableId} className="table-container" data-anchor="true">
          {tableCaption && (
            <div className="table-cap">
              {tableNumber ? `Table ${tableNumber}` : 'Table'}: {tableCaption}
            </div>
          )}
          <div className="table-scroller">
            <table
              aria-label={tableAlt || tableCaption || 'Callouts'}
              className="table-base table-zebra callout-table"
              style={{ tableLayout: 'auto', '--table-min-width': '0px' }}
            >
              <thead>
                <tr>
                  <th className="table-header" style={{ textAlign: 'center', width: '3.5em' }}>
                    {numberHeader}
                  </th>
                  <th className="table-header" style={{ textAlign: 'left' }}>
                    {regionHeader}
                  </th>
                  <th className="table-header" style={{ textAlign: 'left', minWidth: '26ch' }}>
                    {descriptionHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr
                    key={c.n}
                    id={rowId(c.n)}
                    className={active === c.n ? 'is-active' : undefined}
                    onMouseEnter={() => setActive(c.n)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <td className="table-body-cell" style={{ textAlign: 'center', verticalAlign: 'top' }}>
                      <button
                        type="button"
                        className={`callout-marker callout-marker--inline${active === c.n ? 'is-active' : ''}`}
                        aria-label={`Show callout ${c.n} on the figure`}
                        onFocus={() => setActive(c.n)}
                        onBlur={() => setActive(null)}
                        onClick={() => {
                          setActive(c.n);
                          jumpTo(figureId);
                        }}
                      >
                        {c.n}
                      </button>
                    </td>
                    <td className="table-body-cell" style={{ verticalAlign: 'top' }} {...cell(c.region)} />
                    <td className="table-body-cell" style={{ verticalAlign: 'top' }} {...cell(c.text)} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnotatedFigure;
