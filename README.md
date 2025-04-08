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

This will generate the static files in the build/ foler. These files are ready to be deployed to any static hosting service.

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
