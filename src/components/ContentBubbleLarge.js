import ThemedImage from '@theme/ThemedImage';
import ContentCard from './ContentCard';

const ContentBubbleLarge = ({
  icon,
  iconLight,
  iconDark,
  doc_location,
  doc_name,
  contentCardData = [],
  active,
}) => {
  const baseClasses = `
    flex flex-col h-[550px] items-center p-[25px] gap-[20px] rounded-[8px]
    bg-[#F9F9F9] shadow-[0px_4px_8px_rgba(0,0,0,0.3)]
    hover:bg-[#d4d4d4] hover:shadow-[0px_4px_8px_rgba(0,0,0,0.6)]
    dark:bg-[#464545] dark:hover:bg-[#797979]
    no-underline hover:no-underline
    lg:basis-[calc((100%-40px)/3)]
    lg:max-w-[calc((100%-40px)/3)]
    lg:min-w-[150px]
    md:basis-[calc((100%-40px)/3)]
    md:max-w-[calc((100%-40px)/3)]
    md:min-w-[250px]
    sm:basis-full 
    sm:max-w-full
    sm:min-w-[250px]
  `;

  const inactiveClasses = `
    bg-[#d4d4d4] 
    dark:bg-[#313030]
    pointer-events-none opacity-50 cursor-not-allowed
  `;

  // Build themed sources with graceful fallback to the old `icon`
  const sources =
    iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  const Image = () =>
    sources ? (
      <ThemedImage alt={doc_name} sources={sources} className="h-full w-auto" />
    ) : (
      // Shouldn't hit this if icon/iconLight provided, but safe fallback:
      <div className="h-full w-auto" aria-hidden />
    );

  const Shell = ({ children, className }) =>
    active ? (
      <a href={doc_location} className={className}>
        {children}
      </a>
    ) : (
      <div className={`${className} ${inactiveClasses}`}>{children}</div>
    );

  return (
    <Shell className={baseClasses}>
      <div className="flex h-[40%] justify-center">
        <Image />
      </div>
      <div className="text-font-color">
        <p className="mb-0 mt-5 text-center font-usace leading-[1.2] no-underline sm:text-xlarge md:text-xlarge lg:text-3xl">
          {doc_name}
        </p>
      </div>
      <div className="mx-auto mb-0 mt-[10px] flex h-[200px] w-fit flex-col items-start">
        {contentCardData.map((data, index) => (
          <ContentCard
            key={index}
            // Support ThemedImage for child rows too (see next step)
            icon={data.icon}
            iconLight={data.iconLight}
            iconDark={data.iconDark}
            title={data.title}
          />
        ))}
      </div>
      {!active && (
        <div className="text-center font-usace text-xlarge leading-none text-ifm-primary no-underline sm:text-normal md:text-normal">
          <p>Coming soon!</p>
        </div>
      )}
    </Shell>
  );
};

export default ContentBubbleLarge;
