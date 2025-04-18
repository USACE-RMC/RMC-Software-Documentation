import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-vertical.css";

const TableVertical = ({
  parentDocId,
  tableKey,
  headerConfig,
  headers,
  columns,
  alt,
  caption,
}) => {
  const [tableInfo, setTableInfo] = useState(null);
  const jsonPath = useBaseUrl(
    `counters/${parentDocId.replace(/\//g, "-")}.json`
  );

  useEffect(() => {
    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();
        let foundTable = null;
        Object.keys(data).forEach((docId) => {
          if (data[docId]?.tables?.[tableKey]) {
            foundTable = data[docId].tables[tableKey];
          }
        });

        if (foundTable) {
          setTableInfo(foundTable);
        } else {
          console.warn(`Table key "${tableKey}" not found`);
        }
      } catch (error) {
        console.error("Error loading counters:", error);
      }
    };

    loadCounters();
  }, [parentDocId, tableKey]);

  if (!tableInfo) return <span>Loading...</span>;

  const rowCount = columns.length > 0 ? columns[0].length : 0;

  return (
    <div className="table-container">
      <table alt={alt} className="static-table-vertical">
        <caption className="table-caption">
          Table {tableInfo.tableNumber}: {caption}
        </caption>
        <thead>
          <tr>
            {(headerConfig || headers).map((header, index) =>
              headerConfig ? (
                <th key={index} colSpan={header.colSpan || 1}>
                  {header.label}
                </th>
              ) : (
                <th key={index}>{header}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                // Find the cell value
                const cell = col[rowIndex];

                // Check if a previous cell in this column has a rowSpan that covers this row
                const isCoveredByRowSpan = col.some(
                  (prevCell, prevRowIndex) => {
                    if (
                      prevRowIndex < rowIndex &&
                      typeof prevCell === "object" &&
                      prevCell?.rowSpan
                    ) {
                      const spanStart = prevRowIndex;
                      const spanEnd = prevRowIndex + prevCell.rowSpan;
                      return rowIndex < spanEnd;
                    }
                    return false;
                  }
                );

                // Check if this column is covered by colSpan from a previous column at the same row
                const isCoveredByColSpan = columns
                  .slice(0, colIndex)
                  .some((prevCol) => {
                    const prevCell = prevCol[rowIndex];
                    if (typeof prevCell === "object" && prevCell?.colSpan) {
                      const startIndex = columns.indexOf(prevCol);
                      const spanEnd = startIndex + prevCell.colSpan;
                      return colIndex < spanEnd;
                    }
                    return false;
                  });

                if (isCoveredByRowSpan || isCoveredByColSpan) return null;

                // Render object cell
                if (typeof cell === "object" && cell !== null) {
                  return (
                    <td
                      key={`${colIndex}-${rowIndex}`}
                      rowSpan={cell.rowSpan || undefined}
                      colSpan={cell.colSpan || undefined}
                    >
                      {cell.value}
                    </td>
                  );
                }

                // Render regular string/number cell
                return <td key={`${colIndex}-${rowIndex}`}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVertical;
