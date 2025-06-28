import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { useReportId } from "../contexts/ReportIdContext";

const Bibliography = () => {
  const [citations, setCitations] = useState([]);
  const location = useLocation();
  const reportId = useReportId ? useReportId() : null;

  // Extract the current path from the URL
  const pathname = location.pathname;
  const reportPath = pathname.replace(/^\/RMC-Software-Documentation\/docs\//, "/RMC-Software-Documentation/bibliographies/").replace(/\/[^/]*$/, "");
  const bibFilePath = `${reportPath}/bib.json`;
  const countersFilePath = reportId ? `/RMC-Software-Documentation/counters/${reportId}.json` : null;

  useEffect(() => {
    let isMounted = true;
    const fetchBibliography = async () => {
      if (!countersFilePath) return;
      try {
        const [bibRes, countersRes] = await Promise.all([fetch(bibFilePath), fetch(countersFilePath)]);
        const bibData = await bibRes.json();
        const counters = await countersRes.json();

        // Build an array of all citations in citationNumber order
        const citationEntries = Object.entries(counters.citations)
          .map(([citationKey, entry]) => {
            const bib = bibData.find((c) => c.citationKey === citationKey) || {};
            return {
              ...bib,
              citationKey,
              number: entry.citationNumber,
            };
          })
          .sort((a, b) => a.number - b.number);

        if (isMounted) setCitations(citationEntries);
      } catch (error) {
        console.error("Error fetching bibliography or counters:", error);
      }
    };

    fetchBibliography();
    return () => {
      isMounted = false;
    };
  }, [bibFilePath, countersFilePath]);

  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (!Array.isArray(authors)) return authors;
    if (authors.length > 3) {
      return `${authors[0]}, et al.`;
    }
    if (authors.length === 3) {
      return `${authors[0]}, ${authors[1]}, and ${authors[2]}`;
    }
    return authors.length === 2 ? `${authors[0]} and ${authors[1]}` : authors[0];
  };

  const formatCitation = (citation) => {
    const { author, year, title, journal, booktitle, report, manual, institution, organization, location, address, volume, edition, pages, doi, url, publisher, entryType } = citation;

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
    <div>
      <ol style={{ paddingLeft: "0", listStyleType: "none" }}>
        {citations.map((citation) => (
          <li
            key={citation.citationKey}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "10px",
            }}
          >
            <span style={{ minWidth: "40px", flexShrink: 0 }}>[{citation.number}]</span>
            <span style={{ display: "block" }}>{formatCitation(citation)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Bibliography;
