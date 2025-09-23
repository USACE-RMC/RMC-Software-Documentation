import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * RibbonStepsTW
 * Same-width, staggered right-aligned boxes with consistent number badge.
 * Titles only (no body). No-wrap by default (toggle with nowrap={false}).
 *
 * Layout logic:
 *  - Compute maxIndent so right edge never spills beyond container.
 *  - Each row uses margin-left = min(i*indentPx, maxIndent) and width = 100% - maxIndent.
 *  - Badge and title are placed with CSS grid so numbers never overlap text.
 *
 * Tailwind props:
 *  - boxClass:           container card (bg, text, border, radius, shadow, padding)
 *  - badgeClass:         number badge classes (bg, text, border, size, radius)
 *  - gapClass:           vertical gap between rows (defaults to 'mb-2.5')
 *  - fontClass:          title font classes
 *
 * Sizing props:
 *  - indentPx: number (per-row indent; default 16)
 *  - maxIndentPx: number | undefined (hard cap; otherwise auto-computed)
 *  - bubbleSizePx: number (default 28)
 *  - bubbleGapPx: number (default 10)
 *  - nowrap: boolean (default true)
 */
export default function RibbonSteps({
  steps = [],
  startAt = 1,
  indentPx = 0,
  maxIndentPx,
  bubbleSizePx = 28,
  bubbleGapPx = 10,
  nowrap = false,

  // Tailwind class props (customize these)
  boxClass = 'bg-background-color py-1.5',
  badgeClass = 'bg-background-color border border-ifm-primary rounded-full shadow text-caption font-usace text-font-color',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color',
  className = '',
}) {
  const rootRef = useRef(null);
  const [containerW, setContainerW] = useState(0);

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
    if (!steps.length) return 0;
    if (typeof maxIndentPx === 'number') return Math.max(0, maxIndentPx);
    const totalDesired = indentPx * (steps.length - 1);
    const widthGuard = Math.max(0, Math.floor(containerW * 0.4)); // keep ≥60% usable width
    return Math.min(totalDesired, widthGuard);
  }, [steps, indentPx, maxIndentPx, containerW]);

  if (!steps.length) return null;

  return (
    <section ref={rootRef} className={`not-prose w-full ${className}`} aria-label="Numbered steps">
      <ol
        className="shadown-sm m-0 ml-4 list-none rounded-lg border border-ifm-primary py-2 !pl-4 pr-2"
        style={{ listStyleType: 'none' }}
        role="list"
      >
        {steps.map((title, i) => {
          const n = i + startAt;
          const ml = Math.min(i * indentPx, computedMaxIndent);
          const width = `calc(100% - ${computedMaxIndent}px)`;

          return (
            <li key={i} className={`relative ${gapClass}`}>
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
                {/* Number badge */}
                <span
                  aria-hidden="true"
                  className={`inline-flex items-center justify-center ${badgeClass}`}
                  style={{
                    width: bubbleSizePx,
                    height: bubbleSizePx,
                  }}
                >
                  {n}
                </span>

                {/* spacer column */}
                <span aria-hidden="true" />

                {/* Title */}
                <span className={`${fontClass} min-w-0`} title={title}>
                  {title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
