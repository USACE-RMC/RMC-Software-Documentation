import React from "react";
import "../css/custom.css";
import "../css/table-version-history.css";

const TableVersionHistory = ({
  versions = [],
  dates = [],
  descriptions = [],
  modifiedBy = [],
  reviewedBy = [],
  approvedBy = [],
}) => {
  const rowCount = Math.max(
    versions.length,
    dates.length,
    descriptions.length,
    modifiedBy.length,
    reviewedBy.length,
    approvedBy.length
  );

  return (
    <div className="table-container-version-history">
      <table className="static-table-version-history">
        <thead>
          <tr>
            <th>Version</th>
            <th>Date</th>
            <th>Description</th>
            <th>Modified By</th>
            <th>Reviewed By</th>
            <th>Approved By</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>{versions[rowIndex] || ""}</td>
              <td>{dates[rowIndex] || ""}</td>
              <td>{descriptions[rowIndex] || ""}</td>
              <td title={modifiedBy[rowIndex] || ""}>
                {modifiedBy[rowIndex] || ""}
              </td>
              <td title={reviewedBy[rowIndex] || ""}>
                {reviewedBy[rowIndex] || ""}
              </td>
              <td title={approvedBy[rowIndex]}>
                {approvedBy[rowIndex] || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVersionHistory;
