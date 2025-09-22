import { useId, useMemo, useState } from 'react';

/**
 * StackedCardsTW (simplified)
 * - No indent. Full-width cards.
 * - Styling mirrors RibbonSteps via Tailwind class props.
 * - Cards are expandable ONLY if `content` exists; otherwise static (no arrow/click).
 *
 * API:
 *   items: Array<{ title: string, content?: React.ReactNode }>
 *   autoNumber?: boolean (default false)
 *   numberStyle?: 'decimal'|'upper-alpha'|'lower-alpha'|'upper-roman'|'lower-roman' (default 'decimal')
 *   startAt?: number (default 1)
 *   defaultOpen?: 'none'|'first'|'all'|number[] (default 'none')  // applies only to expandable items
 *   className?: string
 *   boxClass?: string    // matches RibbonSteps
 *   badgeClass?: string  // matches RibbonSteps
 *   panelClass?: string  // content area style
 *   gapClass?: string
 *   fontClass?: string
 */
export default function StackedCardsTW({
  title,
  items = [],
  autoNumber = false,
  numberStyle = 'decimal',
  startAt = 1,
  defaultOpen = 'none',

  // Tailwind class props (intentionally the SAME defaults as your RibbonSteps)
  boxClass = 'bg-ifm-primary border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5',
  badgeClass = 'bg-ifm-primary border border-border-color rounded-full shadow text-caption font-usace text-font-color-inverse',
  panelClass = 'rounded-lg border-t text-font-color-inverse border-border-color bg-background-color mt-2 px-3 py-2.5',
  gapClass = 'mb-2.5',
  fontClass = 'font-usace text-normal text-font-color-inverse',

  className = '',
}) {
  const cid = useId();

  // Mark which items are expandable (have content)
  const withFlags = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        _expandable: hasContent(it.content),
      })),
    [items],
  );

  // Initial open state (consider only expandable indices)
  const initial = useMemo(() => {
    const expandable = withFlags
      .map((it, idx) => (it._expandable ? idx : null))
      .filter((x) => x !== null);

    if (defaultOpen === 'all') return expandable;
    if (defaultOpen === 'first') return expandable.length ? [expandable[0]] : [];
    if (Array.isArray(defaultOpen)) {
      return defaultOpen.filter((i) => expandable.includes(i));
    }
    return []; // 'none'
  }, [withFlags, defaultOpen]);

  const [open, setOpen] = useState(initial);
  const toggle = (idx) =>
    setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  const numbered = (label, idx) =>
    autoNumber ? `${formatOrdinal(idx + startAt, numberStyle)}. ${label}` : label;

  if (!withFlags.length) return null;

  return (
    <section className={`not-prose w-full ${className}`} aria-label={title || 'Stacked cards'}>
      {title && <h3 className="mb-3 font-usace text-[20px] font-bold text-font-color">{title}</h3>}

      <ol className="m-0 list-none p-0" style={{ listStyleType: 'none' }} role="list">
        {withFlags.map((it, i) => {
          const isOpen = open.includes(i);
          const headerId = `${cid}-hdr-${i}`;
          const panelId = `${cid}-pnl-${i}`;

          return (
            <li key={i} className={`relative ${gapClass} list-none`}>
              <div className={`relative ${boxClass}`}>
                {/* Header / Title row */}
                {it._expandable ? (
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {autoNumber && (
                        <Badge
                          className={badgeClass}
                          label={formatOrdinal(i + startAt, numberStyle)}
                        />
                      )}
                      <span className={`${fontClass} min-w-0 truncate`}>
                        {numbered(it.title || `Item ${i + 1}`, i)}
                      </span>
                    </div>
                    <Chevron isOpen={isOpen} />
                  </button>
                ) : (
                  <div id={headerId} className="flex w-full items-center">
                    <div className="flex min-w-0 items-center gap-3">
                      {autoNumber && (
                        <Badge
                          className={badgeClass}
                          label={formatOrdinal(i + startAt, numberStyle)}
                        />
                      )}
                      <span className={`${fontClass} min-w-0 truncate`}>
                        {numbered(it.title || `Item ${i + 1}`, i)}
                      </span>
                    </div>
                    {/* no chevron, no click */}
                  </div>
                )}

                {/* Expandable panel */}
                {it._expandable && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      isOpen ? 'max-h-[9999px]' : 'max-h-0'
                    }`}
                  >
                    <div
                      className={panelClass}
                      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {renderContent(it.content)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ——— Pieces that mirror RibbonSteps styling ——— */

function Badge({ className, label }) {
  // Same concept as RibbonSteps' badge: a rounded pill with centered number
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 min-w-7 items-center justify-center px-2 ${className}`}
      style={{ fontWeight: 700 }}
    >
      {label}
    </span>
  );
}

function Chevron({ isOpen }) {
  return (
    <svg
      className={`ml-3 h-5 w-5 shrink-0 transition-transform duration-200 ${
        isOpen ? 'rotate-180' : 'rotate-0'
      } text-font-color`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11l3.71-3.77a.75.75 0 111.08 1.04l-4.25 4.33a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ——— Utilities ——— */
function hasContent(c) {
  if (c === null || c === undefined) return false;
  if (typeof c === 'string') return c.trim().length > 0;
  return true;
}
function formatOrdinal(n, style = 'decimal') {
  switch (style) {
    case 'upper-alpha':
      return toAlpha(n).toUpperCase();
    case 'lower-alpha':
      return toAlpha(n).toLowerCase();
    case 'upper-roman':
      return toRoman(n).toUpperCase();
    case 'lower-roman':
      return toRoman(n).toLowerCase();
    default:
      return String(n);
  }
}
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
  for (const [v, sym] of r) {
    while (n >= v) {
      res += sym;
      n -= v;
    }
  }
  return res;
}
function renderContent(c) {
  if (typeof c === 'string') return <p>{c}</p>;
  return c;
}
