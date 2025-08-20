import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/tables.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableHorizontal = ({ tableKey, headers, rows, alt, caption, colWidths, colAlign, widthMode = "full" }) => {
  const [tableInfo, setTableInfo] = useState(null);
  const reportId = useReportId();

  useEffect(() => {
    if (!reportId) return;

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`;

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await response.json();

        const foundTable = data?.tables?.[tableKey];
        if (foundTable) {
          setTableInfo(foundTable);
        } else {
          console.warn(`Table key "${tableKey}" not found in ${jsonPath}`);
        }
      } catch (error) {
        console.error("Error loading counters:", error);
      }
    };

    loadCounters();
  }, [reportId, tableKey]);

  if (!tableInfo) return <span>Loading...</span>;

  const renderHTML = (content) => ({ __html: content });

  // Column count = 1 header column + N data columns in each row
  const columnCount = 1 + (rows?.[0]?.length ?? 0);

  // Build CSS variables for widths and alignment from props (if provided)
  const styleVars = {};
  if (Array.isArray(colWidths)) {
    for (let i = 0; i < Math.min(colWidths.length, columnCount); i++) {
      const v = colWidths[i];
      // numbers are treated as "ch" for convenience; otherwise use string verbatim
      styleVars[`--c${i + 1}`] = typeof v === "number" ? `${v}ch` : v;
    }
  }
  if (Array.isArray(colAlign)) {
    for (let i = 0; i < Math.min(colAlign.length, columnCount); i++) {
      styleVars[`--a${i + 1}`] = colAlign[i];
    }
  }
  // width mode: full (default) or intrinsic shrink-wrap
  if (widthMode === "intrinsic") {
    styleVars["--table-width"] = "max-content";
    styleVars["--table-display"] = "inline-table";
  }

  return (
    <div className="table-container">
      <div className="table-cap">
        Table {tableInfo.tableNumber}: {caption}
      </div>

      <div className="table-scroller">
        <table aria-label={alt} className={`table-base horizontal-table table-zebra ${tableKey}`} style={styleVars}>
          <colgroup>
            {Array.from({ length: columnCount }).map((_, i) => (
              <col key={i} style={{ width: `var(--c${i + 1}, auto)` }} />
            ))}
          </colgroup>

          <tbody>
            {headers.map((header, index) => (
              <tr key={index}>
                <th className="table-header" style={{ textAlign: "var(--a1, center)" }} dangerouslySetInnerHTML={renderHTML(header)} />
                {rows[index].map((cell, cellIndex) => {
                  const colIndex = cellIndex + 2; // data columns start at 2
                  return <td key={cellIndex} className="table-body-cell whitespace-nowrap" style={{ textAlign: `var(--a${colIndex}, center)` }} dangerouslySetInnerHTML={renderHTML(cell)} />;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHorizontal;
