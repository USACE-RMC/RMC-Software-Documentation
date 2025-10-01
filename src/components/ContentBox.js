import ContentBubble from './ContentBubble';

const ContentBox = ({ contentData }) => {
  return (
    <div className="mx-auto mb-[50px] mt-[25px] w-[70%]">
      <div className="mb-[25px] flex flex-wrap justify-center gap-5">
        {/* Dynamically render ContentBubble components */}
        {contentData.map((data, index) => (
          <ContentBubble
            key={index}
            icon={data.icon}
            iconLight={data.iconLight}
            iconDark={data.iconDark}
            doc_location={data.doc_location}
            doc_name={data.doc_name}
            active={data.active}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentBox;
