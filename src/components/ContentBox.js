import React from "react";
import ContentBubble from "./ContentBubble";

const ContentBox = ({ contentData }) => {
  return (
    <div className="w-[70%] mt-[25px] mb[50px] mx-auto">
      <div className="flex flex-wrap gap-5 mb-[25px]">
        {/* Dynamically render ContentBubble components */}
        {contentData.map((data, index) => (
          <ContentBubble key={index} icon={data.icon} doc_location={data.doc_location} doc_name={data.doc_name} active={data.active} />
        ))}
      </div>
    </div>
  );
};

export default ContentBox;
