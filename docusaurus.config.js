import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";

export default {
  title: "RMC Software Documentation",
  tagline: "Documentation for RMC Software Packages",
  url: "https://USACE-RMC.github.io", // Replace with your site's URL
  baseUrl: "/RMC-Software-Documentation/",
  favicon: "img/USACE.png",
  organizationName: "USACE-RMC", // Your GitHub organization or username
  projectName: "RMC-Software-Documentation", // Your project name, make sure this matches your GitHub repo name

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
          breadcrumbs: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themes: ["@docusaurus/theme-live-codeblock"],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-LB2BWWGDTB",
        anonymizeIP: true, // Optional: anonymizes IPs for privacy
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: "RMC Software Documentation",
      logo: {
        alt: "RMC Logo",
        src: "img/USACE.png",
      },
      items: [
        {
          label: "RMC Home",
          to: "https://www.rmc.usace.army.mil/",
          position: "right",
          className: "rmc-home-link",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          label: "RMC Home",
          to: "https://www.rmc.usace.army.mil/",
        },
        {
          label: "RMC Training",
          to: "https://www.rmc.usace.army.mil/Training/",
        },
        {
          label: "RMC Software",
          to: "https://www.rmc.usace.army.mil/Software/",
        },
        {
          label: "RMC Library",
          to: "https://www.rmc.usace.army.mil/Library/",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    googleFonts: {
      families: ["Roboto:400,500,700", "sans-serif"],
    },
  },
};
