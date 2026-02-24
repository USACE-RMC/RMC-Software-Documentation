---
name: update-documentation-guide
description: Audit the documentation guide against current site contents and update outdated or missing information. Compares components, scripts, features, and configurations against each guide chapter.
---

# Update Documentation Guide

Audit the documentation guide for accuracy against the current state of the site, then update any outdated or missing content.

**Arguments:** `$ARGUMENTS` (optional) — specific chapter filename(s) to audit, e.g.:
- `07-react-components.mdx` — audit only the React Components chapter
- `09-appendix-a-source-code-structure.mdx 10-appendix-b-build-process-overview.mdx` — audit two specific appendices
- *(empty)* — audit all chapters (full audit)

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:
- If **empty**, set scope to **all chapters** in the documentation guide directory
- If **filenames provided**, set scope to only those chapters

The documentation guide lives at:
```
docs/dev/documentation-guide/
```

List all MDX files in this directory to confirm the current chapter inventory:
```bash
ls docs/dev/documentation-guide/*.mdx
```

## Step 2: Inventory Current Site State

Build a comprehensive snapshot of the site's actual state by scanning the following areas. **Do all scans before reading any guide chapters** — this ensures an unbiased inventory.

### 2a: Components
```bash
ls src/components/*.js src/components/*.jsx src/components/*.tsx 2>/dev/null
```
For each component, note: file name, what it does (read the first ~30 lines for the component name and props), and whether it's contributor-facing (used in MDX docs) or internal-only.

To determine contributor-facing status, check if the component is imported in any docs/ MDX file:
```bash
grep -rl "import.*ComponentName" docs/ --include="*.mdx" | head -5
```

### 2b: Scripts
```bash
ls scripts/*.js scripts/*.mjs 2>/dev/null
```
For each script, note: file name, what it generates, and its npm command (check `package.json` scripts section).

### 2c: Configuration
Read `docusaurus.config.js` for:
- Plugins (GA4, Tailwind, Mermaid, live codeblock, etc.)
- Presets (remark/rehype plugins, sidebar config, breadcrumbs)
- Theme configuration (color mode, navbar, footer)
- Algolia search settings

### 2d: Theme Customizations
```bash
find src/theme/ -name "*.js" -o -name "*.jsx" -o -name "*.tsx" 2>/dev/null
```
Note each theme override and what it customizes.

### 2e: Context Providers
```bash
ls src/contexts/*.js src/contexts/*.jsx 2>/dev/null
```
Note each context, what state it manages, and where it's used.

### 2f: Client Modules
```bash
ls src/clientModules/*.js 2>/dev/null
```
Note each module and what it does (analytics events, scroll behavior, etc.).

### 2g: Custom Pages
```bash
ls src/pages/*.js src/pages/*.jsx src/pages/**/*.js 2>/dev/null
```
Note each page and its purpose (homepage, changelog, category indexes, dev page).

### 2h: CSS Structure
```bash
ls src/css/*.css 2>/dev/null
```
Note each stylesheet and its scope.

### 2i: Key Dependencies
Read `package.json` — note major dependencies relevant to documentation:
- Docusaurus version
- React version
- Tailwind version
- @usace/groundwork version
- Content plugins (remark-math, rehype-katex, remark-gfm, etc.)
- Mermaid, live codeblock, katex

### 2j: Auto-Generated Files
Confirm the full list of auto-generated files and directories:
- `sidebars.js`
- `src/reportIdMap.js`
- `static/counters/`
- `static/versions/`
- `src/data/eventTreeToc.json`
- `src/imageDimensions.js` (if it exists)
- Any others

### 2k: Notable Features
Check for any features not covered above:
- Tour/tutorial system (`src/components/SiteTour.js`, `src/components/TourButton.js`, `src/contexts/TourContext.js`)
- Icon components (`src/components/icons/`)
- Event tree components
- Schema components
- DOCX converter (`docx_converter/`)

## Step 3: Audit Each Guide Chapter

For each chapter in scope, read the full MDX file and compare it against the inventory from Step 2. Use this checklist:

| Chapter | Key Checks |
|---------|------------|
| `00-introduction.mdx` | Feature list complete? Learning outcomes accurate? Key concepts up to date? Common workflows still valid? |
| `01-getting-started.mdx` | Prerequisites current? Tool versions accurate? Setup steps work? Troubleshooting covers known issues? |
| `02-versioning-system.mdx` | Version format rules accurate? Process steps match current automation? Version selector description current? |
| `03-project-structure.mdx` | Folder structure matches reality? Tier assignments correct? Auto-generated files list complete? Decision trees accurate? |
| `04-creating-new-document-walkthrough.mdx` | Workflow steps current? Required files/templates accurate? Examples use correct paths? |
| `05-docx-converter.mdx` | Converter capabilities accurate? Configuration matches current `main.py`? Limitations still correct? |
| `06-creating-editing-pages.mdx` | MDX syntax complete? Frontmatter fields all listed? Admonitions, code blocks, new features documented? |
| `07-react-components.mdx` | Every contributor-facing component documented? Props accurate for each? Import paths correct? Examples work? Any deprecated components still listed? |
| `08-troubleshooting-faq.mdx` | All issues still relevant? New common issues missing? Contact info current? Resource links working? |
| `09-appendix-a-source-code-structure.mdx` | Component inventory complete? Contexts listed? Theme files listed? Client modules listed? Architecture description accurate? |
| `10-appendix-b-build-process-overview.mdx` | All build scripts listed? npm commands match `package.json`? Workflow diagram accurate? Output files correct? |
| `11-appendix-c-search-configuration.mdx` | Algolia config matches `docusaurus.config.js`? Settings current? Dashboard instructions accurate? |

For each chapter, categorize findings as:
- **Missing** — content that should exist but doesn't
- **Outdated** — content that exists but is wrong or stale
- **Accurate** — content confirmed as current

### New Chapter Assessment
After auditing all existing chapters, evaluate whether any major undocumented features warrant **new chapters**. Consider:
- Is there a significant feature area (like the tour system or analytics) with no home in existing chapters?
- Would a new appendix serve contributors or administrators better than cramming info into an existing chapter?
- Follow the existing naming convention: `{NN}-appendix-{letter}-{topic}.mdx`

## Step 4: Generate Gap Analysis Report

**IMPORTANT: Do NOT edit any guide files yet.** First, produce a structured audit report.

Format the report as follows:

```markdown
# Documentation Guide Audit Report

- **Date:** {today's date}
- **Chapters Audited:** {N} of {total}
- **Scope:** {Full audit | Specific chapters listed}

---

## Chapter: {filename}

### Missing Content
- {description of what needs to be added}

### Outdated Content
- **{section/line}:** Currently says "{current}" → should say "{updated}"

### Accurate (No Changes Needed)
- {confirmed sections}

---

## New Chapters Recommended

| Filename | Topic | Justification |
|----------|-------|---------------|
| {name} | {topic} | {why it's needed} |

---

## Summary

| Category | Count |
|----------|-------|
| Chapters with missing content | N |
| Chapters with outdated content | N |
| Chapters fully up to date | N |
| New chapters recommended | N |
| Total individual findings | N |
```

## Step 5: Present Report and Get Approval

Display the gap analysis report to the user. Then ask:

1. Which updates should be applied? (All, specific chapters, or specific findings)
2. Should recommended new chapters be created?
3. Any findings to skip or defer?

**Do NOT proceed to Step 6 until the user approves.** If the user wants to review specific findings in more detail, show the relevant inventory data and current guide content side by side.

## Step 6: Apply Updates

For each approved change, update the guide files one at a time:

1. **Read** the target MDX file fully before editing
2. **Make the specific update** — add missing sections, correct outdated info, update lists, fix examples
3. **Preserve the guide's tone** — beginner-friendly, assumes no programming experience for main chapters; technical detail is acceptable in appendices
4. **Respect the tier system:**
   - Chapters 0-8: Contributor-facing. Only document things contributors directly use.
   - Chapters 9+: Appendices for administrators/developers. Internal architecture details go here.
5. **Follow existing formatting patterns** in each file — match heading levels, component usage (FigureNoRef, DocTabs, admonitions), and list styles
6. **For new components in Chapter 7**, follow the established pattern:
   - Component heading with category grouping
   - Import statement code block
   - Usage example code block
   - Props table (if applicable)
   - Tips and common mistakes
7. **For new chapters**, include:
   - Proper frontmatter with `title`
   - NavContainer with correct navigation links
   - Import statements following existing patterns
   - Content organized with the same pedagogical approach as existing chapters

### Important Rules During Editing
- Do NOT rewrite entire files — make targeted edits
- Do NOT change the file numbering scheme without user approval
- Do NOT remove existing content unless it's confirmed wrong
- Do NOT add AI attribution or "Co-Authored-By" mentions
- Do NOT add emojis unless they're already used in the target file's style
- Match the Prettier format: 150 char line width, single quotes in code

## Step 7: Summary

After all updates are applied, report:

```markdown
## Update Summary

- **Files modified:** {list of filenames}
- **Files created:** {list of new files, if any}
- **Sections added:** {count}
- **Sections updated:** {count}
- **Components newly documented:** {list}
- **Features newly documented:** {list}
- **Items deferred:** {list of skipped findings, if any}
```

Remind the user to:
1. Run `npm start` to verify the guide pages render correctly
2. Review the changes in the browser
3. Commit when satisfied
