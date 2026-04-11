# QC Prompt Template

## Purpose

This file provides standard prompts for AI-assisted QC reviews of MDX documentation. Three review levels are available depending on source material availability and review depth required.

## Review Levels

| Level | Name | Source Doc Required | Scope |
|-------|------|---------------------|-------|
| 1 | Syntax & Grammar Review | No | MDX syntax, React components, grammar, spelling |
| 2 | Source Comparison Review | Yes | Level 1 + comparison to authoritative source |
| 3 | Technical Edit Review | Yes | Levels 1 & 2 + substantive content improvements |

## Directions for Use

1. Copy the prompt below into your AI assistant chat.
2. Provide:
   - **Any MDX file path** from the document to review (e.g., `docs/desktop-applications/lifesim/users-guide/v2.0/03-example.mdx`)
   - **Review level**: `1`, `2`, or `3`
3. The AI assistant will automatically locate all related files (other MDX files in the document, source PDF, bibliography, figures, etc.).

---

# QC REVIEW PROMPT

You are an AI assistant performing a QC review inside this repository.

## INPUTS

- **MDX file path:** `<MDX_FILE>`
- **Review level:** `<LEVEL>` (1, 2, or 3)

From the provided MDX file path, automatically derive:
1. **MDX_DIR**: The parent folder containing the MDX file (the version folder, e.g., `v1.0/`)
2. **All MDX files**: All `.mdx` files in `MDX_DIR` to review
3. **DOC_ROOT**: The path up to but not including the version folder
4. **Source PDF** (Levels 2 & 3): Replace `docs/` with `static/source-documents/`, same path structure—find the `.pdf` file
5. **Bibliography** (Levels 2 & 3): Replace `docs/` with `static/bibliographies/`, same path structure—find the `bib.json` file
6. **QC output path**: Replace `docs/` with `qc/`, same path structure

## REVIEW LEVELS

- **LEVEL 1 - Syntax & Grammar Review**: No source documentation required. Review MDX files only for syntax, grammar, and component correctness. Do NOT make recommendations about wording, phrasing, or technical content.
- **LEVEL 2 - Source Comparison Review**: Source documentation required. Perform all Level 1 checks PLUS compare MDX against the authoritative source PDF for accuracy and consistency. Do NOT make recommendations about improving wording or technical content beyond what the source says.
- **LEVEL 3 - Technical Edit Review**: Source documentation required. Perform all Level 1 and Level 2 checks PLUS perform a true technical edit—suggest improvements to clarity, readability, organization, and technical accuracy even beyond the source material.

---

## GOAL

Perform a QC review at the specified level and log findings without editing MDX source files. Only create/update QC output files.

---

## PATH DERIVATION EXAMPLE

Given: `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/02-overview.mdx`

```
MDX_DIR:     docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/
DOC_ROOT:    docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression
SOURCE PDF:  static/source-documents/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/*.pdf
BIBLIOGRAPHY: static/bibliographies/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/bib.json
QC OUTPUT:   qc/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/
```

---

## SCOPE BY LEVEL

### Universal Checks (All Levels)

These checks apply to **every** review level (1, 2, and 3):

1. **MDX/JSX Syntax**
   - Valid JSX syntax (properly closed tags, correct attribute formatting)
   - Correct import statements (no unused imports, no missing imports)
   - Proper component usage (Figure, Table*, Equation, Citation, etc.)
   - Link and anchor correctness

2. **React Component Correctness**
   - Required props are present (e.g., `figKey`, `tableKey`, `equationKey`, `citationKey`)
   - Props have valid values (no empty strings, proper formatting)
   - Components are imported before use
   - Consistent component patterns throughout document

3. **Grammar & Spelling**
   - Spelling errors
   - Basic grammar issues (subject-verb agreement, tense consistency)
   - Punctuation errors
   - Capitalization consistency

4. **Formatting Consistency**
   - Heading hierarchy (no skipped levels)
   - List formatting consistency
   - Whitespace and indentation patterns
   - Consistent use of bold/italic emphasis

5. **Equation "where" Block Formatting**
   - "Where" blocks after equations must use blockquote format with `> ` prefix
   - Each term on its own line with double space at line end (except last line)
   - Correct format example:
     ```
     where:

     > $V$ = volume
     > $Q$ = discharge
     > $t$ = time
     ```
   - Incorrect formats: inline text with semicolons, bullet lists, plain paragraphs

6. **External Link Targets**
   - Links navigating within the documentation site (internal links) should open in the same browser tab
   - Links navigating to an external website (outside `RMC-Software-Documentation`) must include `target="_blank" rel="noopener noreferrer"` to open in a new browser tab
   - Check `<a href="https://...">` tags — if the URL points outside the documentation site, flag missing `target="_blank"`
   - The `Button` component already handles this automatically via its `href` prop, so `<Button href="...">` does not need to be flagged
   - Docusaurus `<Link>` components are for internal navigation and should NOT have `target="_blank"`

7. **Citation Component Usage**
   - Locate the bibliography file (`bib.json`) for the document
   - Search MDX files for author-year text patterns (e.g., "Efron 1979", "(Smith, 2020)", "Smith et al. (2015)")
   - **IMPORTANT**: The `<Citation citationKey="..."/>` component must ACCOMPANY the author-year text, NOT replace it
   - **IMPORTANT**: The `<Citation>` component must be placed OUTSIDE the author-year parentheses, not inside them
   - Correct format: `(Author, Year) <Citation citationKey="AuthorYear"/>` → renders as "(Author, Year) [1]"
   - Incorrect formats:
     - `<Citation citationKey="AuthorYear"/>` alone (without author-year text)
     - `(Author, Year <Citation citationKey="AuthorYear"/>)` (Citation inside parentheses)
   - Citation keys must exist in the document's `bib.json` file
   - Check both body text and figure/table captions for citation references
   - Common patterns to search for:
     - `(Author YYYY)` or `(Author, YYYY)`
     - `Author (YYYY)` or `Author, YYYY`
     - `(Author et al. YYYY)` or `Author et al. (YYYY)`
   - Common incorrect pattern to flag: `<Citation.../>)` — a Citation component followed by a closing parenthesis indicates it was placed inside the parenthetical reference

---

### Level 1 - Syntax & Grammar Review (No Source Document)

Perform all Universal Checks above.

**Level 1 Restrictions:**
- Do NOT suggest rewording or rephrasing
- Do NOT suggest reorganization of content
- Do NOT comment on technical accuracy of content
- Do NOT suggest adding or removing content
- Focus ONLY on mechanical errors

### Level 2 - Source Comparison Review (Source Document Available)

Perform all Universal Checks, PLUS compare MDX against the source PDF:

1. **Text Accuracy**
   - Spelling/typos that differ from source
   - Missing or extra words compared to source
   - Heading text matches source exactly
   - Section ordering matches source
   - Numerical values match source exactly

2. **Figures & Captions**
   - Every figure in source appears in MDX
   - Figure placement matches source order
   - Caption text matches source exactly
   - Correct Figure component usage

3. **Equations**
   - Every equation in source appears in MDX
   - LaTeX content matches source exactly
   - Equation numbering/keys are sequential
   - "Where" blocks use blockquote format (see Universal Check 5)
   - All symbols, operators, sub/superscripts match source
   - Variable definitions in "where" blocks match source exactly

4. **Tables**
   - Every table in source appears in MDX
   - All cell values match source exactly
   - Row/column ordering matches source
   - Merged cells replicated correctly
   - Header configuration matches source structure

5. **Citations (Source Comparison)**
   - Every citation in the source PDF appears in the MDX with `<Citation>` component
   - Raw author-year text MUST be preserved where source has citations
   - Citation placement matches source document locations
   - No citations are missing compared to source
   - All Universal Check 7 rules still apply (placement, format, keys)

**Level 2 Restrictions:**
- Do NOT suggest improvements beyond matching the source
- Do NOT recommend better wording than what source uses
- Do NOT suggest reorganization unless source order differs
- Focus ONLY on accuracy relative to source document

### Level 3 - Technical Edit Review (Full Editorial Review)

Perform all Universal Checks and all Level 2 source comparison checks, PLUS:

1. **Clarity & Readability**
   - Suggest clearer phrasing where appropriate
   - Identify confusing or ambiguous passages
   - Recommend sentence structure improvements
   - Flag jargon that needs definition

2. **Technical Accuracy**
   - Verify technical claims are accurate
   - Flag potentially outdated information
   - Identify inconsistencies within the document
   - Note areas needing additional explanation

3. **Organization & Flow**
   - Suggest reordering for better logical flow
   - Identify missing transitions
   - Recommend section breaks or consolidation
   - Flag redundant content

4. **Completeness**
   - Identify gaps in coverage
   - Suggest additional examples where helpful
   - Note missing cross-references
   - Flag undefined terms or acronyms

**Level 3 Notes:**
- Clearly distinguish source-discrepancy issues from editorial suggestions
- Mark editorial suggestions with category "Editorial" in reports
- Editorial suggestions should have severity "Suggestion" (not Blocker/Major/Minor)

---

## OUTPUTS

Do NOT modify MDX source files. Only create/update:

- **QC Report:** `{QC_FILE_PATH}/qc-report.md`
- **QC Issues CSV:** `{QC_FILE_PATH}/qc-issues.csv`

---

## REPORT FORMAT

### Header

```markdown
# QC Report

- **Document:** <DOC_ROOT>
- **Version:** <version>
- **Review Level:** <LEVEL>
- **Source PDF:** <filename or "N/A for Level 1">
- **Review Date:** <today>
- **Reviewer:** AI Assistant
```

### Issue Format

```markdown
## File: filename.mdx

### Issue N: <Brief Title>

- **Location:** <line number or section reference>
- **Category:** Text | Figure | Equation | Table | Citation | MDX | Grammar | Editorial
- **Severity:** Blocker | Major | Minor | Suggestion
- **Problem:** <description>
- **Recommended Fix:** <specific fix>
- **Fix Applied:** No
- **Human Verification Required:** Yes | No
```

### CSV Format

```csv
File,Issue,Location,Category,Severity,Problem,Recommended Fix,Human Verification
```

### Report Rules

- Keep issues in file order, then line/section order within each file
- Every issue must be individual (one issue per problem, not grouped)
- Ensure CSV matches report exactly (same issues, same order)

---

## SPECIAL RULES

### All Levels

1. **Preface rule:** Keep "Preface" as "Preface" even if source uses "Introduction."

2. **Exclusions - do not log issues about:**
   - Cover photo captions/credits
   - PREPARED/REVIEWED/APPROVED signature blocks
   - Missing `<Citation>` in abstracts or Document Info/Version History
   - Phone number formatting in Document Info
   - Never recommend removing `00-document-info.mdx` or `00-version-history.mdx`

3. **Version history caution:** Treat as controlled content; if uncertain about a mismatch, mark Human Verification Required = Yes.

4. **Equation "where" block format:** All equation "where" blocks must follow this format:
   - Use blockquote lines with `> ` prefix
   - Each variable definition on its own line
   - Double space (`  `) at end of each line EXCEPT the last line
   - Example of correct format:
     ```
     where:

     > $V$ = volume (acre-feet)
     > $Q$ = discharge (cfs)
     > $t$ = time (days)
     ```
   - **Incorrect formats to flag:**
     - Inline text with semicolons: `Where V = volume; Q = discharge; t = time`
     - Bullet lists: `- V = volume`
     - Missing `> ` prefix
     - Missing double spaces at line ends

### Levels 2 & 3 Only

5. **Deep-dive requirements:**
   - Tables: verify every cell, header, ordering, merged cells, units
   - Equations: verify every symbol, operator, sub/superscript, constant, unit

6. **Full-review requirement:** Review every page and element. Do not skip sections or sample.

7. **Precision requirement:** Verify every numeric value, unit, symbol against source.

8. **Completeness requirement:** Every figure/table in source must appear in MDX with correct placement.

9. **Equation "where" content:** In addition to format (rule 4), verify "where" block content matches source exactly.

---

## PROCESS

1. From the provided MDX file path, derive all related paths.
2. If Level 2 or 3, verify source PDF and bibliography exist; if missing, notify the user.
3. Enumerate all MDX files in `MDX_DIR`.
4. Review entire document set according to selected level scope.
5. Write QC report and CSV once at the end (no incremental writes).

---

## BEGIN

1. Parse the provided MDX file path to derive `MDX_DIR`, `SOURCE PDF`, `BIBLIOGRAPHY`, and `QC OUTPUT` paths.
2. List all MDX files to be reviewed.
3. If Level 2 or 3, confirm source materials are accessible.
4. Perform review according to level scope.
5. Generate `qc-report.md` and `qc-issues.csv` in the QC output directory.
