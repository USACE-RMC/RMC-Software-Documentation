import React, { useEffect, useState } from "react";
import addBaseUrl from "@docusaurus/useBaseUrl";

const Figure = ({ parentDocId, figKey, src, alt, caption }) => {
  const [figInfo, setFigInfo] = useState(null);
  console.log("Attempting to fetch figure");

  useEffect(() => {
    const loadCounters = async () => {
      try {
        // Construct the path to fetch the JSON data using the parentDocId
        const jsonPath = addBaseUrl(
          `/counters/${parentDocId.replace(/\//g, "-")}.json`
        ); // Ensure parentDocId is correct
        console.log("Fetching JSON from:", jsonPath);

        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);

        const data = await response.json();

        // Now, find the figure using the figKey in the JSON data
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
  }, [parentDocId, figKey]); // Depend on both parentDocId and figKey

  if (!figInfo) return <span>Loading...</span>;

  return (
    <figure className="figure-container">
      <img src={addBaseUrl(src)} alt={alt} className="figure-image" />
      <figcaption className="figure-caption">
        Figure {figInfo.figNumber}: {caption}
      </figcaption>
    </figure>
  );
};

export default Figure;
