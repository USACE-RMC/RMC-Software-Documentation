# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

    "start": "npm run convert:pdf && node scripts/counters.js && docusaurus start",
    "build": "npm run convert:pdf && node scripts/counters.js && docusaurus build",

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Deploy to GitHub Pages

First, set the GIT_USER: $env:GIT_USER="your_username"

Next, deploy to GitHub pages using npm run deploy

# To install required dependencies

Download the project from GitHub. Once in VS Code, run "npm install" to install the required dependencies for Docusaurus.

# Creating a new report/document

# Formatting text using Markdown

Text is **bold**
Text is _italic_
Insert a [link](/file_path)

$$
equation
$$
