import React, { useEffect, useState } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const Figure = ({ parentDocId, figKey, src, alt, caption }) => {
  const [figInfo, setFigInfo] = useState(null);
  // Construct the path to fetch the JSON data using the parentDocId

  const jsonPath = useBaseUrl(
    `counters/${parentDocId.replace(/\//g, "-")}.json`
  );
  const imgSrc = useBaseUrl(src);

  console.log("Resolved JSON Path:", jsonPath);
  console.log("Resolved Image Source:", imgSrc);

  useEffect(() => {
    try {
      console.log("Attempting to fetch:", jsonPath);
      const loadCounters = async () => {
        try {
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
    } catch (error) {
      console.error("Critical error in useEffect:", error);
    }
  }, [parentDocId, figKey]); // Depend on both parentDocId and figKey

  if (!figInfo) return <span>Loading...</span>;

  return (
    <figure className="figure-container">
      <img src={imgSrc} alt={alt} className="figure-image" />
      <figcaption className="figure-caption">
        Figure {figInfo.figNumber}: {caption}
      </figcaption>
    </figure>
  );
};

export default Figure;
