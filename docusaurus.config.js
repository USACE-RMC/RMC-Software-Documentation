import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default {
  title: "RMC Software Documentation",
  tagline: "Documentation for RMC Software Packages",
  url: "https://your-site-url.com", // Replace with your site's URL
  baseUrl: "/",
  favicon: "img/USACE.png",
  organizationName: "your-org-name", // Your GitHub organization or username
  projectName: "RMC-Software-Documentation", // Your project name, make sure this matches your GitHub repo name

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
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
  },
};
