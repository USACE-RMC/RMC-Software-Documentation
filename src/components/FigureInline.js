import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import "../css/custom.css";

// Small image set in a line of text, such as a toolbar icon.
// `alt` names what the icon means ("Save button"). Leave it out only when the surrounding text already
// says what the icon is; the image is then marked decorative (alt="") so screen readers skip it.
const FigureInline = ({ src, alt = "" }) => {
  const imgSrc = useBaseUrl(src);

  return <img src={imgSrc} alt={alt} className="inline-block !h-[1em] !w-auto align-middle" />;
};

export default FigureInline;
