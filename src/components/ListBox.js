import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * ListBox
 * Same-width, staggered right-aligned boxes with consistent number badge.
 * Titles only (no body). No-wrap by default (toggle with nowrap={false}).
 *
 * NEW:
 *  - Optional second-level children per item:
 *      items: Array<string | { title: React.ReactNode, children?: Array<string | { title: React.ReactNode }> }>
 *  - Second level defaults to lower-alpha (a, b, c) and is further indented.
 *
 * Layout logic (unchanged for level 1):
 *  - Compute maxIndent so right edge never spills beyond container.
 *  - Each row uses margin-left = min(i*indentPx, maxIndent) and width = 100% - maxIndent.
 *  - Badge and title are placed with CSS grid so numbers never overlap text.
 *
 * Tailwind props (same classes used for both levels to keep visual identity identical):
 *  - boxClass:     container card (bg, text, border, radius, shadow, padding)
 *  - badgeClass:   number badge classes (bg, text, border, size, radius)
 *  - gapClass:     vertical gap between rows (defaults to 'mb-2.5')
 *  - fontClass:    title font classes
 *
 * Sizing props:
 *  - indentPx: number (per-row indent for top level; default 0 to match your snippet)
 *  - maxIndentPx: number | undefined (hard cap; otherwise auto-computed)
 *  - bubbleSizePx: number (default 28)
 *  - bubbleGapPx: number (default 10)
 *  - nowrap: boolean (default false per your snippet)
 *
 * Second-level sizing (new, minimal, defaults chosen to look like a modest extra indent):
 *  - childBaseIndentPx: base left indent applied to ALL child rows (default 24)
 *  - childIndentPx: per-row stagger for child rows (default same as indentPx)
 *  - childMaxIndentPx: optional hard cap for child stagger (auto if undefined)
 *  - childStartAt: start index for child labels (default 1 -> a,b,c)
 */
export default function ListBox({
  items = [],
  startAt = 1,
  indentPx = 0,
  maxIndentPx,
  bubbleSizePx = 28,
  bubbleGapPx = 10,
  nowrap = false,

  // Tailwind class props (customize these) — unchanged
  boxClass = 'bg-background-color py-1.5',
  badgeClass = 'bg-ifm-primary rounded-full shadow text-caption font-usace text-font-color-inverse',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color',
  className = '',

  // NEW: minimal knobs for second-level
  childBaseIndentPx = 35,
  childIndentPx, // defaults to indentPx if not provided
  childMaxIndentPx, // optional hard cap for child stagger
  childStartAt = 1, // children default to a, b, c...
}) {
  const rootRef = useRef(null);
  const [containerW, setContainerW] = useState(0);

  // normalize items: strings -> { title }
  const normItems = useMemo(() => {
    return (items || []).map((s) =>
      typeof s === 'string' || typeof s === 'number'
        ? { title: String(s) }
        : { title: s?.title ?? '', children: Array.isArray(s?.children) ? s.children : undefined },
    );
  }, [items]);

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
    if (!normItems.length) return 0;
    if (typeof maxIndentPx === 'number') return Math.max(0, maxIndentPx);
    const totalDesired = indentPx * (normItems.length - 1);
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4)); // keep ≥60% usable width
    return Math.min(totalDesired, widthGuard);
  }, [normItems, indentPx, maxIndentPx, containerW]);

  if (!normItems.length) return null;

  const childIndent = typeof childIndentPx === 'number' ? childIndentPx : indentPx;

  return (
    <section ref={rootRef} className={`not-prose w-full ${className}`} aria-label="Numbered items">
      <ol
        className="m-0 ml-0 list-none rounded-lg border-0 border-ifm-primary py-2 !pl-0 pr-2"
        style={{ listStyleType: 'none' }}
        role="list"
      >
        {normItems.map((node, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${computedMaxIndent}px)`;
          const title = node.title;

          return (
            <li key={i} className={`relative ${gapClass}`}>
              {/* Level 1 row (unchanged styling) */}
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
                  {n}
                </span>
                <span aria-hidden="true" />
                <span className={`${fontClass} min-w-0`} title={title}>
                  {title}
                </span>
              </div>

              {/* Level 2 (optional) */}
              {Array.isArray(node.children) && node.children.length > 0 && (
                <ol
                  className="m-0 ml-0 list-none p-0 pl-0"
                  style={{ listStyleType: 'none', paddingInlineStart: 0, marginInlineStart: 0 }}
                  role="list"
                >
                  <ChildGroup
                    items={node.children}
                    startAt={childStartAt}
                    containerW={containerW}
                    baseIndentPx={childBaseIndentPx}
                    indentPx={childIndent}
                    maxIndentPx={childMaxIndentPx}
                    bubbleSizePx={bubbleSizePx}
                    bubbleGapPx={bubbleGapPx}
                    nowrap={nowrap}
                    boxClass={boxClass}
                    badgeClass={badgeClass}
                    gapClass={gapClass}
                    fontClass={fontClass}
                  />
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function ChildGroup({
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
}) {
  // Compute child-level max indent (same logic as level 1, but per child group)
  const computedChildMaxIndent = useMemo(() => {
    if (!items.length) return 0;
    if (typeof maxIndentPx === 'number') return Math.max(0, maxIndentPx);
    const totalDesired = indentPx * (items.length - 1);
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4)); // keep ≥60% width usable
    return Math.min(totalDesired, widthGuard);
  }, [items, indentPx, maxIndentPx, containerW]);

  return (
    <>
      {items.map((child, j) => {
        const label = toAlpha(startAt + j).toLowerCase(); // a, b, c...
        const childTitle =
          typeof child === 'string' || typeof child === 'number'
            ? String(child)
            : (child?.title ?? '');

        const mlStagger = Math.min(j * indentPx, computedChildMaxIndent);
        const ml = baseIndentPx + mlStagger;
        const width = `calc(100% - ${computedChildMaxIndent + baseIndentPx}px)`;

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
              <span className={`${fontClass} min-w-0`} title={childTitle}>
                {childTitle}
              </span>
            </div>
          </li>
        );
      })}
    </>
  );
}

/* ------- helpers ------- */
function toAlpha(n) {
  // 1 -> A, 2 -> B ...
  let s = '',
    x = n;
  while (x > 0) {
    x--;
    s = String.fromCharCode((x % 26) + 65) + s;
    x = Math.floor(x / 26);
  }
  return s || 'A';
}
