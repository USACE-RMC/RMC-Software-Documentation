import React from 'react';
import '../css/schema.css';

export default function SchemaTag({ type, children }) {
  return <span className={`schema-tag schema-tag--${type}`}>{children}</span>;
}
