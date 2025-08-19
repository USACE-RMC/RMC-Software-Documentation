import "../css/custom.css";
import "../css/tables.css";

const TableBestFitDistributions = ({ headerConfig, headers, columns, fullWidth = true }) => {
  const rowCount = columns.length > 0 ? columns[0].length : 0;

  const widthClass = fullWidth ? "bestfit-table-full" : "bestfit-table-partial";

  return (
    <div className="table-container">
      <table className={`table-base bestfit-table table-zebra ${widthClass} ${tableKey}`}>
        <thead>
          <tr>
            {(headerConfig || headers).map((header, index) =>
              headerConfig ? (
                <th key={index} colSpan={header.colSpan || 1}>
                  {header.label}
                </th>
              ) : (
                <th key={index}>{header}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cell = col[rowIndex];

                // Row span check
                const isCoveredByRowSpan = col.some((prevCell, prevRowIndex) => {
                  if (prevRowIndex < rowIndex && typeof prevCell === "object" && prevCell?.rowSpan) {
                    const spanStart = prevRowIndex;
                    const spanEnd = prevRowIndex + prevCell.rowSpan;
                    return rowIndex < spanEnd;
                  }
                  return false;
                });

                // Col span check
                const isCoveredByColSpan = columns.slice(0, colIndex).some((prevCol) => {
                  const prevCell = prevCol[rowIndex];
                  if (typeof prevCell === "object" && prevCell?.colSpan) {
                    const startIndex = columns.indexOf(prevCol);
                    const spanEnd = startIndex + prevCell.colSpan;
                    return colIndex < spanEnd;
                  }
                  return false;
                });

                if (isCoveredByRowSpan || isCoveredByColSpan) return null;

                if (typeof cell === "object" && cell !== null && "value" in cell) {
                  return (
                    <td key={`${colIndex}-${rowIndex}`} rowSpan={cell.rowSpan || undefined} colSpan={cell.colSpan || undefined}>
                      {cell.value}
                    </td>
                  );
                }

                return <td key={`${colIndex}-${rowIndex}`}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBestFitDistributions;
