const fs = require('fs');
const path = require('path');

// Define the base path for your docs folder
const docsFolderPath = path.join(__dirname, '..', 'docs');
const latestVersionsOutputPath = path.join(
  __dirname,
  '..',
  'static',
  'versions',
  'latestVersions.json',
);
const versionListOutputPath = path.join(__dirname, '..', 'static', 'versions', 'versionList.json');
const algoliaCrawlerVersionsOutputPath = path.join(
  __dirname,
  '..',
  'static',
  'versions',
  'algoliaCrawlerVersions.json',
);

// Define your folder structure for versioning
const folderStructure = ['toolbox-technical-manuals', 'desktop-applications', 'web-applications'];

// Validate version folder names like "v1.0" or "v12.3"
function isValidVersion(version) {
  return /^v\d+\.\d+$/.test(version);
}

// Compare versions numerically (so v1.10 > v1.9)
function compareVersionsDesc(a, b) {
  const [amaj, amin] = a.replace(/^v/, '').split('.').map(Number);
  const [bmaj, bmin] = b.replace(/^v/, '').split('.').map(Number);
  if (bmaj !== amaj) return bmaj - amaj;
  return bmin - amin;
}

// Function to get the latest version from the valid version folders
function getLatestVersion(folderPath) {
  const entries = fs.readdirSync(folderPath);
  const validVersions = entries.filter(
    (entry) => fs.statSync(path.join(folderPath, entry)).isDirectory() && isValidVersion(entry),
  );
  if (validVersions.length > 0) {
    validVersions.sort(compareVersionsDesc);
    return validVersions[0];
  }
  return null;
}

// Recursive function to traverse through all folder levels and find both the latest version and all versions
function traverseFolders(basePath, currentPath = '') {
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
            isValidVersion(subEntry) && fs.statSync(path.join(entryPath, subEntry)).isDirectory(),
        )
        .sort(compareVersionsDesc);

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

function generateVersions() {
  // Ensure the static/versions directory exists
  const versionsDir = path.join(__dirname, '..', 'static', 'versions');
  if (!fs.existsSync(versionsDir)) {
    fs.mkdirSync(versionsDir, { recursive: true });
  }

  const latestVersions = {};
  const allVersions = {};

  // Traverse through the folder structure to gather both latest version and all versions data
  folderStructure.forEach((folder) => {
    const folderPath = path.join(docsFolderPath, folder);
    if (fs.existsSync(folderPath)) {
      const { latestResult, allVersionsResult } = traverseFolders(docsFolderPath, folder);
      Object.assign(latestVersions, latestResult);
      Object.assign(allVersions, allVersionsResult);
    }
  });

  // Convert keys to forward slashes
  const updatedLatestVersions = {};
  const updatedAllVersions = {};

  for (const key in latestVersions) {
    const newKey = key.replace(/\\/g, '/');
    updatedLatestVersions[newKey] = latestVersions[key];
  }
  for (const key in allVersions) {
    const newKey = key.replace(/\\/g, '/');
    updatedAllVersions[newKey] = allVersions[key];
  }

  // Write latestVersions.json
  fs.writeFileSync(latestVersionsOutputPath, JSON.stringify(updatedLatestVersions, null, 2));
  console.log('Latest versions have been written to latestVersions.json');

  // Write versionList.json
  fs.writeFileSync(versionListOutputPath, JSON.stringify(updatedAllVersions, null, 2));
  console.log('Version list has been written to versionList.json');

  // Build Algolia Crawler config snippets
  const baseUrl = 'https://usace-rmc.github.io/RMC-Software-Documentation/docs/';

  // Make the landing page slug configurable (change if you ever rename)
  const PREFACE_SLUG = 'preface';

  // Start URLs should point directly to the Preface page per doc/version
  const startUrls = Object.entries(updatedLatestVersions).map(
    ([key, version]) => `${baseUrl}${key}/${version}/${PREFACE_SLUG}`,
  );

  // (Optional) Warn if Preface.{md,mdx} doesn't exist locally.
  // This is just a sanity check and won't block output.
  for (const [key, version] of Object.entries(updatedLatestVersions)) {
    const parts = key.split('/');
    const prefaceMdx = path.join(docsFolderPath, ...parts, version, `${PREFACE_SLUG}.mdx`);
    const prefaceMd = path.join(docsFolderPath, ...parts, version, `${PREFACE_SLUG}.md`);
    if (!fs.existsSync(prefaceMdx) && !fs.existsSync(prefaceMd)) {
      console.warn(
        `[versions] Warning: no ${PREFACE_SLUG}.{md,mdx} at docs/${key}/${version} (startUrl will still use /${PREFACE_SLUG})`,
      );
    }
  }

  // Discovery patterns can remain the full subtree so the crawler explores everything
  const discoveryPatterns = Object.entries(updatedLatestVersions).map(
    ([key, version]) => `${baseUrl}${key}/${version}/**`,
  );

  // Exclude non-latest versions from crawling
  const exclusionPatterns = [];
  for (const [key, versions] of Object.entries(updatedAllVersions)) {
    const latest = updatedLatestVersions[key];
    versions.forEach((v) => {
      if (v !== latest) {
        exclusionPatterns.push(`${baseUrl}${key}/${v}/**`);
      }
    });
  }

  const algoliaCrawlerData = {
    startUrls,
    discoveryPatterns,
    exclusionPatterns,
  };

  fs.writeFileSync(algoliaCrawlerVersionsOutputPath, JSON.stringify(algoliaCrawlerData, null, 2));
  console.log(
    'Algolia Crawler data (startUrls to /Preface, discoveryPatterns, exclusionPatterns) written to algoliaCrawlerVersions.json',
  );
}

// Run the generator
generateVersions();
