import React from "react";
import { useLocation } from "@docusaurus/router";
import "../css/custom.css";
import NavLink from "./NavLink";
import useLatestVersions from "../theme/Layout/useLatestVersions";
import VersionNotice from "./VersionNotice";

const NavContainer = ({ link, linkTitle, document }) => {
  const location = useLocation();
  const latestVersions = useLatestVersions();
  const pathname = location?.pathname || "";
  const match = pathname.match(/\/docs\/(.+?)\/(v\d+\.\d+)\//);
  const documentPath = match ? match[1] : "";
  const currentVersion = match ? match[2] : "";
  const latestVersion = documentPath ? latestVersions[documentPath] : "";
  const showVersionNotice =
    documentPath && currentVersion && latestVersion && currentVersion !== latestVersion;
  const latestPath = showVersionNotice
    ? pathname.replace(/\/v\d+\.\d+\//, `/${latestVersion}/`)
    : "";
  const fallbackPath = showVersionNotice
    ? `/docs/${documentPath}/${latestVersion}/preface`
    : "";
  const documentLabel = documentPath
    ? documentPath
        .split("/")
        .slice(-1)[0]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
    : "";

  return (
    <>
      <div className="flex justify-between items-center p-[10px]">
        <div className="flex-1">
          <NavLink link={link} linkTitle={linkTitle} />
        </div>
      </div>
      {showVersionNotice && (
        <div className="sticky top-[90px] z-[10] bg-background-theme">
          <VersionNotice
            documentLabel={documentLabel}
            currentVersion={currentVersion}
            latestVersion={latestVersion}
            latestPath={latestPath}
            fallbackPath={fallbackPath}
          />
        </div>
      )}
    </>
  );
};

export default NavContainer;
