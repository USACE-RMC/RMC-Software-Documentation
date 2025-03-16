import React, { useEffect, useState } from "react";

const TableReference = ({ parentDocId, tableKey }) => {
  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const loadCounters = async () => {
      try {
        // Assuming the tableKey will help determine the correct JSON file path
        const jsonPath = `/counters/${parentDocId.replace(/\//g, "-")}.json`;
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now we need to find the figure with the matching figKey
        let foundTable = null;
        Object.keys(data).forEach((docId) => {
          if (data[docId]?.tables?.[tableKey]) {
            foundTable = data[docId].tables[tableKey];
          }
        });

        if (foundTable) {
          setTableInfo(foundTable);
        } else {
          console.warn(`Figure key "${tableKey}" not found`);
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
