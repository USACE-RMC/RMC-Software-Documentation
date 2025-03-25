import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router"; // Track current document
import useBaseUrl from "@docusaurus/useBaseUrl";

// Store citations per document (not globally)
const usedCitations = new Map();

const Citation = ({ citationKey, bibFile }) => {
  const [citationNumber, setCitationNumber] = useState("?");
  const location = useLocation(); // Get the current .mdx file's pathname
  const bibFilePath = useBaseUrl(bibFile);

  useEffect(() => {
    const fetchBibData = async () => {
      try {
        const response = await fetch(bibFilePath);
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
  }, [citationKey, bibFilePath, location.pathname]); // Re-run if location changes

  return (
    <span className="citation-reference">
      <a href={`#footnote-${citationKey}`} style={{ textDecorartion: "none" }}>
        [{citationNumber}]
      </a>
    </span>
  );
};

// Updated function to retrieve citations only for the current document
export const getUsedCitations = (docId) =>
  Array.from(usedCitations.get(docId)?.values() || []);

export default Citation;
