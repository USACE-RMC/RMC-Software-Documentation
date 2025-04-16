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
    reportSubjectTerms,
    responsiblePersonName,
    responsiblePersonNumber,
  } = metadata;

  const renderHTML = (content) => {
    return { __html: content };
  };

  const headers = [
    "Report Date",
    "Type",
    "Title",
    "Subtitle",
    "Author(s)",
    "Abstract",
    "Subject Terms",
    "Responsible Person",
  ];

  const values = [
    reportDate,
    reportType,
    reportTitle,
    reportSubTitle,
    Array.isArray(reportAuthors) ? reportAuthors.join("; ") : reportAuthors,
    reportAbstract,
    Array.isArray(reportSubjectTerms)
      ? reportSubjectTerms.join(", ")
      : reportSubjectTerms,
    `${responsiblePersonName || ""}${
      responsiblePersonNumber ? ` | ${responsiblePersonNumber}` : ""
    }`,
  ];

  return (
    <div className="table-container-metadata">
      <table className="static-table-metadata">
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <th dangerouslySetInnerHTML={renderHTML(header)} />
              <td dangerouslySetInnerHTML={renderHTML(values[index] || "")} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentMetadata;
