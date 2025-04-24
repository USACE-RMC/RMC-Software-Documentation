const fs = require("fs");
const path = require("path");
const reportIdMap = require("../src/reportIdMap"); // Importing the map correctly

// Base paths
const docsBasePath = path.join(__dirname, "../docs");
const countersBasePath = path.join(__dirname, "../static/counters");

// Ensure the counters directory exists
if (!fs.existsSync(countersBasePath)) {
  fs.mkdirSync(countersBasePath, { recursive: true });
}

// Function to normalize paths to a consistent format
function normalizePath(p) {
  return p.replace(/\\/g, "/"); // Normalize path slashes to forward slashes
}

// Recursively find all documents with .mdx files
function findAllDocumentPaths(dir, results = new Set()) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let containsMDX = false;
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findAllDocumentPaths(fullPath, results);
    } else if (entry.name.endsWith(".mdx")) {
      containsMDX = true;
    }
  }

  if (containsMDX) {
    const relativePath = path.relative(docsBasePath, dir).replace(/\\/g, "/");
    results.add(normalizePath(relativePath)); // Normalize path here
  }

  return results;
}

// Process each matched report
function processReport(reportPath, reportId) {
  const folder = path.join(docsBasePath, reportPath);
  const outputFile = path.join(countersBasePath, `${reportId}.json`);

  let counters = {
    figures: {},
    tables: {},
    equations: {},
  };

  let figureCount = 1;
  let tableCount = 1;
  let equationCount = 1;

  const files = fs.readdirSync(folder).filter((f) => f.endsWith(".mdx"));

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Regex for figures
    for (const match of content.matchAll(/<Figure\s+[^>]*figKey="([^"]+)"/g)) {
      const figKey = match[1];
      counters.figures[figKey] = {
        figNumber: figureCount++,
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
      };
    }

    // Regex for tables
    for (const match of content.matchAll(
      /<(TableHorizontal|TableVertical|TableAcronyms)\s+[^>]*tableKey="([^"]+)"/g
    )) {
      const tableKey = match[2];
      counters.tables[tableKey] = {
        tableNumber: tableCount++,
        parentDocId: reportId,
        parentDocPath: reportPath,
        docId: file,
      };
    }

    // Regex for equations
    for (const match of content.matchAll(
      /<Equation\s+[^>]*equationKey="([^"]+)"/g
    )) {
      const equationKey = match[1];
      counters.equations[equationKey] = {
        equationNumber: equationCount++,
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
