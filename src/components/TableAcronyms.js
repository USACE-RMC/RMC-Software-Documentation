import React from "react";
import "../css/custom.css";
import "../css/tables.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableAcronyms = ({ headers, columns }) => {
  const rowCount = columns.length > 0 ? columns[0].length : 0;

  return (
    <div className="table-container">
      <table
        className="table-base table-zebra"
        style={{
          ["--table-width"]: "fit-content",
          ["--table-display"]: "block",
          maxWidth: "100%",
        }}
      >
        <colgroup>
          <col style={{ width: "20ch" }} />
          <col style={{ width: "45ch" }} />
        </colgroup>

        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="table-header" style={{ textAlign: "center" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="table-body-cell table-cell-nowrap" style={{ textAlign: "center" }}>
                  {col[rowIndex] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAcronyms;
