// scripts/generateReportIdMap.js

const fs = require("fs");
const path = require("path");

const DOCS_PATH = path.join(__dirname, "../docs");
const OUTPUT_FILE = path.join(__dirname, "../src/reportIdMap.js");

const reportIdMap = {};

function isVersionFolder(folderName) {
  return /^v\d+\.\d+(\.\d+)?$/.test(folderName);
}

function walkDocs(currentPath, relPath = []) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(currentPath, entry.name);
    const newRelPath = [...relPath, entry.name];

    if (entry.isDirectory()) {
      if (isVersionFolder(entry.name)) {
        const version = entry.name;
        const documentName = relPath[relPath.length - 1];
        const subHub = relPath[relPath.length - 2]; // One level above documentName

        const docPath = newRelPath.join("/");

        if (!subHub || !documentName) {
          console.warn(`⚠️ Skipping: Incomplete path at ${docPath}`);
          return;
        }

        const reportId = `${subHub}-${documentName}-${version}`;
        reportIdMap[docPath] = reportId;

        console.log(`✅ Found: ${docPath} → ${reportId}`);
      }

      walkDocs(fullPath, newRelPath);
    }
  });
}

walkDocs(DOCS_PATH);

const fileContent = `// Auto-generated. Do not edit.\nconst reportIdMap = ${JSON.stringify(
  reportIdMap,
  null,
  2
)};\nexport default reportIdMap;\n`;
fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`\n✅ reportIdMap written to ${OUTPUT_FILE}`);
