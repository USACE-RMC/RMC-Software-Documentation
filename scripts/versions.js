const fs = require("fs");
const path = require("path");

// Define the base path for your docs folder
const docsFolderPath = path.join(__dirname, "..", "docs");
const latestVersionsOutputPath = path.join(
  __dirname,
  "..",
  "static",
  "versions",
  "latestVersions.json"
);
const versionListOutputPath = path.join(
  __dirname,
  "..",
  "static",
  "versions",
  "versionList.json"
);
const startUrlsOutputPath = path.join(
  __dirname,
  "..",
  "static",
  "versions",
  "startUrls.json"
);

// Set your actual base URL here
const baseUrl = "/RMC-Software-Documentation/";

// Define your folder structure for versioning
const folderStructure = [
  "toolbox-technical-manuals",
  "desktop-applications",
  "web-applications",
];

// Function to check if a folder name is a valid version
function isValidVersion(version) {
  return /^v\d+\.\d+$/.test(version);
}

// Traverse folders to find latest version and all versions
function traverseFolders(basePath, currentPath = "") {
  const folderPath = path.join(basePath, currentPath);
  const entries = fs.readdirSync(folderPath);
  const latestResult = {};
  const allVersionsResult = {};

  entries.forEach((entry) => {
    const entryPath = path.join(folderPath, entry);
    if (fs.statSync(entryPath).isDirectory()) {
      const subFolderPath = path.join(currentPath, entry);
      const latestVersion = getLatestVersion(entryPath);

      if (latestVersion) {
        latestResult[path.posix.join(currentPath, entry)] = latestVersion;
      }

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

      const subResult = traverseFolders(basePath, subFolderPath);
      Object.assign(latestResult, subResult.latestResult);
      Object.assign(allVersionsResult, subResult.allVersionsResult);
    }
  });

  return { latestResult, allVersionsResult };
}

// Get the latest version
function getLatestVersion(folderPath) {
  const entries = fs.readdirSync(folderPath);
  const validVersions = entries.filter(
    (entry) =>
      fs.statSync(path.join(folderPath, entry)).isDirectory() &&
      isValidVersion(entry)
  );
  if (validVersions.length > 0) {
    validVersions.sort((a, b) => b.localeCompare(a));
    return validVersions[0];
  }
  return null;
}

function generateVersions() {
  const latestVersions = {};
  const allVersions = {};

  folderStructure.forEach((folder) => {
    const folderPath = path.join(docsFolderPath, folder);
    if (fs.existsSync(folderPath)) {
      const { latestResult, allVersionsResult } = traverseFolders(
        docsFolderPath,
        folder
      );
      Object.assign(latestVersions, latestResult);
      Object.assign(allVersions, allVersionsResult);
    }
  });

  const updatedLatestVersions = {};
  const updatedAllVersions = {};

  for (const key in latestVersions) {
    const newKey = key.replace(/\\/g, "/");
    updatedLatestVersions[newKey] = latestVersions[key];
  }

  for (const key in allVersions) {
    const newKey = key.replace(/\\/g, "/");
    updatedAllVersions[newKey] = allVersions[key];
  }

  fs.writeFileSync(
    latestVersionsOutputPath,
    JSON.stringify(updatedLatestVersions, null, 2)
  );
  console.log("✅ latestVersions.json created");

  fs.writeFileSync(
    versionListOutputPath,
    JSON.stringify(updatedAllVersions, null, 2)
  );
  console.log("✅ versionList.json created");

  const startUrls = Object.entries(updatedLatestVersions).map(
    ([key, version]) => `${baseUrl}${key}/${version}/`
  );

  fs.writeFileSync(startUrlsOutputPath, JSON.stringify(startUrls, null, 2));
  console.log("✅ startUrls.json created with", startUrls.length, "URLs");
}

generateVersions();
