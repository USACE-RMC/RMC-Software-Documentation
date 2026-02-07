import React, { useState, useEffect } from 'react';
import SchemaTag from './SchemaTag';
import '../css/schema.css';

export default function SchemaTable({ name, description, status = 'implemented', columns, notes, jsonSchemas, id }) {
  const statusLabels = { implemented: 'Implemented', partial: 'Partial', planned: 'Planned' };
  const statusColors = { implemented: 'schema-tag--jsonb', partial: 'schema-tag--pk', planned: 'schema-tag--type' };

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
  const COLLAPSE_THRESHOLD = 4;

  // Collapsible groups: collapse groups with >COLLAPSE_THRESHOLD columns by default
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {};
    if (hasGroups) {
      groups.forEach((g) => {
        initial[g.name || '__ungrouped'] = g.columns.length <= COLLAPSE_THRESHOLD;
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

  // Render a single column row
  const renderColumnRow = (col, visualIndex) => (
    <div key={col.name} className={`schema-columns__row ${visualIndex % 2 === 1 ? 'schema-columns__row--even' : ''}`}>
      <div className="schema-columns__cell schema-columns__cell--name" data-label="Column">{col.name}</div>
      <div className="schema-columns__cell schema-columns__cell--type" data-label="Type">{col.type}</div>
      <div className="schema-columns__cell schema-columns__cell--tags" data-label="Constraints">
        {col.tags &&
          col.tags.map((tag) => {
            if (tag === 'pk') return <SchemaTag key="pk" type="pk">PK</SchemaTag>;
            if (tag === 'fk') {
              const target = col.fkTarget || null;
              return <SchemaTag key="fk" type="fk" href={target ? `#${target}` : undefined}>{target ? `\u2192 ${target}` : 'FK'}</SchemaTag>;
            }
            if (tag === 'unique') return <SchemaTag key="uq" type="unique">UQ</SchemaTag>;
            if (tag === 'indexed') return <SchemaTag key="idx" type="indexed">IDX</SchemaTag>;
            if (tag === 'nullable') return <SchemaTag key="null" type="nullable">NULL</SchemaTag>;
            if (tag === 'jsonb') return <SchemaTag key="jsonb" type="jsonb">JSONB</SchemaTag>;
            if (tag === 'cascade') return <SchemaTag key="cascade" type="cascade">CASCADE</SchemaTag>;
            if (tag === 'default') return <SchemaTag key="default" type="default" title={col.default || ''}>DEFAULT</SchemaTag>;
            return null;
          })}
      </div>
      <div className="schema-columns__cell schema-columns__cell--desc" data-label="Description">{col.description}</div>
    </div>
  );

  // Render columns — with or without collapsible groups
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
            className={`schema-columns__group-separator ${colCount > COLLAPSE_THRESHOLD ? 'schema-columns__group-separator--interactive' : ''}`}
            onClick={colCount > COLLAPSE_THRESHOLD ? () => toggleGroup(groupKey) : undefined}
            role={colCount > COLLAPSE_THRESHOLD ? 'button' : undefined}
            tabIndex={colCount > COLLAPSE_THRESHOLD ? 0 : undefined}
            onKeyDown={colCount > COLLAPSE_THRESHOLD ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGroup(groupKey); } } : undefined}
          >
            <span className="schema-columns__group-name">
              {colCount > COLLAPSE_THRESHOLD && (
                <span className={`schema-columns__group-chevron ${isExpanded ? 'schema-columns__group-chevron--open' : ''}`}>{'\u25B8'}</span>
              )}
              {group.name}
            </span>
            <span className="schema-columns__group-count">{colCount} columns</span>
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
    <div className={`schema-card schema-card--${status}`} id={id || name}>
      <div className="schema-card__header">
        <div className="schema-card__title-area">
          <span className="schema-card__label">TABLE</span>
          <h3 className="schema-card__name">{name}</h3>
          <span className="schema-card__col-count">{columns.length} cols</span>
        </div>
        <div className="schema-card__status">
          <span className={`schema-tag ${statusColors[status]}`}>{statusLabels[status] || status}</span>
        </div>
      </div>

      <div className="schema-card__description">{description}</div>

      {hasGroups && columns.length > 10 && (
        <div className="schema-card__toolbar">
          <button type="button" className="schema-card__toolbar-btn" onClick={expandAll} disabled={!anyCollapsed}>Expand all</button>
          <button type="button" className="schema-card__toolbar-btn" onClick={collapseAll} disabled={!anyExpanded}>Collapse all</button>
        </div>
      )}

      <div className="schema-columns">
        <div className="schema-columns__header-row">
          <div className="schema-columns__header">Column</div>
          <div className="schema-columns__header">Type</div>
          <div className="schema-columns__header">Constraints</div>
          <div className="schema-columns__header">Description</div>
        </div>
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
