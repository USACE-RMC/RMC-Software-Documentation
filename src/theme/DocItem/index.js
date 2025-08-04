import React from "react";
import DocItem from "@theme-original/DocItem";
import { useLocation } from "@docusaurus/router";
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
      {showWatermark && (
        <div className="fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] text-[10rem] text-[rgba(200,0,0,0.15)] z-[9999] pointer-events-none select-none font-bold uppercase">
          DRAFT
        </div>
      )}
      <DocItem {...props} />
    </>
  );
}
