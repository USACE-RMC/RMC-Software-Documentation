import React, { useState, useEffect } from "react";
import { getUsedCitations } from "./Citation";
import { useLocation } from "@docusaurus/router";

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

  console.log("# of citations: ", citations.length);
  if (citations.length === 0) return null;

  const formatAuthors = (authors) => {
    if (!Array.isArray(authors)) return authors;
    return authors.length > 1
      ? authors.slice(0, -1).join(", ") + " & " + authors[authors.length - 1]
      : authors[0];
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
    <div className="citation-footnote">
      <ol>
        {citations
          .sort((a, b) => a.number - b.number)
          .map((citation) => (
            <li
              value={citation.number}
              key={citation.citationKey}
              id={`footnote-${citation.citationKey}`}
            >
              {formatCitation(citation)}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default CitationFootnote;
