import React, { useEffect, useState } from "react";
import addBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";

const TableHorizontal = ({
  parentDocId,
  tableKey,
  headers,
  rows,
  alt,
  caption,
}) => {
  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        // Construct the path to fetch the JSON data using the parentDocId
        const jsonPath = addBaseUrl(
          `/counters/${parentDocId.replace(/\//g, "-")}.json`
        ); // Ensure parentDocId is correct

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
      <tablecaption className="table-caption">
        Table {tableInfo.tableNumber}: {caption}
      </tablecaption>
      <table alt={alt} className="static-table-horizontal">
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
