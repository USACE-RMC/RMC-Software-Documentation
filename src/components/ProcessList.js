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
 *     // CHILDREN BEHAVIOR CHANGE:
 *     // - Array => renders a,b,c... sub-steps (unchanged)
 *     // - Single value => NOW also renders as a single sub-step (lettered with bubble)
 *     // To render a collapsible details panel, pass `details` (or `panel` / `childPanel`)
 *     child?: ReactNode | Array<ReactNode | string | { title: ReactNode, child?: ... }>,
 *     details?: ReactNode, // (optional) explicit details panel
 *     panel?: ReactNode,   // (alias)
 *     childPanel?: ReactNode, // (alias)
 *     freeform?: ReactNode | ReactNode[], // freeform content under the step (indented, not numbered)
 *   }
 */
export default function ProcessList({
  items = [],
  startAt = 1,
  indentPx = 0,
  maxIndentPx,
  bubbleSizePx = 28,
  bubbleGapPx = 10,
  numberStyle = 'bubble', // 'bubble' | 'plain' | 'chevron'
  nowrap = false,

  // Tailwind class props (overridable)
  boxClass = 'bg-background-color py-1.5',
  badgeClass = 'bg-ifm-primary rounded-full shadow text-caption font-usace text-font-color-inverse',
  childBadgeClass = 'border border-ifm-primary text-caption font-usace text-ifm-primary bg-transparent rounded-full',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color',
  lineHeightClass = 'leading-[1.5]',
  detailButtonClass = 'mt-2 text-sm underline hover:no-underline text-ifm-link hover:text-ifm-link-hover',
  detailPanelClass = 'mt-2 rounded border border-border-color p-3 text-sm',
  className = '',

  // Children layout
  childBaseIndentPx = 15,
  childIndentPx,
  childMaxIndentPx,

  // Freeform layout
  freeBlockClass = 'prose max-w-none',
}) {
  const rootRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
  const [openChild, setOpenChild] = useState({}); // key: `${i}-${j}` => boolean

  const norm = useMemo(() => normalizeItems(items), [items]);
  const childNumberStyle = numberStyle === 'chevron' ? 'plain' : numberStyle;

  // Track available container width for indentation calculations
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
    <section ref={rootRef} className={`not-prose relative w-full ${className}`} aria-label="Process list">
      {/* Top-level ordered list */}
      <ol className="m-0 ml-0 list-none py-0 !pl-0 pr-2" style={{ listStyleType: 'none' }} role="list">
        {norm.map((node, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${ml}px)`;
          const title = node.title;

          const headerGrid = {
            marginLeft: ml,
            width,
            display: 'grid',
            gridTemplateColumns: `${numberStyle === 'plain' ? 'auto' : `${bubbleSizePx}px`} ${bubbleGapPx}px minmax(0,1fr)`,
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
                {numberStyle === 'plain' ? (
                  <span aria-hidden="true" className={`${fontClass} ${lineHeightClass} whitespace-nowrap`}>
                    {n}.
                  </span>
                ) : numberStyle === 'chevron' ? (
                  <span
                    aria-hidden="true"
                    className={`inline-flex items-center justify-center ${fontClass} ${lineHeightClass} bg-ifm-primary text-font-color-inverse shadow`}
                    style={{
                      width: Math.round(bubbleSizePx * 1.1),
                      height: bubbleSizePx,
                      clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)',
                    }}
                  >
                    {n}
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={`inline-flex items-center justify-center ${badgeClass}`}
                    style={{ width: bubbleSizePx, height: bubbleSizePx }}
                  >
                    {n}
                  </span>
                )}
                <span aria-hidden="true" />
                <span className={`${fontClass} ${lineHeightClass} min-w-0 break-words`} title={String(title)}>
                  {title}
                </span>
              </div>

              {/* Details panel (explicit only via details/panel/childPanel) */}
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
                  level={1}
                  containerW={containerW}
                  baseIndentPx={ml + childBaseIndentPx}
                  indentPx={childIndent}
                  maxIndentPx={childMaxIndentPx}
                  bubbleSizePx={bubbleSizePx}
                  bubbleGapPx={bubbleGapPx}
                  numberStyle={childNumberStyle}
                  nowrap={nowrap}
                  boxClass={boxClass}
                  badgeClass={childBadgeClass}
                  gapClass={gapClass}
                  fontClass={fontClass}
                  lineHeightClass={lineHeightClass}
                  openChild={openChild}
                  setOpenChild={setOpenChild}
                  detailButtonClass={detailButtonClass}
                  detailPanelClass={detailPanelClass}
                  freeBlockClass={freeBlockClass}
                />
              )}

              {/* Freeform MDX blocks */}
              {hasFreeform && <FreeBlocks blocks={node.freeform} indent={ml + bubbleSizePx + bubbleGapPx} freeBlockClass={freeBlockClass} />}
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
  level = 1,
  containerW,
  baseIndentPx,
  indentPx,
  maxIndentPx,
  bubbleSizePx,
  bubbleGapPx,
  numberStyle = 'bubble',
  nowrap,
  boxClass,
  badgeClass,
  gapClass,
  fontClass,
  lineHeightClass,
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
        const label = formatChildLabel(level, j);
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
                gridTemplateColumns: `${numberStyle === 'plain' ? 'auto' : `${bubbleSizePx}px`} ${bubbleGapPx}px minmax(0,1fr)`,
                alignItems: 'center',
                whiteSpace: nowrap ? 'nowrap' : 'normal',
                overflowX: nowrap ? 'auto' : 'visible',
                minHeight: Math.max(bubbleSizePx + 8, 36),
                boxSizing: 'border-box',
                maxWidth: '100%',
                minWidth: 0,
              }}
            >
              {numberStyle === 'plain' ? (
                <span aria-hidden="true" className={`${fontClass} ${lineHeightClass} whitespace-nowrap`}>
                  {label}.
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className={`inline-flex items-center justify-center ${badgeClass}`}
                  style={{ width: bubbleSizePx, height: bubbleSizePx }}
                >
                  {label}
                </span>
              )}
              <span aria-hidden="true" />
              <span className={`${fontClass} ${lineHeightClass} min-w-0 break-words`} title={String(child.title)}>
                {child.title}
              </span>
            </div>

            {/* Sub-step detail panel (explicit) */}
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
                level={level + 1}
                containerW={containerW}
                baseIndentPx={ml + 24}
                indentPx={indentPx}
                maxIndentPx={maxIndentPx}
                bubbleSizePx={bubbleSizePx}
                bubbleGapPx={bubbleGapPx}
                numberStyle={numberStyle}
                nowrap={nowrap}
                boxClass={boxClass}
                badgeClass={badgeClass}
                gapClass={gapClass}
                fontClass={fontClass}
                lineHeightClass={lineHeightClass}
                openChild={openChild}
                setOpenChild={setOpenChild}
                detailButtonClass={detailButtonClass}
                detailPanelClass={detailPanelClass}
                freeBlockClass={freeBlockClass}
              />
            )}

            {/* Freeform blocks under sub-step */}
            {hasFreeform && <FreeBlocks blocks={child.freeform} indent={ml + bubbleSizePx + bubbleGapPx} freeBlockClass={freeBlockClass} />}
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

// Decide whether a value looks like a "node-ish" item you want to render as a sub-step
function isRenderableChildNode(v) {
  if (v === null || v === undefined) return false;
  // strings/numbers => yes
  if (typeof v === 'string' || typeof v === 'number') return true;
  // objects with a title => yes
  if (typeof v === 'object' && 'title' in v) return true;
  // any React element is an object with $$typeof; treat as a node with that element as title
  if (typeof v === 'object') return true;
  return false;
}

function normalizeNode(it) {
  if (typeof it === 'string' || typeof it === 'number') {
    return { title: String(it) };
  }

  const title = it?.title ?? '';
  const rawChild = it?.child;
  const rawFree = it?.freeform;

  // explicit details panel (preferred) with aliases for convenience
  const rawDetails = it?.details ?? it?.panel ?? it?.childPanel;

  const out = { title };

  // details panel only if explicitly provided
  if (rawDetails !== undefined && rawDetails !== null) {
    out.childPanel = rawDetails;
  }

  // child (sub-steps)
  // - Array => map to childList
  // - Single value => NOW coerced into a single-item childList
  if (Array.isArray(rawChild)) {
    out.childList = rawChild.map(normalizeNode);
  } else if (isRenderableChildNode(rawChild)) {
    // If caller passed a raw ReactNode/string/number/object, wrap as a single sub-step
    // If it's a plain ReactNode (no title), use it as the title for that sub-step.
    if (typeof rawChild === 'object' && rawChild && 'title' in rawChild) {
      out.childList = [normalizeNode(rawChild)];
    } else {
      out.childList = [normalizeNode({ title: rawChild })];
    }
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
function toRoman(num) {
  const r = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let res = '',
    n = Math.max(1, Math.min(3999, num | 0));
  for (const [v, s] of r)
    while (n >= v) {
      res += s;
      n -= v;
    }
  return res;
}
function formatChildLabel(level, index) {
  const cycle = (level - 1) % 3;
  if (cycle === 0) return toAlpha(index + 1).toLowerCase();
  if (cycle === 1) return toRoman(index + 1).toLowerCase();
  return String(index + 1);
}
