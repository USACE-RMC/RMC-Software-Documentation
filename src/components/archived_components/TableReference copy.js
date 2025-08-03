import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/table-reference.css";
import { useReportId } from "../../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId

const TableReference = ({ tableKey }) => {
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

        // Now we need to find the figure with the matching figKey
        let foundTable = null;
        if (data?.tables?.[tableKey]) {
          foundTable = data.tables[tableKey];
        }

        if (foundTable) {
          setTableInfo(foundTable);
        } else {
          console.warn(`Figure key "${tableKey}" not found in ${jsonPath}`);
        }
      } catch (error) {
        console.error("Error loading counters:", error);
      }
    };

    loadCounters();
  }, [tableKey]); // Re-fetch if tableKey changes

  if (!tableInfo) return <span>Loading...</span>;

  return <span className="table-reference">Table {tableInfo.tableNumber}</span>;
};

export default TableReference;
