import React, { useEffect, useState } from "react";

const FigReference = ({ parentDocId, figKey }) => {
  const [figInfo, setFigInfo] = useState(null);
  // Assuming the figKey will help determine the correct JSON file path
  const jsonPath = `/RMC-Software-Documentation/counters/${parentDocId.replace(
    /\//g,
    "-"
  )}.json`;

  useEffect(() => {
    const loadCounters = async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now we need to find the figure with the matching figKey
        let foundFig = null;
        Object.keys(data).forEach((docId) => {
          if (data[docId]?.figures?.[figKey]) {
            foundFig = data[docId].figures[figKey];
          }
        });

        if (foundFig) {
          setFigInfo(foundFig);
        } else {
          console.warn(`Figure key "${figKey}" not found`);
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
