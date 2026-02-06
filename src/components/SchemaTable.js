import React from 'react';
import SchemaTag from './SchemaTag';
import '../css/schema.css';

export default function SchemaTable({ name, description, status = 'implemented', columns, notes, jsonSchemas, id }) {
  const statusLabels = {
    implemented: 'Implemented',
    partial: 'Partial',
    planned: 'Planned',
  };

  const statusColors = {
    implemented: 'schema-tag--jsonb',
    partial: 'schema-tag--pk',
    planned: 'schema-tag--type',
  };

  // Group columns by their group property if present
  const renderColumns = () => {
    const rows = [];
    let currentGroup = null;
    let rowIndex = 0;

    columns.forEach((col, i) => {
      if (col.group && col.group !== currentGroup) {
        currentGroup = col.group;
        rows.push(
          <div key={`group-${i}`} className="schema-columns__group-separator">
            {col.group}
          </div>,
        );
      }

      rowIndex++;
      rows.push(
        <div key={col.name} className="schema-columns__row" style={rowIndex % 2 === 0 ? {} : {}}>
          <div className="schema-columns__cell schema-columns__cell--name">{col.name}</div>
          <div className="schema-columns__cell schema-columns__cell--type">{col.type}</div>
          <div className="schema-columns__cell schema-columns__cell--tags">
            {col.tags &&
              col.tags.map((tag) => {
                if (tag === 'pk') return <SchemaTag key="pk" type="pk">PK</SchemaTag>;
                if (tag === 'fk') return <SchemaTag key="fk" type="fk">{col.fkTarget ? `\u2192 ${col.fkTarget}` : 'FK'}</SchemaTag>;
                if (tag === 'unique') return <SchemaTag key="uq" type="unique">UQ</SchemaTag>;
                if (tag === 'indexed') return <SchemaTag key="idx" type="indexed">IDX</SchemaTag>;
                if (tag === 'nullable') return <SchemaTag key="null" type="nullable">?</SchemaTag>;
                if (tag === 'jsonb') return <SchemaTag key="jsonb" type="jsonb">JSONB</SchemaTag>;
                if (tag === 'cascade') return <SchemaTag key="cascade" type="cascade">CASCADE</SchemaTag>;
                if (tag === 'default') return <SchemaTag key="default" type="default">{col.default ? `= ${col.default}` : 'DEFAULT'}</SchemaTag>;
                return null;
              })}
          </div>
          <div className="schema-columns__cell schema-columns__cell--desc">{col.description}</div>
        </div>,
      );
    });

    return rows;
  };

  return (
    <div className={`schema-card schema-card--${status}`} id={id || name}>
      <div className="schema-card__header">
        <div className="schema-card__title-area">
          <span className="schema-card__label">TABLE</span>
          <h3 className="schema-card__name">{name}</h3>
        </div>
        <div className="schema-card__status">
          <span className={`schema-tag ${statusColors[status]}`}>{statusLabels[status] || status}</span>
        </div>
      </div>

      <div className="schema-card__description">{description}</div>

      <div className="schema-columns">
        <div className="schema-columns__header">Column</div>
        <div className="schema-columns__header">Type</div>
        <div className="schema-columns__header">Constraints</div>
        <div className="schema-columns__header">Description</div>
        {renderColumns()}
      </div>

      {jsonSchemas &&
        jsonSchemas.map((schema) => (
          <details key={schema.name} className="schema-json-expander">
            <summary>
              {schema.name} Structure {schema.description && <span style={{ opacity: 0.6 }}> &mdash; {schema.description}</span>}
            </summary>
            <div className="schema-json-expander__content">
              <pre>{schema.structure}</pre>
            </div>
          </details>
        ))}

      {notes && notes.length > 0 && (
        <div className="schema-notes">
          <div className="schema-notes__title">Notes</div>
          <ol>
            {notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
