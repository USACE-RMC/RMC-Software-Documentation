import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router"; // Track current document

const Bibliography = () => {
  const [citations, setCitations] = useState([]);
  const location = useLocation(); // Get the current .mdx file's pathname

  // Extract the current path from the URL
  const pathname = location.pathname;

  const reportPath = pathname
    .replace(
      /^\/RMC-Software-Documentation\/docs\//,
      "/RMC-Software-Documentation/bibliographies/"
    ) // Step 1: remove full prefix
    .replace(/\/[^/]*$/, ""); // Step 2: remove the last segment (e.g. '/overview')

  // Construct the path to the bibliogrpahy JSON file
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
    if (authors.length > 3) {
      return `${authors[0]}, et al.`; // Limit to the first author if more than 3
    }
    if (authors.length === 3) {
      return `${authors[0]}, ${authors[1]}, and ${authors[2]}`
    }
    return authors.length === 2
      ? `${authors[0]} and ${authors[1]}`
      : authors[0];
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
      address,
      volume,
      edition,
      pages,
      doi,
      url,
      publisher,
      entryType,
    } = citation;

    // Function to format title based on entryType
    const formatTitle = (title, entryType) => {
      if (entryType === "inproceedings") {
        return `"${title}",`
      }
      if (entryType === "manual") {
        return <i>{`${title},`}</i>
      }
      return <i>{`${title},`}</i>
    }

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
