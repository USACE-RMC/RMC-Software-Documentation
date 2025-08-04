import React from "react";
import "../css/content-box.css";
import ContentBubbleLarge from "../ContentBubbleLarge";

const ContentBoxLarge = ({ contentData }) => {
  return (
    <div className="content-container-large">
      <div className="bubble-container-large">
        {contentData.map((data, index) => (
          <ContentBubbleLarge key={index} icon={data.icon} doc_location={data.doc_location} doc_name={data.doc_name} contentCardData={data.contentCardData} active={data.active} />
        ))}
      </div>
      <div className="bottom-border"></div>
    </div>
  );
};

export default ContentBoxLarge;
