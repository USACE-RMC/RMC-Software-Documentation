import ThemedImage from '@theme/ThemedImage';
import '../css/custom.css';

const ContentBubble = ({ icon, iconLight, iconDark, IconComponent, doc_location, doc_name, active, preserveIconColor = false }) => {
  const iconFilter = preserveIconColor ? '' : 'brightness-0 invert';
  const baseClasses = `
    flex min-h-[90px] xl:min-h-[130px] items-center overflow-hidden rounded-xl
    no-underline hover:no-underline
    transition-all duration-300
    2xl:basis-[calc((100%-40px)/3)]
    2xl:max-w-[calc((100%-40px)/3)]
    2xl:min-w-[150px]
    lg:basis-[calc((100%-20px)/2)]
    lg:max-w-[calc((100%-20px)/2)]
    basis-full max-w-full
  `;

  const activeClasses = `
    active-gradient-card
    hover:scale-[1.02]
    cursor-pointer
  `;

  const inactiveClasses = `
    coming-soon-gradient-card
    pointer-events-none cursor-not-allowed
  `;

  // Build <ThemedImage /> sources, with fallback to legacy `icon`
  const sources =
    iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  const Inner = ({ comingSoon = false }) => (
    <div className="flex items-center gap-[16px] px-[16px] py-[10px] xl:gap-[20px] xl:px-[20px] xl:py-[14px]">
      {IconComponent ? (
        <div className="frosted-glass-circle flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px]">
          <IconComponent className="h-[28px] w-[28px] xl:h-[40px] xl:w-[40px]" color="white" showBackground={false} />
        </div>
      ) : sources ? (
        <div className="frosted-glass-circle flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full xl:h-[60px] xl:w-[60px]">
          <ThemedImage alt={doc_name} sources={sources} className={`h-[28px] w-[28px] object-contain xl:h-[40px] xl:w-[40px] ${iconFilter}`} />
        </div>
      ) : null}
      <div>
        <p className="mb-0 font-usace text-[1rem] leading-[1.2] no-underline text-white xl:text-[1.15rem]">
          {doc_name}
        </p>
        {comingSoon && (
          <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-0.5 font-usace text-[0.7rem] leading-none text-white/70">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );

  return active ? (
    <a href={doc_location} className={`${baseClasses} ${activeClasses}`}>
      <Inner />
    </a>
  ) : (
    <div className={`${baseClasses} ${inactiveClasses}`}>
      <Inner comingSoon />
    </div>
  );
};

export default ContentBubble;
