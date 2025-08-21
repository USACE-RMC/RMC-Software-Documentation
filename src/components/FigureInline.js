import React from "react";
import "../css/custom.css";

const FigureInline = ({ src }) => {
  const imgSrc = `/RMC-Software-Documentation/${src}`;

  return <img src={imgSrc} className="inline-block h-[1em] w-auto align-middle" />;
};

export default FigureInline;
