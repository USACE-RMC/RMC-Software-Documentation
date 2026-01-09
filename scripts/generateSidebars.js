/**
 * RMC Software Documentation Sidebar Generator
 *
 * This script generates the Docusaurus sidebar structure for all documentation sets.
 *
 * - "Standard logic" is used for most documents.
 * - "Custom logic" is used for the following specific documents:
 *    - RMC-TotalRisk Applications Guide
 *    - Event Tree Database
 *    - Documentation Guide
 *
 * Each section is clearly marked below.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'docs');
const SIDEBAR_PATH = path.join(__dirname, '..', 'sidebars.js');

/* --- Utility Functions (Standard Logic) --- */

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((file) => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.name.endsWith('.mdx')) {
      results.push(filePath);
    }
  });
  return results;
}

function titleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function camelCase(str) {
  return str.replace(/[-_](.)/g, (_, group1) => group1.toUpperCase()).replace(/^(.)/, (_, group1) => group1.toLowerCase());
}

function getFrontmatterTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
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
  if (filename.includes('appendix')) {
    const appendixMatch = filename.match(/appendix-([a-zA-Z0-9\-]+)/);
    if (appendixMatch) {
      return `Appendix ${titleCase(appendixMatch[1].replace(/-/g, ' '))}`;
    }
    return 'Appendix';
  }
  const parts = filename.replace('.mdx', '').split('-');
  return titleCase(parts.slice(1).join(' '));
}

/* --- Custom Logic: LifeSim Validation Studies Sidebar --- */
function generateSidebarForLifeSimValidationStudies(versionPath, relativePath) {
  // No double nesting: return the items array directly
  return [
    {
      type: 'category',
      label: 'Document Information',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: `${relativePath}/document-info`,
          label: 'Document Information',
        },
        {
          type: 'doc',
          id: `${relativePath}/version-history`,
          label: 'Version History',
        },
      ],
    },
    { type: 'doc', id: `${relativePath}/preface`, label: 'Preface' },
    {
      type: 'category',
      label: 'Studies',
      collapsible: true,
      collapsed: false,
      items: [
        { type: 'doc', id: `${relativePath}/brumadinho`, label: 'Brumadinho' },
        { type: 'doc', id: `${relativePath}/johnstown`, label: 'Johnstown' },
        { type: 'doc', id: `${relativePath}/joso`, label: 'Jōsō' },
        {
          type: 'doc',
          id: `${relativePath}/katrina-east-bowl`,
          label: 'Katrina - East Bowl',
        },
        {
          type: 'doc',
          id: `${relativePath}/kelly-barnes`,
          label: 'Kelly Barnes',
        },
        { type: 'doc', id: `${relativePath}/malpasset`, label: 'Malpasset' },
        {
          type: 'doc',
          id: `${relativePath}/midland-dams`,
          label: 'Midland Dams',
        },
        { type: 'doc', id: `${relativePath}/oroville`, label: 'Oroville' },
        { type: 'doc', id: `${relativePath}/teton`, label: 'Teton' },
      ],
    },
    { type: 'doc', id: `${relativePath}/references`, label: 'References' },
  ];
}

/* --- Custom Logic: Event Tree Database Sidebar --- */

function generateSidebarForEventTree(versionPath, relativePath) {
  const files = fs.readdirSync(versionPath).filter((f) => f.endsWith('.mdx'));
  files.sort();

  const infoItems = [];
  const topLevelDocs = [];
  const majorCategories = {};

  files.forEach((file) => {
    const fileBase = file.replace(/\.mdx$/, '');
    const fullPath = path.join(versionPath, file);
    // Strip all leading NN- patterns for doc ID
    const strippedBase = fileBase.replace(/^(\d{2,3}-)+/, '');
    const fileId = `${relativePath}/${strippedBase}`;
    const label = getFrontmatterTitle(fullPath) || titleCase(strippedBase);
    const docItem = { type: 'doc', id: fileId, label };

    // Document Information
    if (file === '00-document-info.mdx' || file === '00-version-history.mdx') {
      infoItems.push(docItem);
      return;
    }

    // Standalone top-level docs
    if (file === '01-preface.mdx' || file === '02-table-of-contents.mdx') {
      topLevelDocs.push(docItem);
      return;
    }

    // Major category: 3-digit number, dash, then anything (e.g., 030-major-category)
    const majorCatMatch = fileBase.match(/^(\d{3})-(.+)$/);
    if (majorCatMatch && majorCatMatch[1][2] === '0') {
      const majorNum = majorCatMatch[1];
      majorCategories[majorNum] = {
        type: 'category',
        label,
        collapsible: true,
        collapsed: true,
        items: [],
        link: { type: 'doc', id: fileId },
      };
      return;
    }

    // Sub-item: 3-digit number, dash, then anything (e.g., 031-event-tree)
    const subItemMatch = fileBase.match(/^(\d{3})-(.+)$/);
    if (subItemMatch && subItemMatch[1][2] !== '0') {
      // Place under the corresponding major category (e.g., 031 -> 030)
      const majorNum = subItemMatch[1].slice(0, 2) + '0';
      if (!majorCategories[majorNum]) {
        // If the major category doc doesn't exist, create a placeholder
        majorCategories[majorNum] = {
          type: 'category',
          label: `Category ${majorNum}`,
          collapsible: true,
          collapsed: true,
          items: [],
        };
      }
      majorCategories[majorNum].items.push(docItem);
      return;
    }

    // If it doesn't match anything above, just push to top-level docs
    topLevelDocs.push(docItem);
  });

  // Sort major categories numerically
  const sortedMajorCategories = Object.keys(majorCategories)
    .sort((a, b) => Number(a) - Number(b))
    .map((key) => majorCategories[key]);

  const sidebar = [];

  if (infoItems.length) {
    sidebar.push({
      type: 'category',
      label: 'Document Information',
      collapsible: true,
      collapsed: true,
      items: infoItems,
    });
  }

  sidebar.push(...topLevelDocs);
  sidebar.push(...sortedMajorCategories);

  return sidebar;
}

/* --- Custom Logic: RMC-TotalRisk Applications Guide Sidebar --- */

function generateSidebarForRmcTotalRiskApplicationsGuide(versionPath, relativePath) {
  const files = fs.readdirSync(versionPath).filter((f) => f.endsWith('.mdx'));
  files.sort();

  const documentInfoDocs = [];
  let prefaceDoc = null;
  let hydrologicDoc = null;
  const exampleDocs = [];

  files.forEach((file) => {
    const fileBase = file.replace('.mdx', '').replace(/^\d+-/, '');
    const fullPath = path.join(versionPath, file);
    const label = getFrontmatterTitle(fullPath) || getFallbackLabel(file);
    const id = `${relativePath}/${fileBase}`;

    if (file.startsWith('00-')) {
      documentInfoDocs.push({ type: 'doc', id, label });
    } else if (file === '01-preface.mdx') {
      prefaceDoc = { type: 'doc', id, label };
    } else if (file === '02-hydrologic-risk-analysis.mdx') {
      hydrologicDoc = { id, label };
    } else if (file.startsWith('03-')) {
      exampleDocs.push({ type: 'doc', id, label });
    }
  });

  const customStructure = [];

  if (documentInfoDocs.length) {
    customStructure.push({
      type: 'category',
      label: 'Document Information',
      collapsible: true,
      collapsed: true,
      items: documentInfoDocs,
    });
  }

  if (prefaceDoc) customStructure.push(prefaceDoc);

  if (hydrologicDoc) {
    customStructure.push({
      type: 'category',
      label: hydrologicDoc.label || 'Hydrologic Risk Analysis',
      link: { type: 'doc', id: hydrologicDoc.id },
      collapsible: true,
      collapsed: false,
      items: exampleDocs,
    });
  }

  return customStructure;
}

/* --- Standard Logic: Default Sidebar for Most Documents --- */

function generateSidebarForVersion(versionPath, relativePath, docGroup, folderName) {
  // CUSTOM LOGIC: Event Tree Database
  if (folderName === 'typical-event-tree-database') {
    return generateSidebarForEventTree(versionPath, relativePath);
  }

  // CUSTOM LOGIC: RMC-TotalRisk Applications Guide
  if (docGroup === 'rmc-totalrisk' && folderName === 'applications-guide') {
    return generateSidebarForRmcTotalRiskApplicationsGuide(versionPath, relativePath);
  }

  // CUSTOM LOGIC: LifeSim Validation Studies
  if (docGroup === 'lifesim' && folderName === 'validation-studies') {
    return generateSidebarForLifeSimValidationStudies(versionPath, relativePath);
  }

  // STANDARD LOGIC: All other documents
  const files = fs.readdirSync(versionPath).filter((f) => f.endsWith('.mdx'));
  files.sort();

  const infoItems = [];
  const mainItems = [];
  const appendixItems = [];

  files.forEach((file) => {
    const fileBase = file.replace('.mdx', '').replace(/^\d+-/, '');
    const filePath = `${relativePath}/${fileBase}`;
    const fullPath = path.join(versionPath, file);
    const label = getFrontmatterTitle(fullPath) || getFallbackLabel(file);

    const docItem = { type: 'doc', id: filePath, label };

    if (file.startsWith('00-')) {
      infoItems.push(docItem);
    } else if (file.toLowerCase().includes('appendix')) {
      appendixItems.push(docItem);
    } else {
      mainItems.push(docItem);
    }
  });

  const sidebar = [];

  if (infoItems.length) {
    sidebar.push({
      type: 'category',
      label: 'Document Information',
      collapsible: true,
      collapsed: true,
      items: infoItems,
    });
  }

  if (mainItems.length) {
    sidebar.push({
      type: 'category',
      label: 'Main Report',
      collapsible: true,
      collapsed: false,
      items: mainItems,
    });
  }

  if (appendixItems.length) {
    sidebar.push({
      type: 'category',
      label: 'Appendices',
      collapsible: true,
      collapsed: true,
      items: appendixItems,
    });
  }

  return sidebar;
}

/* --- Custom Logic: Documentation Guide Sidebar --- */

function generateDocumentationGuideSidebar() {
  const guideDir = path.join(DOCS_DIR, '00-documentation-guide');
  if (!fs.existsSync(guideDir)) return null;

  const mainIds = [
    '00-introduction',
    '01-getting-started',
    '02-versioning-system',
    '03-project-structure',
    '04-docx-converter',
    '05-build-process-overview',
    '06-creating-editing-pages',
    '07-react-components',
    '08-quick-reference',
    '09-troubleshooting-faq',
  ];
  const appendixIds = ['10-appendix-a-source-code-structure', '11-appendix-b-search-configuration'];

  const files = fs
    .readdirSync(guideDir)
    .filter((f) => f.endsWith('.mdx'))
    .sort();

  function getLabel(fileBase) {
    const fullPath = path.join(guideDir, `${fileBase}.mdx`);
    return getFrontmatterTitle(fullPath) || titleCase(fileBase.replace(/^\d+-/, ''));
  }

  // Build main sidebar items
  const items = [];
  mainIds.forEach((id) => {
    if (!files.includes(`${id}.mdx`)) return;
    items.push({
      type: 'doc',
      id: `documentation-guide/${id.replace(/^\d+-/, '')}`,
      label: getLabel(id),
    });
  });

  // Add appendices
  appendixIds.forEach((id) => {
    if (!files.includes(`${id}.mdx`)) return;
    items.push({
      type: 'doc',
      id: `documentation-guide/${id}`,
      label: getLabel(id),
    });
  });

  return items;
}

/* --- Sidebar Generation Entrypoint --- */

function generateSidebars() {
  const sidebarContent = {};
  const versions = walkDir(DOCS_DIR).filter((filePath) => /\bv\d+\.\d+\b/.test(filePath));

  versions.forEach((filePath) => {
    const versionDir = path.dirname(filePath);
    const relPath = path.relative(DOCS_DIR, versionDir).replace(/\\/g, '/');

    const versionMatch = relPath.match(/(.*)\/(v\d+\.\d+)$/);
    if (!versionMatch) return;

    const docPath = versionMatch[1];
    const version = versionMatch[2];
    const docParts = docPath.split('/');
    const docGroup = docParts[1]; // e.g., "rmc-totalrisk"
    const folderName = docParts[docParts.length - 1]; // e.g., "applications-guide"

    const groupCamel = camelCase(docGroup);
    const folderCamel = camelCase(folderName);
    const versionFormatted = version.replace(/\./g, '_');
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
      'Documentation Guide': docGuideSidebar,
    };
  }

  return sidebarContent;
}

/* --- Write Sidebar File --- */

function writeSidebarFile() {
  const sidebars = generateSidebars();

  const sidebarEntries = Object.entries(sidebars)
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value, null, 2).replace(/\n/g, '\n  ')}`)
    .join(',\n');

  const output = `module.exports = {\n${sidebarEntries}\n};\n`;

  fs.writeFileSync(SIDEBAR_PATH, output, 'utf8');
  console.log('✅ sidebars.js has been generated correctly.');
}

writeSidebarFile();
