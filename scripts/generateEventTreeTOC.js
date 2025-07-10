const fs = require("fs");
const path = require("path");

const BASE_PATH = path.join(__dirname, "../docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database");
const OUTPUT_FILE = path.join(__dirname, "../src/data/eventTreeToc.json");

function isIgnorable(fileName) {
  return /^(00|01|02)/.test(fileName);
}

function getNumericPrefix(fileName) {
  const match = fileName.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function getFrontmatterTitle(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/---\s*([\s\S]*?)---/);
  if (!match) return null;

  const frontmatter = match[1];
  const titleLine = frontmatter.split("\n").find((line) => line.trim().startsWith("title:"));
  if (!titleLine) return null;

  return titleLine
    .replace("title:", "")
    .trim()
    .replace(/^["']|["']$/g, ""); // remove quotes
}

function getTOCForVersion(versionPath, version) {
  const result = {};
  const files = fs
    .readdirSync(versionPath)
    .filter((f) => f.endsWith(".mdx") && !isIgnorable(f))
    .sort();

  let currentCategory = null;

  files.forEach((file) => {
    const filePath = path.join(versionPath, file);
    const prefix = getNumericPrefix(file);
    const title = getFrontmatterTitle(filePath) || file.replace(/\.mdx$/, "");

    if (prefix % 10 === 0) {
      // This is a category
      currentCategory = title;
      result[currentCategory] = [];
    } else if (currentCategory) {
      // Child of category
      const slug = file.replace(/^\d+-/, "").replace(/\.mdx$/, "");
      const relativePath = `/docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database/${version}/${slug}`;
      result[currentCategory].push({ label: title, path: relativePath });
    }
  });

  return result;
}

function generateTOC() {
  const versions = fs.readdirSync(BASE_PATH).filter((d) => fs.statSync(path.join(BASE_PATH, d)).isDirectory());

  const toc = {};

  versions.forEach((version) => {
    const versionPath = path.join(BASE_PATH, version);
    toc[version] = getTOCForVersion(versionPath, version);
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(toc, null, 2));
  console.log("✅ Event tree TOC generated.");
}

generateTOC();
