# QC Prompt Template

## Purpose

This file provides a standard prompt to run a comprehensive QC review of MDX documentation against an authoritative PDF. It instructs Codex to identify issues without editing source MDX files and to write findings into QC report and CSV outputs.

## Directions for Use

1. Copy the prompt below into a new Codex chat.
2. Replace all placeholder paths (e.g., <PDF_PATH>) with actual file paths.
3. Submit the prompt to Codex and wait for the QC outputs to be generated.

---

You are Codex Agent working inside this repository.

GOAL
Perform a comprehensive QC review by comparing the authoritative SOURCE PDF against the generated MDX documentation pages, and log findings without editing MDX files. Only update QC outputs.

SCOPE
Compare SOURCE PDF -> MDX for:

1. Text: spelling/typos, punctuation, missing/extra words, heading mismatches, ordering, formatting.
2. Figures & captions: correct components, placement, caption text matches PDF.
3. Equations: correct components, numbering/keys, accurate content; if ambiguous, flag for human verification.
4. Tables: correct components, cell text, merged rows/cols, headerConfig usage.
5. Citations: raw author-year text + `<Citation citationKey="...">` must both appear where references occur (including figure/table captions). Citation keys must match `citationKey` values in `<BIB_JSON_PATH>`.
6. MDX correctness: JSX validity, consistent formatting, link/anchor correctness.

INPUT PATHS

- SOURCE PDF (authoritative): <PDF_PATH>
- 00-DOCUMENT-INFO.MDX file path for QC: <MDX_FILE_PATH>
  - This is the first MDX file in the review folder. Use this to locate and find the other documents for review.
- Bibliography file (citation keys): <BIB_JSON_PATH>

OUTPUTS (NO MDX CHANGES)

- QC documents file path: <QC_FILE_PATH>
- QC report: {QC_FILE_PATH}.qc-report.md
- QC CSV log: {QC_FILE_PATH}.qc-issues.csv

REPORT FORMAT

- Header with:
  - Source PDF
  - Review Date (today)
  - Reviewer
- Per-file sections (`## File: filename.mdx`)
- Per-issue blocks (`### Issue N: Title`) with:
  - Location (precise enough to locate and edit automatically)
  - Category (Text/Figure/Equation/Table/Citation/MDX)
  - Severity (Blocker/Major/Minor)
  - Problem
  - Recommended Fix
  - Fix Applied (always “No” unless explicitly requested)
  - Human Verification Required (Yes/No)
- Keep issues in file order.
- Do NOT group issues. Every issue must be individual (per equation, per sentence, per caption, etc.).

SPECIAL QC RULES (MUST APPLY)

1. Preface rule:
   - Always keep “Preface” as “Preface.” Do NOT recommend changing it to “Introduction,” even if the PDF uses “Introduction.”
2. Citation rule:
   - If PDF shows author-year text (e.g., “Fell et al. (2008)”), MDX must include:
     a) the raw author-year text, and
     b) a `<Citation citationKey="...">` with a key from `<BIB_JSON_PATH>`.
   - If one is missing, log an issue.
   - Check both body text and figure/table captions.
3. Equation “where” block formatting rule:
   - Canonical format: blockquote lines with `> ` prefix and **double space** at line end (except last line).
   - If a “where” block uses bullets (`- Term`) or lacks `> ` prefix/double spaces, log an issue.
4. Deep-dive requirement for tables and equations:
   - Tables: verify every cell value, header text, row/column ordering, merged cells, unit formatting, and headerConfig settings against the PDF; log an issue for any mismatch or omission.
   - Equations: verify every symbol, operator, sub/superscript, constant, unit, numbering, and stated variable definition against the PDF; confirm the equation is mathematically and visually consistent with the source, and log an issue for any discrepancy.
5. No code edits:
   - Only modify QC report and QC CSV.

PROCESS REQUIREMENTS

- Review the entire document set first, then write the QC report and CSV once at the end (no incremental writes per file).

DELIVERABLES

- Update `<QC_REPORT_PATH>` and `<QC_CSV_PATH>` only.
- Ensure the CSV matches the report and includes the same issues, in the same order.

BEGIN

1. Identify the PDF path, MDX folder, and bib.json path.
2. Enumerate MDX files in the folder.
3. Review the entire document set against the PDF.
4. Write/update QC report and QC CSV with the required format and rules.





