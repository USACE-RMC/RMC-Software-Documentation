import React, { useState } from 'react';
import SchemaTag from './SchemaTag';
import '../css/schema.css';

export default function SchemaTableCompact({ name, description, status = 'implemented', columns, notes, jsonSchemas, id }) {
  const statusLabels = { implemented: 'Implemented', partial: 'Partial', planned: 'Planned' };

  // Build groups from column data
  const groups = [];
  let currentGroupName = null;
  let currentGroupCols = [];

  columns.forEach((col) => {
    const groupName = col.group || null;
    if (groupName !== currentGroupName) {
      if (currentGroupCols.length > 0) {
        groups.push({ name: currentGroupName, columns: currentGroupCols });
      }
      currentGroupName = groupName;
      currentGroupCols = [];
    }
    currentGroupCols.push(col);
  });
  if (currentGroupCols.length > 0) {
    groups.push({ name: currentGroupName, columns: currentGroupCols });
  }

  const hasGroups = groups.length > 1 || (groups.length === 1 && groups[0].name);

  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {};
    if (hasGroups) {
      groups.forEach((g) => {
        initial[g.name || '__ungrouped'] = false;
      });
    }
    return initial;
  });

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const expandAll = () => {
    const all = {};
    groups.forEach((g) => { all[g.name || '__ungrouped'] = true; });
    setExpandedGroups(all);
  };

  const collapseAll = () => {
    const all = {};
    groups.forEach((g) => { all[g.name || '__ungrouped'] = false; });
    setExpandedGroups(all);
  };

  // Render tags inline
  const renderTags = (col) => {
    if (!col.tags || col.tags.length === 0) return null;
    return col.tags.map((tag) => {
      if (tag === 'pk') return <SchemaTag key="pk" type="pk">PK</SchemaTag>;
      if (tag === 'fk') {
        const target = col.fkTarget || null;
        return <SchemaTag key="fk" type="fk" href={target ? `#${target}` : undefined}>{target ? `\u2192 ${target}` : 'FK'}</SchemaTag>;
      }
      if (tag === 'jsonb') return <SchemaTag key="jsonb" type="jsonb">JSONB</SchemaTag>;
      if (tag === 'unique') return <SchemaTag key="uq" type="unique">UQ</SchemaTag>;
      if (tag === 'indexed') return <SchemaTag key="idx" type="indexed">IDX</SchemaTag>;
      if (tag === 'nullable') return <SchemaTag key="null" type="nullable">?</SchemaTag>;
      if (tag === 'cascade') return <SchemaTag key="cascade" type="cascade">CASCADE</SchemaTag>;
      if (tag === 'default') return <SchemaTag key="default" type="default" title={col.default || ''}>= {col.default || 'default'}</SchemaTag>;
      return null;
    });
  };

  // Render a single compact column row
  const renderColumnRow = (col, visualIndex) => (
    <div key={col.name} className={`schema-compact__row ${visualIndex % 2 === 1 ? 'schema-compact__row--even' : ''}`}>
      <div className="schema-compact__cell schema-compact__cell--name" title={col.description || undefined}>{col.name}</div>
      <div className="schema-compact__cell schema-compact__cell--type">{col.type}</div>
      <div className="schema-compact__cell schema-compact__cell--tags">{renderTags(col)}</div>
    </div>
  );

  // Render columns with groups
  const renderColumns = () => {
    if (!hasGroups) {
      return columns.map((col, i) => renderColumnRow(col, i));
    }

    const rows = [];
    let globalVisualIndex = 0;

    groups.forEach((group) => {
      const groupKey = group.name || '__ungrouped';
      const isExpanded = expandedGroups[groupKey] !== false;
      const colCount = group.columns.length;

      if (group.name) {
        rows.push(
          <div
            key={`group-${groupKey}`}
            className="schema-compact__group schema-compact__group--interactive"
            onClick={() => toggleGroup(groupKey)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGroup(groupKey); } }}
          >
            <span className="schema-compact__group-name">
              <span className={`schema-compact__group-chevron ${isExpanded ? 'schema-compact__group-chevron--open' : ''}`}>{'\u25B8'}</span>
              {group.name}
            </span>
            <span className="schema-compact__group-count">{colCount}</span>
          </div>,
        );
      }

      if (isExpanded || !group.name) {
        group.columns.forEach((col) => {
          rows.push(renderColumnRow(col, globalVisualIndex));
          globalVisualIndex++;
        });
      }
    });

    return rows;
  };

  const anyCollapsed = hasGroups && Object.values(expandedGroups).some((v) => v === false);
  const anyExpanded = hasGroups && Object.values(expandedGroups).some((v) => v !== false);

  return (
    <div className={`schema-compact-card schema-compact-card--${status}`} id={id || name}>
      {/* Header */}
      <div className="schema-compact-card__header">
        <h3 className="schema-compact-card__name">{name}</h3>
        <div className="schema-compact-card__meta">
          <span className="schema-compact-card__col-count">{columns.length} cols</span>
          <span className={`schema-compact-card__dot schema-compact-card__dot--${status}`} />
          <span className="schema-compact-card__status-text">{statusLabels[status]}</span>
        </div>
      </div>

      {description && <div className="schema-compact-card__desc">{description}</div>}

      {/* Expand/Collapse toolbar */}
      {hasGroups && columns.length > 10 && (
        <div className="schema-compact-card__toolbar">
          <button type="button" className="schema-card__toolbar-btn" onClick={expandAll} disabled={!anyCollapsed}>Expand all</button>
          <button type="button" className="schema-card__toolbar-btn" onClick={collapseAll} disabled={!anyExpanded}>Collapse all</button>
        </div>
      )}

      {/* Column grid */}
      <div className="schema-compact__grid">
        <div className="schema-compact__header-row">
          <div className="schema-compact__header">Column</div>
          <div className="schema-compact__header">Type</div>
          <div className="schema-compact__header">Constraints</div>
        </div>
        {renderColumns()}
      </div>

      {/* JSONB schemas */}
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

      {/* Notes */}
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
