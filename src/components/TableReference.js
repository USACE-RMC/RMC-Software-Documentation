import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import { useReportId } from "../contexts/ReportIdContext";

const TableReference = ({ tableKey }) => {
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
  }, [tableKey]);

  if (!tableInfo) return <span>Loading...</span>;

  return <span className="font-usace text-normal">Table {tableInfo.tableNumber}</span>;
};

export default TableReference;
