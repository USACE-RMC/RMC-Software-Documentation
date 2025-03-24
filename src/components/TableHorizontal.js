import React, { useEffect, useState } from "react";
import "../css/custom.css";
import useBaseUrl from "@docusaurus/useBaseUrl";

const TableHorizontal = ({
  parentDocId,
  tableKey,
  headers,
  rows,
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

        // Now, find the table using the tableKey in the JSON data
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

  const renderHTML = (content) => {
    return { __html: content };
  };

  return (
    <div className="table-container">
      <table alt={alt} className="static-table-horizontal">
        <caption className="table-caption">
          Table {tableInfo.tableNumber}: {caption}
        </caption>
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <th dangerouslySetInnerHTML={renderHTML(header)} />
              {rows[index].map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  dangerouslySetInnerHTML={renderHTML(cell)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHorizontal;
