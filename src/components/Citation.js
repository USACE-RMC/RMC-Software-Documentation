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

  useEffect(() => {
    const fetchBibData = async () => {
      try {
        const response = await fetch(bibFilePath);
        const data = await response.json();

        const sortedCitations = data.sort((a, b) => {
          // Helper function to extract the first initial of the first author
          const extractFirstInitial = (author) => {
            const nameParts = author.split(" "); // Split by spaces to get parts of the name
            if (nameParts.length > 1) {
              return nameParts[0][0].toLowerCase(); // Get the first initial of the first name
            }
            return ""; // Fallback if name parts are missing or only one name part
          };
        
          // Get the first initial of the first author for sorting purposes
          const getSortableAuthor = (entry) => {
            if (Array.isArray(entry.author) && entry.author.length > 0) {
              return extractFirstInitial(entry.author[0]); // First initial of first author in array
            }
            if (typeof entry.author === "string" && entry.author.trim() !== "") {
              return extractFirstInitial(entry.author); // First initial of a single author
            }
            return ""; // Fallback if no author (empty string)
          };
        
          const getSortableTitle = (entry) => {
            return entry.title ? entry.title.toLowerCase() : ""; // Fallback if no title
          };
        
          const authorA = getSortableAuthor(a);
          const authorB = getSortableAuthor(b);
          const titleA = getSortableTitle(a);
          const titleB = getSortableTitle(b);
        
          // If both entries have authors, compare by the first initial of the first author
          if (authorA && authorB) {
            return authorA.localeCompare(authorB);
          }

          // If entry a has an author and entry b does not, compare the first initial of the first author for entry a with the title of entry b
          if (authorA && !authorB) {
            return authorA.localeCompare(titleB);
          }

          // If entry b has an author and entry a does not, compare the first initial of the first author for entry b with the title of entry a
          if (!authorA && authorB) {
            return titleA.localeCompare(authorB);
          }
        
          // If both entries have no author, sort by title
          if (!authorA && !authorB) {
            return getSortableTitle(a).localeCompare(getSortableTitle(b));
          }
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
