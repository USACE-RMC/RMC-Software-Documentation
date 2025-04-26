import React, { useState, useEffect } from "react";

const Bibliography = ({ bibFile }) => {
  const [citations, setCitations] = useState([]);
  const bibFilePath = `/RMC-Software-Documentation/${bibFile}`;

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

        setCitations(sortedCitations);
      } catch (error) {
        console.error("Error fetching bibliography:", error);
      }
    };

    fetchBibData();
  }, [bibFilePath]);

  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (!Array.isArray(authors)) return authors;
    if (authors.length > 6) {
      return `${authors[0]}, et al.`;
    }
    return authors.length === 2
      ? `${authors[0]} and ${authors[1]}`
      : authors.join(", ");
  };

  const formatCitation = (citation, index) => {
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
      address, // Fix: added to support address field
      volume,
      edition,
      pages,
      doi,
      url,
      publisher,
    } = citation;

    return (
      <li
        key={citation.citationKey}
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <span style={{ minWidth: "40px", flexShrink: 0 }}> [{index + 1}] </span>
        <span style={{ display: "block" }}>
          {formatAuthors(author)}
          {author && title && ", "}
          <q>{title}</q>
          {journal && <em> {journal},</em>}
          {booktitle && ` in ${booktitle},`}
          {organization && ` ${organization},`}
          {(location || address) && ` ${location || address},`}
          {volume && ` vol. ${volume},`}
          {edition && ` no. ${edition},`}
          {pages && ` pp. ${pages},`}
          {publisher && ` ${publisher},`}
          {institution && ` ${institution},`}
          {report && ` ${report},`}
          {manual && ` ${manual},`}
          {year && ` ${year}.`}
          {doi && (
            <>
              {" "}
              doi:{" "}
              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                {doi}
              </a>
            </>
          )}
          {url && (
            <>
              {" "}
              Available:{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                {url}
              </a>
            </>
          )}
        </span>
      </li>
    );
  };

  return (
    <div>
      <ol style={{ paddingLeft: "0", listStyleType: "none" }}>
        {citations.map((citation, index) => formatCitation(citation, index))}
      </ol>
    </div>
  );
};

export default Bibliography;
