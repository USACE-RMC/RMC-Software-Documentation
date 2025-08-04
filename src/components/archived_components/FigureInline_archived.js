import React from "react";
import "../css/custom.css";
import "../css/figure-inline.css";

const FigureInline = ({ src }) => {
  const imgSrc = `/RMC-Software-Documentation/${src}`;

  return <img src={imgSrc} className="figure-inline" />;
};

export default FigureInline;
