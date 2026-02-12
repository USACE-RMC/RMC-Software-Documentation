import ContentBubbleLarge from './ContentBubbleLarge';

const ContentBoxLarge = ({ contentData }) => {
  return (
    <div className="mx-auto flex w-[94%] max-w-[1600px] flex-col gap-10 py-8 lg:py-10">
      {contentData.map((data, index) => (
        <ContentBubbleLarge
          key={index}
          icon={data.icon}
          iconLight={data.iconLight}
          iconDark={data.iconDark}
          doc_name={data.doc_name}
          contentCardData={data.contentCardData}
        />
      ))}
    </div>
  );
};

export default ContentBoxLarge;
