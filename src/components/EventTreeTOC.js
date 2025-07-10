import React from "react";
import Link from "@docusaurus/Link";
import tocData from "@site/src/data/eventTreeToc.json";

const EventTreeTOC = ({ version }) => {
  const versionTOC = tocData[version];
  if (!versionTOC) return <p>No Table of Contents available for version {version}</p>;

  return (
    <div>
      {Object.entries(versionTOC).map(([category, links]) => (
        <details key={category} open>
          <summary style={{ fontSize: "1.25rem", fontWeight: 600 }}>{category.replace(/-/g, " ").toUpperCase()}</summary>
          <ul style={{ marginLeft: "1rem" }}>
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
