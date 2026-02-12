import ThemedImage from '@theme/ThemedImage';
import '../css/custom.css';

const ContentBubble = ({ icon, iconLight, iconDark, doc_location, doc_name, active }) => {
  const baseClasses = `
    flex min-h-[70px] xl:min-h-[105px] items-center overflow-hidden rounded-[8px]
    bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.1)]
    dark:bg-[#3a3a3a]
    no-underline hover:no-underline
    transition-all duration-200
    2xl:basis-[calc((100%-40px)/3)]
    2xl:max-w-[calc((100%-40px)/3)]
    2xl:min-w-[150px]
    lg:basis-[calc((100%-20px)/2)]
    lg:max-w-[calc((100%-20px)/2)]
    basis-full max-w-full
  `;

  const activeClasses = `
    hover:shadow-[0px_4px_12px_rgba(0,0,0,0.18)]
    hover:scale-[1.02]
    dark:hover:bg-[#444]
    cursor-pointer
  `;

  const inactiveClasses = `
    pointer-events-none opacity-40 cursor-not-allowed
  `;

  // Build <ThemedImage /> sources, with fallback to legacy `icon`
  const sources =
    iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  const accentBar = active
    ? 'w-[4px] self-stretch shrink-0 bg-ifm-primary'
    : 'w-[4px] self-stretch shrink-0 bg-[#ccc] dark:bg-[#555]';

  const Inner = ({ comingSoon = false }) => (
    <>
      <div className={accentBar} />
      <div className="flex items-center gap-[12px] px-[12px] py-[6px] xl:gap-[16px] xl:px-[15px] xl:py-[10px]">
        {sources ? (
          <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#f0f2f4] xl:h-[50px] xl:w-[50px] dark:bg-[#4a4a4a]">
            <ThemedImage alt={doc_name} sources={sources} className="h-[24px] w-[24px] object-contain xl:h-[34px] xl:w-[34px]" />
          </div>
        ) : null}
        <div className="text-font-color">
          <p className="mb-0 font-usace leading-[1.2] no-underline lg:text-normal xl:text-content-bubble">
            {doc_name}
          </p>
          {comingSoon && (
            <p className="mb-0 mt-1 font-usace text-[0.7rem] leading-none text-ifm-primary">
              Coming soon!
            </p>
          )}
        </div>
      </div>
    </>
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
