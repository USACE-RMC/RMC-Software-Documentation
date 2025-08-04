import React from "react";
import ContentCard from "../ContentCard";
import "../css/content-bubble.css";

const ContentBubbleLarge = ({ icon, doc_location, doc_name, contentCardData = [], active }) => {
  return active ? (
    <a href={doc_location} className="content-bubble-large">
      <div className="icon-large">
        <img src={icon} />
      </div>
      <div className="doc-name-large">
        <p>{doc_name}</p>
      </div>
      <div className="items-list">
        {contentCardData.map((data, index) => (
          <ContentCard key={index} icon={data.icon} title={data.title} />
        ))}
      </div>
    </a>
  ) : (
    <div className="content-bubble-large inactive">
      <div className="icon-large">
        <img src={icon} alt="icon" />
      </div>
      <div className="doc-name-large">
        <p>{doc_name}</p>
      </div>
      <div className="items-list">
        {contentCardData.map((data, index) => (
          <ContentCard key={index} icon={data.icon} title={data.title} />
        ))}
      </div>
      <div className="coming-soon-large">
        <p>Coming soon!</p>
      </div>
    </div>
  );
};

export default ContentBubbleLarge;
