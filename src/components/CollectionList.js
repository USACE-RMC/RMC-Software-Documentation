import { useId, useMemo, useState } from 'react';

/**
 * CollectionList
 * Grouped items (not necessarily ordered). Expandable when `child` exists.
 *
 * Unified item API:
 * - string | number  -> { title: string }
 * - { title: ReactNode, child?: ReactNode | Array<ReactNode | string | { title: ReactNode, child?: ... }> }
 *
 * Aliases for back-compat: { content, details, children } normalize into `child`.
 */
export default function CollectionList({
  title,
  items = [],
  startAt = 1,
  autoNumber = false,
  numberStyle = 'decimal',
  defaultOpen = 'none', // 'none' | 'first' | 'all' | number[] (indices)
  showExpandAll = false,

  /* ── STACK styles (your originals; unchanged) ─────────────────────────────────── */
  boxExpandableClass = 'bg-ifm-primary-darker border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5 hover:bg-ifm-primary hover:ring-1 hover:ring-white/30 transition',
  boxStaticClass = 'bg-ifm-primary-darker border border-border-color rounded-lg shadow-sm px-3 py-2.5 opacity-95',
  badgeClass = 'bg-ifm-primary border border-border-color rounded-full shadow text-caption font-usace text-font-color-inverse',
  fontClass = 'font-usace text-normal text-font-color-inverse',
  panelClass = 'rounded-lg border-t text-font-color-inverse border-border-color bg-background-color mt-4 px-3 py-2.5',
  chipDetailsClass = 'ml-2 text-xs rounded-full px-2 py-0.5 bg-white/20 text-font-color-inverse',
  headerButtonClass = 'flex w-full items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md',
  gapClass = '!mb-0',
  className = '',

  /* ── GRID variant controls (left intact) ───────────────────────────────── */
  layout = 'stack',
  columns = { base: 1, sm: 2, md: 4, xl: 4 },

  gridWrapperClass = 'grid gap-3 w-full',
  gridColsOverrideClass = '',
  gridTileExpandableClass = 'bg-ifm-primary-darker border border-ifm-primary rounded-lg shadow-sm px-3 py-2.5 hover:bg-ifm-primary hover:ring-1 hover:ring-white/30 transition',
  gridTileStaticClass = 'bg-ifm-primary-darker border border-border-color rounded-lg shadow-sm px-3 py-2.5 opacity-95',

  gridHeaderButtonClass = 'grid w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md grid-cols-[1fr_auto_1fr] items-center',
  gridHeaderDisabledClass = 'grid w-full grid-cols-[1fr_auto_1fr] items-center',

  gridCenterTitleWrapClass = 'flex min-w-0 flex-1 items-center justify-center px-1 text-center',
  gridTitleInnerClass = 'flex items-center justify-center gap-3',
  gridFontClass = 'font-usace text-normal text-font-color-inverse whitespace-normal break-words',

  gridRightControlsClass = 'flex items-center gap-2 justify-self-end self-center',
  gridChipDetailsClass = 'ml-2 text-xs rounded-full px-2 py-0.5 bg-white/20 text-font-color-inverse',
  gridChevronClass = 'text-font-color-inverse',

  gridTileMinHClass = 'min-h-[75px]',
}) {
  const cid = useId();

  // Normalize primitives -> { title, childPanel?, childList? }
  const normalized = useMemo(() => normalizeItems(items), [items]);

  const withFlags = useMemo(
    () =>
      normalized.map((it) => ({
        ...it,
        _expandable:
          Boolean(it.childPanel) || (Array.isArray(it.childList) && it.childList.length > 0),
      })),
    [normalized],
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

      {layout === 'grid' ? (
        /* ───────────────────────── GRID LAYOUT ───────────────────────── */
        <div
          className={`${gridWrapperClass} ${gridColsOverrideClass || gridColsClass(columns)}`}
          role="list"
        >
          {withFlags.map((it, i) => {
            const isOpen = open.includes(i);
            const headerId = `${cid}-hdr-${i}`;
            const panelId = `${cid}-pnl-${i}`;
            const ordinal = autoNumber ? formatOrdinal(i + startAt, numberStyle) : null;
            const hasDetails = it._expandable;

            const CenterTitle = (
              <div className={`${gridCenterTitleWrapClass} ${gridTileMinHClass}`}>
                <div className={gridTitleInnerClass}>
                  {autoNumber && ordinal && <Badge className={badgeClass} label={ordinal} />}
                  <span className={gridFontClass}>{it.title ?? `Item ${i + 1}`}</span>
                </div>
              </div>
            );

            const RightControls = hasDetails ? (
              <div className={gridRightControlsClass}>
                <span className={gridChipDetailsClass} aria-hidden="true">
                  {isOpen ? 'Hide' : 'View more'}
                </span>
                <Chevron isOpen={isOpen} className={gridChevronClass} />
              </div>
            ) : (
              <span aria-hidden="true" />
            );

            return (
              <div key={i} className="list-none" role="listitem">
                <div
                  className={`min-w-0 ${hasDetails ? gridTileExpandableClass : gridTileStaticClass}`}
                >
                  {hasDetails ? (
                    <button
                      id={headerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(i)}
                      className={`min-w-0 ${gridHeaderButtonClass}`}
                    >
                      {/* left ghost cell to keep title truly centered */}
                      <span aria-hidden="true" />
                      {CenterTitle}
                      {RightControls}
                    </button>
                  ) : (
                    <div
                      id={headerId}
                      aria-disabled
                      className={`min-w-0 ${gridHeaderDisabledClass}`}
                    >
                      <span aria-hidden="true" />
                      {CenterTitle}
                      <span aria-hidden="true" />
                    </div>
                  )}

                  {hasDetails && (
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
                        <div className="!not-prose !text-font-color-inverse">{renderChild(it)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ───────────────────────── STACK LAYOUT ───────────────────────── */
        <ol className="m-0 ml-0 list-none !pl-0" style={{ listStyleType: 'none' }} role="list">
          {withFlags.map((it, i) => {
            const isOpen = open.includes(i);
            const headerId = `${cid}-hdr-${i}`;
            const panelId = `${cid}-pnl-${i}`;
            const ordinal = autoNumber ? formatOrdinal(i + startAt, numberStyle) : null;
            const hasDetails = it._expandable;

            const Left = (
              <div className="flex min-w-0 flex-1 items-start gap-3">
                {autoNumber && ordinal && <Badge className={badgeClass} label={ordinal} />}
                <span className={`${fontClass} min-w-0 whitespace-normal break-words`}>
                  {it.title ?? `Item ${i + 1}`}
                </span>
              </div>
            );

            const RightExpandable = (
              <div className="flex items-center gap-2 self-start">
                <span className={chipDetailsClass} aria-hidden="true">
                  {isOpen ? 'Hide' : 'View more'}
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
                      className={`${headerButtonClass} items-start`}
                    >
                      {Left}
                      {RightExpandable}
                    </button>
                  ) : (
                    <div
                      id={headerId}
                      aria-disabled
                      className="flex w-full items-start justify-between"
                    >
                      {Left}
                    </div>
                  )}

                  {hasDetails && (
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
                        <div className="!not-prose !text-font-color-inverse">{renderChild(it)}</div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
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
function Chevron({ isOpen, className = 'text-font-color-inverse' }) {
  return (
    <svg
      className={`ml-1 h-5 w-5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'} ${className}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11l3.71-3.71a.75.75 0 1 1 1.06 1.04l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* helpers */
function renderChild(node) {
  if (Array.isArray(node.childList) && node.childList.length) {
    return (
      <ul className="ml-4 list-disc">
        {node.childList.map((c, idx) => (
          <li key={idx}>{c.title}</li>
        ))}
      </ul>
    );
  }
  return node.childPanel ?? null;
}
function normalizeItems(items) {
  return (items || []).map(normalizeNode);
}
function normalizeNode(it) {
  if (typeof it === 'string' || typeof it === 'number') {
    return { title: String(it) };
  }
  const title = it?.title ?? '';
  const rawChild = it?.child ?? it?.content ?? it?.details ?? it?.children;
  if (Array.isArray(rawChild)) {
    return { title, childList: rawChild.map(normalizeNode) };
  } else if (rawChild !== undefined && rawChild !== null) {
    return { title, childPanel: rawChild };
  }
  return { title };
}
function hasContent(c) {
  // kept for legacy but now unused in normalization flow
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
  for (const [v, s] of r)
    while (n >= v) {
      res += s;
      n -= v;
    }
  return res;
}

/* Tailwind-safe grid column classes (unchanged) */
const COLS = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  },
  xl: {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
  },
};
function gridColsClass(cols) {
  if (typeof cols === 'number') return COLS.base[clampCols(cols)] || COLS.base[2];
  const order = ['base', 'sm', 'md', 'lg', 'xl'];
  return order
    .map((bp) => {
      const n = cols?.[bp];
      return n ? COLS[bp] && COLS[bp][clampCols(n)] : null;
    })
    .filter(Boolean)
    .join(' ');
}
function clampCols(n) {
  const x = Math.max(1, Math.min(6, Number(n) || 1));
  return x;
}
