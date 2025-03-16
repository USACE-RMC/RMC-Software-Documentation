import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router"; // Track current document

// Store citations per document (not globally)
const usedCitations = new Map();

const Citation = ({ citationKey, bibFile }) => {
  const [citationNumber, setCitationNumber] = useState("?");
  const location = useLocation(); // Get the current .mdx file's pathname

  useEffect(() => {
    const fetchBibData = async () => {
      try {
        const response = await fetch(bibFile);
        const data = await response.json();

        const sortedCitations = data.sort((a, b) => {
          const authorA = Array.isArray(a.author) ? a.author[0] : a.author;
          const authorB = Array.isArray(b.author) ? b.author[0] : b.author;
          return authorA.localeCompare(authorB);
        });

        const citationIndex = sortedCitations.findIndex(
          (citation) => citation.citationKey === citationKey
        );

        if (citationIndex !== -1) {
          const number = citationIndex + 1;

          setCitationNumber(number);

          // Ensure citations are stored per document
          if (!usedCitations.has(location.pathname)) {
            usedCitations.set(location.pathname, new Map());
          }
          const docCitations = usedCitations.get(location.pathname);
          docCitations.set(citationKey, {
            ...sortedCitations[citationIndex],
            number,
          });

          // Dispatch event to notify CitationFootnote.js
          window.dispatchEvent(new Event("citationsUpdated"));
        }
      } catch (error) {
        console.error("Error fetching bibliography:", error);
      }
    };

    fetchBibData();
  }, [citationKey, bibFile, location.pathname]); // Re-run if location changes

  return (
    <span className="citation-reference">
      <sup>[{citationNumber}]</sup>
    </span>
  );
};

// Updated function to retrieve citations only for the current document
export const getUsedCitations = (docId) =>
  Array.from(usedCitations.get(docId)?.values() || []);

export default Citation;
