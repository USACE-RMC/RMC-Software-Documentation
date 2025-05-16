import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-acronyms.css";
import { useReportId } from "../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId

const TableAcronyms = ({ headers, columns }) => {
  const rowCount = columns.length > 0 ? columns[0].length : 0;

  return (
    <div className="table-container">
      <table className="static-table-vertical-acronyms">
        {/* Table header */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th> // Each header in its own column
            ))}
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {/* Iterate over each column and place data in the correct cells */}
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{col[rowIndex] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAcronyms;
