import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-acronyms.css";

const TableAcronyms = ({ parentDocId, tableKey, headers, columns }) => {
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
