/** @type {import('tailwindcss').Config} */
export default {
  prefix: "gw-",
  content: [
    "./index.html",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        usace: ["Roboto", "Arial", "Helvetica", "sans-serif"],
      },
      gridTemplateRows: {
        "1fr-auto": "1fr auto",
      },
      colors: {
        // Static USACE brand and nav colors
        "nav-light-gray": "#d0d0d0",
        "nav-gray": "hsla(0, 0%, 80%, 0.9)",
        "nav-translucent-gray": "hsla(0, 0%, 100%, 0.2)",
        "nav-black": "#18181b",
        "nav-dark-gray": "rgba(51,51,51,.95)",
        "usace-box-light-gray": "#ededed",
        "usace-box-red": "#de1e2e",
        "footer-black": "#1b1b1b",
        "footer-gray": "#333",
        "footer-light-gray": "#ccc",
        "usace-black": "#18181b",
        "gov-banner-gray": "#aebfd4",
        "gov-banner-black": "#15263b",

        // Dynamically linked to CSS variables
        "border-color": "var(--border-color)",
        "font-color": "var(--font-color)",
        "font-color-inverse": "var(--font-color-inverse)",
        "sidebar-bg": "var(--sidebar-background-color)",
        "sidebar-text": "var(--sidebar-text-color)",

        "ifm-primary": "var(--ifm-color-primary)",
        "ifm-primary-dark": "var(--ifm-color-primary-dark)",
        "ifm-primary-darker": "var(--ifm-color-primary-darker)",
        "ifm-primary-darkest": "var(--ifm-color-primary-darkest)",
        "ifm-primary-light": "var(--ifm-color-primary-light)",
        "ifm-primary-lighter": "var(--ifm-color-primary-lighter)",
        "ifm-primary-lightest": "var(--ifm-color-primary-lightest)",

        "ifm-footer-link": "var(--ifm-footer-link-color)",
        "ifm-footer-link-hover": "var(--ifm-footer-link-hover-color)",
        "ifm-link": "var(--ifm-link-color)",
        "ifm-link-hover": "var(--ifm-link-hover-color)",
        "ifm-link-active": "var(--ifm-link-active-color)",
        "ifm-link-visited": "var(--ifm-link-visited-color)",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
};
