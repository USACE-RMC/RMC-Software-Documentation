import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
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
      <table
        alt={alt}
        className="
        flex flex-auto flex-col w-full border-collapse mt-[10px]
        [&_th]:font-usace [&_td]:font-usace
        [&_th]:text-table [&_td]:text-table
        [&_th]:box-border [&_td]:box-border
        [&_th]:border [&_td]:border
        [&_th]:border-[#ddd] &[&_td]:border-[#ddd]
        dark:[&_th]:border-[#2c3032] dark:[&_td]:border-[#2c3032]
        [&_th]:text-center [&_td]:text-center
        [&_th]:w-auto [&_td]:w-auto
        [&_th]:min-w-[150px] [&_td]:min-w-[100px]
        [&_th]:py-[5px] [&_td]:py-[5px]
        [&_th]:px-[10px] [&_td]:px-[10px]
        [&_th]:bg-ifm-primary-lighter dark:[&_th]:bg-ifm-primary-darkest
        [&_th]:text-font-color-inverse [&_td]:text-font-color
        [&_td]:whitespace-nowrap
        [&>tbody>tr:nth-child(2n)]:bg-[#f5f5f5] dark:[&>tbody>tr:nth-child(2n)]:bg-[#121212]
        "
      >
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
