# QC Report: RMC Concentrated Leak Erosion (Initiation) Toolbox

**Source PDF:** RMC-CPD-2023-08 - RMC Concentrated Leak Erosion (Initiation) Toolbox.pdf
**Review Date:** 2025-12-21
**Reviewer:** Claude (Automated QC)

---

## File: 00-document-info.mdx

### Issue 1: Citation Year Mismatch
- **Location:** Frontmatter, `citationGuide` field
- **Category:** Text Mismatch
- **Severity:** Medium
- **Problem:** The citationGuide contains year "2025" but the PDF report date is "April 2024". The citation guide text reads: `D. Amlung, <i>RMC Documentation Report</i>, Lakewood, CO: U.S. Army Corps of Engineers, Risk Management Center, 2025.`
- **Recommended Fix:** Verify the correct year for the citation. If the document was published in 2024, update "2025" to "2024".
- **Human Verification Required:** Yes - need to confirm intended publication/citation year

### Issue 2: Unused Import
- **Location:** Line 16
- **Category:** MDX Syntax
- **Severity:** Low
- **Problem:** The import `addBaseUrl from '@docusaurus/useBaseUrl'` is declared but never used in the file.
- **Recommended Fix:** Remove the unused import statement: `import addBaseUrl from '@docusaurus/useBaseUrl';`
- **Human Verification Required:** No

---

## File: 00-version-history.mdx

### Issue 1: Unused Import
- **Location:** Line 5
- **Category:** MDX Syntax
- **Severity:** Low
- **Problem:** The import `Link from '@docusaurus/Link'` is declared but never used in the file.
- **Recommended Fix:** Remove the unused import statement: `import Link from '@docusaurus/Link';`
- **Human Verification Required:** No

**Content Verification:** Version history table content matches PDF exactly (Version 1.0, April 2024, Initial release, Modified by Damon Amlung, Reviewed by Tim O'Leary, Approved by Nathan Snorteland).

---

## File: 01-preface.mdx

### Issue 1: Unused Import
- **Location:** Line 5
- **Category:** MDX Syntax
- **Severity:** Low
- **Problem:** The import `Link from '@docusaurus/Link'` is declared but never used in the file.
- **Recommended Fix:** Remove the unused import statement: `import Link from '@docusaurus/Link';`
- **Human Verification Required:** No

### Issue 2: Unused Import
- **Location:** Line 6
- **Category:** MDX Syntax
- **Severity:** Low
- **Problem:** The import `addBaseUrl from '@docusaurus/useBaseUrl'` is declared but never used in the file.
- **Recommended Fix:** Remove the unused import statement: `import addBaseUrl from '@docusaurus/useBaseUrl';`
- **Human Verification Required:** No

### Issue 3: Unused Import
- **Location:** Line 9
- **Category:** MDX Syntax
- **Severity:** Low
- **Problem:** The import `VersionSelector from '@site/src/components/VersionSelector'` is declared but never used in the file.
- **Recommended Fix:** Remove the unused import statement: `import VersionSelector from '@site/src/components/VersionSelector';`
- **Human Verification Required:** No

**Content Verification:** Preface text content matches PDF exactly.

---

*Report will be appended as additional files are reviewed.*
