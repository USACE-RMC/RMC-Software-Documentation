import React from "react";
import "../css/custom.css";
import "../css/tables.css";

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

  const COL_WIDTHS = ["22ch", "auto"];
  const ALIGN = ["center", "left"];

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

  const filteredItems = metadataItems.filter(([_, value]) => value && value.trim() !== "");

  return (
    <div className="table-container">
      <table className="table-base table-zebra" aria-label="Document metadata">
        <colgroup>
          <col style={{ width: COL_WIDTHS[0] }} />
          <col style={{ width: COL_WIDTHS[1] }} />
        </colgroup>

        <tbody>
          {filteredItems.map(([header, value], i) => (
            <tr key={i}>
              <th
                className="table-header"
                style={{
                  textAlign: ALIGN[0],
                  minWidth: 0,
                }}
                dangerouslySetInnerHTML={renderHTML(header)}
              />
              <td
                className="table-body-cell"
                style={{
                  textAlign: ALIGN[1],
                  minWidth: 0,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  hyphens: "auto",
                }}
                dangerouslySetInnerHTML={renderHTML(value)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentMetadata;
