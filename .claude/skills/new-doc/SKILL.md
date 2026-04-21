---
name: new-doc
description: Scaffold a new document for an existing software product, creating all required directories, boilerplate files, page registrations, and header nav entries.
---

# New Doc

Interactively scaffold a new document within an existing software product on the RMC documentation site.

**Arguments:** `$ARGUMENTS` — optional. If provided, use as hints for the prompts below (e.g., a document title or path). Still confirm each value with the user before proceeding.

## Step 1: Gather Information via Interactive Prompts

Prompt the user for each of the following values, one at a time. Show sensible defaults where possible. Do NOT proceed until all values are confirmed.

### 1a — Category

Ask: "Which category does this document belong to?"

Present these options:
1. **Desktop Applications** (`desktop-applications/`)
2. **Toolbox Technical Manuals** (`toolbox-technical-manuals/`)
3. **Web Applications** (`web-applications/`)
4. **Developer Resources** (`dev/`)

### 1b — Software Product

Based on the selected category, list the existing software products by scanning the `docs/{category}/` directory for subdirectories. For toolbox documents, this is a two-level selection: first the suite (e.g., `internal-erosion-suite`), then the toolbox within it.

For dev documents, scan `docs/dev/` for existing groupings (e.g., `dst`, `documentation-guide`, or top-level dev docs).

Ask: "Which existing software product should this document belong to?"

Present the available options. The user may also type a path if they know it.

### 1c — Document Title

Ask: "What is the title of the new document?"

Example: "User's Guide", "Validation Studies", "Applications Guide", "Developer Guide", "Database Schema Reference"

### 1d — Document Slug

Auto-generate a kebab-case slug from the title (e.g., "User's Guide" → `users-guide`, "Validation Studies" → `validation-studies`).

Ask: "I'll use the slug `{slug}` for directory names. Is that correct, or would you like a different slug?"

### 1e — Version (non-dev only)

If the category is NOT `dev/`:
- Default to `v1.0`
- Ask: "What version should this document start at? (default: v1.0)"

If the category IS `dev/`:
- Ask: "Should this document be versioned? Dev docs are typically unversioned. (default: no)"
- If yes, ask for the version number (default `v1.0`)
- If no, the files will live directly in the document directory (no version subfolder)

### 1f — Active / Draft Status

Ask: "Should this document be active (visible and clickable) or inactive (shows 'Coming Soon' badge)? (default: active)"

Record both `active` (true/false) and `draft` (inverse of active) values.

### 1g — File Structure (dev only)

If the category is `dev/`:
- Ask: "Dev documents often have custom structures. Would you like the standard structure (00-introduction.mdx as first chapter) or a custom structure? If custom, list the filenames you want created (e.g., 'prerequisites-and-ide-setup, project-structure, common-tasks')."

### 1h — Header Nav

Ask: "Should this document appear in the site header navigation? (default: yes for non-dev, no for dev)"

### 1i — Confirmation

Display a summary of all gathered values:

```
Category:        {category}
Software:        {software product}
Document Title:  {title}
Document Slug:   {slug}
Version:         {version or "unversioned"}
Status:          {active/inactive}
Header Nav:      {yes/no}
Doc path:        docs/{full/path}
Figures path:    static/figures/{full/path}
Bibliography:    static/bibliographies/{full/path}/bib.json
```

Ask: "Does this look correct? (yes/no)"

If no, ask which value to change and loop back to that prompt.

## Step 2: Create Directory Structure

### For non-dev versioned documents:

Create these directories:
```
docs/{category}/{software}/{slug}/v{version}/
static/figures/{category}/{software}/{slug}/v{version}/figures/
static/bibliographies/{category}/{software}/{slug}/v{version}/
```

For desktop-applications, also create an `inline-images/` directory alongside figures:
```
static/figures/{category}/{software}/{slug}/v{version}/inline-images/
```

### For dev unversioned documents:

Create these directories:
```
docs/dev/{software}/{slug}/
```

Figures and bibliography directories are optional for dev docs — only create them if the user indicated they need figures or references.

### For dev versioned documents:

Same as non-dev but under the `dev/` path:
```
docs/dev/{software}/{slug}/v{version}/
static/figures/dev/{software}/{slug}/v{version}/figures/
static/bibliographies/dev/{software}/{slug}/v{version}/
```

## Step 3: Create Boilerplate MDX Files

### For non-dev documents, create these files:

**`00-document-info.mdx`:**
```mdx
---
title: Document Info
reportDate: {current month and year, e.g., "March 2026"}
reportType: Computer Program Document
reportTitle: {document title}
reportSubTitle: {software product display name}
reportAuthors: ['Enter author name, Risk Management Center']
reportAbstract: Enter report abstract.
reportSubjectTerms: ['Term 1', 'Term 2']
responsiblePersonName: Enter name of responsible person
responsiblePersonNumber: Enter phone number (xxx-xxx-xxxx)
citationGuide: 'F. M. Last, <i>{document title}</i>, Lakewood, CO: U.S. Army Corps of Engineers, Risk Management Center, {current year}. Accessed on <i>\{enter current date here\}</i>.'
---

import Link from '@docusaurus/Link';
import addBaseUrl from '@docusaurus/useBaseUrl';
import DocumentMetadata from '@site/src/components/DocumentMetadata';
import NavContainer from '@site/src/components/NavContainer';

<NavContainer
  link="{navContainerLink}"
  linkTitle="{navContainerLinkTitle}"
  document="{navContainerDocument}"
/>

# Document Information

<DocumentMetadata metadata={frontMatter} />
```

Where:
- `{navContainerLink}` is the software landing page path:
  - Desktop: `/desktop-applications/{software}`
  - Toolbox: `/toolboxes/{suite}`
  - Web: `/web-applications/{software}`
- `{navContainerLinkTitle}` is the display name of the software product (e.g., "LifeSim", "Internal Erosion Suite")
- `{navContainerDocument}` is the document path without version: `{category}/{software}/{slug}`

**`00-version-history.mdx`:**
```mdx
---
title: Version History
---

import Link from '@docusaurus/Link';
import NavContainer from '@site/src/components/NavContainer';
import TableVersionHistory from '@site/src/components/TableVersionHistory';

<NavContainer
  link="{navContainerLink}"
  linkTitle="{navContainerLinkTitle}"
  document="{navContainerDocument}"
/>

# Version History

<TableVersionHistory
  versions={['{version number without v prefix, e.g., 1.0}']}
  dates={['{current month and year}']}
  descriptions={['Initial release as an online document.']}
  modifiedBy={['-']}
  reviewedBy={['-']}
  approvedBy={['-']}
/>
```

**`01-preface.mdx`:**
```mdx
---
title: 'Preface'
---

import Link from '@docusaurus/Link';
import addBaseUrl from '@docusaurus/useBaseUrl';
import CitationFootnote from '@site/src/components/CitationFootnote';
import NavContainer from '@site/src/components/NavContainer';
import VersionSelector from '@site/src/components/VersionSelector';

<NavContainer
  link="{navContainerLink}"
  linkTitle="{navContainerLinkTitle}"
  document="{navContainerDocument}"
/>

# Preface

{Placeholder: describe the purpose of this document and the software it covers.}

## Contact Us

For questions or concerns, please email [RMC.Software@usace.army.mil](mailto:RMC.Software@usace.army.mil).

<CitationFootnote />
```

### For dev unversioned documents:

If the user chose the standard structure, create:

**`00-introduction.mdx`:**
```mdx
---
title: Introduction
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# {Document Title}

{Placeholder: introduce the purpose of this document.}
```

If the user chose a custom structure, create each file they listed with the same pattern:
- Sequential numbering starting at `01-` (since there's no `00-introduction.mdx` unless they listed one)
- Each file gets minimal frontmatter (`title` only) and a `NavContainer` pointing to `/dev`

### For dev versioned documents:

Use the same templates as non-dev but with:
- `navContainerLink`: `/dev`
- `navContainerLinkTitle`: `Developer Resources`
- `navContainerDocument`: `dev/{software}/{slug}`

## Step 4: Create Empty Bibliography File

For non-dev documents (and dev versioned documents that need one), create:

**`static/bibliographies/{category}/{software}/{slug}/v{version}/bib.json`:**
```json
[]
```

## Step 5: Register Document on Software Landing Page

### For desktop-applications:

Edit `src/pages/desktop-applications/{software}.js`:
1. Find the data array (e.g., `const lifeSimData = [...]`)
2. Add a new entry at the end of the array:
```javascript
{
  icon: 'img/{SoftwareIcon}.png',
  preserveIconColor: true,
  doc_location: '{category}/{software}/{slug}',
  doc_name: '{Software Display Name} {Document Title}',
  active: {true/false},
  draft: {true/false},
},
```

Use the same `icon` value as the other entries in the array.

### For toolbox-technical-manuals:

Edit `src/pages/toolboxes/{suite}.js`:
1. Find the data array
2. Add a new entry:
```javascript
{
  IconComponent: ToolboxIcon,
  doc_location: 'toolbox-technical-manuals/{suite}/{slug}',
  doc_name: '{Document Title} Toolbox Technical Manual',
  active: {true/false},
  draft: {true/false},
},
```

### For web-applications:

Edit `src/pages/web-applications/{software}.js`:
1. Find the data array
2. Add a new entry following the same pattern as existing entries in that file

### For dev:

Edit `src/pages/dev.js`:
1. Find the appropriate `contentCardData` array within `devData` based on the software grouping
2. Add a new entry:
```javascript
{
  IconComponent: CodeIcon,
  title: '{Document Title}',
  description: '{Brief description - ask user}',
  href: addBaseUrl('docs/dev/{software}/{slug}/{first-page-slug}'),
  active: {true/false},
},
```

For dev documents, ask the user: "What short description should appear on the dev landing page card?"

Also ask: "Which existing group on the dev page should this document be listed under?" and show the existing group names from `devData` (e.g., "RMC Software Documentation Website Documentation Guide", "RMC Development Resources", "RMC Web Development", "Dam Screening Tool Documents"). If none fit, offer to create a new group.

**Important:** For dev documents, the `href` must point to the actual first page of the document (e.g., `introduction` or the first custom file slug), not `preface`.

## Step 6: Add to Header Navigation (if applicable)

If the user chose to add the document to the header nav, edit `src/theme/Layout/buildNavLinks.js`:

### Add a version variable (non-dev versioned docs only):

In the appropriate section (Desktop Applications, Toolbox, Web Applications), add a new `const` for the document href:
```javascript
const {camelCaseVarName}Href = useBaseUrl(
  `/docs/{category}/{software}/{slug}/${latestVersions['{category}/{software}/{slug}'] || 'v{version}'}/preface`,
);
```

### Add to the links return structure:

Find the parent software product's `children` array and add:
```javascript
{
  id: '{slug}',
  text: '{Document Title}',
  href: {camelCaseVarName}Href,
},
```

If the parent software product does not currently have a `children` array, add one.

For dev documents, header nav is not applicable (dev is not in the header menu — it's only in the footer).

## Step 7: Run Generation Scripts

Run the build generation scripts to pick up the new document:

```bash
npm run sidebars && npm run counters && npm run versions
```

Verify no errors occur. If errors occur, diagnose and fix.

## Step 8: Verify

1. Check that all created files exist using Glob
2. Verify the software landing page JS file has the new entry
3. If header nav was requested, verify the buildNavLinks.js changes
4. Report a summary to the user:

```
Document scaffolded successfully!

Created files:
  - docs/{full path}/00-document-info.mdx
  - docs/{full path}/00-version-history.mdx
  - docs/{full path}/01-preface.mdx
  - static/figures/{full path}/figures/ (empty)
  - static/bibliographies/{full path}/bib.json

Registered on:
  - {software page path} (active: {yes/no})
  - Header nav: {yes/no}

Next steps:
  - Edit 00-document-info.mdx to fill in report metadata
  - Edit 01-preface.mdx to add your preface content
  - Add chapter files (02-*.mdx, 03-*.mdx, etc.)
  - Run `npm start` to preview locally
```
