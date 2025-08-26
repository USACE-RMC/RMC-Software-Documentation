import ContentBubbleLarge from './ContentBubbleLarge';

const ContentBoxLarge = ({ contentData }) => {
  return (
    <div className="mx-auto mb-[30px] mt-[25px] w-[65%] md:w-[85%]">
      <div className="mb-5 flex flex-wrap gap-5">
        {contentData.map((data, index) => (
          <ContentBubbleLarge
            key={index}
            icon={data.icon}
            iconLight={data.iconLight}
            iconDark={data.iconDark}
            doc_location={data.doc_location}
            doc_name={data.doc_name}
            contentCardData={data.contentCardData}
            active={data.active}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentBoxLarge;
