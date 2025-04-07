import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/print-to-PDF-button.css";

const PrintToPDFButton = ({ reportName, pdfFilename }) => {
  // Construct the URL to the PDF based on the reportName and filename
  const pdfUrl = useBaseUrl(`pdfs/${reportName}/${pdfFilename}`);

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfUrl; // Set the URL of the PDF
    link.download = pdfFilename; // Set the filename for the download
    link.click(); // Trigger the download

    console.log("Downloading PDF from:", pdfUrl);
  };

  return (
    <button className="download-pdf-button" onClick={downloadPDF}>
      ↓ PDF
    </button>
  );
};

export default PrintToPDFButton;
