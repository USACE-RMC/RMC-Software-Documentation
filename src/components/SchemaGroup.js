import React from 'react';
import '../css/schema.css';

export default function SchemaGroup({ title, description, relationships, children, id }) {
  const relTypeLabels = {
    'one-to-one': '1:1',
    'one-to-many': '1:N',
    'many-to-many': 'N:N',
  };

  return (
    <div className="schema-group" id={id}>
      <div className="schema-group__header">
        <h3 className="schema-group__title">{title}</h3>
        {description && <p className="schema-group__description">{description}</p>}
      </div>

      <div className="schema-group__content">
        {relationships && relationships.length > 0 && (
          <div className="schema-group__relationships">
            {relationships.map((rel, i) => (
              <div key={i} className="schema-group__rel-badge">
                <span className="font-mono text-xs font-medium">{rel.from}</span>
                <span className="schema-group__rel-arrow">&rarr;</span>
                <span className="font-mono text-xs font-medium">{rel.to}</span>
                <span className="schema-group__rel-label">
                  {relTypeLabels[rel.type] || rel.type}
                  {rel.label ? ` ${rel.label}` : ''}
                  {rel.onDelete ? ` (${rel.onDelete})` : ''}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
