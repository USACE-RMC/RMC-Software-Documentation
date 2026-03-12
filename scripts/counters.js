const fs = require('fs');
const path = require('path');
const reportIdMap = require('../src/reportIdMap'); // Importing the map correctly

// Base paths
const docsBasePath = path.join(__dirname, '../docs');
const countersBasePath = path.join(__dirname, '../static/counters');

// Ensure the counters directory exists
if (!fs.existsSync(countersBasePath)) {
  fs.mkdirSync(countersBasePath, { recursive: true });
}

// Function to normalize paths to a consistent format
function normalizePath(p) {
  return p.replace(/\\/g, '/'); // Normalize path slashes to forward slashes
}

// Recursively find all documents with .mdx files
function findAllDocumentPaths(dir, results = new Set()) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let containsMDX = false;
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findAllDocumentPaths(fullPath, results);
    } else if (entry.name.endsWith('.mdx')) {
      containsMDX = true;
    }
  }

  if (containsMDX) {
    const relativePath = path.relative(docsBasePath, dir).replace(/\\/g, '/');
    results.add(normalizePath(relativePath)); // Normalize path here
  }

  return results;
}

// Determine the appendix letter for a file, or null if it is not an appendix.
// Files are expected to contain "-appendix-" in their name.
// The letter is derived from the ordinal position among all appendix files in the folder.
function getAppendixLetter(file, appendixFiles) {
  const idx = appendixFiles.indexOf(file);
  if (idx === -1) return null;
  return String.fromCharCode(65 + idx); // A, B, C, ...
}

// Process each matched report
function processReport(reportPath, reportId) {
  const folder = path.join(docsBasePath, reportPath);
  const outputFile = path.join(countersBasePath, `${reportId}.json`);

  let counters = {
    figures: {},
    tables: {},
    equations: {},
    citations: {},
    videos: {},
  };

  let figureCount = 1;
  let tableCount = 1;
  let equationCount = 1;
  let citationCount = 1;
  let videoCount = 1;

  const files = fs.readdirSync(folder).filter((f) => f.endsWith('.mdx'));

  // Identify appendix files (sorted order is preserved from readdirSync / numeric prefix)
  const appendixFiles = files.filter((f) => f.includes('-appendix-'));

  // Track the current appendix letter so counters reset when a new appendix starts
  let currentAppendixLetter = null;

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Check if this file is an appendix and determine its letter
    const appendixLetter = getAppendixLetter(file, appendixFiles);

    // When we enter a new appendix, reset all counters (except citations)
    if (appendixLetter && appendixLetter !== currentAppendixLetter) {
      currentAppendixLetter = appendixLetter;
      figureCount = 1;
      tableCount = 1;
      equationCount = 1;
      videoCount = 1;
    }

    // Helper to format a counter value: plain number for body, "A-1" for appendices
    const fmt = (n) => (appendixLetter ? `${appendixLetter}-${n}` : n);

    // Regex for figures — match both self-closing <Figure ... /> and
    // open+close <Figure ...></Figure> (or <GIF>) tag forms
    for (const match of content.matchAll(/<(Figure|GIF)\s+([\s\S]*?)(?:\/>|><\/\1>)/g)) {
      const attrs = match[2];
      const figKey = attrs.match(/figKey="([^"]+)"/)?.[1];
      if (!figKey) continue;
      const src = attrs.match(/src="([^"]+)"/)?.[1] || '';
      const caption = attrs.match(/caption="([^"]+)"/)?.[1] || '';
      counters.figures[figKey] = {
        figNumber: fmt(figureCount++),
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
        src,
        caption,
      };
    }

    // Regex for tables — uses [\s\S] to match across newlines in multiline JSX
    for (const match of content.matchAll(
      /<(?:TableHorizontal|TableVertical)\s[\s\S]*?tableKey="([^"]+)"/g,
    )) {
      const tableKey = match[1];
      counters.tables[tableKey] = {
        tableNumber: fmt(tableCount++),
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
      };
    }

    // Regex for equations — uses [\s\S] to match across newlines in multiline JSX
    for (const match of content.matchAll(/<Equation\s[\s\S]*?equationKey="([^"]+)"/g)) {
      const equationKey = match[1];
      counters.equations[equationKey] = {
        equationNumber: fmt(equationCount++),
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
      };
    }

    // Regex for citations — match both self-closing and open+close tag forms
    // Citations continue numbering across appendices (bibliography is shared)
    for (const match of content.matchAll(/<Citation\s+[^>]*?citationKey="([^"]+)"[^>]*?(?:\/>|>)/g)) {
      const citationKey = match[1];
      if (!(citationKey in counters.citations)) {
        // Only count the first occurrence}
        counters.citations[citationKey] = {
          citationNumber: citationCount++,
          parentDocId: reportId,
          parentDocPath: reportPath,
          docId: file,
        };
      }
    }

    // Regex for videos — match both self-closing and open+close tag forms
    for (const match of content.matchAll(/<Video\s+[^>]*?videoKey="([^"]+)"[^>]*?(?:\/>|>)/g)) {
      const videoKey = match[1];
      counters.videos[videoKey] = {
        videoNumber: fmt(videoCount++),
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
      };
    }
  });

  // Write a global counters file with one list each for figures, tables, and equations
  fs.writeFileSync(outputFile, JSON.stringify(counters, null, 2));
  console.log(`✅ ${reportPath} -> ${outputFile}`);
}

// MAIN
const allDocPaths = findAllDocumentPaths(docsBasePath);

for (const docPath of allDocPaths) {
  const normalizedDocPath = normalizePath(docPath); // Normalize path here
  const reportId = reportIdMap[normalizedDocPath];

  if (reportId) {
    processReport(docPath, reportId);
  } else {
    console.warn(`⚠️ Skipping ${docPath}: Not found in reportIdMap.`);
  }
}
