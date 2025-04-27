import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router"; // Track current document
import { useReportId } from "../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId
import useBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";
import "../css/citation.css";

// Store citations per document (not globally)
const usedCitations = new Map();

const Citation = ({ citationKey }) => {
  const [citationNumber, setCitationNumber] = useState("?");
  const location = useLocation(); // Get the current .mdx file's pathname
  // Extract the current path from the URL
  const pathname = location.pathname;

  const reportPath = pathname
    .replace(
      /^\/RMC-Software-Documentation\/docs\//,
      "/RMC-Software-Documentation/bibliographies/"
    ) // Step 1: remove full prefix
    .replace(/\/[^/]*$/, ""); // Step 2: remove the last segment ('/overview')

  // Construct the path to the bibliography JSON file
  const bibFilePath = `${reportPath}/bib.json`;
  console.log("bibFilePath:", bibFilePath);

  useEffect(() => {
    const fetchBibData = async () => {
      try {
        const response = await fetch(bibFilePath);
        const data = await response.json();

        const sortedCitations = data.sort((a, b) => {
          const getSortableAuthor = (entry) => {
            if (Array.isArray(entry.author) && entry.author.length > 0)
              return entry.author[0];
            if (typeof entry.author === "string") return entry.author;
            return ""; // fallback if no author
          };

          const authorA = getSortableAuthor(a).toLowerCase();
          const authorB = getSortableAuthor(b).toLowerCase();
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
      <a href={`#footnote-${citationKey}`} style={{ textDecoration: "none" }}>
        [{citationNumber}]
      </a>
    </span>
  );
};

// Updated function to retrieve citations only for the current document
export const getUsedCitations = (docId) =>
  Array.from(usedCitations.get(docId)?.values() || []);

export default Citation;
