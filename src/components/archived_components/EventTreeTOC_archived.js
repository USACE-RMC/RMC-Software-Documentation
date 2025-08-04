import React from "react";
import Link from "@docusaurus/Link";
import tocData from "@site/src/data/eventTreeToc.json";
import { useLocation } from "@docusaurus/router";
import "../css/event-tree-toc.css";

const EventTreeTOC = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/(v\d+\.\d+)\//);
  const version = match ? match[1] : null;

  const versionTOC = version ? tocData[version] : null;
  if (!versionTOC) return <p>No Table of Contents available for version {version}</p>;

  return (
    <div>
      {Object.entries(versionTOC).map(([category, links]) => (
        <details key={category}>
          <summary className="event-tree-toc-summary">{category.replace(/-/g, " ")}</summary>
          <ul className="event-tree-toc-list">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
};

export default EventTreeTOC;
