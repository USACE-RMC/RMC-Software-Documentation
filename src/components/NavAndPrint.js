import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import PrintToPDFButton from "./PrintToPDFButton";
import Link from "@docusaurus/Link";
import "../css/custom.css";
import "../css/nav-and-print.css";

const NavAndPrint = ({ link, linkTitle, print, reportName, pdfFilename }) => {
  const isNoLink = String(link).toLowerCase() === "none";
  const isNoPrint = String(print).toLowerCase() === "false";

  if (isNoLink) {
    return (
      <div className="nav-and-print-container">
        <div className="print-to-pdf-container">
          <PrintToPDFButton reportName={reportName} pdfFilename={pdfFilename} />
        </div>
      </div>
    );
  } else if (isNoPrint) {
    return (
      <div className="nav-and-print-container">
        <div className="nav-link">
          <Link to={`${useBaseUrl(link)}`}>&larr; {linkTitle}</Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="nav-and-print-container">
        <div className="nav-link">
          <Link to={`${useBaseUrl(link)}`}>&larr; {linkTitle}</Link>
        </div>
        <div className="print-to-pdf-container">
          <PrintToPDFButton reportName={reportName} pdfFilename={pdfFilename} />
        </div>
      </div>
    );
  }
};

export default NavAndPrint;
