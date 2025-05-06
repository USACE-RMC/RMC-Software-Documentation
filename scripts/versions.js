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
const algoliaCrawlerVersionsOutputPath = path.join(
  __dirname,
  "..",
  "static",
  "versions",
  "algoliaCrawlerVersions.json"
);

// Define your folder structure for versioning
const folderStructure = [
  "toolbox-technical-manuals",
  "desktop-applications",
  "web-applications",
];

// Function to check if a folder name is a valid version (can be modified based on your version naming convention)
function isValidVersion(version) {
  // Assuming version names are in the form of 'vX.X.X', like 'v1.0.0'
  return /^v\d+\.\d+$/.test(version);
  //return /^v\d+\.\d+\.\d+$/.test(version);
}

// Recursive function to traverse through all folder levels and find both the latest version and all versions
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

      // If the current folder contains valid versions, gather them
      if (latestVersion) {
        latestResult[path.posix.join(currentPath, entry)] = latestVersion;
      }

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
      Object.assign(latestResult, subResult.latestResult);
      Object.assign(allVersionsResult, subResult.allVersionsResult);
    }
  });

  return { latestResult, allVersionsResult };
}

// Function to get the latest version from the valid version folders
function getLatestVersion(folderPath) {
  const entries = fs.readdirSync(folderPath);

  // Filter directories and get valid version directories
  const validVersions = entries.filter(
    (entry) =>
      fs.statSync(path.join(folderPath, entry)).isDirectory() &&
      isValidVersion(entry)
  );

  if (validVersions.length > 0) {
    // Sort to get the highest version (latest version)
    validVersions.sort((a, b) => b.localeCompare(a)); // Sort descending
    return validVersions[0]; // Return the latest version
  }

  return null;
}

function generateVersions() {
  // Ensure the static/versions directory exists
  const versionsDir = path.join(__dirname, "..", "static", "versions");
  if (!fs.existsSync(versionsDir)) {
    fs.mkdirSync(versionsDir, { recursive: true });
  }
  
  const latestVersions = {};
  const allVersions = {};

  // Traverse through the folder structure to gather both latest version and all versions data
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

  // Convert paths to forward slashes
  const updatedLatestVersions = {};
  const updatedAllVersions = {};

  // Format the latest versions and all versions (paths as forward slashes)
  for (const key in latestVersions) {
    const newKey = key.replace(/\\/g, "/"); // Replace backslashes with forward slashes
    updatedLatestVersions[newKey] = latestVersions[key];
  }

  for (const key in allVersions) {
    const newKey = key.replace(/\\/g, "/"); // Replace backslashes with forward slashes
    updatedAllVersions[newKey] = allVersions[key];
  }

  // Write the result to latestVersions.json with proper path formatting
  fs.writeFileSync(
    latestVersionsOutputPath,
    JSON.stringify(updatedLatestVersions, null, 2)
  );
  console.log("Latest versions have been written to latestVersions.json");

  // Write the result to versionList.json with all versions
  fs.writeFileSync(
    versionListOutputPath,
    JSON.stringify(updatedAllVersions, null, 2)
  );
  console.log("Version list has been written to versionList.json");

  // Write the result to algoliaCrawlerVersions.json with ready-to-paste information for Algolia crawler
  const baseUrl =
    "https://usace-rmc.github.io/RMC-Software-Documentation/docs/";
  const algoliaCrawlerStartUrls = Object.entries(updatedLatestVersions).map(
    ([key, version]) => `${baseUrl}${key}/${version}`
  );
  const algoliaCrawlerDiscovery = Object.entries(updatedLatestVersions).map(
    ([key, version]) => `${baseUrl}${key}/${version}/**`
  );
  const algoliaCrawlerData = {
    startUrls: algoliaCrawlerStartUrls,
    discoveryPatterns: algoliaCrawlerDiscovery,
  };

  fs.writeFileSync(
    algoliaCrawlerVersionsOutputPath,
    JSON.stringify(algoliaCrawlerData, null, 2)
  );
  console.log("Algolia Crawler URLs written to algoliaCrawlerVersions.json");
}

// Run the function to generate both latestVersions.json and versionList.json
generateVersions();
