const fs = require("fs");
const path = require("path");

const DOCS_DIR = path.join(__dirname, "..", "docs");
const SIDEBAR_PATH = path.join(__dirname, "..", "sidebars.js");

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.name.endsWith(".mdx")) {
      results.push(filePath);
    }
  });
  return results;
}

function titleCase(str) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function camelCase(str) {
  return str.replace(/[-_](.)/g, (_, group1) => group1.toUpperCase()).replace(/^(.)/, (_, group1) => group1.toLowerCase());
}

function getFrontmatterTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const match = content.match(/^\s*---\s*([\s\S]*?)\s*---/);
    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/^title:\s*(["']?)(.*?)\1\s*$/m);
      if (titleMatch) {
        return titleMatch[2].trim();
      }
    }
  } catch (err) {
    console.error(`Error reading frontmatter from ${filePath}:`, err);
  }
  return null;
}

function getFallbackLabel(filename) {
  if (filename.includes("appendix")) {
    const appendixMatch = filename.match(/appendix-([a-zA-Z0-9\-]+)/);
    if (appendixMatch) {
      return `Appendix ${titleCase(appendixMatch[1].replace(/-/g, " "))}`;
    }
    return "Appendix";
  }

  const parts = filename.replace(".mdx", "").split("-");
  return titleCase(parts.slice(1).join(" "));
}

function generateSidebarForVersion(versionPath, relativePath, docGroup, folderName) {
  const files = fs.readdirSync(versionPath).filter((f) => f.endsWith(".mdx"));
  files.sort();

  const infoItems = [];
  const mainItems = [];
  const appendixItems = [];

  // Special logic: applications-guide in rmc-totalrisk
  console.log("Checking docGroup:", docGroup);
  console.log("Checking folderName:", folderName);
  if (docGroup === "rmc-totalrisk" && folderName === "applications-guide") {
    console.log("Custom structure for RMC-TotalRisk Applications Guide activated!");
    const documentInfoDocs = [];
    let prefaceDoc = null;
    let mainReportDoc = null;
    const exampleDocs = [];

    files.forEach((file) => {
      const fileBase = file.replace(".mdx", "").replace(/^\d+-/, "");
      const fullPath = path.join(versionPath, file);
      const label = getFrontmatterTitle(fullPath) || getFallbackLabel(file);
      const id = `${relativePath}/${fileBase}`;

      if (file.startsWith("00-")) {
        documentInfoDocs.push({ type: "doc", id, label });
      } else if (file === "01-preface.mdx") {
        prefaceDoc = { type: "doc", id, label };
      } else if (file === "02-hydrologic-risk-analysis.mdx") {
        hydrologicDoc = { id }; // Used as id for the "Main Report" category
      } else if (file === "03-example-1.mdx") {
        exampleDocs.push({ type: "doc", id, label });
      }
    });

    const customStructure = [];

    if (documentInfoDocs.length) {
      customStructure.push({
        type: "category",
        label: "Document Information",
        collapsible: true,
        collapsed: true,
        items: documentInfoDocs,
      });
    }

    if (prefaceDoc) customStructure.push(prefaceDoc);

    if (hydrologicDoc) {
      customStructure.push({
        type: "category",
        label: "Hydrologic Risk Analysis",
        link: { type: "doc", id: hydrologicDoc.id },
        collapsible: true,
        collapsed: false,
        items: exampleDocs,
      });
    }

    return customStructure;
  }

  // Default logic
  files.forEach((file) => {
    const fileBase = file.replace(".mdx", "").replace(/^\d+-/, "");
    const filePath = `${relativePath}/${fileBase}`;
    const fullPath = path.join(versionPath, file);
    const label = getFrontmatterTitle(fullPath) || getFallbackLabel(file);

    const docItem = { type: "doc", id: filePath, label };

    if (file.startsWith("00-")) {
      infoItems.push(docItem);
    } else if (file.toLowerCase().includes("appendix")) {
      appendixItems.push(docItem);
    } else {
      mainItems.push(docItem);
    }
  });

  const sidebar = [];

  if (infoItems.length) {
    sidebar.push({
      type: "category",
      label: "Document Information",
      collapsible: true,
      collapsed: true,
      items: infoItems,
    });
  }

  if (mainItems.length) {
    sidebar.push({
      type: "category",
      label: "Main Report",
      collapsible: true,
      collapsed: false,
      items: mainItems,
    });
  }

  if (appendixItems.length) {
    sidebar.push({
      type: "category",
      label: "Appendices",
      collapsible: true,
      collapsed: true,
      items: appendixItems,
    });
  }

  return sidebar;
}

function generateDocumentationGuideSidebar() {
  const guideDir = path.join(DOCS_DIR, "00-documentation-guide");
  if (!fs.existsSync(guideDir)) return null;

  const files = fs
    .readdirSync(guideDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  // Each file becomes a doc item, using its filename (without extention) as the id
  const items = files.map((file) => {
    const fileBase = file.replace(/\.mdx$/, "").replace(/^\d+-/, "");
    const fullPath = path.join(guideDir, file);
    // Try to get the frontmatter title, fallback to title-cased filename
    const label = getFrontmatterTitle(fullPath) || titleCase(fileBase);
    return {
      type: "doc",
      id: `documentation-guide/${fileBase}`,
      label,
    };
  });

  return [
    {
      type: "category",
      label: "Documentation Guide",
      collapsible: false,
      collapsed: false,
      items,
    },
  ];
}

function generateSidebars() {
  const sidebarContent = {};
  const versions = walkDir(DOCS_DIR).filter((filePath) => /\bv\d+\.\d+\b/.test(filePath));

  versions.forEach((filePath) => {
    const versionDir = path.dirname(filePath);
    const relPath = path.relative(DOCS_DIR, versionDir).replace(/\\/g, "/");

    const versionMatch = relPath.match(/(.*)\/(v\d+\.\d+)$/);
    if (!versionMatch) return;

    const docPath = versionMatch[1];
    const version = versionMatch[2];
    const docParts = docPath.split("/");
    const docGroup = docParts[1]; // e.g., "rmc-totalrisk"
    const folderName = docParts[docParts.length - 1]; // e.g., "applications-guide"

    const groupCamel = camelCase(docGroup);
    const folderCamel = camelCase(folderName);
    const versionFormatted = version.replace(/\./g, "_");
    const sidebarKey = `${groupCamel}${folderCamel}_${versionFormatted}`;

    const documentName = titleCase(folderName);

    // Only create if not already present
    if (!sidebarContent[sidebarKey]) {
      sidebarContent[sidebarKey] = {
        [documentName]: generateSidebarForVersion(path.join(DOCS_DIR, relPath), relPath, docGroup, folderName),
      };
    }
  });

  // Add Documentation Guide sidebar if present
  const docGuideSidebar = generateDocumentationGuideSidebar();
  if (docGuideSidebar) {
    sidebarContent.documentationGuide = {
      "Documentation Guide": docGuideSidebar,
    };
  }

  return sidebarContent;
}

function writeSidebarFile() {
  const sidebars = generateSidebars();

  const sidebarEntries = Object.entries(sidebars)
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value, null, 2).replace(/\n/g, "\n  ")}`)
    .join(",\n");

  const output = `module.exports = {\n${sidebarEntries}\n};\n`;

  fs.writeFileSync(SIDEBAR_PATH, output, "utf8");
  console.log("✅ sidebars.js has been generated correctly.");
}

writeSidebarFile();
