import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/tables.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableVertical = ({
  tableKey,
  headers = [],
  columns = [],
  alt,
  caption,
  colWidths,
  colAlign,
  widthMode = "full",
}) => {
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

  const colCount = columns.length ?? 0;
  const rowCount = columns.length > 0 ? columns[0].length : 0;

  // Build CSS variables for widths and alignment from props (if provided)
  const styleVars = {};
  if (Array.isArray(colWidths)) {
    for (let i = 0; i < Math.min(colWidths.length, colCount); i++) {
      const v = colWidths[i];
      styleVars[`--c${i + 1}`] = typeof v === "number" ? `${v}ch` : v;
    }
  }
  if (Array.isArray(colAlign)) {
    for (let i = 0; i < Math.min(colAlign.length, colCount); i++) {
      styleVars[`--a${i + 1}`] = colAlign[i];
    }
  }
  if (widthMode === "intrinsic") {
    styleVars["--table-width"] = "max-content";
    styleVars["--table-display"] = "inline-table";
  }

  // For header alignment with colSpan: use the alignment of the first covered column
  const headerCellAlign = (startColIndex /* 0-based */) =>
    `var(--a${startColIndex + 1}, left)`;

  const skipBodyCells = new Set();

  return (
    <div className="table-container">
      <div className="table-cap">
        Table {tableInfo.tableNumber}: {caption}
      </div>

      <table
        aria-label={alt}
        className={`table-base table-zebra`}
        style={styleVars}
      >
        {/* Widths via CSS vars (one <col> per data column) */}
        <colgroup>
          {Array.from({ length: colCount }).map((_, i) => (
            <col key={i} style={{ width: `var(--c${i + 1}, auto)` }} />
          ))}
        </colgroup>

        <thead>
          {headers.map((headerRow, rowIndex) => {
            let cursor = 0; // 0-based column index tracker across this header row
            return (
              <tr key={`header-row-${rowIndex}`}>
                {headerRow.map((cell, colIndex) => {
                  if (!cell) return null;
                  const { value, colSpan = 1, rowSpan = 1 } = cell;
                  const style = { textAlign: headerCellAlign(cursor) };
                  const th = (
                    <th
                      key={`header-${rowIndex}-${colIndex}`}
                      colSpan={colSpan > 1 ? colSpan : undefined}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      className="table-header"
                      style={style}
                    >
                      {value}
                    </th>
                  );
                  cursor += colSpan; // advance by the span
                  return th;
                })}
              </tr>
            );
          })}
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellKey = `${colIndex}-${rowIndex}`;
                if (skipBodyCells.has(cellKey)) return null;

                const raw = col[rowIndex];
                if (raw && typeof raw === "object" && "value" in raw) {
                  const { value, rowSpan = 1, colSpan = 1 } = raw;

                  // register covered cells to skip (rowSpan/colSpan)
                  for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                      if (r !== 0 || c !== 0) {
                        skipBodyCells.add(`${colIndex + c}-${rowIndex + r}`);
                      }
                    }
                  }

                  return (
                    <td
                      key={cellKey}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      colSpan={colSpan > 1 ? colSpan : undefined}
                      className="table-body-cell"
                      style={{ textAlign: `var(--a${colIndex + 1}, left)` }}
                    >
                      {value}
                    </td>
                  );
                }

                return (
                  <td
                    key={cellKey}
                    className="table-body-cell"
                    style={{ textAlign: `var(--a${colIndex + 1}, left)` }}
                    dangerouslySetInnerHTML={
                      typeof raw === "string" ? renderHTML(raw) : undefined
                    }
                  >
                    {typeof raw === "string" ? undefined : raw}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVertical;
