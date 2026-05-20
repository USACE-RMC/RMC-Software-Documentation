import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import "../css/custom.css";

const FigureInline = ({ src }) => {
  const imgSrc = useBaseUrl(src);

  return <img src={imgSrc} className="inline-block !h-[1em] !w-auto align-middle" />;
};

export default FigureInline;
