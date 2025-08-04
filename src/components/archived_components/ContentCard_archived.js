import React from "react";
import "../css/content-card.css";

const ContentCard = ({ icon, title }) => {
  return (
    <div className="content-card-container">
      <img src={icon} alt="icon"></img>
      <div className="content-card-title">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default ContentCard;
