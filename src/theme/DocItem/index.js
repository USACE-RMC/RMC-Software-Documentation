import React from "react";
import DocItem from "@theme-original/DocItem";
import { useLocation } from "@docusaurus/router";
import "../../css/draft-watermark.css";
import { draftDocs } from "../../draftDocs";

function isDraftDoc(pathname) {
  // Remove site base URL and /docs/ prefix
  const docPath = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, "") // Remove base URL and /docs/
    .replace(/^docs\//, ""); // Fallback if base URL is not present
  return draftDocs.some((base) => docPath.startsWith(base));
}

export default function DocItemWrapper(props) {
  const location = useLocation();
  const showWatermark = isDraftDoc(location.pathname);

  return (
    <>
      {showWatermark && <div className="draft-watermark">DRAFT</div>}
      <DocItem {...props} />
    </>
  );
}
