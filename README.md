# RMC Software Documentation - Docusaurus Project Setup and Usage

This guide will help you set up and use Docusaurus, a modern static website generator, for the RMC Software Documentation project.

# Table of Contents

- [Prerequisites](#prerequisites)
- [Cloning the Project](#cloning-the-project)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Versioning System](#versioning-system)
  - [Major Versions](#major-versions-x0)
  - [Minor Versions](#minor-versions-xy)
  - [Excluded Changes](#excluded-changes)
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
  - [EquationNoRef](#equationnoref)
  - [EquationReference](#equationreference)
  - [Figure](#figure)
  - [FigureReference](#figurereference)
  - [NavAndPrint](#navandprint)
  - [PrintToPDFButton](#printtopdfbutton)
  - [TableHorizontal](#tablehorizontal)
  - [TableReference](#tablereference)
  - [TableVersionHistory](#tableversionhistory)
  - [TableVertical](#tablevertical)
  - [VersionSelector](#versionselector)
- [Search](#search)

# Prerequisites

Before you start, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>=14.0.0)
- [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/) (>=1.22.0)

You can verify Node.js and npm installation by running:

```powershell
node --version
npm --version
```

# Cloning the Project

## Clone the repository:

If you haven’t already, clone the RMC Software Documentation Docusaurus project repository to your local machine:

```powershell
git clone https://github.com/your-username/RMC-Software-Documentation.git
```

Or use GitHub Desktop to clone the repository to your local machine.

## Change into the project directory

```powershell
cd RMC-Software-Documentation
```

Or use GitHub Desktop to open the RMC-Software-Documentation project in your preferred Individual Development Environment (IDE).

## Install dependencies

Once you've cloned the repository and navigated to the project directory, install the required dependencies:

```powershell
npm install
```

This will install all necessary packages to edit, test, build, and deploy the Docusaurus project.

# Running Locally

To run the Docusaurus site locally, use:

```powershell
npm run start
```

This will start the development server at http://localhost:3000, and any changes you make will be reflected immediately in the browser.

# Building for Production

To build the Docusaurus site for production, use:

```powershell
npm run build
```

This will generate the static files in the build/ folder. These files are ready to be deployed to any static hosting service.

# Deployment

To deploy the Docusaurus site on GitHub pages, follow these steps:

1. Set the GIT_USER:

```powershell
$env:GIT_USER="USACE-RMC"
```

2. Deploy to GitHub pages:

```powershell
npm run deploy
```

DEPLOYMENT OF THE PROJECT SHOULD BE DONE CAREFULLY. Check with a site administrator prior to deploying the project.

# Versioning System

To maintain clarity and transparency in the evolution of online documentation, the RMC Software Documentation site uses a structured versioning system that distinguishes between significant updates and smaller changes. The versioning format follows a <b>Major.Minor</b> structure:

## Major Versions (X.0):

A major version update indicates significant changes to the book, typically involving updates, additions, or restructuring of entire chapters. These updates may reflect new content, substantial revisions, or major reorganization to enhance the book's structure or scope.

## Minor Versions (X.Y):

A minor version update denotes changes to specific sections within a chapter. These changes might include:

- Expanding a section with new material
- Rewriting sections for improved clarity
- Adding new subsections or examples to an existing chapter

## Excluded Changes:

Typos, grammatical corrections, formatting adjustments, or other minor editorial edits that do not materially affect the book's content or structure are not reflected in the versioning system.

## Version Numbering Example:

- 1.0: Initial release or major update to chapters
- 1.1: Update to a section in Chapter 1
- 2.0: Addition of a new chapter or major overhaul of an existing chapter

By adhering to this system, readers can easily track and identify substantive updates to the document's content while avoiding confusion caused by minor, inconsequential changes.

# Project Structure

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
        generateReportIdMap.js      # Script for generating a report ID map for code automation
        generateSidebars.js         # Script to automatically build sidebars.js for the Docusaurus project
        versions.js                 # Script to aid in version control
    src/                            # Source code for custom components and pages
        components/                 # Custom React components
        contexts/                   # Context files
        css/                        # Custom CSS files
        pages/                      # Custom pages
        theme/                      # Custom theme files
        reportIdMap.js              # Report ID file automatically built and updated by the generateReportIdMap.js file
    static/                         # Static files like images, fonts, etc.
        bibliographies/             # Bibliographies for citation and reference management
        counters/                   # Static files related to counters
        figures/                    # Figures for the documentation
        fonts/                      # Custom fonts
        img/                        # Images for the website
        versions/                   # JSON files for version control
    .gitattributes
    .gitignore                      # Git ignore file for the project
    .nojekyll
    docusaurus.config.js            # Main configuration file for Docusaurus
    LICENSE                         # License file
    package-lock.json               # Lock file for npm dependencies
    package.json                    # Project metadata and dependencies
    README.md                       # This file
    sidebars.js                     # Sidebar configuration for navigation
```

# `docs/`

- Contains .mdx report files

- `desktop-applications/`: Documentation for desktop applications (such as RMC-TotalRisk, RMC-RFA, LifeSim, etc.)

- `toolbox-technical-manuals/`: RMC toolbox technical manuals

- `web-applications/`: Documentation for web applications (such as LST, DST, RRFT, etc.)

## Document Layout

Each document should follow a similar format and naming convention of report##-document-title.mdx

### Section 1 - Document Information

The documents in this section will be contained within a collapsible sidebar titled "Document Information". Upon document open, this sidebar will be collapsed by default.

1. `00-document-info.mdx`

   - Always the first chapter
   - Uses the `DocumentMetadata` React component to provide document information

2. `00-version-history.mdx`
   - Always the second chapter
   - Uses the `TableVersionHistory` React component to provide a table of versions, descriptions of changes, and individuals who modified, reviewed, and approved the versions

### Section 2 - Main Report

This section houses the main report chapters for the document. It will be contained within a collapsible sidebar titled "Main Report". Upon document open, this sidebar will be
expanded by default, with the user being directed to the first chapter. The chapter filenames should begin with "01" and increase in number sequentially (01, 02, 03, etc.).

1. `01-preface.mdx`

   - The first main report chaper will always be titled "Preface"

2. `02-chapter-2.mdx`

3. `03-chapter-3.mdx`

The file path for each report follows the same standard:

- For desktop applications: `docs/desktop-applications/{software-name}/{report-title}/{version-number}/{document-name}`

- For toolbox technical manuals: `docs/toolbox-technical-manuals/{toolbox-suite}/{toolbox-name}/{version-number}/{document-name}`

- For web applications: `docs/web-applications/{web-app-name}/{report-title}/{version-number}/{document-name}`

### Section 3 - Appendices

This section houses appendices for the document. It is contained within a collapsible sidebar titled "Appendices" that is collapsed by default. The chapter filenames should continue
in sequential order after the main report chapters (i.e., if the final main report chapter is 05, the first appendix chapter will be 06).

# `scripts/`

## 📊 `counters.js` Generate Counters for Figures, Tables, and Equations

This Node.js script scans all `.mdx` documentation files in the `docs/` directory, extracts metadata for custom components like
`<Figure>`, `<Table*>`, and `<Equation>`, and generates a corresponding JSON file for each report. These JSON files are saved to
`static/counters/` and include sequential numbering and metadata for each detected figure, table, and equation.

---

### 🔍 What It Does

- Recursively scans the `docs/` directory for folders that contain `.mdx` files.
- Uses `reportIdMap.js` to map folder paths to unique report IDs.
- For each matched folder, it:
  - Parses all `.mdx` files to find:
    - `<Figure figKey="...">` components
    - `<TableHorizontal tableKey="...">`, `<TableVertical>`, or `<TableVerticalLeftAlign>` components
    - `<Equation equationKey="...">` components
  - Assigns each component a unique sequential number:
    - `figNumber` for figures
    - `tableNumber` for tables
    - `equationNumber` for equations
  - Records additional metadata:
    - `figKey`, `tableKey`, or `equationKey`
    - `parentDocId` (from `reportIdMap`)
    - `parentDocPath` (relative path within `docs/`)
    - `docId` (filename of the `.mdx` file)

---

### 📁 Output

Each output file is saved to `static/counters/<reportId>.json` and follows this structure:

```json
{
  "figures": {
    "fig-abc": {
      "figNumber": 1,
      "parentDocId": "soil-erosion",
      "parentDocPath": "rmc/soil/contact-erosion",
      "docId": "overview.mdx"
    }
  },
  "tables": {
    "table-xyz": {
      "tableNumber": 1,
      "parentDocId": "soil-erosion",
      "parentDocPath": "rmc/soil/contact-erosion",
      "docId": "overview.mdx"
    }
  },
  "equations": {
    "eqn-123": {
      "equationNumber": 1,
      "parentDocId": "soil-erosion",
      "parentDocPath": "rmc/soil/contact-erosion",
      "docId": "overview.mdx"
    }
  }
}
```

### Usage

This script is automatically run on project start, build, and deploy. No additional execution of this script is required.

---

## 🗺️ `reportIdMap.js` Generate reportIdMap from Docs Directory Structure

This Node.js script scans the `docs/` folder structure to automatically generate a `reportIdMap.js` file in `src/`. It identifies
documentation paths based on versioned subfolders (e.g., `v1.0`, `v2.1`) and builds unique report IDs based on the folder hierarchy.

---

### 🔍 What It Does

- Recursively walks the `docs/` directory.
- Identifies folders with names matching a version pattern like `v1.0`, `v2.1`, etc.
- Constructs a unique `reportId` in the format:

`<subHub>-<documentName>-<version>`

Where:

- `subHub` is the folder two levels above the version folder
- `documentName` is the folder directly above the version folder
- `version` is the version folder name (e.g., `v1.0`)
- Maps the full relative path to the generated report ID.
- Saves the result as an exported JavaScript object in `src/reportIdMap.js`.

---

### ⚠️ Path Validation

If the folder structure does not contain enough levels (i.e., it lacks a parent document or subHub folder), the script skips that
entry and logs a warning:

---

### 📝 Output (`reportIdMap.js`)

```js
// Auto-generated. Do not edit.
const reportIdMap = {
  "desktop-applications/lifesim/users-guide/v1.0": "lifesim-users-guide-v1.0",
  "desktop-applications/rmc-bestfit/users-guide/v1.0": "rmc-bestfit-users-guide-v1.0",
  "desktop-applications/rmc-rfa/users-guide/v1.0": "rmc-rfa-users-guide-v1.0",
  "desktop-applications/rmc-totalrisk/users-guide/v1.0": "rmc-totalrisk-users-guide-v1.0",
  "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0": "internal-erosion-suite-backward-erosion-piping-progression-v1.0",
  "toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0": "internal-erosion-suite-filter-evaluation-continuation-v1.0",
  "web-applications/lst/users-guide/v1.0": "lst-users-guide-v1.0",
};
module.exports = reportIdMap;
```

---

### Usage

This script is automatically run on project start, build, and deploy. No additional execution of this script is required.

---

## `generateSidebars.js` Generate Sidebars for Docusaurus

This script automatically generates a structured `sidebars.js` file for a Docusaurus site, based on the organization of `.mdx` files within
the `docs/` directory.

It will scan all `.mdx` files in the `docs/` directory, organize them into logical categories, and write the result to `sidebars.js`.

It uses naming conventions and frontmatter metadata to organize content into logical categories like:

- Document Information
- Main Report
- Appendices

It supports special-case logic for certain document types like `rmc-totalrisk/applications-guide`. Additional special-case logic for documents can be added to this
file as necessary - to add special-case logic contact a site administrator.

---

### 📁 Directory Structure Requirements

- Docs should be nested under `docs/<group>/<document>/<version>/`
- Filenames should be prefixed with numeric codes for ordering (e.g., `00-document-info.mdx`, `01-preface.mdx`)
- Appendix files must include `"appendix"` in the filename
- Frontmatter titles will be used when available

Example folder:

```
docs/
└── rmc-totalrisk/
    └── users-guide/
        └── v1.0/
            ├── 00-document-info.mdx
            ├── 00-version-history.mdx
            ├── 01-preface.mdx
            ├── 02-chapter-1.mdx
            ├── 03-chapter-2.mdx
            └── 04-appendix-acronyms.mdx
```

---

### 🧪 Usage

This script is automatically run on project start, build, and deploy. No additional execution of this script is required.

---

### 📝 Notes

- Special-case logic exists for specific folder/document combinations (like `rmc-totalrisk/applications-guide`). For additional special-case logic contact a site administrator.
- Automatically converts kebab-case paths and file names into readable sidebar labels
- Looks for YAML frontmatter to prefer titles from metadata

---

## `versions.js` Version Info Generator

### What It Does

This script scans your documentation directory structure to identify and collect version
information for your docs. It produces JSON files that list the latest versions available,
all available versions, and generates URLs for use with the Algolia crawler to index the
correct documentation versions.

### How It Works

- Defines the base folders where documentation groups live (e.g., "toolbox-technical-manuals",
  "desktop-applications", "web-applications").
- Recursively walks through these folders to detect version folders that match a pattern
  like `v1.0`, `v2.3`, etc.
- Identifies the latest version by sorting the version folders descending alphabetically.
- Collects all versions found for each document group.
- Outputs three JSON files: latest version map, full version list, and Algolia crawler URLs.

### Output

- `latestVersions.json`: Contains a mapping of document paths to their latest version folder.

```json
{
  "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression": "v1.0",
  "toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation": "v1.0",
  "desktop-applications/lifesim/users-guide": "v1.0",
  "desktop-applications/rmc-bestfit/users-guide": "v1.0",
  "desktop-applications/rmc-totalrisk/users-guide": "v1.0",
  "web-applications/lst/users-guide": "v1.0",
}
```

- `versionList.json`: Contains a mapping of document paths to all available version folders.

```json
{
  "toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression": [
    "v1.0"
  ],
  "toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation": [
    "v1.0"
  ],
}
```

- `algoliaCrawlerVersions.json`: Contains start URLs and discovery patterns based on the
  latest versions for Algolia's documentation crawler.

### Usage

This script is automatically run on project start, build, and deploy. No additional execution of this script is required.

The output JSON files will be saved in the `static/versions` folder.

### Notes

- The script ensures directory creation for output paths.
- Paths in JSON are normalized to use forward slashes (`/`) for cross-platform compatibility.
- Algolia crawler URLs are constructed based on your GitHub Pages URL pattern for docs.

---

# `src/`

- React components, styles, pages, and theme files

- `components/`: React components used throughout the project

- `css/`: Custom CSS files for styling

  - `custom.css` contains styles that apply to every page or multiple React components

  - Other CSS files are specific to the React component they are named after

- `pages/`: Custom web pages such as website home page, hubs, sub-hubs, and index pages

  - `index.js`: Home page for the RMC Software Documentation website

- `theme/`: Custom theme-related files

# `static/`

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
          - v1.0
            - figure1
            - figure2
            - figure3
    - web-applications

  - File names for figure images can be assigned arbitrarily but will need to be referenced by Figure components in `.mdx` files, so an intuitive naming convention is recommended

- `fonts/`: Contains downloaded font files for use with custom CSS

- `img/`: Contains static images used within website pages

- `versions/`: Contains three JSON files produced by the `verions.js` script

  - `algoliaCrawlerVersions.json`: Contains start URLs and discovery patterns based on the latest versions for Algolia's documentation crawler.

  - `latestVersions.json`: Contains a list of the latest versions for each report in the `docs` folder

  - `versionList.json`: Contains lists of all versions of each report in the `docs` folder

# `sidebars.js` Navigation Structure for Users Guides and Applications Guides

This module exports the navigation structure used for multiple user and application guides in a documentation system. It organizes documents into categories and
subcategories with collapsible navigation items, suitable for static site generators like Docusaurus.

---

## Structure Details

- `type`: Specifies the navigation item type (`category` or `doc`).
- `label`: Display label for categories or documents.
- `collapsed`: Whether the category is collapsed by default.
- `collapsible`: If the category can be collapsed.
- `items`: Nested navigation items (documents or subcategories).
- `id`: Document id used for routing/linking.
- `link`: (optional) Used for category linking to a document.

---

## Usage

This file is automatically generated by the generateSidebars.js script during the project start, build, and deploy processes. No additional action is required.

---

# Other

## `docusaurus.config.js`

- Configuration file for the RMC Software Documentation website

## `LICENSE`

- This project is licenses under the MIT License © 2025 Risk Management Center

## Project Dependencies

- `package.json`
  - This file lists the project's dependencies, scripts, and metadata. It defines the required vesions of packages needed to run or build the documentation site, and
    it includes custom scripts like `counters`, `versions`, `run`, `start`, `build`, and `deploy` for Docusaurus.
- `package-lock.json`
  - This file locks the exact versions of every package (and sub-package) installed at the time of `npm install`. It ensures that everyone working on the project uses
    the same dependency versions, which improves consistency across environments.

# Creating and Editing Pages

`.mdx` (Markdown + JSX) allows you to write Markdown content and use React components side-by-side.

To create a new .mdx file in Visual Studio Code, right click on the folder that the file will be located and click "New File". Name the file with your desired name
and add `.mdx` for the document type. Follow the naming and numbering convention outlined in the [`docs/`](#docs) section.

## MDX Basics

- File extension: `.mdx`

- Location: Inside the `docs` folder

- Treated as pages in Docusaurus when placed in the `docs` folder and linked in the sidebar

## Front Matter

- `.mdx` files can begin with YAML front matter, wrapped in triple dashes.

- In the RMC Software Documentation project, front matter is used to define the title of each `.mdx` page. This title defines what is displayed in the tab heading
  of the browser:

```mdx
---
title: Schmertmann
---

---
title: Appendix A - Acronyms
---
```

- Expanded front matter is used in `00-document-info.mdx` pages and is called as a prop for the `<DocumentMetadata>` React component:

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

## Markdown Content

`.mdx` supports standard Markdown syntax out of the box.

### Headings

Use `#` to `######` to create headings from level 1 to 6

```mdx
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Text Formatting

- HTML tags can also be used to format text

  - `<b>Bold text</b>` <b>Bold text</b>

  - `<i>Italic text</i>` <i>Italic text</i>

  - `<b><i>Bold and italic text</i></b>` <b><i>Bold and italic text</i></b>

  - `<u>Underline text</u>` <u>Underline text</u>

  - `<sub>Subscript text</sub>` <sub>Subscript text</sub>

  - `<sup>Superscript text</sup>` <sup>Superscript text</sup>

### Paragraphs and Line Breaks

- Separate paragraphs with a blank line. To force a line break, end the line with <b>two spaces</b>.

- Line breaks can also be inserted by using `<br />`

### Lists

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

### Code Blocks

- Inline code: use backticks for inline code:

````mdx
```Inline code block```
````

- Fenced code block (with syntax highlighting)

````
```js
title="example.js"
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

## JSX and Components

React components can be inserted anywhere in `.mdx` files. Components must be imported from the `src` folder into the `.mdx` file before they can be used.

```jsx
import { MyComponent } from '@site/src/comopnents/MyComponent';

<MyComopnent someProp="value" />
```

React components available within the RMC Software Documentation project are outlined [here](#react-components)

# React Components

React components have been pre-built into the RMC Software Documentation project to aid in the creation of MDX files. The following list highlights the most common components
that will be used for the average document. Each component description provides an overview of the component functaionality, props required for component use, and example code
for component use within `.mdx` files.

Existing React components should not be modified. If changes to a component are desired, or if additional React components would aid in the development of a document, contact
a site administrator.

## Bibliography

### Overview and Functionality

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

### Props

| Prop      | Type   | Required | Description                                                                         |
| --------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| `bibFile` | String | ✅ Yes   | The relative path (from the public folder) to a JSON file containing citation data. |

### Example Usage

```jsx
<Bibliography bibFile="/bibliographies/108_1_0_0-bib.json" />
```

---

## Citation

### Overview and Functionality

- The `Citation` component is used to display a citation reference within a document. It fetches citation data from a specified bibliography JSON file and assigns a unique citation number to each citation based on its position in the list.
- Functionality is as follows:
  - Fetches the bibliography JSON file from the path provided via the `bibFile` prop.
  - Sorts the citations alphabetically by the first author's name.
  - Finds the citation matching the `citationKey` and assigns it a citation number.
  - Stores the citation per document to avoid duplication and ensures the citation number is consistent across the document.
  - Dispatches an event to notify other components (e.g., `CitationFootnote`) when citations are updated.
  - Outputs the citation number as a clickable link, which points to the corresponding footnote.

### Props

| Prop          | Type   | Required | Description                                                                                 |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| `citationKey` | String | ✅ Yes   | The unique key for the citation, which corresponds to the citation in the JSON file.        |
| `bibFile`     | String | ✅ Yes   | The relative path (from the public folder) to a JSON file containing the bibliography data. |

### Example Usage

```jsx
<Citation citationKey="Schmertmann2000" bibFile="/bibliographies/108_1_0_0-bib.json" />
```

---

## CitationFootnote

### Overview and Functionality

- The `CitationFootnote` component is responsible for rendering the full citation details for all used citations inside a single `.mdx` document. It scans the `.mdx` file, gathers all instances of the `<Citation>` component, and provides a list of citations at the bottom of the document.
- Functionality is as follows:
  - Fetches the list of citations used in the current document by calling `getUsedCitations` based on the document's pathname.
  - Renders each citation in a numbered list format.
  - Formats citations using IEEE format.
  - Each citation is rendered with a clickable link to the corresponding footnote.

### Props

This component does not accept any props.

### Example Usage

```jsx
<CitationFootnote />
```

---

## DocumentMetadata

### Overview and Functionality

- The `DocumentMetadata` component displays metadata about a report in a table format.
- Functionality is as follows:
  - Displays metadata fields such as report date, type, title, authors, abstract, and responsible person.
  - Supports both string and array formats for certain fields (authors, subject terms).
  - The table renders the metadata with headers and corresponding values for each field.

### Props

| Prop       | Type   | Required | Description                                                                                                                                                                                                                                          |
| ---------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metadata` | Object | ✅ Yes   | The metadata object containing the report's details. It should include `reportDate`, `reportType`, `reportTitle`, `reportSubTitle`, `reportAuthors`, `reportAbstract`, `reportSubjectTerms`, `responsiblePersonName`, and `responsiblePersonNumber`. |

### Example Usage

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

---

## Equation

### Overview and Functionality

- The `Equation` component is used to display mathematical equations within a document. It can render equations either inline or as block equations, using the KaTeX library for rendering LaTeX math.
- Functionality is as follows:
  - Fetches the equation number from a JSON file containing counters based on the `parentDocId` and `equationKey`.
  - If the equation number is found, it renders the equation with the appropriate tag.
  - Supports both inline and block rendering via the `inline` prop. By default, `inline` is `false` and the equation will be block rendered.

### Props

| Prop          | Type    | Required | Description                                                                                             |
| ------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `parentDocId` | String  | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for equation counters.        |
| `equationKey` | String  | ✅ Yes   | A unique key that identifies the specific equation within the parent document.                          |
| `equation`    | String  | ✅ Yes   | The LaTeX string representing the equation to be rendered.                                              |
| `inline`      | Boolean | ❌ No    | If `true`, renders the equation inline; otherwise, renders it as a block equation. Defaults to `false`. |

### Example Usage

```jsx
<Equation parentDocId="108_1_0_0" equationKey="fs-pipe-progression" equation="FS = \left(\frac{C_D C_L C_S C_K C_γ C_Z C_α i_{\textit{pmt}}}{C_R i_f}\right)" />
```

- If the equation is inline, an additional `inline={true}` prop is added

---

## EquationNoRef

### Overview and Functionality

- The `EquationNoRef` component is used to display mathematical equations that do not require an equation number or equation reference within a document. It can render equations either inline or as block equations, using the KaTeX library for rendering LaTeX math.
- Functionality is as follows:
  - Takes an equation provided by the user and renders it.
  - Supports both inline and block rendering via the `inline` prop. By default, `inline` is `false` and the equation will be block rendered.

### Props

| Prop       | Type    | Required | Description                                                                                             |
| ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `equation` | String  | ✅ Yes   | The LaTeX string representing the equation to be rendered.                                              |
| `inline`   | Boolean | ❌ No    | If `true`, renders the equation inline; otherwise, renders it as a block equation. Defaults to `false`. |

### Example Usage

```jsx
<EquationNoRef equation="FS = \left(\frac{D}{r}\right)" inline={true}/>
```

- If the equation is a block equation, `inline={true}` can be removed

---

## EquationReference

### Overview and Functionality

- The `EquationReference` component is used to display a reference to a specific equation within a document. It dynamically fetches the equation number from a JSON file based on the `parentDocId` and `equationKey`, which corresponds to the counter for the equation.
- Functionality is as follows:
  - Fetches the equation number from a JSON file containing counters.
  - Displays the equation number in a formatted reference, such as "Equation 1", once the number is successfully loaded.
  - Displays a "Loading..." message while the equation number is being fetched.

### Props

| Prop          | Type   | Required | Description                                                                                      |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for equation counters. |
| `equationKey` | String | ✅ Yes   | A unique key that identifies the specific equation within the parent document.                   |

### Example Usage

```jsx
<EquationReference parentDocId="108_1_0_0" equationKey="fs-pipe-progression" />
```

---

## Figure

### Overview and Functionality

- The `Figure` component is used to display an image with a caption, where the caption includes the figure number. The figure number is dynamically fetched from a JSON file based on the `parentDocId` and `figKey`.
- Functionality is as follows:
  - Fetches the figure number from a JSON file containing counters for figures.
  - Displays the image referenced by the `src` prop and provides an `alt` text for accessibility.
  - Displays the caption, including the dynamically retrieved figure number.
  - Displays a "Loading..." message while the figure number is being fetched.

### Props

| Prop          | Type   | Required | Description                                                                                    |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for figure counters. |
| `figKey`      | String | ✅ Yes   | A unique key that identifies the specific figure within the parent document.                   |
| `src`         | String | ✅ Yes   | The relative path (from the root of the project) to the image source file for the figure.      |
| `alt`         | String | ✅ Yes   | The alt text to be used for the image, providing a description for accessibility.              |
| `caption`     | String | ✅ Yes   | The caption that will be displayed beneath the figure, which includes the figure number.       |

### Example Usage

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

---

## FigureInline

### Overview and Functionality

- The `FigureInline` component is used to display an inline image (typically within a paragraph of text) without a caption or dynamic figure number.
- Functionality is as follows:
  - Receives the relative `src` path to the image as a prop.
  - Automatically prepends the `/RMC-Software-Documentation/` base path to the image source.
  - Applies a specific CSS class (`figure-inline`) to style the image for inline presentation.

### Props

| Prop  | Type   | Required | Description                                                                 |
| ----- | ------ | -------- | --------------------------------------------------------------------------- |
| `src` | String | ✅ Yes   | The relative path to the image, appended to `/RMC-Software-Documentation/`. |

### Example Usage

```jsx
<FigureInline src="figures/toolbox-technical-manuals/breach/figure12.png" />
```

⚠️ Note: This component does not handle captions, alt text, or figure numbering. For full-figure display with captions and numbering, use the Figure component instead.

---

## FigureReference

### Overview and Functionality

- The `FigureReference` component is used to display a reference to a figure number within the document. The figure number is dynamically fetched from a JSON file based on the `parentDocId` and `figKey`.
- Functionality is as follows:
  - Fetches the figure number from a JSON file containing counters for figures.
  - Displays the figure number for the referenced figure.
  - Displays a "Loading..." message while the figure number is being fetched.

### Props

| Prop          | Type   | Required | Description                                                                                    |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The ID of the parent document, used to locate the corresponding JSON file for figure counters. |
| `figKey`      | String | ✅ Yes   | A unique key that identifies the specific figure within the parent document.                   |

### Example Usage

```jsx
<FigReference parentDocId="108_1_0_0" figKey="average-horizontal-gradient"></FigReference>
```

---

## NavContainer

### Overview and Functionality

- The `NavContainer` component is used to display a navigation container that includes a link and a version selector for a document.
- Functionality is as follows:
  - Displays a navigation link using the `NavLink` component.
  - Displays a version selector using the `VersionSelector` component.

### Props

| Prop        | Type   | Required | Description                                                                                      |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| `link`      | String | ✅ Yes   | The URL or path for the navigation link.                                                         |
| `linkTitle` | String | ✅ Yes   | The title text for the navigation link.                                                          |
| `document`  | Object | ✅ Yes   | The document object containing versioning information passed to the `VersionSelector` component. |

### Example Usage

```jsx
<NavContainer
  link="/toolboxes/internal-erosion-suite"
  linkTitle="Internal Erosion Suite"
  document="toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression"
></NavContainer>
```

---

## NavLink

### Overview and Functionality

- The `NavLink` component is used to display a clickable navigation link with a leftward arrow (←) and a link title.
- Functionality is as follows:
  - Uses the `Link` component from Docusaurus to provide navigation to the specified URL.
  - Displays a leftward arrow (`←`) followed by the provided `linkTitle`.

### Props

| Prop        | Type   | Required | Description                              |
| ----------- | ------ | -------- | ---------------------------------------- |
| `link`      | String | ✅ Yes   | The URL or path for the navigation link. |
| `linkTitle` | String | ✅ Yes   | The title text for the navigation link.  |

### Example Usage

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

---

## TableAcronyms

### Overview and Functionality

- `TableAcronyms` is used to display a table of report acronyms that does **not** require a caption,
- It dynamically loads and references the table number based on a `tableKey`, although the number is not displayed in the table.
- Useful for lists like acronyms, glossaries, or any supporting information tables without descriptive captions.

### Props

| Prop          | Type   | Default | Required | Description                                                                                 |
| ------------- | ------ | ------- | -------- | ------------------------------------------------------------------------------------------- |
| `parentDocId` | String | N/A     | ✅ Yes   | Identifier for the document that helps determine which JSON counter file to load.           |
| `tableKey`    | String | N/A     | ✅ Yes   | A unique key to locate the table number (not shown, but fetched for reference/consistency). |
| `headers`     | Array  | `[]`    | ✅ Yes   | List of column headers.                                                                     |
| `columns`     | Array  | `[]`    | ✅ Yes   | Each item is a column array of data for the table. All columns must be equal in length.     |

### Example Usage

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

---

## TableHorizontal

### Overview and Functionality

- The `TableHorizontal` component is used to display a horizontal table with headers and rows fetched from a JSON file. The headers will be contained within the first column of the table (i.e., the left-most column).
- Functionality is as follows:
  - Loads table data dynamically based on the `tableKey` from a JSON file located in the `/counters` directory.
  - Displays a table with the provided headers and rows.
  - Each table is uniquely identified by the `tableKey`.
  - The `alt` and `caption` props are used to describe the table for accessibility and display purposes.

### Props

| Prop          | Type   | Required | Description                                                                                           |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The document ID that corresponds to the JSON file used to fetch table data.                           |
| `tableKey`    | String | ✅ Yes   | The unique key for the table within the JSON file.                                                    |
| `headers`     | Array  | ✅ Yes   | An array of strings representing the table headers.                                                   |
| `rows`        | Array  | ✅ Yes   | A two-dimensional array containing the rows of data for the table. Each inner array represents a row. |
| `alt`         | String | ✅ Yes   | A description for the table (used for accessibility).                                                 |
| `caption`     | String | ✅ Yes   | A caption for the table, typically used to describe the table's content.                              |

### Example Usage

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

---

## TableReference

### Overview and Functionality

- The `TableReference` component is used to display a reference to a table by its unique `tableKey`.
- It loads the table information dynamically from a JSON file located in the `/counters` directory, based on the `tableKey`.
- It displays the table number for referencing within the document.

### Props

| Prop          | Type   | Required | Description                                                                 |
| ------------- | ------ | -------- | --------------------------------------------------------------------------- |
| `parentDocId` | String | ✅ Yes   | The document ID that corresponds to the JSON file used to fetch table data. |
| `tableKey`    | String | ✅ Yes   | The unique key for the table within the JSON file.                          |

### Example Usage

```jsx
<TableReference parentDocId="107_1_0_0" tableKey="constricted-exit-probabilities" />
```

---

## TableVersionHistory

### Overview and Functionality

- The `TableVersionHistory` component is used to display a version history table, typically in `00-version-history.mdx` files.
- It takes several props containing version-related data and dynamically creates a table with version details, including version number, date, description, and the individuals involved in modification, review, and approval.

### Props

| Prop           | Type  | Default | Required | Description                                                                 |
| -------------- | ----- | ------- | -------- | --------------------------------------------------------------------------- |
| `versions`     | Array | `[]`    | ✅ Yes   | A list of version numbers to be displayed in the first column of the table. |
| `dates`        | Array | `[]`    | ✅ Yes   | A list of dates corresponding to each version number.                       |
| `descriptions` | Array | `[]`    | ✅ Yes   | A list of descriptions for each version.                                    |
| `modifiedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who modified each version.                            |
| `reviewedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who reviewed each version.                            |
| `approvedBy`   | Array | `[]`    | ✅ Yes   | A list of individuals who approved each version.                            |

### Example Usage

```jsx
<TableVersionHistory
    versions={["1.0.0", "1.1.0"]}
    dates={["November 2023", "April 2025"]}
    descriptions={["Initial release.", "Updated documentation"]}
    modifiedBy={["John Doe", "John Smith"]}
    reviewedBy={["Jane Doe", "Jane Smith"]}
    approvedBy={["Jim Doe", "Jim Smith"]}/>
```

---

## TableVertical

### Overview and Functionality

- The `TableVertical` component displays a vertical table with customizable headers and columns. The headers will be contained within the first row of the table (i.e., the top-most row).
- It dynamically fetches table information based on `parentDocId` and `tableKey` from a JSON file.
- The table is rendered with a caption, and headers are displayed in the top row, with data rows populated from the provided columns.

### Props

| Prop          | Type   | Default | Required | Description                                                                              |
| ------------- | ------ | ------- | -------- | ---------------------------------------------------------------------------------------- |
| `parentDocId` | String | N/A     | ✅ Yes   | A unique identifier for the document, used to construct the path to the JSON file.       |
| `tableKey`    | String | N/A     | ✅ Yes   | The key to locate the specific table in the JSON file.                                   |
| `headers`     | Array  | `[]`    | ✅ Yes   | A list of header names for the table.                                                    |
| `columns`     | Array  | `[]`    | ✅ Yes   | A list of columns, where each column is an array representing the data for that column.  |
| `alt`         | String | N/A     | ✅ Yes   | Alt text for the table (optional for accessibility).                                     |
| `caption`     | String | N/A     | ✅ Yes   | The caption text for the table, typically includes a description of the table's content. |

### Example Usage

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

---

## TableVerticalLeftAlign

This component has the same functionality, props, and example usage as TableVertical. CSS is used on the back end for this component to align all table items to
the left.

## VersionSelector

### Overview and Functionality

- `VersionSelector` provides a dropdown menu to switch between different versions of a document.
- It reads available versions from a shared `versionList.json` file created by `scripts/versions.js` and updates the URL based on the selected version.
- On change, it replaces the version number in the current URL and reloads the page.
- It also stores the selected version in `localStorage` for consistent navigation between pages.

### Props

| Prop       | Type   | Required | Description                                                                   |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `document` | String | ✅ Yes   | The document ID used to retrieve version information from `versionList.json`. |

### Example Usage

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

---

# Search

This project uses **Algolia**, a powerful hosted search engine that delivers instant, full-text search results as you type. It's designed for speed, scalability, and relevance.

When integrated with **Docusaurus**, Algolia provides a seamless search experience through its **DocSearch** service. DocSearch crawls and indexes your Docusaurus site, allowing users to quickly find relevant content across all pages and documentation versions.

## How It Works:

- Algolia’s crawler automatically scans your site at regular intervals.
- Indexed content is stored in Algolia’s search backend.
- A lightweight, customizable search UI (provided by DocSearch) is embedded in your Docusaurus site.
- Users can search titles, content, headers, and metadata with fast, accurate results.

The password for Algolia for this project is: rmc-software-documentation
