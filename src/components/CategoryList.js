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
  columns = { base: 1, md: 2, xl: 3, '2xl': 4 },
  className = '',

  // Shared tokens (aligned to your CSS variables)
  titleClass = 'text-font-color font-usace font-medium',
  descClass = 'mt-1 text-sm text-font-color',
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
      <section className={`not-prose bg-background-color divide-y divide-border-color rounded-xl border border-border-color ${className}`}>
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
        <AccentTile key={i} item={it} />
      ))}
    </section>
  );
}

/* ---------- Variant: Accent Tiles (gradient card style, matches home page) ---------- */
function AccentTile({ item }) {
  const { title, description, href, onClick, icon, badge } = item || {};
  const isLink = !!href;
  const isButton = !href && typeof onClick === 'function';
  const isInteractive = isLink || isButton;

  const Wrapper = isLink ? 'a' : isButton ? 'button' : 'div';
  const wrapperProps = {
    className:
      'group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-5 text-center no-underline ' +
      'transition-all duration-300 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ' +
      (isInteractive ? 'hover:scale-[1.03] active-gradient-card' : 'coming-soon-gradient-card opacity-80'),
    ...(isLink ? { href } : {}),
    ...(isButton ? { type: 'button', onClick } : {}),
  };

  return (
    <Wrapper {...wrapperProps}>
      {/* Icon in frosted circle (optional) */}
      {icon && (
        <div className="frosted-glass-circle mb-3 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full text-white">{icon}</div>
      )}

      {/* Title */}
      <p className="mb-0 font-usace text-[1rem] font-bold leading-[1.2] text-white">{title}</p>

      {/* Description */}
      {description && <p className="mb-0 mt-1 font-usace text-[0.8rem] leading-[1.3] text-white/80">{description}</p>}

      {/* Badge */}
      {badge && <span className="mt-2 rounded-full bg-white/20 px-3 py-0.5 text-[0.7rem] leading-none text-white/70">{badge}</span>}

      {/* Explore CTA */}
      {isInteractive && (
        <p className="mb-0 mt-2.5 font-usace text-[0.8rem] text-white/70 transition-all duration-300 group-hover:text-white/90">
          Explore <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </p>
      )}
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
      <span aria-hidden="true" className="bg-ifm-primary/80 mt-1 inline-block h-2.5 w-2.5 rounded-full group-hover:bg-ifm-primary" />
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
