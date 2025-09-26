import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ProcessList
 * Ordered steps (1,2,3...) with optional nested sub-steps (a,b,c...) and optional details panels.
 *
 * items: Array<
 *   string |
 *   {
 *     title: React.ReactNode,
 *     details?: React.ReactNode,           // optional expandable panel for the step
 *     children?: Array<string | { title: React.ReactNode, details?: React.ReactNode }>
 *   }
 * >
 *
 * Visual options:
 * - showSpine: draw a subtle vertical line behind badges to telegraph "sequence"
 * - indentPx / childBaseIndentPx / childIndentPx: staggering controls (kept simple & safe)
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
  childBadgeClass = 'border border-ifm-primary text-caption font-usace text-ifm-primary bg-transparent rounded-full', // outlined chip
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

  const norm = useMemo(
    () =>
      (items || []).map((s) =>
        typeof s === 'string' || typeof s === 'number'
          ? { title: String(s) }
          : {
              title: s?.title ?? '',
              details: s?.details,
              children: Array.isArray(s?.children) ? s.children : undefined,
            },
      ),
    [items],
  );

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
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4)); // keep ≥60% width usable
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
      <ol
        className="m-0 ml-0 list-none py-2 !pl-0 pr-2"
        style={{ listStyleType: 'none', paddingInlineStart: 0, marginInlineStart: 0 }}
        role="list"
      >
        {norm.map((node, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${computedMaxIndent}px)`;
          const title = node.title;
          const hasDetails = !!node.details;

          const headerGrid = {
            marginLeft: ml,
            width,
            display: 'grid',
            gridTemplateColumns: `${bubbleSizePx}px ${bubbleGapPx}px 1fr`,
            alignItems: 'center',
            whiteSpace: nowrap ? 'nowrap' : 'normal',
            overflowX: nowrap ? 'auto' : 'visible',
            minHeight: Math.max(bubbleSizePx + 8, 36),
          };

          const panelId = `proc-${i}-panel`;

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
                <span className={`${fontClass} min-w-0`} title={String(title)}>
                  {title}
                </span>
              </div>

              {/* Details toggle + panel */}
              {hasDetails && (
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
                    style={{ marginLeft: ml + bubbleSizePx + bubbleGapPx }}
                  >
                    {node.details}
                  </div>
                </>
              )}

              {/* Children (a,b,c...) */}
              {Array.isArray(node.children) && node.children.length > 0 && (
                <ChildGroup
                  parentIndex={i}
                  items={node.children}
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
    <>
      {items.map((child, j) => {
        const label = toAlpha(startAt + j).toLowerCase(); // a,b,c...
        const childNode =
          typeof child === 'string' || typeof child === 'number'
            ? { title: String(child) }
            : child || {};
        const childTitle = childNode.title ?? '';
        const hasDetails = !!childNode.details;

        const mlStagger = Math.min(j * indentPx, computedChildMaxIndent);
        const ml = baseIndentPx + mlStagger;
        const width = `calc(100% - ${computedChildMaxIndent + (baseIndentPx - (parentIndex ? 0 : 0))}px)`;
        const panelKey = `${parentIndex}-${j}`;
        const panelId = `proc-child-${panelKey}`;

        return (
          <li key={`child-${j}`} className={`relative ${gapClass}`}>
            <div
              className={`relative ${boxClass}`}
              style={{
                marginLeft: ml,
                width,
                display: 'grid',
                gridTemplateColumns: `${bubbleSizePx}px ${bubbleGapPx}px 1fr`,
                alignItems: 'center',
                whiteSpace: nowrap ? 'nowrap' : 'normal',
                overflowX: nowrap ? 'auto' : 'visible',
                minHeight: Math.max(bubbleSizePx + 8, 36),
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
              <span className={`${fontClass} min-w-0`} title={String(childTitle)}>
                {childTitle}
              </span>
            </div>

            {hasDetails && (
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
                  style={{ marginLeft: ml + bubbleSizePx + bubbleGapPx }}
                >
                  {childNode.details}
                </div>
              </>
            )}
          </li>
        );
      })}
    </>
  );
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
