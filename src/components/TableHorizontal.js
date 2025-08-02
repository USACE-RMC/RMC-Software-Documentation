import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-horizontal.css";
import { useReportId } from "../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId

const TableHorizontal = ({ tableKey, headers, rows, alt, caption }) => {
  const [tableInfo, setTableInfo] = useState(null);
  const reportId = useReportId(); // Get the reportId from the context

  useEffect(() => {
    if (!reportId) return; // If reportId is not available, don't fetch

    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`; // Use reportId to determine the path

    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now, find the table using the tableKey in the JSON data
        let foundTable = null;
        if (data?.tables?.[tableKey]) {
          foundTable = data.tables[tableKey];
        }

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

  const renderHTML = (content) => {
    return { __html: content };
  };

  return (
    <div className="w-full overflow-x-auto ml-0 mr-auto my-4 pt-[15px] pb-[10px] justify-items-start border-t border-b border-border-color">
      <div className="max-w-full font-usace text-caption italic text-[gray] text-left">
        Table {tableInfo.tableNumber}: {caption}
      </div>
      <table alt={alt} className="static-table-horizontal">
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
