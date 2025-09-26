/**
 * CategoryList
 * Navigation-only component (no expansion).
 *
 * items: Array<{
 *   title: string | React.ReactNode,
 *   description?: string | React.ReactNode,
 *   href?: string,
 *   onClick?: () => void,
 *   icon?: React.ReactNode,
 *   badge?: string,
 * }>
 *
 * Props:
 * - variant: 'accentTiles' | 'pills' | 'menu'
 * - columns: { base?: number, md?: number, xl?: number }  // grid for accentTiles
 */
export default function CategoryList({
  items = [],
  variant = 'accentTiles',
  columns = { base: 1, md: 2, xl: 3 },
  className = '',

  // Shared tokens (aligned to your CSS variables)
  titleClass = 'text-font-color font-usace font-medium',
  descClass = 'mt-1 text-sm text-font-color',
  badgeClass = 'text-xs rounded-full bg-slate-100 text-slate-700 px-2 py-0.5',
}) {
  if (!items.length) return null;

  if (variant === 'pills') {
    return (
      <section className={`not-prose space-y-2 ${className}`}>
        {items.map((it, i) => (
          <NavRowPill key={i} item={it} titleClass={titleClass} />
        ))}
      </section>
    );
  }

  if (variant === 'menu') {
    return (
      <section
        className={`not-prose bg-background-color divide-y divide-border-color rounded-xl border border-border-color ${className}`}
      >
        {items.map((it, i) => (
          <NavRowMenu key={i} item={it} titleClass={titleClass} descClass={descClass} />
        ))}
      </section>
    );
  }

  // accentTiles (default)
  const gridCls = [
    'grid gap-3',
    `grid-cols-${columns.base || 1}`,
    columns.md ? `md:grid-cols-${columns.md}` : '',
    columns.xl ? `xl:grid-cols-${columns.xl}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={`not-prose ${gridCls} ${className}`}>
      {items.map((it, i) => (
        <AccentTile
          key={i}
          item={it}
          titleClass={titleClass}
          descClass={descClass}
          badgeClass={badgeClass}
        />
      ))}
    </section>
  );
}

/* ---------- Variant: Accent Tiles (distinct from CollectionList) ---------- */
function AccentTile({ item, titleClass, descClass, badgeClass }) {
  const { title, description, href, onClick, icon, badge } = item || {};
  const isLink = !!href;
  const isButton = !href && typeof onClick === 'function';

  const Wrapper = isLink ? 'a' : isButton ? 'button' : 'div';
  const wrapperProps = {
    className:
      // left accent + soft gradient + lift on hover
      'group relative overflow-hidden rounded-2xl border border-border-color bg-gradient-to-br ' +
      'from-background-color to-white/60 dark:to-background-color-theme/80 ' +
      'shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
    ...(isLink ? { href } : {}),
    ...(isButton ? { type: 'button', onClick } : {}),
  };

  return (
    <Wrapper {...wrapperProps}>
      {/* Left accent bar */}
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1.5 bg-ifm-primary" />
      <div className="flex items-start gap-3 p-4">
        {/* Icon bubble (optional) */}
        {icon && (
          <div className="bg-ifm-primary/10 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-ifm-primary">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className={titleClass}>{title}</h3>
            {badge && <span className={badgeClass}>{badge}</span>}
          </div>
          {description && <p className={descClass}>{description}</p>}
        </div>
        {(isLink || isButton) && (
          <ArrowRight className="ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-600" />
        )}
      </div>
    </Wrapper>
  );
}

/* ---------- Variant: Pills (rounded, lightweight, horizontal-friendly) ---------- */
function NavRowPill({ item, titleClass }) {
  const { title, href, onClick } = item || {};
  const Wrapper = href ? 'a' : typeof onClick === 'function' ? 'button' : 'div';
  const props = {
    className:
      'flex items-center justify-between gap-3 rounded-full border border-border-color bg-background-color ' +
      'px-4 py-2.5 transition hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
    ...(href ? { href } : {}),
    ...(onClick ? { type: 'button', onClick } : {}),
  };
  return (
    <Wrapper {...props}>
      <span className={`${titleClass} truncate`}>{title}</span>
      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Wrapper>
  );
}

/* ---------- Variant: Menu (compact list-group; zero resemblance to CollectionList) ---------- */
function NavRowMenu({ item, titleClass, descClass }) {
  const { title, description, href, onClick } = item || {};
  const Wrapper = href ? 'a' : typeof onClick === 'function' ? 'button' : 'div';
  const props = {
    className:
      'group flex items-start gap-3 px-4 py-3 hover:bg-white/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition',
    ...(href ? { href } : {}),
    ...(onClick ? { type: 'button', onClick } : {}),
  };
  return (
    <Wrapper {...props}>
      <span
        aria-hidden="true"
        className="bg-ifm-primary/80 mt-1 inline-block h-2.5 w-2.5 rounded-full group-hover:bg-ifm-primary"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className={`${titleClass} truncate`}>{title}</h3>
          <ArrowRight className="ml-3 h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-600" />
        </div>
        {description && <p className={descClass}>{description}</p>}
      </div>
    </Wrapper>
  );
}

/* ---------- Icon ---------- */
function ArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7 4a1 1 0 0 0 0 2h5.586L4.293 14.293a1 1 0 0 0 1.414 1.414L14 7.414V13a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1H7z" />
    </svg>
  );
}
