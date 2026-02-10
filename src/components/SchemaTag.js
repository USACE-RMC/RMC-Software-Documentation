import React from 'react';
import '../css/schema.css';

export default function SchemaTag({ type, children, href, title }) {
  if (href) {
    return (
      <a href={href} className={`schema-tag schema-tag--${type}`} title={title}>
        {children}
      </a>
    );
  }
  return <span className={`schema-tag schema-tag--${type}`} title={title}>{children}</span>;
}
