import React from "react";
import DocItem from "@theme-original/DocItem";
import { useLocation } from "@docusaurus/router";
import { draftDocs } from "../../draftDocs";
import latestVersions from "@site/static/versions/latestVersions.json";

function getDocInfo(pathname) {
  const stripped = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, "")
    .replace(/^\/docs\//, "")
    .replace(/^docs\//, "");
  const match = stripped.match(/^(.+?)\/(v\d+\.\d+(?:\.\d+)?)(?:\/|$)/);
  if (!match) return null;
  return { docBasePath: match[1], version: match[2] };
}

function isDraftDoc(pathname) {
  const info = getDocInfo(pathname);
  if (!info) return false;
  const isFlagged = draftDocs.some(
    (base) => info.docBasePath === base || info.docBasePath.startsWith(base + "/")
  );
  if (!isFlagged) return false;
  const latest = latestVersions[info.docBasePath];
  if (!latest) return true;
  return info.version === latest;
}

export default function DocItemWrapper(props) {
  const location = useLocation();
  const showWatermark = isDraftDoc(location.pathname);
  return (
    <>
      {showWatermark && (
        <div className="pointer-events-none fixed left-1/2 top-[40%] z-[9999] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] select-none text-[10rem] font-bold uppercase text-[rgba(200,0,0,0.15)]">
          DRAFT
        </div>
      )}
      <DocItem {...props} />
    </>
  );
}
