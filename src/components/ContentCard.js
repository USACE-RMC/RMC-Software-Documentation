import ThemedImage from '@theme/ThemedImage';

const ContentCard = ({ icon, iconLight, iconDark, title }) => {
  const sources =
    iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  return (
    <div className="mx-auto my-0 mb-[10px] flex h-10 w-full items-center justify-start">
      {sources ? (
        <ThemedImage
          alt="icon"
          sources={sources}
          className="h-max-[40px] mr-2 w-[55px] object-contain p-[3px]"
        />
      ) : null}
      <p className="m-0 text-left font-usace text-font-color md:text-[clamp(0.6rem,2.5vw,1rem)] lg:text-[clamp(1rem,5vw,1.2rem)]">
        {title}
      </p>
    </div>
  );
};

export default ContentCard;
