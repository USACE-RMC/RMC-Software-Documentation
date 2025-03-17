import React, { useState, useEffect } from "react";
import addBaseUrl from "@docusaurus/useBaseUrl";
import "../css/custom.css";

const Bibliography = ({ bibFile }) => {
  const [citations, setCitations] = useState([]);

  useEffect(() => {
    const fetchBibData = async () => {
      try {
        const response = await fetch(addBaseUrl(bibFile));
        const data = await response.json();

        // Sort citations by author(s)
        const sortedCitations = data.sort((a, b) => {
          const authorA = Array.isArray(a.author) ? a.author[0] : a.author;
          const authorB = Array.isArray(b.author) ? b.author[0] : b.author;
          return authorA.localeCompare(authorB);
        });

        setCitations(sortedCitations);
      } catch (error) {
        console.error("Error fetching bibliography:", error);
      }
    };

    fetchBibData();
  }, [bibFile]);

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
    <div>
      <ol>
        {citations.map((citation) => (
          <li key={citation.citationKey} className="citation">
            {formatCitation(citation)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Bibliography;
