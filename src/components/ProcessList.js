import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ProcessList
 * Ordered steps (1,2,3...) with optional nested sub-steps (a,b,c...) and/or details panel.
 *
 * Unified item API:
 * - string | number  -> { title: string }
 * - { title: ReactNode, child?: ReactNode | Array<ReactNode | string | { title: ReactNode, child?: ... }> }
 *
 * Aliases for back-compat: { content, details, children } are normalized into `child`.
 */
export default function ProcessList({
  items = [],
  startAt = 1,
  indentPx = 0,
  maxIndentPx, // optional hard cap for top-level stagger
  bubbleSizePx = 28,
  bubbleGapPx = 10,
  nowrap = false,

  // Tailwind class props (overridable)
  boxClass = 'bg-background-color py-1.5',
  badgeClass = 'bg-ifm-primary rounded-full shadow text-caption font-usace text-font-color-inverse',
  childBadgeClass = 'border border-ifm-primary text-caption font-usace text-ifm-primary bg-transparent rounded-full',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color',
  detailButtonClass = 'mt-2 text-sm underline hover:no-underline',
  detailPanelClass = 'mt-2 rounded border border-border-color p-3 text-sm',
  className = '',

  // Children layout
  childBaseIndentPx = 35,
  childIndentPx, // defaults to indentPx
  childMaxIndentPx, // optional cap for child stagger
  childStartAt = 1, // a,b,c...
}) {
  const rootRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
  const [openChild, setOpenChild] = useState({}); // key: `${i}-${j}` => boolean

  const norm = useMemo(() => normalizeItems(items), [items]);

  useEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width || 0;
      setContainerW(w);
    });
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  const computedMaxIndent = useMemo(() => {
    if (!norm.length) return 0;
    if (typeof maxIndentPx === 'number') return Math.max(0, maxIndentPx);
    const totalDesired = indentPx * (norm.length - 1);
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4)); // keep ≥60% usable width
    return Math.min(totalDesired, widthGuard);
  }, [norm, indentPx, maxIndentPx, containerW]);

  if (!norm.length) return null;
  const childIndent = typeof childIndentPx === 'number' ? childIndentPx : indentPx;

  return (
    <section
      ref={rootRef}
      className={`not-prose relative w-full ${className}`}
      aria-label="Process list"
    >
      {/* Top-level ordered list */}
      <ol
        className="m-0 ml-0 list-none py-2 !pl-0 pr-2"
        style={{ listStyleType: 'none' }}
        role="list"
      >
        {norm.map((node, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${ml}px)`; // ensure indent never causes page overflow
          const title = node.title;

          const headerGrid = {
            marginLeft: ml,
            width,
            display: 'grid',
            gridTemplateColumns: `${bubbleSizePx}px ${bubbleGapPx}px minmax(0,1fr)`,
            alignItems: 'center',
            whiteSpace: nowrap ? 'nowrap' : 'normal',
            overflowX: nowrap ? 'auto' : 'visible',
            minHeight: Math.max(bubbleSizePx + 8, 36),
            boxSizing: 'border-box',
            maxWidth: '100%',
          };

          const panelId = `proc-${i}-panel`;
          const hasChildPanel = !!node.childPanel;
          const hasChildList = Array.isArray(node.childList) && node.childList.length > 0;

          return (
            <li key={i} className={`relative ${gapClass}`}>
              <div className={`relative ${boxClass}`} style={headerGrid}>
                {/* Badge */}
                <span
                  aria-hidden="true"
                  className={`inline-flex items-center justify-center ${badgeClass}`}
                  style={{ width: bubbleSizePx, height: bubbleSizePx }}
                >
                  {n}
                </span>
                <span aria-hidden="true" />
                {/* Title */}
                <span className={`${fontClass} min-w-0 break-words`} title={String(title)}>
                  {title}
                </span>
              </div>

              {/* Optional details panel if child is a single node */}
              {hasChildPanel && (
                <>
                  <button
                    type="button"
                    className={detailButtonClass}
                    aria-expanded={openIdx === i}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx((p) => (p === i ? -1 : i))}
                    style={{ marginLeft: ml + bubbleSizePx + bubbleGapPx }}
                  >
                    {openIdx === i ? 'Hide details' : 'Show details'}
                  </button>
                  <div
                    id={panelId}
                    hidden={openIdx !== i}
                    className={detailPanelClass}
                    style={{
                      marginLeft: ml + bubbleSizePx + bubbleGapPx,
                      boxSizing: 'border-box',
                      maxWidth: `calc(100% - ${ml + bubbleSizePx + bubbleGapPx}px)`,
                    }}
                  >
                    {node.childPanel}
                  </div>
                </>
              )}

              {/* Optional sub-steps if child is an array (wrapped in its own <ol> to keep valid nesting) */}
              {hasChildList && (
                <ChildGroup
                  parentIndex={i}
                  items={node.childList}
                  startAt={childStartAt}
                  containerW={containerW}
                  baseIndentPx={ml + childBaseIndentPx}
                  indentPx={childIndent}
                  maxIndentPx={childMaxIndentPx}
                  bubbleSizePx={bubbleSizePx}
                  bubbleGapPx={bubbleGapPx}
                  nowrap={nowrap}
                  boxClass={boxClass}
                  badgeClass={childBadgeClass}
                  gapClass={gapClass}
                  fontClass={fontClass}
                  openChild={openChild}
                  setOpenChild={setOpenChild}
                  detailButtonClass={detailButtonClass}
                  detailPanelClass={detailPanelClass}
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ChildGroup({
  parentIndex,
  items,
  startAt,
  containerW,
  baseIndentPx,
  indentPx,
  maxIndentPx,
  bubbleSizePx,
  bubbleGapPx,
  nowrap,
  boxClass,
  badgeClass,
  gapClass,
  fontClass,
  openChild,
  setOpenChild,
  detailButtonClass,
  detailPanelClass,
}) {
  const computedChildMaxIndent = useMemo(() => {
    if (!items.length) return 0;
    if (typeof maxIndentPx === 'number') return Math.max(0, maxIndentPx);
    const totalDesired = indentPx * (items.length - 1);
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4));
    return Math.min(totalDesired, widthGuard);
  }, [items, indentPx, maxIndentPx, containerW]);

  return (
    <ol className="m-0 list-none p-0" style={{ listStyleType: 'none' }} role="list">
      {items.map((child, j) => {
        const label = toAlpha(startAt + j).toLowerCase(); // a,b,c...
        const mlStagger = Math.min(j * indentPx, computedChildMaxIndent);
        const ml = baseIndentPx + mlStagger;
        const width = `calc(100% - ${ml}px)`; // ensure indent never causes page overflow
        const panelKey = `${parentIndex}-${j}`;
        const panelId = `proc-child-${panelKey}`;

        const hasChildPanel = !!child.childPanel;
        const hasChildList = Array.isArray(child.childList) && child.childList.length > 0;

        return (
          <li key={`child-${j}`} className={`relative ${gapClass}`}>
            <div
              className={`relative ${boxClass}`}
              style={{
                marginLeft: ml,
                width,
                display: 'grid',
                gridTemplateColumns: `${bubbleSizePx}px ${bubbleGapPx}px minmax(0,1fr)`,
                alignItems: 'center',
                whiteSpace: nowrap ? 'nowrap' : 'normal',
                overflowX: nowrap ? 'auto' : 'visible',
                minHeight: Math.max(bubbleSizePx + 8, 36),
                boxSizing: 'border-box',
                maxWidth: '100%',
              }}
            >
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center ${badgeClass}`}
                style={{ width: bubbleSizePx, height: bubbleSizePx }}
              >
                {label}
              </span>
              <span aria-hidden="true" />
              <span className={`${fontClass} min-w-0 break-words`} title={String(child.title)}>
                {child.title}
              </span>
            </div>

            {/* Optional details for sub-step */}
            {hasChildPanel && (
              <>
                <button
                  type="button"
                  className={detailButtonClass}
                  aria-expanded={!!openChild[panelKey]}
                  aria-controls={panelId}
                  onClick={() => setOpenChild((prev) => ({ ...prev, [panelKey]: !prev[panelKey] }))}
                  style={{ marginLeft: ml + bubbleSizePx + bubbleGapPx }}
                >
                  {openChild[panelKey] ? 'Hide details' : 'Show details'}
                </button>
                <div
                  id={panelId}
                  hidden={!openChild[panelKey]}
                  className={detailPanelClass}
                  style={{
                    marginLeft: ml + bubbleSizePx + bubbleGapPx,
                    boxSizing: 'border-box',
                    maxWidth: `calc(100% - ${ml + bubbleSizePx + bubbleGapPx}px)`,
                  }}
                >
                  {child.childPanel}
                </div>
              </>
            )}

            {/* Optional third level (rare) */}
            {hasChildList && (
              <ChildGroup
                parentIndex={`${parentIndex}-${j}`}
                items={child.childList}
                startAt={startAt}
                containerW={containerW}
                baseIndentPx={ml + 24}
                indentPx={indentPx}
                maxIndentPx={maxIndentPx}
                bubbleSizePx={bubbleSizePx}
                bubbleGapPx={bubbleGapPx}
                nowrap={nowrap}
                boxClass={boxClass}
                badgeClass={badgeClass}
                gapClass={gapClass}
                fontClass={fontClass}
                openChild={openChild}
                setOpenChild={setOpenChild}
                detailButtonClass={detailButtonClass}
                detailPanelClass={detailPanelClass}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ------- normalization helpers (shared shape) ------- */
function normalizeItems(items) {
  return (items || []).map(normalizeNode);
}
function normalizeNode(it) {
  if (typeof it === 'string' || typeof it === 'number') {
    return { title: String(it) };
  }
  const title = it?.title ?? '';
  // Prefer `child`; accept aliases for back-compat.
  const rawChild = it?.child ?? it?.content ?? it?.details ?? it?.children;
  if (Array.isArray(rawChild)) {
    return { title, childList: rawChild.map(normalizeNode) };
  } else if (rawChild !== undefined && rawChild !== null) {
    return { title, childPanel: rawChild };
  }
  return { title };
}

/* helpers */
function toAlpha(n) {
  let s = '',
    x = n;
  while (x > 0) {
    x--;
    s = String.fromCharCode((x % 26) + 65) + s;
    x = Math.floor(x / 26);
  }
  return s || 'A';
}
