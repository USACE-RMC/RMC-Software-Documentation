import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import "../css/custom.css";
import "../css/nav-and-print.css";

const NavLink = ({ link, linkTitle }) => {
  return (
    <div className="nav-and-print-container">
      <div className="nav-link">
        <Link to={`${useBaseUrl(link)}`}>&larr; {linkTitle}</Link>
      </div>
    </div>
  );
};

export default NavLink;
