## Bibliography

### Overview

The `Bibliography` component is a reusable React component that dynamically loads and displays a formatted bibliography list from a JSON file. It is intended for use in documentation pages where a properly structured and styled reference list is required.

### Props

| Prop      | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `bibFile` | String | ✅ Yes   | The relative path (from the public folder) to a JSON file containing citation data. |

### Functionality

- Fetches a bibliography JSON file located at `/RMC-Software-Documentation/${bibFile}`.
  - The bibliography JSON files are stored in the /static/bibliographies folder
  - Title the bibliography files with the applicable reportID (from /scripts/counters.js)
- Parses the citation data and sorts the entries alphabetically by the first author's name.
- Formats author lists intelligently:
  - Two authors are shown as “Author A and Author B”.
  - More than six authors are shortened to “Author A, et al.”
- Formats citations with support for fields like:
  - `author`, `title`, `year`, `journal`, `booktitle`, `volume`, `pages`, `doi`, `url`, `institution`, `organization`, etc.
- Outputs an ordered list (`<ol>`) of citations, each styled and linked (where applicable).

### Output Example

```text
[1] Smith, J. and Doe, A., "Understanding React," *Journal of Web Dev*, vol. 5, pp. 123–130, 2020. doi: 10.1234/abcd
[2] Adams, R., et al., "Advanced Topics in UI Design," 2021. Available: https://example.com
```

# Docusaurus Project Setup and Usage

This guide will help you set up and use Docusaurus, a modern static website generator, for your RMC Software Documentation project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Cloning the Project](#cloning-the-project)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Creating and Editing Pages](#creating-and-editing-pages)
- [Adding Features](#adding-features)
- [Customization](#customization)
- [Advanced Configuration](#advanced-configuration)
- [React Components](#react-components)
  - [Bibliography](#bibliography)
  - [Citation](#citation)
  - [CitationFootnote](#citationfootnote)
  - [ContentBox](#contentbox)
  - [ContentBoxLarge](#contentboxlarge)
  - [ContentBubble](#contentbubble)
  - [ContentBubbleLarge](#contentbubblelarge)
  - [ContentCard](#contentcard)
  - [Counters](#counters)
  - [DocumentMetadata](#documentmetadata)
  - [Equation](#equation)
  - [EquationReference](#equationreference)
  - [Figure](#figure)
  - [FigureReference](#figurereference)
  - [NavAndPrint](#navandprint)
  - [PrintToPDFButton](#printtopdfbutton)
  - [TableHorizontal](#tablehorizontal)
  - [TableReference](#tablereference)
  - [TableVersionHistory](#tableversionhistory)
  - [TableVertical](#tablevertical)
  - [TableVerticalNoCap](#tableverticalnocap)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.0.0)
- [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/) (>=1.22.0)

You can verify Node.js and npm installation by running:

```powershell
node --version
npm --version
```

## Cloning the Project

### Clone the repository:

If you haven’t already, clone the RMC Software Documentation Docusaurus project repository to your local machine:

```powershell
git clone https://github.com/your-username/RMC-Software-Documentation.git
```

### Change into the project directory

```powershell
cd RMC-Software-Documentation
```

### Install dependencies

Once you've cloned the repository, install the required dependencies:

```powershell
npm install
```

## Running Locally

To run the Docusaurus site locally, use:

```powershell
npm run start
```

This will start the development server at http://localhost:3000, and any changes you make will be reflected immediately in the browser.

## Building for Production

To build the Docusaurus site for production, use:

```powershell
npm run build
```

This will generate the static files in the build/ folder. These files are ready to be deployed to any static hosting service.

## Deployment

To deploy the Docusaurus site on GitHub pages, follow these steps:

1. Set the GIT_USER:

```powershell
$env:GIT_USER="USACE-RMC"
```

2. Deploy to GitHub pages:

```powershell
npm run deploy
```

## Project Structure

The RMC Software Documentation project follows this structure:

```
RMC-SOFTWARE-DOCUMENTATION/
    build/                          # Generated static files after building for production
    docs/                           # Documentation files
        desktop-applications/       # Documentation for desktop applications
        toolbox-technical-manuals/  # Documentation for technical manuals
        web-applications/           # Documentation for web applications
    node_modules/                   # Installed dependencies
    scripts/                        # Custom scripts
        counters.js                 # Script for handling counters in the documentation
    src/                            # Source code for custom components and pages
        components/                 # Custom React components
        css/                        # Custom CSS files
        pages/                      # Custom pages
        theme/                      # Custom theme files
    static/                         # Static files like images, fonts, etc.
        bibliographies/             # Bibliographies for citation and reference management
        counters/                   # Static files related to counters
        figures/                    # Figures for the documentation
        fonts/                      # Custom fonts
        img/                        # Images for the website
    docusaurus.config.js            # Main configuration file for Docusaurus
    LICENSE                         # License file
    package-lock.json               # Lock file for npm dependencies
    package.json                    # Project metadata and dependencies
    README.md                       # This file
    sidebars.js                     # Sidebar configuration for navigation
```

### `docs/`: Contains .mdx report files

- `desktop-applications/`: Documentation for desktop applications (such as RMC-TotalRisk, RMC-RFA, LifeSim, etc.)
- `toolbox-technical-manuals/`: RMC toolbox technical manuals
- `web-applications/`: Documentation for web applications (such as LST, DST, RRFT, etc.)
- Each document should follow a similar format and naming convention of report##-document-title.mdx
  - The first chapter is always `00-document-info.mdx` and uses the `DocumentMetadata` React component to provide document information
  - The second chapter is always `00-version-history.mdx` and uses the `TableVersionHistory` React component to provide a table of versions, descriptions of changes, and the individuals who modified, reviewed, and approved the versions
  - Each successive chapter should increase in number (01, 02, 03, etc.)

### `scripts/`: Custom scripts

- `counters.js`: JavaScript file for automatically populating figure, table, and equation numbers
  - Prior to running the project locally or building for production, all files and their corresponding `reportIDs` should be added to the `counters.js` file
  - Upon project start or build, this script searches through each .mdx file within the specified `reportIDs` to count the number of times the `Figure`, `TableHorizontal`, `TableVertical`, and `Equation` React components are used
  - Each instance of the specified React components is logged in a newly created JSON file with a title of "reportID.json" inside the `/static/counters` folder
  - Figures, tables, and equations are logged separately using the file format below
  - Counters JSON files are used by `FigureReference`, `TableReference`, and `EquationReference` React components to automatically assign figure, table, and equation numbers to captions and text references
    - React components and JSON files are tied together through `figKey`, `tableKey`, and `equationKey` properties

```
"01-chapter-title.mdx": {
    "figures": {
      "{figKey}": {                         # figKey is a user-defined property passed to the Figure component
        "figNumber": 1,                     # Figure numbers are automatically assigned in sequential order
                                              for all .mdx files within a single report
        "parentDocId": {reportID},          # parentDocId is a property passed to the Figure component and aligns
                                              with the reportID from counters.js
        "parentDocPath": {parentDocPath},   # parentDocPath is automatically assigned during script execution
        "docId": "01-chapter-title.mdx"     # docId is automatically assigned during script execution
      },
      "{figKey}": {                         # figKey is a property passed to the Figure component
        "figNumber": 2,                     # Figure numbers are automatically assigned in sequential order
        "parentDocId": {reportID},          # parentDocId is a property passed to the Figure component and aligns
                                              with the reportID from counters.js
        "parentDocPath": {parentDocPath},   # parentDocPath is automatically assigned during script execution
        "docId": "01-chapter-title.mdx"     # docId is automatically assigned during script execution
      },
    },
    "tables": {
      "{tableKey}": {                       # tableKey is a user-defined property passed to the Table component
        "tableNumber": 1,                   # Table numbers are automatically assigned in sequential order
                                              for all .mdx files within a single report
        "parentDocId": {reportID},          # parentDocId is a property passed to the Figure component and aligns
                                              with the reportID from counters.js
        "parentDocPath": {parentDocPath},   # parentDocPath is automatically assigned during script execution
        "docId": "01-chapter-title.mdx"     # docId is automatically assigned during script execution
      }
    },
    "equations": {
      "{equationKey}": {                    # equationKey is a user-defined property passed to the Table component
        "equationNumber": 1,                # Equation numbers are automatically assigned in sequential order
                                              for all .mdx files within a single report
        "parentDocId": {reportID},          # parentDocId is a property passed to the Figure component and aligns
                                              with the reportID from counters.js
        "parentDocPath": {parentDocPath},   # parentDocPath is automatically assigned during script execution
        "docId": "01-chapter-title.mdx"     # docId is automatically assigned during script execution
      }
    }
  },
```

### `src/`: React components, styles, pages, and theme files

- `components/`: React components used throughout the project
- `css/`: Custom CSS files for styling
  - `custom.css` contains styles that apply to every page or multiple React components
  - Other CSS files are specific to the React component they are named after
- `pages/`: Custom web pages such as website home page, hubs, sub-hubs, and index pages
  - `index.js`: Home page for the RMC Software Documentation website
- `theme/`: Custom theme-related files

### `static/`: Static files like bibliographies, counters, figure images, and fonts

- `bibliographies/`: JSON files used by Bibliography React component to create reference lists
  - References should be formatted using IEEE style guide
- `counters/`: JSON files created by the counters.js script as described above
  - Each reportID should have its own counters JSON file
- `figures/`: Repository of figure images used within the reports in the Documentation website
  - The naming convention for items within the figures/ folder should follow that of the `docs/` folder:
    - desktop-applications
    - toolbox-technical-manuals
      - internal-erosion-suite
        - backward-erosion-piping-progression
          - figure1
          - figure2
          - figure3
    - web-applications
  - File names for figure images can be assigned arbitrarily but will need to be referenced by Figure components in `.mdx` files, so an intuitive naming convention is recommended
- `fonts/`: Contains downloaded font files for use with custom CSS
- `img/`: Contains static images used within website pages

### sidebars.js

- Creates a custom sidebar for each document/report in the `docs/` directory
- Each export key (e.g., `totalRiskUsersGuideSidebar`) defines a separate sidebar
- Items are listed in the order they should appear in the sidebar
- Each item is either:

  - A single doc:

    `{ type: 'doc', id: 'path/to/doc', label: 'Custom Label' }`

  - Or a collapsible category:
    ```
        {
          type: 'category',
          label: 'Category Title',
          collapsible: true,
          collapsed: true,
          items: [/* array of doc items */],
        }
    ```

- `id` corresponds to the relative file path from `docs/` without the `.mdx` extension
- `label` is the text shown in the sidebar navigation
- The order of items in each array controls the order they appear in the sidebar
- No front matter (`sidebar_label`, `sidebar_position`) is needed in the `.mdx` files
- The following is a typical example of a sidebar for a document:

```
bepProgressionSidebar: {
    "RMC Filter Evaluation (Continuation) Toolbox": [
      {
        type: "category",
        label: "Document Information",
        collapsible: true,
        collapsed: true,
        items: [
          {
            type: "doc",
            id: "toolbox-technical-manuals/backward-erosion-piping-progression/document-info",
            label: "Document Info",
          },
          {
            type: "doc",
            id: "toolbox-technical-manuals/backward-erosion-piping-progression/version-history",
            label: "Version History",
          },
        ],
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/introduction",
        label: "Introduction",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/terms-and-conditions-for-use",
        label: "Terms and Conditions for Use",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/general-overview",
        label: "General Overview",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/background",
        label: "Background",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/schmertmann",
        label: "Schmertmann",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/sellmeijer",
        label: "Sellmeijer",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/creep-ratios",
        label: "Creep Ratios",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/summary",
        label: "Summary",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/references",
        label: "References",
      },
      {
        type: "doc",
        id: "toolbox-technical-manuals/backward-erosion-piping-progression/appendix-acronyms",
        label: "Appendix A - Acronyms",
      },
    ],
  },
```
