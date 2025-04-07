import React, { useState, useEffect } from "react";
import { getUsedCitations } from "./Citation";
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
    if (!Array.isArray(authors)) return authors;
    return authors
      .map((author) => {
        const nameParts = author.split(" ");
        const initials = nameParts
          .slice(0, -1)
          .map((name) => name[0] + ".")
          .join(" ");
        const lastName = nameParts[nameParts.length - 1];
        return `${initials} ${lastName}`;
      })
      .join(", ");
  };

  const formatCitation = (citation) => {
    const {
      author,
      year,
      title,
      journal,
      booktitle,
      report,
      manual,
      institution,
      organization,
      location,
      volume,
      edition,
      pages,
      doi,
      url,
      publisher,
    } = citation;

    return (
      <>
        {formatAuthors(author)} ({year}). <em>{title}</em>.
        {journal && ` ${journal}`}
        {booktitle && ` In ${booktitle}`}
        {organization && ` (${organization})`}
        {location && `, ${location}`}
        {volume && `, Vol. ${volume}`}
        {edition && `(${edition})`}
        {pages && `, pp. ${pages}`}
        {publisher && ` ${publisher}`}
        {institution && ` ${institution}`}
        {report && ` ${report}`}
        {manual && ` ${manual}`}
        {doi && (
          <>
            {" "}
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://doi.org/{doi}
            </a>
          </>
        )}
        {url && (
          <>
            {" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
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
              <span style={{ minWidth: "40px", flexShrink: 0 }}>
                [{citation.number}]
              </span>{" "}
              <span style={{ display: "block" }}>
                {formatCitation(citation)}
              </span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default CitationFootnote;
