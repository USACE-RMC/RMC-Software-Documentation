import React from "react";
import PrintToPDFButton from "./PrintToPDFButton";
import Link from "@docusaurus/Link";
import "../css/custom.css";

const NavAndPrint = ({ link, linkTitle, reportName, pdfFilename }) => {
  if (link === "none") {
    return (
      <div className="nav-and-print-container">
        <div className="print-to-pdf-container">
          <PrintToPDFButton reportName={reportName} pdfFilename={pdfFilename} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-and-print-container">
        <div className="nav-link">
          <Link to={`/${link}`}>&larr; {linkTitle}</Link>
        </div>
        <div className="print-to-pdf-container">
          <PrintToPDFButton reportName={reportName} pdfFilename={pdfFilename} />
        </div>
      </div>
    );
  }
};

export default NavAndPrint;
