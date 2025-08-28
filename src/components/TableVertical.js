import { useEffect, useState } from 'react';
import { useReportId } from '../contexts/ReportIdContext';
import '../css/custom.css';
import '../css/tables.css';

const TableVertical = ({
  tableKey,
  headers = [],
  columns = [],
  alt,
  caption,
  colWidths, // e.g., [14, "20ch", "minmax(16ch, 1fr)"]
  colAlign, // e.g., ["left","center","right"]
  headerAlign, // e.g., ["center","center","right"] (optional)
  colVAlign, // e.g., ["top","middle","bottom"] for body cells
  headerVAlign, // e.g., ["middle","bottom","middle"] (optional)
  widthMode = 'full', // "full" | "intrinsic"
  footnotes, // Array<string | React.ReactNode>
}) => {
  const [tableInfo, setTableInfo] = useState(null);
  const reportId = useReportId();

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

  const colCount = columns?.length ?? 0;
  const rowCount = colCount > 0 ? (columns[0]?.length ?? 0) : 0;

  // Build CSS variables for widths & alignments
  const styleVars = {};
  if (Array.isArray(colWidths)) {
    for (let i = 0; i < Math.min(colWidths.length, colCount); i++) {
      const v = colWidths[i];
      styleVars[`--c${i + 1}`] = typeof v === 'number' ? `${v}ch` : v;
    }
  }
  if (Array.isArray(colAlign)) {
    for (let i = 0; i < Math.min(colAlign.length, colCount); i++) {
      styleVars[`--a${i + 1}`] = colAlign[i]; // body horizontal
    }
  }
  if (Array.isArray(headerAlign)) {
    for (let i = 0; i < Math.min(headerAlign.length, colCount); i++) {
      styleVars[`--ha${i + 1}`] = headerAlign[i]; // header horizontal
    }
  }
  if (Array.isArray(colVAlign)) {
    for (let i = 0; i < Math.min(colVAlign.length, colCount); i++) {
      styleVars[`--v${i + 1}`] = colVAlign[i]; // body vertical
    }
  }
  if (Array.isArray(headerVAlign)) {
    for (let i = 0; i < Math.min(headerVAlign.length, colCount); i++) {
      styleVars[`--hv${i + 1}`] = headerVAlign[i]; // header vertical
    }
  }
  if (widthMode === 'intrinsic') {
    styleVars['--table-width'] = 'max-content';
    styleVars['--table-display'] = 'inline-table';
  }

  // Header alignment helpers for colSpan
  const headerTextAlignAt = (zeroBasedCol) =>
    `var(--ha${zeroBasedCol + 1}, var(--a${zeroBasedCol + 1}, left))`;
  const headerVertAlignAt = (zeroBasedCol) => `var(--hv${zeroBasedCol + 1}, middle)`; // default header vertical

  const skipBodyCells = new Set();

  return (
    <div className="table-container">
      <div className="table-cap">
        Table {tableInfo.tableNumber}: {caption}
      </div>

      {/* If you use a scroller wrapper elsewhere, you can place the footnotes inside it too */}
      <div className="table-scroller">
        <table aria-label={alt} className="table-base table-zebra" style={styleVars}>
          <colgroup>
            {Array.from({ length: colCount }).map((_, i) => (
              <col key={i} style={{ width: `var(--c${i + 1}, auto)` }} />
            ))}
          </colgroup>

          <thead>
            {headers.map((headerRow, rowIndex) => {
              let cursor = 0;
              return (
                <tr key={`header-row-${rowIndex}`}>
                  {headerRow.map((cell, colIndex) => {
                    if (!cell) return null;
                    const { value, colSpan = 1, rowSpan = 1 } = cell;
                    const thStyle = {
                      textAlign: headerTextAlignAt(cursor),
                      verticalAlign: headerVertAlignAt(cursor),
                    };
                    const node = (
                      <th
                        key={`header-${rowIndex}-${colIndex}`}
                        colSpan={colSpan > 1 ? colSpan : undefined}
                        rowSpan={rowSpan > 1 ? rowSpan : undefined}
                        className="table-header"
                        style={thStyle}
                        dangerouslySetInnerHTML={
                          typeof value === 'string' ? renderHTML(value) : undefined
                        }
                      >
                        {typeof value === 'string' ? undefined : value}
                      </th>
                    );
                    cursor += colSpan;
                    return node;
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const cellKey = `${colIndex}-${rowIndex}`;
                  if (skipBodyCells.has(cellKey)) return null;

                  const raw = col?.[rowIndex];

                  if (raw && typeof raw === 'object' && 'value' in raw) {
                    const { value, rowSpan = 1, colSpan = 1 } = raw;
                    for (let r = 0; r < rowSpan; r++) {
                      for (let c = 0; c < colSpan; c++) {
                        if (r !== 0 || c !== 0) {
                          skipBodyCells.add(`${colIndex + c}-${rowIndex + r}`);
                        }
                      }
                    }
                    return (
                      <td
                        key={cellKey}
                        rowSpan={rowSpan > 1 ? rowSpan : undefined}
                        colSpan={colSpan > 1 ? colSpan : undefined}
                        className="table-body-cell"
                        style={{
                          textAlign: `var(--a${colIndex + 1}, left)`,
                          verticalAlign: `var(--v${colIndex + 1}, middle)`,
                        }}
                      >
                        {value}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={cellKey}
                      className="table-body-cell"
                      style={{
                        textAlign: `var(--a${colIndex + 1}, left)`,
                        verticalAlign: `var(--v${colIndex + 1}, middle)`,
                      }}
                      dangerouslySetInnerHTML={
                        typeof raw === 'string' ? renderHTML(raw) : undefined
                      }
                    >
                      {typeof raw === 'string' ? undefined : raw}
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

export default TableVertical;
