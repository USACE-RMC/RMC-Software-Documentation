import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import "../css/custom.css";
import "../css/tables.css";

const TableVersionHistory = ({ versions = [], dates = [], descriptions = [], modifiedBy = [], reviewedBy = [], approvedBy = [] }) => {
  const rowCount = Math.max(versions.length, dates.length, descriptions.length, modifiedBy.length, reviewedBy.length, approvedBy.length);
  const location = useLocation();
  const pathname = location?.pathname || "";
  const docMatch = pathname.match(/\/docs\/(.+?)\/v\d+\.\d+\//);
  const documentPath = docMatch ? docMatch[1] : "";

  // Hard-coded headers, widths, and alignments
  const HEADERS = ["Version", "Date", "Description", "Modified By", "Reviewed By", "Approved By"];
  const COL_WIDTHS = ["8%", "13%", "37%", "14%", "14%", "14%"];
  const HEADERS_ALIGN = ["center", "left", "left", "left", "left", "left"];

  const get = (arr, i) => (Array.isArray(arr) ? arr[i] : undefined) ?? "";
  const normalizeVersion = (value) => {
    if (!value) return "";
    return value.startsWith("v") ? value : `v${value}`;
  };
  const buildVersionHistoryHref = (value) => {
    if (!documentPath || !value) return "";
    const version = normalizeVersion(value);
    return `/docs/${documentPath}/${version}/version-history`;
  };

  return (
    <div className="table-container">
      <table className="table-base table-zebra" aria-label="Version History" style={{ tableLayout: "fixed", minWidth: "100%" }}>
        {/* Column sizing */}
        <colgroup>
          {COL_WIDTHS.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {HEADERS.map((h, i) => (
              <th key={h} className="table-header border" style={{ textAlign: HEADERS_ALIGN[i] }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => {
            const v = get(versions, rowIndex);
            const d = get(dates, rowIndex);
            const ds = get(descriptions, rowIndex);
            const m = get(modifiedBy, rowIndex);
            const r = get(reviewedBy, rowIndex);
            const a = get(approvedBy, rowIndex);
            const versionHref = buildVersionHistoryHref(v);

            return (
              <tr key={rowIndex}>
                {/* Version (col 0) */}
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: "center" }} title={v}>
                  {versionHref ? (
                    <Link
                      to={useBaseUrl(versionHref)}
                      className="text-ifm-link hover:text-ifm-link-hover no-underline hover:underline"
                    >
                      {v}
                    </Link>
                  ) : (
                    v
                  )}
                </td>

                {/* Date (col 1) */}
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: "left" }} title={d}>
                  {d}
                </td>

                {/* Description (col 2) */}
                <td
                  className="table-body-cell border"
                  style={{
                    textAlign: "left",
                    whiteSpace: "normal",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {Array.isArray(ds) ? (
                    ds.length > 1 ? (
                      <ul className="list-disc pl-5 m-0">
                        {ds.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      ds[0] || ""
                    )
                  ) : (
                    ds
                  )}
                </td>

                {/* Modified By (col 3) */}
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: "left" }} title={m}>
                  {m}
                </td>

                {/* Reviewed By (col 4) */}
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: "left" }} title={r}>
                  {r}
                </td>

                {/* Approved By (col 5) */}
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: "left" }} title={a}>
                  {a}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableVersionHistory;
