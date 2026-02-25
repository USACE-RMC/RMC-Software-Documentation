import '../css/tables.css';

const TableChangelog = ({ dates = [], categories = [], documents = [], versions = [], descriptions = [] }) => {
  const rowCount = Math.max(dates.length, categories.length, documents.length, versions.length, descriptions.length);

  const HEADERS = ['Date', 'Category', 'Document', 'Version', 'Description'];
  const COL_WIDTHS = ['11%', '13%', '20%', '8%', '48%'];
  const HEADERS_ALIGN = ['left', 'left', 'left', 'center', 'left'];

  const get = (arr, i) => (Array.isArray(arr) ? arr[i] : undefined) ?? '';

  // Compute rowspan for merged date cells
  const dateRowSpans = [];
  let i = 0;
  while (i < rowCount) {
    const date = get(dates, i);
    let span = 1;
    while (i + span < rowCount && get(dates, i + span) === date) {
      span++;
    }
    dateRowSpans[i] = span;
    for (let j = 1; j < span; j++) {
      dateRowSpans[i + j] = 0;
    }
    i += span;
  }

  return (
    <div className="table-container" style={{ borderBottom: 'none' }}>
      <div className="table-scroller">
        <table className="table-base table-zebra" aria-label="Change Log" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            {COL_WIDTHS.map((w, idx) => (
              <col key={idx} style={{ width: w }} />
            ))}
          </colgroup>

          <thead>
            <tr>
              {HEADERS.map((h, idx) => (
                <th key={h} className="table-header border" style={{ textAlign: HEADERS_ALIGN[idx] }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => {
              const date = get(dates, rowIndex);
              const category = get(categories, rowIndex);
              const doc = get(documents, rowIndex);
              const version = get(versions, rowIndex);
              const desc = get(descriptions, rowIndex);
              const dateSpan = dateRowSpans[rowIndex];

              return (
                <tr key={rowIndex}>
                  {dateSpan > 0 && (
                    <td className="table-body-cell border" style={{ textAlign: 'left', verticalAlign: 'top' }} title={date} rowSpan={dateSpan}>
                      {date}
                    </td>
                  )}

                  <td className="table-body-cell border" style={{ textAlign: 'left' }} title={category}>
                    {category}
                  </td>

                  <td
                    className="table-body-cell border"
                    style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    title={typeof doc === 'string' ? doc : undefined}
                  >
                    {doc}
                  </td>

                  <td className="table-body-cell table-cell-nowrap border" style={{ textAlign: 'center' }} title={version}>
                    {version}
                  </td>

                  <td
                    className="table-body-cell border"
                    style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {Array.isArray(desc) ? (
                      desc.length > 1 ? (
                        <ul className="m-0 list-disc pl-5">
                          {desc.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        desc[0] || ''
                      )
                    ) : (
                      desc
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableChangelog;
