import React from 'react';
import '../css/custom.css';
import '../css/tables.css';

const TableChangelog = ({ dates = [], categories = [], documents = [], descriptions = [] }) => {
  const rowCount = Math.max(dates.length, categories.length, documents.length, descriptions.length);

  const HEADERS = ['Date', 'Category', 'Application / Document', 'Description'];
  const COL_WIDTHS = ['12%', '14%', '22%', '52%'];
  const HEADERS_ALIGN = ['left', 'left', 'left', 'left'];

  const get = (arr, i) => (Array.isArray(arr) ? arr[i] : undefined) ?? '';

  return (
    <div className="table-container" style={{ borderTop: 'none', paddingTop: 0 }}>
      <table className="table-base table-zebra" aria-label="Changelog" style={{ tableLayout: 'fixed', minWidth: '100%' }}>
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
            const date = get(dates, rowIndex);
            const category = get(categories, rowIndex);
            const document = get(documents, rowIndex);
            const desc = get(descriptions, rowIndex);

            return (
              <tr key={rowIndex}>
                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: 'left' }} title={date}>
                  {date}
                </td>

                <td className="table-body-cell border table-cell-nowrap" style={{ textAlign: 'left' }} title={category}>
                  {category}
                </td>

                <td
                  className="table-body-cell border"
                  style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                  title={typeof document === 'string' ? document : undefined}
                >
                  {document}
                </td>

                <td
                  className="table-body-cell border"
                  style={{ textAlign: 'left', whiteSpace: 'normal', overflowWrap: 'anywhere', wordBreak: 'break-word', hyphens: 'auto' }}
                >
                  {Array.isArray(desc) ? (
                    desc.length > 1 ? (
                      <ul className="list-disc pl-5 m-0">
                        {desc.map((item, i) => (
                          <li key={i}>{item}</li>
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
  );
};

export default TableChangelog;
