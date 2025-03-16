const fs = require("fs");
const path = require("path");

// Unique numeric ID mapping for each report
const reportIDs = {
  "lifesim/users-guide": 101,
  "rmc-bestfit/users-guide": 102,
  "rmc-rfa/users-guide": 103,
  "rmc-totalrisk/users-guide": 104,
  "rmc-totalrisk/applications-guide": 105,
  "rmc-totalrisk/verification-report": 106,
  "toolbox-technical-manuals/filter-evaluation-continuation": 107,
};

// Base paths
const docsBasePath = path.join(__dirname, "../docs");
const countersBasePath = path.join(__dirname, "../static/counters");

// Ensure the counters directory exists
if (!fs.existsSync(countersBasePath)) {
  fs.mkdirSync(countersBasePath, { recursive: true });
}

// Function to process each report
function processReport(reportPath) {
  const folder = path.join(docsBasePath, reportPath);

  // Retrieve the unique numeric ID for this report
  const reportId = reportIDs[reportPath];
  if (!reportId) {
    console.warn(`Skipping ${reportPath}: No unique ID assigned.`);
    return;
  }

  // Use the numeric ID as the output file name
  const outputFile = path.join(countersBasePath, `${reportId}.json`);

  let counters = {};
  let figureCount = 1;
  let tableCount = 1;

  // Check if the folder exists
  if (!fs.existsSync(folder)) {
    console.warn(`Skipping ${reportPath}: Directory not found.`);
    return;
  }

  // Read all .mdx files in the folder
  const files = fs.readdirSync(folder).filter((file) => file.endsWith(".mdx"));

  files.forEach((file) => {
    const filePath = path.join(folder, file);
    const content = fs.readFileSync(filePath, "utf-8");

    counters[file] = { figures: {}, tables: {} };

    // Improved regex patterns for <Figure>
    const figureMatches = [
      ...content.matchAll(/<Figure\s+[^>]*figKey="([^"]+)"/g),
    ];
    figureMatches.forEach((match) => {
      const figKey = match[1];
      counters[file].figures[figKey] = {
        figNumber: figureCount,
        parentDocId: reportId, // Store numeric ID instead of path
        parentDocPath: reportPath, // Keep the original path for reference
        docId: file,
      };
      figureCount++;
    });

    // Improved regex patterns for <Table>
    const tableMatches = [
      ...content.matchAll(
        /<(TableHorizontal|TableVertical|TableVerticalNoCap)\s+[^>]*tableKey="([^"]+)"/g
      ),
    ];
    tableMatches.forEach((match) => {
      const tableKey = match[2];
      counters[file].tables[tableKey] = {
        tableNumber: tableCount,
        parentDocId: reportId, // Store numeric ID instead of path
        parentDocPath: reportPath, // Keep the original path for reference
        docId: file,
      };
      tableCount++;
    });

    console.log(
      `Processed ${file}: ${figureMatches.length} figures, ${tableMatches.length} tables`
    );
  });

  // Save the counters to the corresponding JSON file
  fs.writeFileSync(outputFile, JSON.stringify(counters, null, 2));
  console.log(`✅ Processed ${reportPath} -> ${outputFile}`);
}

// Process each report
Object.keys(reportIDs).forEach(processReport);
