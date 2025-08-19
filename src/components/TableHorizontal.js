import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/tables.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableHorizontal = ({ tableKey, headers, rows, alt, caption }) => {
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

  return (
    <div className="table-container">
      <div className="table-cap">
        Table {tableInfo.tableNumber}: {caption}
      </div>
      <table alt={alt} className={`table-base horizontal-table table-zebra ${widthClass} ${tableKey}`}>
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <th dangerouslySetInnerHTML={renderHTML(header)} />
              {rows[index].map((cell, cellIndex) => (
                <td key={cellIndex} dangerouslySetInnerHTML={renderHTML(cell)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHorizontal;
