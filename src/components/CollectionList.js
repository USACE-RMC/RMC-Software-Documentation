import { useId, useMemo, useState } from 'react';

/**
 * CollectionList
 * Grouped items (not necessarily ordered). Some items have details; others do not.
 * Clear affordances:
 *  - Only expandable rows get a button + right-side chip + chevron + hover
 *  - Title stays on the left; chip sits just to the left of the chevron
 */
export default function CollectionList({
  title,
  items = [], // { title: ReactNode, content?: ReactNode, meta?: string }
  startAt = 1,
  autoNumber = false,
  numberStyle = 'decimal', // 'decimal' | 'upper-alpha' | 'lower-alpha' | 'upper-roman' | 'lower-roman'
  defaultOpen = 'none', // 'none' | 'first' | 'all' | number[] (indices)
  showExpandAll = false,

  // Styles (override as needed)
  boxExpandableClass = 'bg-ifm-primary-darker border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5 hover:bg-ifm-primary hover:ring-1 hover:ring-white/30 transition',
  boxStaticClass = 'bg-ifm-primary-darker border border-border-color rounded-lg shadow-sm px-3 py-2.5 opacity-95',
  badgeClass = 'bg-ifm-primary border border-border-color rounded-full shadow text-caption font-usace text-font-color-inverse',
  fontClass = 'font-usace text-normal text-font-color-inverse',
  panelClass = 'rounded-lg border-t text-font-color-inverse border-border-color bg-background-color mt-4 px-3 py-2.5',
  chipDetailsClass = 'ml-2 text-xs rounded-full px-2 py-0.5 bg-white/20 text-font-color-inverse',
  headerButtonClass = 'flex w-full items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md',
  gapClass = '!mb-0',
  className = '',
}) {
  const cid = useId();

  const withFlags = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        _expandable: hasContent(it?.content),
      })),
    [items],
  );

  const initial = useMemo(() => {
    const expandable = withFlags
      .map((it, idx) => (it._expandable ? idx : null))
      .filter((x) => x !== null);
    if (defaultOpen === 'all') return expandable;
    if (defaultOpen === 'first') return expandable.length ? [expandable[0]] : [];
    if (Array.isArray(defaultOpen)) return defaultOpen.filter((i) => expandable.includes(i));
    return [];
  }, [withFlags, defaultOpen]);

  const [open, setOpen] = useState(initial);
  const toggle = (idx) =>
    setOpen((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  const expandableIdxs = withFlags
    .map((it, i) => (it._expandable ? i : null))
    .filter((x) => x !== null);
  const allOpen = expandableIdxs.length > 0 && expandableIdxs.every((i) => open.includes(i));

  const handleExpandAll = () => setOpen(expandableIdxs);
  const handleCollapseAll = () => setOpen([]);

  if (!withFlags.length) return null;

  return (
    <section className={`not-prose w-full ${className}`} aria-label={title || 'Collection list'}>
      <div className="mb-3 flex items-center justify-between">
        {title && <h3 className="font-usace text-[20px] font-bold text-font-color">{title}</h3>}
        {showExpandAll && expandableIdxs.length > 1 && (
          <div className="flex items-center gap-2">
            {!allOpen ? (
              <button
                type="button"
                className="bg-background-color rounded border border-border-color px-2.5 py-1.5 text-sm text-font-color hover:bg-white/60"
                onClick={handleExpandAll}
              >
                Expand all
              </button>
            ) : (
              <button
                type="button"
                className="bg-background-color rounded border border-border-color px-2.5 py-1.5 text-sm text-font-color hover:bg-white/60"
                onClick={handleCollapseAll}
              >
                Collapse all
              </button>
            )}
          </div>
        )}
      </div>

      <ol className="m-0 ml-0 list-none !pl-0" style={{ listStyleType: 'none' }} role="list">
        {withFlags.map((it, i) => {
          const isOpen = open.includes(i);
          const headerId = `${cid}-hdr-${i}`;
          const panelId = `${cid}-pnl-${i}`;
          const ordinal = autoNumber ? formatOrdinal(i + startAt, numberStyle) : null;
          const hasDetails = it._expandable;

          // Left side (title + optional number badge)
          const Left = (
            <div className="flex min-w-0 items-center gap-3">
              {autoNumber && ordinal && <Badge className={badgeClass} label={ordinal} />}
              <span className={`${fontClass} min-w-0 truncate`}>{it.title ?? `Item ${i + 1}`}</span>
            </div>
          );

          // Right side (chip next to chevron for expandable items)
          const RightExpandable = (
            <div className="flex items-center gap-2">
              <span className={chipDetailsClass} aria-hidden="true">
                View more
              </span>
              <Chevron isOpen={isOpen} />
            </div>
          );

          return (
            <li key={i} className={`relative ${gapClass} list-none`}>
              <div className={hasDetails ? boxExpandableClass : boxStaticClass}>
                {hasDetails ? (
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className={headerButtonClass}
                  >
                    {Left}
                    {RightExpandable}
                  </button>
                ) : (
                  <div
                    id={headerId}
                    aria-disabled
                    className="flex w-full items-center justify-between"
                  >
                    {Left}
                  </div>
                )}

                {hasDetails && (
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
                      <div className="!not-prose !text-font-color-inverse">{it.content}</div>
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

/* UI bits */
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
      className={`ml-1 h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} text-font-color-inverse`}
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

/* helpers */
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
  for (const [v, s] of r)
    while (n >= v) {
      res += s;
      n -= v;
    }
  return res;
}
