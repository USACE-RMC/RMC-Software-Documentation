import { useId, useMemo, useState } from 'react';

/**
 * ListCards (simplified, fixed)
 * - Full-width cards.
 * - Expandable ONLY if `content` exists.
 * - Number appears ONLY in the circle badge (no inline "1. " before title).
 * - Title accepts ReactNode (JSX or string).
 */
export default function ListCards({
  title,
  items = [],
  autoNumber = true,
  numberStyle = 'decimal',
  startAt = 1,
  defaultOpen = 'none',

  // Tailwind class props (same look as your RibbonSteps)
  boxClass = 'bg-ifm-primary-darker border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5',
  badgeClass = 'bg-ifm-primary border border-border-color rounded-full shadow text-caption font-usace text-font-color-inverse',
  panelClass = 'rounded-lg border-t text-font-color-inverse border-border-color bg-background-color mt-4 px-3 py-2.5',
  gapClass = '!mb-0',
  fontClass = 'font-usace text-normal text-font-color-inverse',
  className = '',
}) {
  const cid = useId();

  const withFlags = useMemo(
    () => items.map((it) => ({ ...it, _expandable: hasContent(it.content) })),
    [items],
  );

  const initial = useMemo(() => {
    const expandable = withFlags
      .map((it, idx) => (it._expandable ? idx : null))
      .filter((x) => x !== null);
    if (defaultOpen === 'all') return expandable;
    if (defaultOpen === 'first') return expandable.length ? [expandable[0]] : [];
    if (Array.isArray(defaultOpen)) return defaultOpen.filter((i) => expandable.includes(i));
    return []; // 'none'
  }, [withFlags, defaultOpen]);

  const [open, setOpen] = useState(initial);
  const toggle = (idx) =>
    setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  if (!withFlags.length) return null;

  return (
    <section className={`not-prose w-full ${className}`} aria-label={title || 'Stacked cards'}>
      {title && <h3 className="mb-3 font-usace text-[20px] font-bold text-font-color">{title}</h3>}

      <ol className="m-0 ml-0 list-none !pl-0" style={{ listStyleType: 'none' }} role="list">
        {withFlags.map((it, i) => {
          const isOpen = open.includes(i);
          const headerId = `${cid}-hdr-${i}`;
          const panelId = `${cid}-pnl-${i}`;
          const ordinal = formatOrdinal(i + startAt, numberStyle);

          const TitleNode = it.title ?? `Item ${i + 1}`; // ← ReactNode-safe

          return (
            <li key={i} className={`relative ${gapClass} list-none`}>
              <div className={`relative ${boxClass}`}>
                {/* Header / Title */}
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
                      {autoNumber && <Badge className={badgeClass} label={ordinal} />}
                      <span className={`${fontClass} min-w-0 truncate`}>{TitleNode}</span>
                    </div>
                    <Chevron isOpen={isOpen} />
                  </button>
                ) : (
                  <div id={headerId} className="flex w-full items-center">
                    <div className="flex min-w-0 items-center gap-3">
                      {autoNumber && <Badge className={badgeClass} label={ordinal} />}
                      <span className={`${fontClass} min-w-0 truncate`}>{TitleNode}</span>
                    </div>
                  </div>
                )}

                {/* Panel */}
                {it._expandable && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-[9999px]' : 'max-h-0'}`}
                  >
                    <div
                      className={panelClass}
                      style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >
                      <div className="!not-prose !text-font-color-inverse">
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

/* ——— UI bits ——— */
function Badge({ className, label }) {
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
      className={`ml-3 h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} text-font-color-inverse`}
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

/* ——— Helpers ——— */
function hasContent(c) {
  if (c === null || c === undefined) return false;
  if (typeof c === 'string') return c.trim().length > 0;
  return true; // any ReactNode
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
  for (const [v, s] of r) {
    while (n >= v) {
      res += s;
      n -= v;
    }
  }
  return res;
}
function renderContent(c) {
  return c ?? null;
}
