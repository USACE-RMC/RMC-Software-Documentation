import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// Tailwind custom plugin
const tailwindPlugin = async function tailwindPlugin(context, options) {
  return {
    name: 'docusaurus-tailwindcss',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require('tailwindcss'));
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
};

export default {
  title: 'RMC Software Documentation',
  tagline: 'Documentation for RMC Software Packages',
  onBrokenAnchors: 'warn',
  url: 'https://USACE-RMC.github.io', // Replace with your site's URL
  baseUrl: '/RMC-Software-Documentation/',
  favicon: 'img/USACE.png',
  organizationName: 'USACE-RMC', // Your GitHub organization or username
  projectName: 'RMC-Software-Documentation', // Your project name, make sure this matches your GitHub repo name

  // ✅ Enable Mermaid parsing in Markdown/MDX
  markdown: { mermaid: true },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
          breadcrumbs: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  // ✅ Register Mermaid theme alongside your existing theme(s)
  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  plugins: [
    // Google Analytics plugin
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-LB2BWWGDTB',
        anonymizeIP: true,
      },
    ],

    // TailwindCSS as a custom plugin
    tailwindPlugin,
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'RMC Software Documentation',
      logo: {
        alt: 'RMC Logo',
        src: 'img/USACE.png',
      },
      items: [
        {
          label: 'RMC Website',
          to: 'https://www.rmc.usace.army.mil/',
          position: 'right',
          className: 'rmc-home-link',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          label: 'RMC Home',
          to: 'https://www.rmc.usace.army.mil/',
        },
        {
          label: 'RMC Training',
          to: 'https://www.rmc.usace.army.mil/Training/',
        },
        {
          label: 'RMC Software',
          to: 'https://www.rmc.usace.army.mil/Software/',
        },
        {
          label: 'RMC Library',
          to: 'https://www.rmc.usace.army.mil/Library/',
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
      families: ['Roboto:400,500,700', 'sans-serif'],
    },
    algolia: {
      appId: '5IPYQGAW1I',
      apiKey: '797fecb09f4d22f8050f47976027c58c',
      indexName: 'usace-rmcio',
    },

    // ✅ Mermaid configuration
    // NOTE: "themeVariables" must live under "options" to pass Docusaurus validation.
    mermaid: {
      theme: {
        light: 'neutral', // pick a light-friendly Mermaid theme
        dark: 'dark', // and a dark-friendly theme
      },
      options: {
        themeVariables: {
          // Map to your custom.css palette (light mode)
          primaryColor: '#1f6f78',
          primaryTextColor: '#11181c',
          primaryBorderColor: '#155259',
          secondaryColor: '#44a8b4',
          tertiaryColor: '#2f8e99',
          lineColor: '#155259',

          // Node/cluster defaults
          nodeTextColor: '#11181c',
          clusterBkg: '#f9f9f9',
          clusterBorder: '#e5e7eb',
          background: '#ffffff',
          edgeLabelBackground: '#ffffff',

          // Typography
          fontFamily: 'Roboto, sans-serif',
        },
      },
    },
  },
};
