import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router"; // Track current document
import { useReportId } from "../../contexts/ReportIdContext"; // Import the context hook to retrieve the reportId
import "../css/custom.css";
import "../css/citation.css";

// Store citations per document (not globally)
const usedCitations = new Map();

const Citation = ({ citationKey }) => {
  const [citationNumber, setCitationNumber] = useState("?");
  const [citationData, setCitationData] = useState(null);
  const location = useLocation(); // Get the current .mdx file's pathname
  // Extract the current path from the URL
  const pathname = location.pathname;

  // Get reportId from context or derive from path
  const reportId = useReportId ? useReportId() : null;

  // Paths for bib.json and counters.json
  const reportPath = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, "/RMC-Software-Documentation/bibliographies/") // Step 1: remove full prefix
    .replace(/\/[^/]*$/, ""); // Step 2: remove the last segment ('/overview')

  const bibFilePath = `${reportPath}/bib.json`;
  const countersFilePath = reportId ? `/RMC-Software-Documentation/counters/${reportId}.json` : null;

  useEffect(() => {
    let isMounted = true;

    const fetchCitationNumber = async () => {
      if (!countersFilePath) return;
      try {
        const response = await fetch(countersFilePath);
        const counters = await response.json();
        const entry = counters.citations[citationKey];
        if (entry && isMounted) {
          setCitationNumber(entry.citationNumber);
        }
      } catch (error) {
        console.error("Error fetching counters file:", error);
      }
    };

    fetchCitationNumber();

    return () => {
      isMounted = false;
    };
  }, [citationKey, countersFilePath]);

  useEffect(() => {
    let isMounted = true;

    const fetchBibData = async () => {
      try {
        const response = await fetch(bibFilePath);
        const data = await response.json();
        const citation = data.find((c) => c.citationKey === citationKey);
        if (citation && isMounted) {
          setCitationData(citation);
        }
      } catch (error) {
        console.error("Error fetching bibliography:", error);
      }
    };

    fetchBibData();

    return () => {
      isMounted = false;
    };
  }, [citationKey, bibFilePath]);

  useEffect(() => {
    if (!citationKey) return;
    if (!usedCitations.has(pathname)) {
      usedCitations.set(pathname, new Set());
    }
    usedCitations.get(pathname).add(citationKey);
  }, [pathname, citationKey]);

  return (
    <span className="citation-reference">
      <a href={`#footnote-${citationKey}`} style={{ textDecoration: "none" }}>
        [{citationNumber}]
      </a>
    </span>
  );
};

// Updated function to retrieve citations only for the current document
export const getUsedCitations = (docId) => Array.from(usedCitations.get(docId) || []);

export default Citation;
