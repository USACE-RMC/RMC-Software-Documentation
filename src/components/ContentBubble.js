import React from "react";
import "../css/content-bubble.css";

const ContentBubble = ({ icon, doc_location, doc_name, active }) => {
  return active ? (
    <a href={doc_location} className="content-bubble">
      <div className="icon">
        <img src={icon} />
      </div>
      <div className="doc-name">
        <p>{doc_name}</p>
      </div>
    </a>
  ) : (
    <div className="content-bubble inactive">
      <div className="icon">
        <img src={icon} />
      </div>
      <div className="doc-name">
        <p>{doc_name}</p>
        <p className="coming-soon">Coming soon!</p>
      </div>
    </div>
  );
};

export default ContentBubble;
