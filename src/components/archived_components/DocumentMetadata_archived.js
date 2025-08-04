import React from "react";
import "../css/custom.css";
import "../css/document-metadata.css";

const DocumentMetadata = ({ metadata }) => {
  if (!metadata) return null;

  const {
    reportDate,
    reportType,
    reportTitle,
    reportSubTitle,
    reportAuthors,
    reportAbstract,
    reportAcknowledgments,
    reportSubjectTerms,
    responsiblePersonName,
    responsiblePersonNumber,
    citationGuide,
  } = metadata;

  const renderHTML = (content) => {
    return { __html: content };
  };

  // Create array of [header, value] pairs
  const metadataItems = [
    ["Report Date", reportDate],
    ["Type", reportType],
    ["Title", reportTitle],
    ["Subtitle", reportSubTitle],
    ["Author(s)", Array.isArray(reportAuthors) ? reportAuthors.join("; ") : reportAuthors],
    ["Abstract", reportAbstract],
    ["Acknowledgements", reportAcknowledgments],
    ["Subject Terms", Array.isArray(reportSubjectTerms) ? reportSubjectTerms.join(", ") : reportSubjectTerms],
    ["Responsible Person", `${responsiblePersonName || ""}${responsiblePersonNumber ? ` | ${responsiblePersonNumber}` : ""}`.trim()],
    ["How to Cite This Document", citationGuide],
  ];

  // Filter out empty or undefined values
  const filteredItems = metadataItems.filter(([_, value]) => value && value.trim() !== "");

  return (
    <div className="table-container-metadata">
      <table className="static-table-metadata">
        <tbody>
          {filteredItems.map(([header, value], index) => (
            <tr key={index}>
              <th dangerouslySetInnerHTML={renderHTML(header)} />
              <td dangerouslySetInnerHTML={renderHTML(value)} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentMetadata;
