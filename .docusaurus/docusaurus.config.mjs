/*
 * AUTOGENERATED - DON'T EDIT
 * Your edits in this file will be overwritten in the next build!
 * Modify the docusaurus.config.js file at your site's root instead.
 */
export default {
  "title": "RMC Software Documentation",
  "tagline": "Documentation for RMC Software Packages",
  "url": "https://USACE-RMC.github.io",
  "baseUrl": "/RMC-Software-Documentation/",
  "favicon": "img/USACE.png",
  "organizationName": "USACE-RMC",
  "projectName": "RMC-Software-Documentation",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "C:\\Users\\USACE\\OneDrive\\Documents\\GitHub\\RMC-Software-Documentation\\sidebars.js",
          "showLastUpdateTime": true,
          "remarkPlugins": [
            null,
            null
          ],
          "rehypePlugins": [
            null
          ]
        },
        "theme": {
          "customCss": "C:\\Users\\USACE\\OneDrive\\Documents\\GitHub\\RMC-Software-Documentation\\src\\css\\custom.css"
        },
        "googleAnalytics": {
          "trackingID": "G-LB2BWWGDTB",
          "anonymizeIP": true
        }
      }
    ]
  ],
  "stylesheets": [
    {
      "href": "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      "type": "text/css",
      "integrity": "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      "crossorigin": "anonymous"
    }
  ],
  "themeConfig": {
    "navbar": {
      "title": "RMC Software Documentation",
      "logo": {
        "alt": "RMC Logo",
        "src": "img/USACE.png"
      },
      "items": [
        {
          "label": "RMC Home",
          "to": "https://www.rmc.usace.army.mil/",
          "position": "right",
          "className": "rmc-home-link"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "light",
      "links": [
        {
          "label": "RMC Home",
          "to": "https://www.rmc.usace.army.mil/"
        },
        {
          "label": "RMC Training",
          "to": "https://www.rmc.usace.army.mil/Training/"
        },
        {
          "label": "RMC Software",
          "to": "https://www.rmc.usace.army.mil/Software/"
        },
        {
          "label": "RMC Library",
          "to": "https://www.rmc.usace.army.mil/Library/"
        }
      ]
    },
    "googleFonts": {
      "families": [
        "Roboto:400,500,700",
        "sans-serif"
      ]
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false
    },
    "docs": {
      "versionPersistence": "localStorage",
      "sidebar": {
        "hideable": false,
        "autoCollapseCategories": false
      }
    },
    "blog": {
      "sidebar": {
        "groupByYear": true
      }
    },
    "metadata": [],
    "prism": {
      "additionalLanguages": [],
      "theme": {
        "plain": {
          "color": "#bfc7d5",
          "backgroundColor": "#292d3e"
        },
        "styles": [
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(105, 112, 152)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "string",
              "inserted"
            ],
            "style": {
              "color": "rgb(195, 232, 141)"
            }
          },
          {
            "types": [
              "number"
            ],
            "style": {
              "color": "rgb(247, 140, 108)"
            }
          },
          {
            "types": [
              "builtin",
              "char",
              "constant",
              "function"
            ],
            "style": {
              "color": "rgb(130, 170, 255)"
            }
          },
          {
            "types": [
              "punctuation",
              "selector"
            ],
            "style": {
              "color": "rgb(199, 146, 234)"
            }
          },
          {
            "types": [
              "variable"
            ],
            "style": {
              "color": "rgb(191, 199, 213)"
            }
          },
          {
            "types": [
              "class-name",
              "attr-name"
            ],
            "style": {
              "color": "rgb(255, 203, 107)"
            }
          },
          {
            "types": [
              "tag",
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 114)"
            }
          },
          {
            "types": [
              "operator"
            ],
            "style": {
              "color": "rgb(137, 221, 255)"
            }
          },
          {
            "types": [
              "boolean"
            ],
            "style": {
              "color": "rgb(255, 88, 116)"
            }
          },
          {
            "types": [
              "keyword"
            ],
            "style": {
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "doctype"
            ],
            "style": {
              "color": "rgb(199, 146, 234)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "color": "rgb(178, 204, 214)"
            }
          },
          {
            "types": [
              "url"
            ],
            "style": {
              "color": "rgb(221, 221, 221)"
            }
          }
        ]
      },
      "magicComments": [
        {
          "className": "theme-code-block-highlighted-line",
          "line": "highlight-next-line",
          "block": {
            "start": "highlight-start",
            "end": "highlight-end"
          }
        }
      ]
    },
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "path": "i18n",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "future": {
    "experimental_faster": {
      "swcJsLoader": false,
      "swcJsMinimizer": false,
      "swcHtmlMinimizer": false,
      "lightningCssMinimizer": false,
      "mdxCrossCompilerCache": false,
      "rspackBundler": false
    },
    "experimental_storage": {
      "type": "localStorage",
      "namespace": false
    },
    "experimental_router": "browser"
  },
  "onBrokenLinks": "throw",
  "onBrokenAnchors": "warn",
  "onBrokenMarkdownLinks": "warn",
  "onDuplicateRoutes": "warn",
  "staticDirectories": [
    "static"
  ],
  "customFields": {},
  "plugins": [],
  "themes": [],
  "scripts": [],
  "headTags": [],
  "clientModules": [],
  "titleDelimiter": "|",
  "noIndex": false,
  "markdown": {
    "format": "mdx",
    "mermaid": false,
    "mdx1Compat": {
      "comments": true,
      "admonitions": true,
      "headingIds": true
    },
    "anchors": {
      "maintainCase": false
    }
  }
};
