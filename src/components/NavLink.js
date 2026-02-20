import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import "../css/custom.css";

const NavLink = ({ link, linkTitle }) => {
  return (
    <div className="flex mb-[var(--ifm-leading)]">
      <div className="font-usace text-normal cursor-pointer text-ifm-link">
        <Link to={`${useBaseUrl(link)}`} className="navlink-back">&larr; {linkTitle}</Link>
      </div>
    </div>
  );
};

export default NavLink;
