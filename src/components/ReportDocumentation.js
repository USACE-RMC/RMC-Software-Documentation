import React from "react";
import "../css/report-documentation.css";

const ReportDocumentation = ({
  reportDate,
  reportType,
  reportTitle,
  reportSubTitle,
  reportAuthors,
  reviewedBy,
  approvedBy,
  reportAbstract,
  reportSubjectTerms,
  responsiblePersonName,
  responsiblePersonNumber,
}) => {
  return (
    <div className="report-doc-container">
      <div className="report-section">
        <span className="report-label">Report Title:</span>
        <p>{reportTitle}</p>
      </div>

      {reportSubTitle && (
        <div className="report-section">
          <span className="report-label">Report Subtitle:</span>
          <p>{reportSubTitle}</p>
        </div>
      )}

      <div className="report-section">
        <span className="report-label">Report Type:</span>
        <p>{reportType}</p>
      </div>

      <div className="report-section">
        <span className="report-label">Report Date:</span>
        <p>{reportDate}</p>
      </div>

      <div className="report-section">
        <span className="report-label">Authors:</span>
        <p>{reportAuthors.join(", ")}</p>
      </div>

      {reviewedBy && (
        <div className="report-section">
          <span className="report-label">Reviewed By:</span>
          <p>{reviewedBy}</p>
        </div>
      )}

      {approvedBy && (
        <div className="report-section">
          <span className="report-label">Approved By:</span>
          <p>{approvedBy}</p>
        </div>
      )}

      <div className="report-section">
        <span className="report-label">Abstract:</span>
        <p className="report-abstract">{reportAbstract}</p>
      </div>

      <div className="report-section">
        <span className="report-label">Subject Terms:</span>
        <p>{reportSubjectTerms}</p>
      </div>

      <div className="report-section">
        <span className="report-label">Responsible Person:</span>
        <p>
          {responsiblePersonName} &nbsp; | &nbsp; {responsiblePersonNumber}
        </p>
      </div>
    </div>
  );
};

export default ReportDocumentation;
