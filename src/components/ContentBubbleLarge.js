import ThemedImage from '@theme/ThemedImage';
import ContentCard from './ContentCard';

const ContentBubbleLarge = ({ icon, iconLight, iconDark, IconComponent, doc_name, contentCardData = [] }) => {
  const sources = iconLight || icon ? { light: iconLight ?? icon, dark: iconDark ?? iconLight ?? icon } : null;

  return (
    <section>
      {/* Section header */}
      <div className="mb-3 flex items-center gap-4">
        {IconComponent ? (
          <IconComponent className="h-[52px] w-[52px]" />
        ) : sources ? (
          <ThemedImage alt={doc_name} sources={sources} className="h-[52px] w-[52px] object-contain" />
        ) : null}
        <h2 className="m-0 font-usace text-[1.6rem] font-bold text-font-color">{doc_name}</h2>
      </div>

      {/* Divider */}
      <div className="mb-6 h-[2px] w-full bg-border-color" />

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {contentCardData.map((data, idx) => (
          <ContentCard
            key={idx}
            icon={data.icon}
            iconLight={data.iconLight}
            iconDark={data.iconDark}
            IconComponent={data.IconComponent}
            title={data.title}
            description={data.description}
            href={data.href}
            active={data.active}
            preserveIconColor={data.preserveIconColor}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentBubbleLarge;
