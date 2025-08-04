import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/figure-reference.css";
import { useReportId } from "../../contexts/ReportIdContext";

const FigReference = ({ figKey }) => {
  const [figInfo, setFigInfo] = useState(null);
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
        let foundFig = null;
        if (data?.figures?.[figKey]) {
          foundFig = data.figures[figKey];
        }

        if (foundFig) {
          setFigInfo(foundFig);
        } else {
          console.warn(`Figure key "${figKey}" not found in ${jsonPath}`);
        }
      } catch (error) {
        console.error("Error loading counters:", error);
      }
    };

    loadCounters();
  }, [figKey]); // Re-fetch if figKey changes

  if (!figInfo) return <span>Loading...</span>;

  return <span className="figure-reference">Figure {figInfo.figNumber}</span>;
};

export default FigReference;
