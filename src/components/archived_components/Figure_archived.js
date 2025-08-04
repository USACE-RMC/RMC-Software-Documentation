import React, { useEffect, useState } from "react";
import "../css/custom.css";
import "../css/figure.css";
import { useReportId } from "../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId

const Figure = ({ figKey, src, alt, caption, width = "80%" }) => {
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

        // Now, find the figure using the figKey in the JSON data
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
  }, [reportId, figKey]);

  if (!figInfo) return <span>Loading...</span>;

  return (
    <figure className="figure-container">
      <img
        src={`/RMC-Software-Documentation/${src}`}
        alt={alt}
        className="figure-image"
        style={{ maxWidth: width }}
      />
      <figcaption className="figure-caption">
        Figure {figInfo.figNumber}: {caption}
      </figcaption>
    </figure>
  );
};

export default Figure;
