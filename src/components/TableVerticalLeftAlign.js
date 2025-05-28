import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-vertical-left-align.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableVerticalLeftAlign = ({ tableKey, headers = [], columns = [], fullWidth = true, alt, caption }) => {
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

  const rowCount = columns.length > 0 ? columns[0].length : 0;
  const colCount = columns.length;

  const tableClass = fullWidth ? "static-table-vertical-full-left" : "static-table-vertical-partial-left";

  // Track which body cells should be skipped (due to spans)
  const skipBodyCells = new Set();

  return (
    <div className="table-container">
      <div className="table-caption">
        Table {tableInfo.tableNumber}: {caption}
      </div>
      <table alt={alt} className={tableClass}>
        <thead>
          {headers.map((headerRow, rowIndex) => {
            const rowCells = [];
            let colCursor = 0;

            for (let cellIndex = 0; cellIndex < headerRow.length; cellIndex++) {
              const cell = headerRow[cellIndex];
              if (!cell) continue;

              const { value, colSpan = 1, rowSpan = 1 } = cell;

              // Skip columns covered by previous colSpan
              while (rowCells.some((_, i) => i === colCursor)) {
                colCursor++;
              }

              rowCells.push(
                <th key={`header-${rowIndex}-${colCursor}`} colSpan={colSpan} rowSpan={rowSpan}>
                  {value}
                </th>
              );

              colCursor += colSpan;
            }

            return <tr key={`header-row-${rowIndex}`}>{rowCells}</tr>;
          })}
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellKey = `${colIndex}-${rowIndex}`;
                if (skipBodyCells.has(cellKey)) return null;

                const cell = col[rowIndex];

                if (typeof cell === "object" && cell !== null && "value" in cell) {
                  const { value, rowSpan = 1, colSpan = 1 } = cell;

                  // Mark spanned cells to be skipped
                  for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                      if (r === 0 && c === 0) continue;
                      skipBodyCells.add(`${colIndex + c}-${rowIndex + r}`);
                    }
                  }

                  return (
                    <td key={cellKey} rowSpan={rowSpan > 1 ? rowSpan : undefined} colSpan={colSpan > 1 ? colSpan : undefined}>
                      {value}
                    </td>
                  );
                }

                return <td key={cellKey}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVerticalLeftAlign;
