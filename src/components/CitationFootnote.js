import React, { useState, useEffect } from "react";
import { useUsedCitations } from "./Citation";
import { useLocation } from "@docusaurus/router";
import { useReportId } from "../contexts/ReportIdContext";
import "../css/custom.css";

const CitationFootnote = () => {
  const [citations, setCitations] = useState([]);
  const location = useLocation();
  const pathname = location.pathname; // docId
  const reportId = useReportId ? useReportId() : null;

  const reportPath = pathname.replace(/^\/RMC-Software-Documentation\/docs\//, "/RMC-Software-Documentation/bibliographies/").replace(/\/[^/]*$/, "");
  const bibFilePath = `${reportPath}/bib.json`;
  const countersFilePath = reportId ? `/RMC-Software-Documentation/counters/${reportId}.json` : null;

  // Subscribe to per-page used keys (for filtering to only those used here)
  const usedKeys = useUsedCitations(pathname);

  useEffect(() => {
    let isMounted = true;

    const fetchCitations = async () => {
      if (!countersFilePath) return;
      if (!usedKeys || usedKeys.length === 0) {
        if (isMounted) setCitations([]);
        return;
      }

      try {
        const [bibRes, countersRes] = await Promise.all([fetch(bibFilePath), fetch(countersFilePath)]);
        const bibData = await bibRes.json();
        const counters = await countersRes.json();

        // Build entries for only the citations used on this page
        const entries = usedKeys
          .map((citationKey) => {
            const bib = bibData.find((c) => c.citationKey === citationKey) || {};
            const entry = counters?.citations?.[citationKey];
            return entry ? { ...bib, citationKey, number: entry.citationNumber } : null; // drop if not in counters (matches original)
          })
          .filter(Boolean)
          .sort((a, b) => a.number - b.number); // order by counters number (original logic)

        if (isMounted) setCitations(entries);
      } catch (error) {
        console.error("Error fetching citations or counters:", error);
      }
    };

    fetchCitations();
    return () => {
      isMounted = false;
    };
  }, [bibFilePath, countersFilePath, pathname, usedKeys]);

  if (citations.length === 0) return null;

  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (!Array.isArray(authors)) return authors;
    if (authors.length > 3) return `${authors[0]}, et al.`;
    if (authors.length === 3) return `${authors[0]}, ${authors[1]}, and ${authors[2]}`;
    return authors.length === 2 ? `${authors[0]} and ${authors[1]}` : authors[0];
  };

  const formatCitation = (citation) => {
    const { author, year, title, journal, booktitle, report, manual, institution, organization, location, address, volume, edition, pages, doi, url, publisher, entryType } = citation;

    const formatTitle = (t, type) => {
      if (type === "inproceedings") return `"${t}",`;
      if (type === "manual") return <i>{`${t},`}</i>;
      return <i>{`${t},`}</i>;
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
            <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className="no-underline text-ifm-link hover:text-ifm-link-hover hover:underline">
              {doi}
            </a>
          </>
        )}
        {url && (
          <>
            {" "}
            Available:{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" className="no-underline text-ifm-link hover:text-ifm-link-hover hover:underline">
              {url}
            </a>
          </>
        )}
      </>
    );
  };

  return (
    <div className="mt-20 pt-2 border-t border-color">
      <ol className="list-none pl-0 mt-5">
        {citations.map((citation) => (
          <li value={citation.number} key={citation.citationKey} id={`footnote-${citation.citationKey}`} className="flex items-start mb-2.5">
            <span className="min-w-[40px] flex-shrink-0">[{citation.number}]</span>
            <span className="block">{formatCitation(citation)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CitationFootnote;
