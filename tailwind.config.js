/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./docs/**/*.{js,ts,jsx,tsx,md,mdx}", // ✅ Recursive match for ALL docs content
    "./blog/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        usace: ["Roboto", "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        "1-0": "1rem",
        "1-25": "1.25rem",
        "1-5": "1.5rem",
        "1-75": "1.75rem",
        "2-0": "2rem",
        10: "10px",
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        caption: "clamp(0.7rem, 2vw, 0.9rem)",
        normal: "clamp(0.8rem, 2vw, 1.0rem)",
        "content-bubble": "clamp(1.0rem, 2vw, 1.2rem)",
        large: "clamp(1.1rem, 2vw, 1.5rem)",
        xlarge: "clamp(1.2rem, 2.5vw, 1.4rem)",
        xxlarge: "clamp(1.5rem, 3vw, 3.0rem)",
        xxxlarge: "clamp(1.8rem, 2.5vw, 2.0rem)",
        navbar: "clamp(0.8rem, 2vw, 1.0rem)",
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
        "background-theme": "var(--ifm-background-color-theme)",

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
    screens: {
      sm: "0px",
      md: "900px",
      lg: "1761px",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
