import React from "react";
import "../css/content-box.css";
import ContentBubble from "./ContentBubble";

const ContentBox = ({ title, contentData }) => {
  return (
    <div className="content-container">
      <div className="content-title">{title}</div>
      <div className="bubble-container">
        {/* Dynamically render ContentBubble components */}
        {contentData.map((data, index) => (
          <ContentBubble
            key={index}
            icon={data.icon}
            doc_location={data.doc_location}
            doc_name={data.doc_name}
            active={data.active}
          />
        ))}
      </div>
      <div className="bottom-border"></div>
    </div>
  );
};

export default ContentBox;
