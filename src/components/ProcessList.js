import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ProcessList
 * Ordered steps (1,2,3...) with optional nested sub-steps (a,b,c...) and/or details panel,
 * PLUS freeform per-step MDX "freeform" blocks that are indented and not numbered.
 *
 * Unified item API:
 * - string | number  -> { title: string }
 * - {
 *     title: ReactNode,
 *     child?: ReactNode | Array<ReactNode | string | { title: ReactNode, child?: ... }>, // numbered sub-steps or detail panel
 *     freeform?: ReactNode | ReactNode[], // NEW: freeform content, indented under the step but not numbered
 *   }
 */
export default function ProcessList({
  items = [],
  startAt = 1,
  indentPx = 0,
  maxIndentPx,
  bubbleSizePx = 28,
  bubbleGapPx = 10,
  nowrap = false,

  // Tailwind class props (overridable)
  boxClass = 'bg-background-color py-1.5',
  badgeClass = 'bg-ifm-primary rounded-full shadow text-caption font-usace text-font-color-inverse',
  childBadgeClass = 'border border-ifm-primary text-caption font-usace text-ifm-primary bg-transparent rounded-full',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color',
  detailButtonClass = 'mt-2 text-sm underline hover:no-underline text-ifm-link hover:text-ifm-link-hover',
  detailPanelClass = 'mt-2 rounded border border-border-color p-3 text-sm',
  className = '',

  // Children layout
  childBaseIndentPx = 35,
  childIndentPx,
  childMaxIndentPx,
  childStartAt = 1,

  // Freeform layout
  freeBlockClass = 'prose max-w-none',
}) {
  const rootRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
  const [openChild, setOpenChild] = useState({}); // key: `${i}-${j}` => boolean

  const norm = useMemo(() => normalizeItems(items), [items]);

  // ResizeObserver tracks available container width for indentation calculations
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
        className="m-0 ml-0 list-none py-0 !pl-0 pr-2"
        style={{ listStyleType: 'none' }}
        role="list"
      >
        {norm.map((node, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${ml}px)`;
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
            minWidth: 0,
          };

          const panelId = `proc-${i}-panel`;
          const hasChildPanel = !!node.childPanel;
          const hasChildList = Array.isArray(node.childList) && node.childList.length > 0;
          const hasFreeform = Array.isArray(node.freeform) && node.freeform.length > 0;

          return (
            <li key={i} className={`relative ${gapClass}`}>
              {/* Step header row */}
              <div className={`relative ${boxClass}`} style={headerGrid}>
                <span
                  aria-hidden="true"
                  className={`inline-flex items-center justify-center ${badgeClass}`}
                  style={{ width: bubbleSizePx, height: bubbleSizePx }}
                >
                  {n}
                </span>
                <span aria-hidden="true" />
                <span className={`${fontClass} min-w-0 break-words`} title={String(title)}>
                  {title}
                </span>
              </div>

              {/* Details panel */}
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

              {/* Sub-steps */}
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
                  freeBlockClass={freeBlockClass}
                />
              )}

              {/* Freeform MDX blocks */}
              {hasFreeform && (
                <FreeBlocks
                  blocks={node.freeform}
                  indent={ml + bubbleSizePx + bubbleGapPx}
                  freeBlockClass={freeBlockClass}
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* -------------------- Sub-step (ChildGroup) -------------------- */
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
  freeBlockClass,
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
        const label = toAlpha(startAt + j).toLowerCase();
        const mlStagger = Math.min(j * indentPx, computedChildMaxIndent);
        const ml = baseIndentPx + mlStagger;
        const width = `calc(100% - ${ml}px)`;
        const panelKey = `${parentIndex}-${j}`;
        const panelId = `proc-child-${panelKey}`;

        const hasChildPanel = !!child.childPanel;
        const hasChildList = Array.isArray(child.childList) && child.childList.length > 0;
        const hasFreeform = Array.isArray(child.freeform) && child.freeform.length > 0;

        return (
          <li key={`child-${j}`} className={`relative ${gapClass}`}>
            {/* Sub-step header row */}
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
                minWidth: 0,
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

            {/* Sub-step detail panel */}
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

            {/* Nested sub-steps */}
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
                freeBlockClass={freeBlockClass}
              />
            )}

            {/* Freeform blocks under sub-step */}
            {hasFreeform && (
              <FreeBlocks
                blocks={child.freeform}
                indent={ml + bubbleSizePx + bubbleGapPx}
                freeBlockClass={freeBlockClass}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------- Freeform Blocks -------------------- */
function FreeBlocks({ blocks, indent, freeBlockClass }) {
  const ml = indent;
  const width = `calc(100% - ${ml}px)`;
  const list = Array.isArray(blocks) ? blocks : [blocks];

  return (
    <div
      className={`mt-2 ${freeBlockClass}`}
      style={{
        marginLeft: ml,
        width,
        boxSizing: 'border-box',
        maxWidth: `calc(100% - ${ml}px)`,
        minWidth: 0,
      }}
    >
      {list.map((node, idx) => (
        <div key={idx} className="mb-3 last:mb-0">
          {node}
        </div>
      ))}
    </div>
  );
}

/* -------------------- Normalization Helpers -------------------- */
function normalizeItems(items) {
  return (items || []).map(normalizeNode);
}

function normalizeNode(it) {
  if (typeof it === 'string' || typeof it === 'number') {
    return { title: String(it) };
  }
  const title = it?.title ?? '';
  const rawChild = it?.child;
  const rawFree = it?.freeform;

  const out = { title };

  // child (sub-steps or detail panel)
  if (Array.isArray(rawChild)) {
    out.childList = rawChild.map(normalizeNode);
  } else if (rawChild !== undefined && rawChild !== null) {
    out.childPanel = rawChild;
  }

  // freeform blocks
  if (rawFree !== undefined && rawFree !== null) {
    out.freeform = Array.isArray(rawFree) ? rawFree : [rawFree];
  }

  return out;
}

/* -------------------- Helpers -------------------- */
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
