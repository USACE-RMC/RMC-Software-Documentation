// src/components/Button.js
import React from 'react';
import '../css/Button.css';

export default function Button({ children, onClick, href, to, className = '', ...props }) {
  if (href || to) {
    return (
      <a
        href={href || to}
        className={`custom-button ${className}`}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`custom-button ${className}`} {...props}>
      {children}
    </button>
  );
}