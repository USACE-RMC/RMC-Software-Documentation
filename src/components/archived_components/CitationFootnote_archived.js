import React, { useState, useEffect } from "react";
import { getUsedCitations } from "../Citation";
import { useLocation } from "@docusaurus/router";
import "../css/custom.css";
import "../css/citation-footnote.css";

const CitationFootnote = () => {
  const [citations, setCitations] = useState([]);
  const location = useLocation(); // Get current document

  useEffect(() => {
    const fetchCitations = () => {
      const usedCitations = getUsedCitations(location.pathname);
      setCitations(usedCitations);
    };

    fetchCitations();

    const handleCitationsUpdated = () => {
      fetchCitations();
    };

    window.addEventListener("citationsUpdated", handleCitationsUpdated);

    return () => {
      window.removeEventListener("citationsUpdated", handleCitationsUpdated);
    };
  }, [location.pathname]); // Re-fetch when document changes

  if (citations.length === 0) return null;

  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (!Array.isArray(authors)) return authors;
    if (authors.length > 3) {
      return `${authors[0]}, et al.`; // Limit to the first author if more than 3
    }
    if (authors.length === 3) {
      return `${authors[0]}, ${authors[1]}, and ${authors[2]}`;
    }
    return authors.length === 2 ? `${authors[0]} and ${authors[1]}` : authors[0];
  };

  const formatCitation = (citation, index) => {
    const { author, year, title, journal, booktitle, report, manual, institution, organization, location, address, volume, edition, pages, doi, url, publisher, entryType } = citation;

    // Function to format title based on entryType
    const formatTitle = (title, entryType) => {
      if (entryType === "inproceedings") {
        return `"${title}",`;
      }
      if (entryType === "manual") {
        return <i>{`${title},`}</i>;
      }
      return <i>{`${title},`}</i>;
    };

    return (
      <>
        {formatAuthors(author)}
        {author && title && ", "}
        {formatTitle(title, entryType)}
        {volume && ` Vol. ${volume}, `}
        {edition && ` ${edition} ed.,`}
        {journal && <em> {journal},</em>}
        {booktitle && ` ${booktitle}, `}
        {(location || address) && ` ${location || address}:`}
        {organization && ` ${organization},`}
        {pages && ` pp. ${pages}, `}
        {publisher && ` ${publisher}, `}
        {institution && ` ${institution}, `}
        {report && ` ${report}, `}
        {manual && ` ${manual}, `}
        {year && ` ${year}.`}
        {doi && (
          <>
            {" "}
            doi:{" "}
            <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {doi}
            </a>
          </>
        )}
        {url && (
          <>
            {" "}
            Available:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              {url}
            </a>
          </>
        )}
      </>
    );
  };

  return (
    <div className="citation-footnote" style={{ marginLeft: "20px" }}>
      <ol style={{ listStyleType: "none", paddingLeft: "0" }}>
        {citations
          .sort((a, b) => a.number - b.number)
          .map((citation) => (
            <li
              value={citation.number}
              key={citation.citationKey}
              id={`footnote-${citation.citationKey}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "10px",
              }}
            >
              <span style={{ minWidth: "40px", flexShrink: 0 }}>[{citation.number}]</span> <span style={{ display: "block" }}>{formatCitation(citation)}</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default CitationFootnote;
