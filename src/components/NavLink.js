import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";
import "../css/custom.css";

const NavLink = ({ link, linkTitle }) => {
  return (
    <div className="flex mb-[var(--ifm-leading)]">
      <div className="font-usace text-normal cursor-pointer text-ifm-link">
        <Link to={`${useBaseUrl(link)}`} className="navlink-back">
          <svg className="navlink-back__chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 0 1 0 1.414L9.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
          </svg>
          {linkTitle}
        </Link>
      </div>
    </div>
  );
};

export default NavLink;
