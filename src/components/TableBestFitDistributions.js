import "../css/custom.css";
import "../css/tables.css";

const TableBestFitDistributions = ({ headerConfig, headers, columns, fullWidth = true, colWidths, colAlign, widthMode = "full" }) => {
  const colCount = columns?.length ?? 0;
  const rowCount = columns.length > 0 ? columns[0].length : 0;

  // CSS vars for widths & alignments
  const styleVars = {};
  if (Array.isArray(colWidths)) {
    for (let i = 0; i < Math.min(colWidths.length, colCount); i++) {
      const v = colWidths[i];
      styleVars[`--c${i + 1}`] = typeof v === "number" ? `${v}ch` : v;
    }
  }
  if (Array.isArray(colAlign)) {
    for (let i = 0; i < Math.min(colAlign.length, colCount); i++) {
      styleVars[`--a${i + 1}`] = colAlign[i];
    }
  }
  if (widthMode === "intrinsic") {
    styleVars["--table-width"] = "fit-content"; // shrink-wrap but cap at container
    styleVars["--table-display"] = "block"; // avoid inline-table width leaks
  }

  // For header cells with colSpan: use the alignment of the first covered column
  const headerAlignAt = (zeroBasedCol) => `var(--a${zeroBasedCol + 1}, left)`;

  // Efficient skip map for rowSpan/colSpan in body
  const skip = new Set();

  return (
    <div className="table-container">
      <table className={`table-base bestfit-table table-zebra`} style={styleVars}>
        <colgroup>
          {Array.from({ length: colCount }).map((_, i) => (
            <col key={i} style={{ width: `var(--c${i + 1}, auto)` }} />
          ))}
        </colgroup>

        <thead>
          <tr>
            {(headerConfig ?? headers ?? []).map((hdr, i) => {
              // Support either headerConfig objects or plain strings
              if (headerConfig) {
                const colSpan = hdr.colSpan || 1;
                // figure out the starting column index this header covers
                const startCol = headerConfig.slice(0, i).reduce((acc, h) => acc + (h.colSpan || 1), 0) || 0;

                return (
                  <th key={`hcfg-${i}`} className="table-header" colSpan={colSpan > 1 ? colSpan : undefined} style={{ textAlign: headerAlignAt(startCol) }}>
                    {hdr.label}
                  </th>
                );
              }

              // Plain headers array: align by its column index
              return (
                <th key={`h-${i}`} className="table-header" style={{ textAlign: `var(--a${i + 1}, left)` }}>
                  {hdr}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellKey = `${colIndex}-${rowIndex}`;
                if (skip.has(cellKey)) return null;

                const raw = col?.[rowIndex];

                // Cell object with spans
                if (raw && typeof raw === "object" && "value" in raw) {
                  const { value, rowSpan = 1, colSpan = 1 } = raw;

                  // mark covered cells to skip
                  for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                      if (r !== 0 || c !== 0) {
                        skip.add(`${colIndex + c}-${rowIndex + r}`);
                      }
                    }
                  }

                  return (
                    <td
                      key={cellKey}
                      rowSpan={rowSpan > 1 ? rowSpan : undefined}
                      colSpan={colSpan > 1 ? colSpan : undefined}
                      className="table-body-cell"
                      style={{ textAlign: `var(--a${colIndex + 1}, left)` }}
                    >
                      {value}
                    </td>
                  );
                }

                // Plain string/ReactNode
                return (
                  <td key={cellKey} className="table-body-cell" style={{ textAlign: `var(--a${colIndex + 1}, left)` }}>
                    {raw ?? ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBestFitDistributions;
