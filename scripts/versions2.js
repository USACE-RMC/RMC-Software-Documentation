const fs = require("fs");
const path = require("path");

// Define the base path for your docs folder
const docsFolderPath = path.join(__dirname, "..", "docs");
const versionListOutputPath = path.join(
  __dirname,
  "..",
  "static",
  "versions",
  "versionList.json"
);

// Define your folder structure for versioning
const folderStructure = [
  "toolbox-technical-manuals",
  "desktop-applications",
  "web-applications",
];

// Function to check if a folder name is a valid version (can be modified based on your version naming convention)
function isValidVersion(version) {
  return /^v\d+\.\d+$/.test(version);
}

// Recursive function to traverse through all folder levels and find all versions
function traverseFolders(basePath, currentPath = "") {
  const folderPath = path.join(basePath, currentPath);
  const entries = fs.readdirSync(folderPath);
  const allVersionsResult = {};

  entries.forEach((entry) => {
    const entryPath = path.join(folderPath, entry);
    if (fs.statSync(entryPath).isDirectory()) {
      const subFolderPath = path.join(currentPath, entry);

      // Collect all versions for the document
      const versions = fs
        .readdirSync(entryPath)
        .filter(
          (subEntry) =>
            isValidVersion(subEntry) &&
            fs.statSync(path.join(entryPath, subEntry)).isDirectory()
        );

      if (versions.length > 0) {
        allVersionsResult[path.posix.join(currentPath, entry)] = versions;
      }

      // Recurse deeper into subfolders
      const subResult = traverseFolders(basePath, subFolderPath);
      Object.assign(allVersionsResult, subResult);
    }
  });

  return allVersionsResult;
}

function generateVersionList() {
  const allVersions = {};

  folderStructure.forEach((folder) => {
    const folderPath = path.join(docsFolderPath, folder);

    if (fs.existsSync(folderPath)) {
      const allVersionsResult = traverseFolders(docsFolderPath, folder);
      Object.assign(allVersions, allVersionsResult);
    }
  });

  const updatedAllVersions = {};
  for (const key in allVersions) {
    const newKey = key.replace(/\\/g, "/"); // Normalize to forward slashes
    updatedAllVersions[newKey] = allVersions[key];
  }

  fs.writeFileSync(
    versionListOutputPath,
    JSON.stringify(updatedAllVersions, null, 2)
  );
  console.log("Version list has been written to versionList.json");
}

// Run the function
generateVersionList();
