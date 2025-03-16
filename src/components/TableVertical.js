import React, { useEffect, useState } from "react";
import addBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";

const TableVertical = ({
  parentDocId,
  tableKey,
  headers,
  columns,
  alt,
  caption,
}) => {
  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        const jsonPath = addBaseUrl(
          `/counters/${parentDocId.replace(/\//g, "-")}.json`
        ); // Ensure parentDocId is correct
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
      <tablecaption className="table-caption">
        Table {tableInfo.tableNumber}: {caption}
      </tablecaption>
      <table alt={alt} className="static-table-vertical">
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

export default TableVertical;
