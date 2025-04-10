# RMC Software Documentation - Docusaurus Project Setup and Usage

This guide will help you set up and use Docusaurus, a modern static website generator, for the RMC Software Documentation project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Cloning the Project](#cloning-the-project)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
  - [Docs](#docs)
  - [Scripts](#scripts)
  - [Src](#src)
  - [Static](#static)
  - [Sidebars](#sidebarsjs)
  - [Other](#other)
    - [Docusaurus Configuration](#docusaurusconfigjs)
    - [License](#license)
    - [Dependencies](#project-dependencies)
- [Creating and Editing Pages](#creating-and-editing-pages)
  - [MDX Basics](#file-basics)
  - [Front Matter](#front-matter)
  - [Markdown Content](#markdown-content)
    - [Headings](#headings)
    - [Text Formatting](#text-formatting)
    - [Paragraphs and Line Breaks](#paragraphs-and-line-breaks)
    - [Code Blocks](#code-blocks)
  - [JSX and Components](#jsx-and-components)
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
        versions.js                 # Script to aid in version control
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
        versions/                   # JSON files for version control
    docusaurus.config.js            # Main configuration file for Docusaurus
    LICENSE                         # License file
    package-lock.json               # Lock file for npm dependencies
    package.json                    # Project metadata and dependencies
    README.md                       # This file
    sidebars.js                     # Sidebar configuration for navigation
```

### `docs/`

- Contains .mdx report files

- `desktop-applications/`: Documentation for desktop applications (such as RMC-TotalRisk, RMC-RFA, LifeSim, etc.)

- `toolbox-technical-manuals/`: RMC toolbox technical manuals

- `web-applications/`: Documentation for web applications (such as LST, DST, RRFT, etc.)

- Each document should follow a similar format and naming convention of report##-document-title.mdx

  - The first chapter is always `00-document-info.mdx` and uses the `DocumentMetadata` React component to provide document information

  - The second chapter is always `00-version-history.mdx` and uses the `TableVersionHistory` React component to provide a table of versions, descriptions of changes, and the individuals who modified, reviewed, and approved the versions

  - Each successive chapter should increase in number (01, 02, 03, etc.)

- The file path for each report should follow the same standard:

  - For desktop applications: `docs/desktop-applications/{software-name}/{report-title}/{version-number}/{document-name}`

  - For toolbox technical manuals: `docs/toolbox-technical-manuals/{toolbox-suite}/{toolbox-name}/{version-number}/{document-name}`

  - For web applications: `docs/web-applications/{web-app-name}/{report-title}/{version-number}/{document-name}`

### `scripts/`

- `counters.js`: JavaScript file for automatically populating figure, table, and equation numbers

  - Prior to running the project locally or building for production, all files and their corresponding `reportIDs` should be added to the `counters.js` file

  - Upon project start or build, this script searches through each .mdx file within the specified `reportIDs` to count the number of times the `Figure`, `TableHorizontal`, `TableVertical`, and `Equation` React components are used

  - Each instance of the specified React components is logged in a newly created JSON file with a title of "reportID.json" inside the `/static/counters` folder

  - Figures, tables, and equations are logged separately using the file format below

  - Counters JSON files are used by `FigureReference`, `TableReference`, and `EquationReference` React components to automatically assign figure, table, and equation numbers to captions and text references

    - React components and JSON files are tied together through `figKey`, `tableKey`, and `equationKey` properties

  - Example counters.json file:

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

- `versions.js`

  - JavaScript file for creating static JSON files used for version control

  - This script recursively searches through the `docs` folder and looks for folders that follow `v#.#.#` format

  - Two static JSON files are created in the `static/versions`folder:

    - `latestVersions.json`

      - This file contains the latest version number for each document in the `docs` folder

      - The version numbers in this file are used by the `VersionSelector` React component to automatically default the version dropdown menu on the webpage to the latest version

      ```json
      {
        "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-initiation": "v1.0.0",
        "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression": "v1.1.0",
        "toolbox-technical-manuals/internal-erosion-suite/breach": "v1.0.0",
      }
      ```

    - `versionList.json`

      - This file contains all available version numbers for each document in the `docs` folder

      - The version numbers in this file are used by the `VersionSelector` React component to populate the version dropdown menu with all available document versions

      ```json
      {
        "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression": [
          "v1.0.0",
          "v1.1.0"
        ],
      }
      ```

### `src/`

- React components, styles, pages, and theme files

- `components/`: React components used throughout the project

- `css/`: Custom CSS files for styling

  - `custom.css` contains styles that apply to every page or multiple React components

  - Other CSS files are specific to the React component they are named after

- `pages/`: Custom web pages such as website home page, hubs, sub-hubs, and index pages

  - `index.js`: Home page for the RMC Software Documentation website

- `theme/`: Custom theme-related files

### `static/`

- Static files like bibliographies, counters, figure images, and fonts

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

- `versions/`: Contains two JSON files produced by the `verions.js` script

  - `latestVersions.json`: Contains a list of the latest versions for each report in the `docs` folder

  - `versionList.json`: Contains lists of all versions of each report in the `docs` folder

### `sidebars.js`

- Creates a custom sidebar for each report in the `docs/` folder
- Sidebars contain an export key, version number, and the items to be included in the sidebar
  - Export keys should be intuitively named
    - For example `bepProgressionSidebar` for the Backward Erosion Piping (Progression) Toolbox Technical Manual
  - Version numbers should be appended to the export keys to reflect the version that the sidebar is defining
    - A unique sidebar is required for each version of a document
    - For example, version 1.0.0 of the BEP (Progression) sidebar would be appended to the export key as `bepProgressionSidebar_v_1_0_0`
      - Version 1.1.0 would be appended to the export key as `bepProgressionSidebar_v_1_1_0`
  - Items are listed in the order they should appear in the sidebar
    - Items can take the form of single docs or collapsible categories
      - Single doc:
      ```js
      {
        type: 'doc',
        id: 'path/to/doc',
        label: 'Custom Label'
      }
      ```
      - Collapsible category:
        ```js
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
      - No front matter (`sidebar_label`, `sidebar_position`) is needed in the `.mdx` files
    - All sidebars should follow a consistent layout:
      - Document Information (category, collapsed: true)
        - Document Info (single doc)
        - Version History (single doc)
      - Main Report (category, collapsed: false)
        - Introduction (single doc)
        - Report Chapters
      - Appendices (category, collapsed: true)
        - Appendix A - {title} (single doc)
        - Appendix B - {title} (single doc)
- The following is an example sidebar for Version 1.0.0 of the Backward Erosion Piping (Progression) Toolbox Technical Manual:

```js
bepProgressionSidebar_v1_0_0: {
  "RMC Backward Erosion Piping (Progression) Toolbox": [
    {
      type: "category",
      label: "Document Information",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/document-info",
          label: "Document Info",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/version-history",
          label: "Version History",
        },
      ],
    },
    {
      type: "category",
      label: "Main Report",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/introduction",
          label: "Introduction",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/terms-and-conditions-for-use",
          label: "Terms and Conditions for Use",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/general-overview",
          label: "General Overview",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/background",
          label: "Background",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/schmertmann",
          label: "Schmertmann",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/sellmeijer",
          label: "Sellmeijer",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/creep-ratios",
          label: "Creep Ratios",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/summary",
          label: "Summary",
        },
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/references",
          label: "References",
        },
      ],
    },
    {
      type: "category",
      label: "Appendices",
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          id: "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0.0/appendix-acronyms",
          label: "Appendix A - Acronyms",
        },
      ],
    },
  ],
},
```

### Other

#### `docusaurus.config.js`

- Configuration file for the RMC Software Documentation website

#### `LICENSE`

- This project is licenses under the MIT License © 2025 Risk Management Center

#### Project Dependencies

- `package.json`
  - This file lists the project's dependencies, scripts, and metadata. It defines the required vesions of packages needed to run or build the documentation site, and it includes custom scripts like `counters`, `versions`, `run`, `build`, and `deploy` for Docusaurus.
- `package-lock.json`
  - This file locks the exact versions of every package (and sub-package) installed at the time of `npm install`. It ensures that everyone working on the project uses the same dependency versions, which improves consistency across environments.

## Creating and Editing Pages

`.mdx` (Markdown + JSX) allows you to write Markdown content and use React components side-by-side.

To create a new .mdx file in Visual Studio Code, right click on the folder that the file will be located and click "New File". Name the file with your desired name and add `.mdx` for the document type. Follow the naming and numbering convention outlined in the [`docs/`](#docs) section.

### MDX Basics

- File extension: `.mdx`

- Location: Inside the `docs` folder

- Treated as pages in Docusaurus when placed in the `docs` folder and linked in the sidebar

### Front Matter

- `.mdx` files can begin with YAML front matter, wrapped in triple dashes:

```mdx
---
reportDate: November 2023
reportType: Computer Program Document
reportTitle: RMC Backward Erosion Piping (Progression) Toolbox
reportSubTitle: RMC Internal Erosion Suite
reportAuthors: ["Tim O'Leary, Risk Management Center"]
reportAbstract: The spreadsheet tools contained in this toolbox deterministically and probabilistically assess the likelihood of backward erosion piping progression (hydraulic condition) using the adjusted Schmertmann (2000) method and the adjusted calculation rule of Sellmeijer et al. (2011) in addition to creep ratio methods of Bligh (1910) and Lane (1935).
reportSubjectTerms: ["Internal erosion", "backward erosion piping", "Schmertmann", "Sellmeijer", "Bligh", "Lane", "creep ratio"]
responsiblePersonName: Tim O'Leary
responsiblePersonNumber: 502-315-6599
---
```

- In the RMC Software Documentation project, the only `.mdx` files that contain front matter are `00-document-info.mdx`, which the front matter being called as a prop for the `<DocumentMetadata>` React component.

### Markdown Content

`.mdx` supports standard Markdown syntax out of the box.

#### Headings

Use `#` to `######` to create headings from level 1 to 6

```mdx
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

#### Text Formatting

- `**Bold text**` **Bold text**

- `*Italic text*` _Italic text_

- `~~Strikethrough~~` ~~Strikethrough~~

- `**_Bold and italic_**` **_Bold and italic_**

- HTML tags can also be used to format text

  - `<b>Bold text</b>` <b>Bold text</b>

  - `<i>Italic text</i>` <i>Italic text</i>

  - `<b><i>Bold and italic text</i></b>` <b><i>Bold and italic text</i></b>

  - `<u>Underline text</u>` <u>Underline text</u>

  - `<sub>Subscript text</sub>` <sub>Subscript text</sub>

  - `<sup>Superscript text</sup>` <sup>Superscript text</sup>

#### Paragraphs and Line Breaks

- Separate paragraphs with a blank line. To force a line break, end the line with <b>two spaces</b>.

#### Lists

- Bullet list

```mdx
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
```

- Numbered list

```mdx
1. Step one
2. Step two
  1. Sub-step
```

#### Code Blocks

- Inline code: use backticks for inline code:

````mdx
```Inline code block```
````

- Fenced code block (with syntax highlighting)

````mdx
```js title="example.js"
function greet(name) {
  return `Hello, ${name}!`;
}```
````

- Live code block: primarily supports JSX

````mdx
```jsx live
function Hello({ name="Name" }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
    <div>
  );
}```
````

### JSX and Components

React components can be inserted anywhere in `.mdx` files. Components must be imported from the `src` folder into the `.mdx` file before they can be used.

```jsx
import { MyComponent } from '@site/src/comopnents/MyComponent';

<MyComopnent someProp="value" />
```

React components available within the RMC Software Documentation project are outlined [here](#react-components)

## React Components

The following React components are available for use within the RMC Software Documentation project. Each component description provides an overview of the component functionality, props required for component use, and example code for component use within `.mdx` files.

This list does not include components used to create and format hub, sub-hub, or index website pages.

### Bibliography

<b><u>Overview and Functionality</u></b>

- The `Bibliography` component is a reusable React component that dynamically loads and displays a formatted bibliography list from a JSON file. It is intended for use in documentation pages where a properly structured and styled reference list is required.

- Functionality is as follows:
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

<b><u>Props</u></b>

| Prop      | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `bibFile` | String | ✅ Yes   | The relative path (from the public folder) to a JSON file containing citation data. |

<b><u>Example Usage</u></b>

```jsx
<Bibliography bibFile="/bibliographies/108_1_0_0-bib.json" />
```

### Citation

<b><u>Overview and Functionality</u></b>

- The `Citation` component is used to display a citation reference within a document. It fetches citation data from a specified bibliography JSON file and assigns a unique citation number to each citation based on its position in the list.
- Functionality is as follows:
  - Fetches the bibliography JSON file from the path provided via the `bibFile` prop.
  - Sorts the citations alphabetically by the first author's name.
  - Finds the citation matching the `citationKey` and assigns it a citation number.
  - Stores the citation per document to avoid duplication and ensures the citation number is consistent across the document.
  - Dispatches an event to notify other components (e.g., `CitationFootnote`) when citations are updated.
  - Outputs the citation number as a clickable link, which points to the corresponding footnote.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                                 |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| `citationKey` | String | ✅ Yes   | The unique key for the citation, which corresponds to the citation in the JSON file.        |
| `bibFile`     | String | ✅ Yes   | The relative path (from the public folder) to a JSON file containing the bibliography data. |

<b><u>Example Usage</u></b>

```jsx
<Citation citationKey="Schmertmann2000" bibFile="/bibliographies/108_1_0_0-bib.json" />
```

### CitationFootnote

<b><u>Overview and Functionality</u></b>

- The `CitationFootnote` component is responsible for rendering the full citation details for all used citations inside a single `.mdx` document. It scans the `.mdx` file, gathers all instances of the `<Citation>` component, and provides a list of citations at the bottom of the document.
- Functionality is as follows:
  - Fetches the list of citations used in the current document by calling `getUsedCitations` based on the document's pathname.
  - Renders each citation in a numbered list format.
  - Formats citations using IEEE format.
  - Each citation is rendered with a clickable link to the corresponding footnote.

<b><u>Props</u></b>

This component does not accept any props.

<b><u>Example Usage</u></b>

```jsx
<CitationFootnote />
```

### DocumentMetadata

<b><u>Overview and Functionality</u></b>

- The `DocumentMetadata` component displays metadata about a report in a table format.
- Functionality is as follows:
  - Displays metadata fields such as report date, type, title, authors, abstract, and responsible person.
  - Supports both string and array formats for certain fields (authors, subject terms).
  - The table renders the metadata with headers and corresponding values for each field.

<b><u>Props</u></b>

| Prop       | Type   | Required | Description                                                                                                                                                                                                                                          |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metadata` | Object | ✅ Yes   | The metadata object containing the report's details. It should include `reportDate`, `reportType`, `reportTitle`, `reportSubTitle`, `reportAuthors`, `reportAbstract`, `reportSubjectTerms`, `responsiblePersonName`, and `responsiblePersonNumber`. |

<b><u>Example Usage</u></b>

```jsx
const metadata = {
  reportDate: "April 9, 2025",
  reportType: "Technical Report",
  reportTitle: "Risk Management Center Software Documentation",
  reportSubTitle: "Version 1.0",
  reportAuthors: ["John Doe", "Jane Smith"],
  reportAbstract: "This document provides an overview of the RMC Software.",
  reportSubjectTerms: ["Risk Management", "Software", "Documentation"],
  responsiblePersonName: "John Doe",
  responsiblePersonNumber: "123-456-7890",
};

export default function ReportPage() {
  return (
    <div>
      <h1>RMC Software Documentation</h1>
      <DocumentMetadata metadata={metadata} />
    </div>
  );
}
```

### Equation

<b><u>Overview and Functionality</u></b>

- The `Equation` component is used to display mathematical equations within a document. It can render equations either inline or as block equations, using the KaTeX library for rendering LaTeX math.
- Functionality is as follows:
  - Fetches the equation number from a JSON file containing counters based on the `parentDocId` and `equationKey`.
  - If the equation number is found, it renders the equation with the appropriate tag.
  - Supports both inline and block rendering via the `inline` prop.

<b><u>Props</u></b>

| Prop          | Type    | Required | Description                                                                                             |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `parentDocId` | String  | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for equation counters.        |
| `equationKey` | String  | ✅ Yes   | A unique key that identifies the specific equation within the parent document.                          |
| `equation`    | String  | ✅ Yes   | The LaTeX string representing the equation to be rendered.                                              |
| `inline`      | Boolean | ❌ No    | If `true`, renders the equation inline; otherwise, renders it as a block equation. Defaults to `false`. |

<b><u>Example Usage</u></b>

```jsx
<Equation parentDocId="108_1_0_0" equationKey="fs-pipe-progression" equation="FS = \left(\frac{C_D C_L C_S C_K C_γ C_Z C_α i_{\textit{pmt}}}{C_R i_f}\right)" />
```

### EquationReference

<b><u>Overview and Functionality</u></b>

- The `EquationReference` component is used to display a reference to a specific equation within a document. It dynamically fetches the equation number from a JSON file based on the `parentDocId` and `equationKey`, which corresponds to the counter for the equation.
- Functionality is as follows:
  - Fetches the equation number from a JSON file containing counters.
  - Displays the equation number in a formatted reference, such as "Equation 1", once the number is successfully loaded.
  - Displays a "Loading..." message while the equation number is being fetched.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                                      |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for equation counters. |
| `equationKey` | String | ✅ Yes   | A unique key that identifies the specific equation within the parent document.                   |

<b><u>Example Usage</u></b>

```jsx
<EquationReference parentDocId="108_1_0_0" equationKey="fs-pipe-progression" />
```

### Figure

<b><u>Overview and Functionality</u></b>

- The `Figure` component is used to display an image with a caption, where the caption includes the figure number. The figure number is dynamically fetched from a JSON file based on the `parentDocId` and `figKey`.
- Functionality is as follows:
  - Fetches the figure number from a JSON file containing counters for figures.
  - Displays the image referenced by the `src` prop and provides an `alt` text for accessibility.
  - Displays the caption, including the dynamically retrieved figure number.
  - Displays a "Loading..." message while the figure number is being fetched.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                                    |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for figure counters. |
| `figKey`      | String | ✅ Yes   | A unique key that identifies the specific figure within the parent document.                   |
| `src`         | String | ✅ Yes   | The relative path (from the root of the project) to the image source file for the figure.      |
| `alt`         | String | ✅ Yes   | The alt text to be used for the image, providing a description for accessibility.              |
| `caption`     | String | ✅ Yes   | The caption that will be displayed beneath the figure, which includes the figure number.       |

<b><u>Example Usage</u></b>

```jsx
<Figure
  parentDocId="108_1_0_0"
  docId="04-background.mdx"
  figKey="average-horizontal-gradient"
  src="figures/toolbox-technical-manuals/backward-erosion-piping-progression/figure8.png"
  alt="Geometry for average horizontal gradient."
  caption="Geometry for average horizontal gradient."
></Figure>
```

### FigureReference

<b><u>Overview and Functionality</u></b>

- The `FigureReference` component is used to display a reference to a figure number within the document. The figure number is dynamically fetched from a JSON file based on the `parentDocId` and `figKey`.
- Functionality is as follows:
  - Fetches the figure number from a JSON file containing counters for figures.
  - Displays the figure number for the referenced figure.
  - Displays a "Loading..." message while the figure number is being fetched.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                                    |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for figure counters. |
| `figKey`      | String | ✅ Yes   | A unique key that identifies the specific figure within the parent document.                   |

<b><u>Example Usage</u></b>

```jsx
<FigReference parentDocId="108_1_0_0" figKey="average-horizontal-gradient"></FigReference>
```

### NavContainer

<b><u>Overview and Functionality</u></b>

- The `NavContainer` component is used to display a navigation container that includes a link and a version selector for a document.
- Functionality is as follows:
  - Displays a navigation link using the `NavLink` component.
  - Displays a version selector using the `VersionSelector` component.

<b><u>Props</u></b>

| Prop        | Type   | Required | Description                                                                                      |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| `link`      | String | ✅ Yes   | The URL or path for the navigation link.                                                         |
| `linkTitle` | String | ✅ Yes   | The title text for the navigation link.                                                          |
| `document`  | Object | ✅ Yes   | The document object containing versioning information passed to the `VersionSelector` component. |

<b><u>Example Usage</u></b>

```jsx
<NavContainer
  link="/toolboxes/internal-erosion-suite"
  linkTitle="Internal Erosion Suite"
  document="toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"
></NavContainer>
```

### NavLink

<b><u>Overview and Functionality</u></b>

- The `NavLink` component is used to display a clickable navigation link with a leftward arrow (←) and a link title.
- Functionality is as follows:
  - Uses the `Link` component from Docusaurus to provide navigation to the specified URL.
  - Displays a leftward arrow (`←`) followed by the provided `linkTitle`.

<b><u>Props</u></b>

| Prop        | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| `link`      | String | ✅ Yes   | The URL or path for the navigation link. |
| `linkTitle` | String | ✅ Yes   | The title text for the navigation link.  |

<b><u>Example Usage</u></b>

- The `NavLink` component will generally be called from within the `NavContainer` component, with props to `NavLink` passed through `NavContainer`:

```jsx
<NavContainer
  link="/toolboxes/internal-erosion-suite"
  linkTitle="Internal Erosion Suite"
  document="toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"
></NavContainer>
```

- If calling `NavLink` individually it will look like this:

```jsx
<NavLink link="/toolboxes/internal-erosion-suite" linkTitle="Internal Erosion Suite" />
```

### TableAcronyms

<b><u>Overview and Functionality</u></b>

- `TableAcronyms` is used to display a table of report acronyms that does **not** require a caption,
- It dynamically loads and references the table number based on a `tableKey`, although the number is not displayed in the table.
- Useful for lists like acronyms, glossaries, or any supporting information tables without descriptive captions.

<b><u>Props</u></b>

| Prop          | Type   | Default | Required | Description                                                                                 |
| ------------- | ------ | ------- | -------- | ------------------------------------------------------------------------------------------- |
| `parentDocId` | String | N/A     | ✅ Yes   | Identifier for the document that helps determine which JSON counter file to load.           |
| `tableKey`    | String | N/A     | ✅ Yes   | A unique key to locate the table number (not shown, but fetched for reference/consistency). |
| `headers`     | Array  | `[]`    | ✅ Yes   | List of column headers.                                                                     |
| `columns`     | Array  | `[]`    | ✅ Yes   | Each item is a column array of data for the table. All columns must be equal in length.     |

<b><u>Example Usage</u></b>

```jsx
<TableAcronyms parentDocId="107_1_0_0" tableKey="acronyms"
headers={["Acronym", "Full Form"]}
columns={[
  [
  "BSC", "CE", "CEF", "CPD", "EE", "FC", "FEMA", "fm", "HEC", "HW", "IWR",
  "JOS", "NAVD88", "NE", "NEF", "NGVD29", "NRCS", "QC", "RMC", "SE", "UDF",
  "UNSW", "U.S.", "USACE", "USBR", "USDA"
], // Column 1
  [
  "Base Soil Category", "Continuing Erosion", "Continuing Erosion Filter",
  "Computer Program Document", "Excessive Erosion", "Fines Content",
  "Federal Emergency Management Agency", "Fine-to-Medium",
  "Hydrologic Engineering Center", "Headwater",
  "Institute for Water Resources", "Joint Opening Size",
  "North American Vertical Datum of 1988", "No Erosion", "No Erosion Filter",
  "National Geodetic Vertical Datum of 1929",
  "Natural Resource Conservation Center", "Quality Control",
  "Risk Management Center", "Some Erosion", "User-Defined Function",
  "University of New South Wales", "United States",
  "United States Army Corps of Engineers",
  "United States Bureau of Reclamation",
  "United States Department of Agriculture"
] // Column 2
]}
alt="Acronyms"
caption="Acronyms"
/>
```

### TableHorizontal

<b><u>Overview and Functionality</u></b>

- The `TableHorizontal` component is used to display a horizontal table with headers and rows fetched from a JSON file. The headers will be contained within the first column of the table (i.e., the left-most column).
- Functionality is as follows:
  - Loads table data dynamically based on the `tableKey` from a JSON file located in the `/counters` directory.
  - Displays a table with the provided headers and rows.
  - Each table is uniquely identified by the `tableKey`.
  - The `alt` and `caption` props are used to describe the table for accessibility and display purposes.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                                           |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The document ID that corresponds to the JSON file used to fetch table data.                           |
| `tableKey`    | String | ✅ Yes   | The unique key for the table within the JSON file.                                                    |
| `headers`     | Array  | ✅ Yes   | An array of strings representing the table headers.                                                   |
| `rows`        | Array  | ✅ Yes   | A two-dimensional array containing the rows of data for the table. Each inner array represents a row. |
| `alt`         | String | ✅ Yes   | A description for the table (used for accessibility).                                                 |
| `caption`     | String | ✅ Yes   | A caption for the table, typically used to describe the table's content.                              |

<b><u>Example Usage</u></b>

```jsx
<TableHorizontal
parentDocId="107_1_0_0"
tableKey="constricted-exit-probabilities"
headers={["JOS / D<sub>95</sub>B", "P<sub>CE</sub>"]}
rows={[
  ["< 0.4", "0.5", "0.75", "1.0", "2.0", "≥ 3.0"], // Row 1
  ["0", "0.0001", "0.001", "0.1", "0.5", "0.9"] // Row 2
]}
alt="Probability of continuing erosion for joint/defect opening size."
caption="Probability of continuing erosion for joint/defect opening size."
/>
```

### TableReference

<b><u>Overview and Functionality</u></b>

- The `TableReference` component is used to display a reference to a table by its unique `tableKey`.
- It loads the table information dynamically from a JSON file located in the `/counters` directory, based on the `tableKey`.
- It displays the table number for referencing within the document.

<b><u>Props</u></b>

| Prop          | Type   | Required | Description                                                                 |
| ------------- | ------ | -------- | --------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The document ID that corresponds to the JSON file used to fetch table data. |
| `tableKey`    | String | ✅ Yes   | The unique key for the table within the JSON file.                          |

<b><u>Example Usage</u></b>

```jsx
<TableReference parentDocId="107_1_0_0" tableKey="constricted-exit-probabilities" />
```

### TableVersionHistory

<b><u>Overview and Functionality</u></b>

- The `TableVersionHistory` component is used to display a version history table, typically in `00-version-history.mdx` files.
- It takes several props containing version-related data and dynamically creates a table with version details, including version number, date, description, and the individuals involved in modification, review, and approval.

<b><u>Props</u></b>

| Prop           | Type  | Default | Required | Description                                                                 |
| -------------- | ----- | ------- | -------- | --------------------------------------------------------------------------- |
| `versions`     | Array | `[]`    | ✅ Yes   | A list of version numbers to be displayed in the first column of the table. |
| `dates`        | Array | `[]`    | ✅ Yes   | A list of dates corresponding to each version number.                       |
| `descriptions` | Array | `[]`    | ✅ Yes   | A list of descriptions for each version.                                    |
| `modifiedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who modified each version.                            |
| `reviewedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who reviewed each version.                            |
| `approvedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who approved each version.                            |

<b><u>Example Usage</u></b>

```jsx
<TableVersionHistory
    versions={["1.0.0", "1.1.0"]}
    dates={["November 2023", "April 2025"]}
    descriptions={["Initial release.", "Updated documentation"]}
    modifiedBy={["John Doe", "John Smith"]}
    reviewedBy={["Jane Doe", "Jane Smith"]}
    approvedBy={["Jim Doe", "Jim Smith"]}/>
```

### TableVertical

<b><u>Overview and Functionality</u></b>

- The `TableVertical` component displays a vertical table with customizable headers and columns. The headers will be contained within the first row of the table (i.e., the top-most row).
- It dynamically fetches table information based on `parentDocId` and `tableKey` from a JSON file.
- The table is rendered with a caption, and headers are displayed in the top row, with data rows populated from the provided columns.

<b><u>Props</u></b>

| Prop          | Type   | Default | Required | Description                                                                              |
| ------------- | ------ | ------- | -------- | ---------------------------------------------------------------------------------------- |
| `parentDocId` | String | N/A     | ✅ Yes   | A unique identifier for the document, used to construct the path to the JSON file.       |
| `tableKey`    | String | N/A     | ✅ Yes   | The key to locate the specific table in the JSON file.                                   |
| `headers`     | Array  | `[]`    | ✅ Yes   | A list of header names for the table.                                                    |
| `columns`     | Array  | `[]`    | ✅ Yes   | A list of columns, where each column is an array representing the data for that column.  |
| `alt`         | String | N/A     | ✅ Yes   | Alt text for the table (optional for accessibility).                                     |
| `caption`     | String | N/A     | ✅ Yes   | The caption text for the table, typically includes a description of the table's content. |

<b><u>Example Usage</u></b>

```jsx
<TableVertical
parentDocId="108_1_0_0"
tableKey="schmertmann-reference-values"
headers={["Parameter", "Minimum"]}
columns={[
  [
  <>Seepage path length, <i>L</i></>, <>Piping Layer Depth, <i>D</i></>, <>Particle size with 10% passing by weight, <i>d<sub>10</sub></i></>,
  <>Anisotropy, <i>R<sub>k</sub> = k<sub>h</sub>/k<sub>v</sub>+</i></>, <>Relative density, <i>D<sub>r</sub></i></>, <>Pipe path inclination, <i>α</i></>
], // Column 1
  [
  "5 feet", "1 foot", "0.20 millimeters", "1.5", "60 percent", "0 degrees"
] // Row 2
]}
alt="Schmertmann reference test values"
caption="Schmertmann reference test values"/>
```

### VersionSelector

<b><u>Overview and Functionality</u></b>

- `VersionSelector` provides a dropdown menu to switch between different versions of a document.
- It reads available versions from a shared `versionList.json` file created by `scripts/versions.js` and updates the URL based on the selected version.
- On change, it replaces the version number in the current URL and reloads the page.
- It also stores the selected version in `localStorage` for consistent navigation between pages.

<b><u>Props</u></b>

| Prop       | Type   | Required | Description                                                                   |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `document` | String | ✅ Yes   | The document ID used to retrieve version information from `versionList.json`. |

<b><u>Example Usage</u></b>

- The `VersionSelector` component will generally be called from within the `NavContainer` component, with props to `VersionSelector` passed through `NavContainer`:

```jsx
<NavContainer
  link="/toolboxes/internal-erosion-suite"
  linkTitle="Internal Erosion Suite"
  document="toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"
></NavContainer>
```

- If calling `VersionSelector` individually it will look like this:

```jsx
<VersionSelector document="toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression" />
```
