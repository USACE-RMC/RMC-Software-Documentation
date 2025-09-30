import { useEffect, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';
import '../css/tables.css';

const TableHorizontal = ({
  tableKey,
  headers, // array of row header labels (first column)
  rows, // array of arrays: each row’s data cells (to the right)
  alt,
  caption,
  colWidths, // [number|string,...]  number => ch
  colAlign, // ["left"|"center"|"right", ...] for BODY cells per column (incl. the first header column’s body counterpart if any)
  headerAlign, // ["left"|"center"|"right", ...] for HEADER cells per column (optional; falls back to colAlign)
  colVAlign, // ["top"|"middle"|"bottom", ...] for BODY cells per column
  headerVAlign, // ["top"|"middle"|"bottom", ...] for HEADER cells (optional)
  widthMode = 'full', // "full" | "intrinsic"
  footnotes, // Array<string | React.ReactNode>
  id,
}) => {
  const [tableInfo, setTableInfo] = useState(null);
  const reportId = useReportId();
  const tableId = id || tableKey;

  useEffect(() => {
    if (!reportId) return;
    const jsonPath = `/RMC-Software-Documentation/counters/${reportId}.json`;
    (async () => {
      try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`Failed to load ${jsonPath}`);
        const data = await response.json();
        const foundTable = data?.tables?.[tableKey];
        if (foundTable) setTableInfo(foundTable);
        else console.warn(`Table key "${tableKey}" not found in ${jsonPath}`);
      } catch (error) {
        console.error('Error loading counters:', error);
      }
    })();
  }, [reportId, tableKey]);

  if (!tableInfo) return <span>Loading...</span>;

  const renderHTML = (content) => ({ __html: content });

  // Total columns = 1 (left header column) + number of data columns
  const columnCount = 1 + (rows?.[0]?.length ?? 0);

  // Build CSS variables for widths & alignments
  const styleVars = {};
  if (Array.isArray(colWidths)) {
    for (let i = 0; i < Math.min(colWidths.length, columnCount); i++) {
      const v = colWidths[i];
      styleVars[`--c${i + 1}`] = typeof v === 'number' ? `${v}ch` : v;
    }
  }
  if (Array.isArray(colAlign)) {
    for (let i = 0; i < Math.min(colAlign.length, columnCount); i++) {
      styleVars[`--a${i + 1}`] = colAlign[i]; // body horizontal align
    }
  }
  if (Array.isArray(headerAlign)) {
    for (let i = 0; i < Math.min(headerAlign.length, columnCount); i++) {
      styleVars[`--ha${i + 1}`] = headerAlign[i]; // header horizontal align
    }
  }
  if (Array.isArray(colVAlign)) {
    for (let i = 0; i < Math.min(colVAlign.length, columnCount); i++) {
      styleVars[`--v${i + 1}`] = colVAlign[i]; // body vertical align
    }
  }
  if (Array.isArray(headerVAlign)) {
    for (let i = 0; i < Math.min(headerVAlign.length, columnCount); i++) {
      styleVars[`--hv${i + 1}`] = headerVAlign[i]; // header vertical align
    }
  }

  // width mode: full (default) or intrinsic shrink-wrap
  if (widthMode === 'intrinsic') {
    styleVars['--table-width'] = 'max-content';
    styleVars['--table-display'] = 'inline-table';
  }

  return (
    <div id={tableId} className="table-container" data-anchor="true">
      <div className="table-cap">
        Table {tableInfo.tableNumber}: {caption}
      </div>

      <div className="table-scroller">
        <table
          aria-label={alt}
          className={`table-base horizontal-table table-zebra ${tableKey}`}
          style={styleVars}
        >
          <colgroup>
            {Array.from({ length: columnCount }).map((_, i) => (
              <col key={i} style={{ width: `var(--c${i + 1}, auto)` }} />
            ))}
          </colgroup>

          <tbody>
            {headers.map((header, rowIdx) => (
              <tr key={rowIdx}>
                {/* Left header column cell (row header) */}
                <th
                  className="table-header"
                  style={{
                    textAlign: 'var(--ha1, var(--a1, center))',
                    verticalAlign: 'var(--hv1, middle)',
                  }}
                  dangerouslySetInnerHTML={
                    typeof header === 'string' ? renderHTML(header) : undefined
                  }
                >
                  {typeof header === 'string' ? undefined : header}
                </th>
                {/* Data cells to the right */}
                {rows[rowIdx].map((cell, cellIdx) => {
                  const colIndex = cellIdx + 2; // data columns start at 2
                  return (
                    <td
                      key={cellIdx}
                      className="table-body-cell"
                      style={{
                        textAlign: `var(--a${colIndex}, center)`,
                        verticalAlign: `var(--v${colIndex}, middle)`,
                      }}
                      dangerouslySetInnerHTML={
                        typeof cell === 'string' ? renderHTML(cell) : undefined
                      }
                    >
                      {typeof cell === 'string' ? undefined : cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footnotes block (only if provided and non-empty) */}
        {Array.isArray(footnotes) && footnotes.length > 0 && (
          <div className="mt-2 leading-snug" style={{ maxWidth: '100%' }}>
            <ol className="m-0 list-none space-y-1 !pl-[4px]">
              {footnotes.map((note, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="min-w-0 break-words font-usace text-footnote italic">
                    {typeof note === 'string' ? (
                      <span dangerouslySetInnerHTML={renderHTML(note)} />
                    ) : (
                      note
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHorizontal;
