import ThemedImage from '@theme/ThemedImage';
import '../css/custom.css';

const ContentBubble = ({ icon, iconLight, iconDark, doc_location, doc_name, active }) => {
  const baseClasses = `
    flex h-[105px] items-center px-[15px] py-[10px] gap-[20px] rounded-[8px]
    bg-[#F9F9F9] shadow-[0px_4px_8px_rgba(0,0,0,0.3)]
    hover:bg-[#d4d4d4] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.6)]
    dark:bg-[#464545] dark:hover:bg-[#797979]
    no-underline hover:no-underline
    lg:basis-[calc((100%-40px)/3)]
    lg:max-w-[calc((100%-40px)/3)]
    lg:min-w-[150px]
    md:basis-[calc((100%-20px)/2)]
    md:max-w-[calc((100%-20px)/2)]
    sm:basis-full sm:max-w-full
  `;

  const inactiveClasses = `
    bg-[#d4d4d4] 
    dark:bg-[#313030]
    pointer-events-none opacity-50 cursor-not-allowed
  `;

  // Build <ThemedImage /> sources, with fallback to legacy `icon`
  const sources =
    iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  const Icon = () =>
    sources ? <ThemedImage alt={doc_name} sources={sources} className="h-auto w-[50px]" /> : null;

  const Inner = ({ comingSoon = false }) => (
    <>
      <div className="mt-0 shrink-0">
        <Icon />
      </div>
      <div className="text-font-color">
        <p className="mb-0 font-usace leading-[1.2] no-underline md:text-normal lg:text-content-bubble">
          {doc_name}
        </p>
        {comingSoon && (
          <>
            <p className="mb-[10px] font-usace leading-[1.2] no-underline md:text-normal lg:text-content-bubble" />
            <p className="font-usace leading-none no-underline md:text-normal lg:text-content-bubble">
              Coming soon!
            </p>
          </>
        )}
      </div>
    </>
  );

  return active ? (
    <a href={doc_location} className={baseClasses}>
      <Inner />
    </a>
  ) : (
    <div className={`${baseClasses} ${inactiveClasses}`}>
      <Inner comingSoon />
    </div>
  );
};

export default ContentBubble;
