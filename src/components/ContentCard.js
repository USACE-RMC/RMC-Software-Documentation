import ThemedImage from '@theme/ThemedImage';

const ContentCard = ({ icon, iconLight, iconDark, title, description, href, active = true, preserveIconColor = false }) => {
  const sources = iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;
  const iconFilter = preserveIconColor ? '' : 'brightness-0 invert';

  if (active) {
    return (
      <a
        href={href}
        className="group relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-6 text-center no-underline transition-all duration-300 hover:scale-[1.03] hover:no-underline active-gradient-card"
      >
        {/* Icon in frosted circle */}
        {sources ? (
          <div className="frosted-glass-circle mb-3 flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full">
            <ThemedImage alt={title} sources={sources} className={`h-[48px] w-[48px] object-contain ${iconFilter}`} />
          </div>
        ) : null}

        {/* Title */}
        <p className="mb-0 font-usace text-[1.1rem] font-bold leading-[1.2] text-white">{title}</p>

        {/* Description */}
        {description && <p className="mb-0 mt-1 font-usace text-[0.85rem] leading-[1.3] text-white/70">{description}</p>}

        {/* Explore CTA */}
        <p className="mb-0 mt-3 font-usace text-[0.8rem] text-white/50 transition-all duration-300 group-hover:text-white/80">
          Explore <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </p>
      </a>
    );
  }

  return (
    <div className="relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl px-5 py-6 text-center opacity-80 coming-soon-gradient-card">
      {/* Icon in frosted circle */}
      {sources ? (
        <div className="frosted-glass-circle mb-3 flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-full">
          <ThemedImage alt={title} sources={sources} className={`h-[48px] w-[48px] object-contain ${iconFilter}`} />
        </div>
      ) : null}

      {/* Title */}
      <p className="mb-0 font-usace text-[0.95rem] font-semibold leading-[1.2] text-white/90">{title}</p>

      {/* Coming Soon badge */}
      <p className="mb-0 mt-2 rounded-full bg-white/20 px-3 py-0.5 font-usace text-[0.7rem] leading-none text-white/70">
        Coming Soon
      </p>
    </div>
  );
};

export default ContentCard;
