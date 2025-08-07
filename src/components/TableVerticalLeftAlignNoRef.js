import "../css/custom.css";
import "../css/tables.css";

const TableVerticalLeftAlignNoRef = ({
  headers = [],
  columns = [],
  fullWidth = true,
  alt,
}) => {
  const rowCount = columns.length > 0 ? columns[0].length : 0;
  const widthClass = fullWidth
    ? "vertical-table-full"
    : "vertical-table-partial";

  const skipBodyCells = new Set();

  return (
    <div className="table-container">
      <table
        alt={alt}
        className={`table-base vertical-left-table table-zebra ${widthClass}`}
      >
        <thead>
          {headers.map((headerRow, rowIndex) => {
            const rowCells = [];

            for (let colIndex = 0; colIndex < headerRow.length; colIndex++) {
              const cell = headerRow[colIndex];
              if (!cell) continue;

              const { value, colSpan = 1, rowSpan = 1 } = cell;

              rowCells.push(
                <th
                  key={`header-${rowIndex}-${colIndex}`}
                  colSpan={colSpan > 1 ? colSpan : undefined}
                  rowSpan={rowSpan > 1 ? rowSpan : undefined}
                >
                  {value}
                </th>
              );
            }

            return <tr key={`header-row-${rowIndex}`}>{rowCells}</tr>;
          })}
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const cellKey = `${colIndex}-${rowIndex}`;
                if (skipBodyCells.has(cellKey)) return null;

                const cell = col[rowIndex];

                if (
                  typeof cell === "object" &&
                  cell !== null &&
                  "value" in cell
                ) {
                  const { value, rowSpan = 1, colSpan = 1 } = cell;

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
                    >
                      {value}
                    </td>
                  );
                }

                return <td key={cellKey}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableVerticalLeftAlignNoRef;
