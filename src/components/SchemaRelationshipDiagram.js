import React from 'react';
import { modules, relationships } from '@site/src/data/dstSchemaData';
import '../css/schema.css';

/**
 * Data-driven relationship diagram rendered with CSS flexbox.
 *
 * Props:
 *   moduleId – (optional) filter to a single module's tables.
 *              When omitted, all modules and relationships are shown.
 */
export default function SchemaRelationshipDiagram({ moduleId }) {
  // Resolve the set of tables to display
  const relevantModules = moduleId ? modules.filter((m) => m.id === moduleId) : modules;
  const allTables = modules.flatMap((m) => m.tables.map((t) => ({ ...t, moduleId: m.id, page: m.page })));
  const tableMap = Object.fromEntries(allTables.map((t) => [t.id, t]));
  const relevantTableIds = new Set(relevantModules.flatMap((m) => m.tables.map((t) => t.id)));

  // Filter relationships to those whose both ends are in the relevant set
  const relevantRels = relationships.filter((r) => relevantTableIds.has(r.from) && relevantTableIds.has(r.to));

  // Build parent → children adjacency
  const childrenOf = {};
  relevantRels.forEach((r) => {
    if (!childrenOf[r.from]) childrenOf[r.from] = [];
    childrenOf[r.from].push(r);
  });

  // Root tables = tables with no incoming relationship in the relevant set
  const hasParent = new Set(relevantRels.map((r) => r.to));
  const roots = [...relevantTableIds].filter((id) => !hasParent.has(id));

  // Determine anchor href for a table box
  const getHref = (tableId) => {
    const t = tableMap[tableId];
    if (!t) return `#${tableId}`;
    // On a module-scoped diagram, same-page anchors for local tables
    if (moduleId && t.moduleId === moduleId) return `#${tableId}`;
    // Otherwise link to the module's page
    return `${t.page}#${tableId}`;
  };

  // Render a single table box
  const renderBox = (tableId, isChild) => {
    const t = tableMap[tableId];
    if (!t) return null;
    return (
      <a
        key={tableId}
        href={getHref(tableId)}
        className={`schema-rel__box schema-rel__box--${t.status}${isChild ? ' schema-rel__box--child' : ''}`}
      >
        <span className="schema-rel__box-name">{t.name}</span>
        <span className="schema-rel__box-cols">{t.columns} columns</span>
      </a>
    );
  };

  // Recursively render levels of the tree
  const renderTree = (nodeIds, isChildLevel = false) => {
    if (nodeIds.length === 0) return [];
    const elements = [];

    // Current level
    const isSpread = nodeIds.length > 1;
    elements.push(
      <div className={`schema-rel__level${isSpread ? ' schema-rel__level--spread' : ''}`} key={`level-${nodeIds.join('-')}`}>
        {nodeIds.map((id) => renderBox(id, isChildLevel))}
      </div>,
    );

    // Collect children and build connector
    const nextIds = [];
    let connectorLabel = null;
    nodeIds.forEach((parentId) => {
      const rels = childrenOf[parentId] || [];
      rels.forEach((r) => {
        nextIds.push(r.to);
        if (!connectorLabel) {
          connectorLabel = r.label + (r.cascade ? ' \u00B7 CASCADE' : '');
        }
      });
    });

    if (nextIds.length > 0) {
      elements.push(
        <div className="schema-rel__connector" key={`conn-${nodeIds.join('-')}`}>
          <div className="schema-rel__line" />
          <span className="schema-rel__label">{connectorLabel}</span>
        </div>,
      );
      elements.push(...renderTree(nextIds, true));
    }

    return elements;
  };

  return <div className="schema-rel">{renderTree(roots)}</div>;
}
