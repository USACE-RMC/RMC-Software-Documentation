import React from "react";
import "../css/custom.css";
import "../css/nav-container.css";
import NavLink from "./NavLink";
import VersionSelector from "./VersionSelector";

const NavContainer = ({ link, linkTitle, document }) => {
  return (
    <div className="nav-container">
      <div className="nav-link-container">
        <NavLink link={link} linkTitle={linkTitle} />
      </div>
      <div className="version-container">
        <VersionSelector document={document} />
      </div>
    </div>
  );
};

export default NavContainer;
