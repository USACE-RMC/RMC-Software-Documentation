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

export default TableVertical;
