---
name: qc-review
description: Run a QC review on an MDX document at a specified level (1=Syntax/Grammar, 2=Source Comparison, 3=Technical Edit). Automatically derives all file paths and generates structured QC reports.
---

# QC Review

Perform a QC review on an MDX document following the project's standardized QC process.

**Arguments:** `$ARGUMENTS` — an MDX file path and review level, e.g.:
- `docs/desktop-applications/lifesim/users-guide/v2.0/03-example.mdx 2`
- `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/02-overview.mdx 1`

The first argument is any MDX file path from the document to review. The second argument is the review level (1, 2, or 3).

## Step 1: Parse Arguments

Extract from `$ARGUMENTS`:
1. **MDX file path** — the path to any MDX file in the document
2. **Review level** — `1`, `2`, or `3`

If the review level is missing, ask the user which level to use:
- **Level 1** — Syntax & Grammar (no source PDF needed)
- **Level 2** — Source Comparison (source PDF required)
- **Level 3** — Technical Edit (source PDF required)

## Step 2: Load and Execute the QC Prompt

Read the full QC prompt template from `qc/qc-prompt.md`.

The QC prompt contains the complete review process including:
- Path derivation logic (MDX_DIR, DOC_ROOT, SOURCE PDF, BIBLIOGRAPHY, QC OUTPUT)
- Scope definitions for each review level
- Report format specifications
- Special rules and exclusions
- CSV output format

**Execute the QC prompt** with the following inputs substituted:
- Replace `<MDX_FILE>` with the provided MDX file path
- Replace `<LEVEL>` with the provided review level

## Step 3: Derive All Paths

From the provided MDX file path, automatically derive:

1. **MDX_DIR**: The parent folder containing the MDX file (the version folder, e.g., `v1.0/`)
2. **All MDX files**: All `.mdx` files in `MDX_DIR` to review
3. **DOC_ROOT**: The path up to but not including the version folder
4. **Source PDF** (Levels 2 & 3): Replace `docs/` with `static/source-documents/`, same path structure — find the `.pdf` file
5. **Bibliography** (Levels 2 & 3): Replace `docs/` with `static/bibliographies/`, same path structure — find the `bib.json` file
6. **QC output path**: Replace `docs/` with `qc/reports/`, same path structure

### Path Derivation Example

Given: `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/02-overview.mdx`

```
MDX_DIR:      docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/
DOC_ROOT:     docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression
SOURCE PDF:   static/source-documents/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/*.pdf
BIBLIOGRAPHY: static/bibliographies/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/bib.json
QC OUTPUT:    qc/reports/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/
```

## Step 4: Verify Source Materials

1. List all MDX files in `MDX_DIR`
2. If Level 2 or 3:
   - Verify the source PDF exists. If missing, notify the user and stop.
   - Verify the bibliography file exists. If missing, warn but continue (not all documents have bibliographies).

## Step 5: Execute the Review

Follow the complete review process defined in `qc/qc-prompt.md`:

### Level 1 — Syntax & Grammar
- MDX/JSX syntax validation
- React component correctness (required props, imports)
- Grammar and spelling
- Formatting consistency (heading hierarchy, lists)
- Do NOT suggest rewording, reorganization, or technical changes

### Level 2 — Source Comparison (Level 1 + source checks)
- Text accuracy against source PDF
- Figures and captions match source
- Equations match source exactly
- Tables match source (every cell, header, ordering)
- Citations present where source has them
- Do NOT suggest improvements beyond matching the source

### Level 3 — Technical Edit (Levels 1 & 2 + editorial)
- Clarity and readability suggestions
- Technical accuracy verification
- Organization and flow improvements
- Completeness assessment
- Mark editorial suggestions with category "Editorial" and severity "Suggestion"

### Special Rules (All Levels)
- Keep "Preface" as "Preface" even if source uses "Introduction"
- Do NOT log issues about: cover photo captions, signature blocks, missing citations in abstracts/Document Info, phone number formatting
- Never recommend removing `00-document-info.mdx` or `00-version-history.mdx`
- Treat version history as controlled content

## Step 6: Generate Reports

Create the QC output directory if it doesn't exist:
```bash
mkdir -p {QC_OUTPUT_PATH}
```

Generate two output files:

### qc-report.md

```markdown
# QC Report

- **Document:** {DOC_ROOT}
- **Version:** {version}
- **Review Level:** {LEVEL}
- **Source PDF:** {filename or "N/A for Level 1"}
- **Review Date:** {today}
- **Reviewer:** AI Assistant

## File: filename.mdx

### Issue N: Brief Title

- **Location:** line number or section reference
- **Category:** Text | Figure | Equation | Table | Citation | MDX | Grammar | Editorial
- **Severity:** Blocker | Major | Minor | Suggestion
- **Problem:** description
- **Recommended Fix:** specific fix
- **Fix Applied:** No
- **Human Verification Required:** Yes | No
```

### qc-issues.csv

```csv
File,Issue,Location,Category,Severity,Problem,Recommended Fix,Human Verification
```

### Report Rules
- Keep issues in file order, then line/section order within each file
- Every issue must be individual (one issue per problem, not grouped)
- Ensure CSV matches report exactly (same issues, same order)
- Write both files at the end (no incremental writes)

## Step 7: Summary

After generating reports, provide a brief summary:

- **Document reviewed**: {DOC_ROOT}
- **Review level**: {LEVEL}
- **MDX files reviewed**: N files
- **Total issues found**: N
  - Blockers: X
  - Major: Y
  - Minor: Z
  - Suggestions: W
- **Reports written to**: {QC_OUTPUT_PATH}
