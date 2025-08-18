import React from "react";

const baseClasses = `
  px-4 py-[10px]
  bg-ifm-primary-dark
  text-font-color-inverse
  rounded-md
  font-bold
  text-1-0
  !no-underline
  inline-block
  transition-colors
  duration-300
  ease-in-out
  border-none
  cursor-pointer
  hover:bg-ifm-primary-lightest
  hover:text-font-color
  hover:no-underline
  disabled:opacity-60
  disabled:cursor-not-allowed
  dark:hover:bg-[#195d64]
`;

export default function Button({ children, onClick, href, to, className = "", ...props }) {
  const classes = `${baseClasses} ${className}`.replace(/\s+/g, " ");

  if (href || to) {
    return (
      <a href={href || to} className={classes} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
