# QC Prompt Template

## Purpose

This file provides a standard prompt to run a comprehensive QC review of MDX documentation against an authoritative PDF. It instructs Codex to identify issues without editing source MDX files and to write findings into QC report and CSV outputs.

## Directions for Use

1. Copy the prompt below into a new Codex chat.
2. Provide only the document path root (the folder under `docs/` that contains `vX.Y/00-document-info.mdx`).
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

INPUTS (PATHS ARE DERIVED)

- Document root (under `docs/`): <DOC_ROOT>
  - Example: `docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression`
  - The version folder is inferred by finding the `vX.Y/00-document-info.mdx` inside this root.

PATH DERIVATION RULES (MUST FOLLOW)

1. MDX folder:
   - Find the first `00-document-info.mdx` under `<DOC_ROOT>` and use its parent folder as `MDX_DIR`.
   - `MDX_FILE_PATH = {MDX_DIR}/00-document-info.mdx`.
2. Version token:
   - The version is the folder name containing `00-document-info.mdx` (e.g., `v1.0`).
3. SOURCE PDF:
   - Replace the `docs/` prefix with `static/source-documents/` and use the same path from `<DOC_ROOT>` plus the version folder.
   - The PDF is the only `.pdf` file in that folder.
4. Bibliography file:
   - Replace the `docs/` prefix with `static/bibliographies/` and use the same path from `<DOC_ROOT>` plus the version folder.
   - The bibliography is the only `bib.json` in that folder.
5. QC output base path:
   - Replace the `docs/` prefix with `qc/Codex/` and use the same path from `<DOC_ROOT>` plus the version folder.
   - `QC_FILE_PATH = qc/Codex/<DOC_ROOT without docs prefix>/<version>`
EXAMPLE (BACKWARD-EROSION-PIPING-PROGRESSION)

DOC_ROOT
- docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression

Resolved paths
- MDX_FILE_PATH: docs/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/00-document-info.mdx
- SOURCE PDF: static/source-documents/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/RMC-CPD-2023-06 - RMC Backward Erosion Piping (Progression) Toolbox.pdf
- BIB_JSON_PATH: static/bibliographies/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0/bib.json
- QC_FILE_PATH: qc/Codex/toolbox-technical-manuals/internal-erosion-suite/backward-erosion-piping-progression/v1.0


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
5. Full-review requirement (no sampling):
   - Review every page and every element (all text, tables, equations, figures, captions, headings, and lists). Do not skip sections.
6. Precision requirement:
   - Verify every numeric value, unit, symbol, sub/superscript, and label against the PDF. Log any mismatch, even if minor.
7. Figures and tables completeness:
   - Confirm every figure/table present in the PDF appears in MDX with correct placement and all captions/labels match exactly.
8. Citation placement requirement:
   - Ensure citations are present at every occurrence in the PDF (including captions) and not just once per section.
9. Version history caution:
   - Treat Version History as controlled content; only flag mismatches that are clearly documented in the PDF. If uncertain, mark Human Verification Required = Yes.
10. No code edits:
   - Only modify QC report and QC CSV.
11. Exclusions:
   - Do not log issues about cover photo captions/credits.
   - Do not log issues about PREPARED/REVIEWED/APPROVED signature blocks or statements.
   - Do not log issues about missing <Citation> components in abstracts or Document Info/Version History sections.
   - Do not log issues about phone number formatting in Document Info.
   - Never recommend removing 00-document-info.mdx or 00-version-history.mdx files.

PROCESS REQUIREMENTS

- Review the entire document set first, then write the QC report and CSV once at the end (no incremental writes per file).

DELIVERABLES

- Update `<QC_REPORT_PATH>` and `<QC_CSV_PATH>` only.
- Ensure the CSV matches the report and includes the same issues, in the same order.

BEGIN

1. Resolve `MDX_FILE_PATH`, `SOURCE PDF`, `BIB_JSON_PATH`, and `QC_FILE_PATH` using the derivation rules above.
2. Enumerate MDX files in `MDX_DIR`.
3. Review the entire document set against the PDF.
4. Write/update QC report and QC CSV with the required format and rules.





