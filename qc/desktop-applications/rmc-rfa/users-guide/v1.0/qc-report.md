# QC Report

- **Document:** docs/desktop-applications/rmc-rfa/users-guide
- **Version:** v1.0
- **Review Level:** Level 1 (Syntax & Grammar Review)
- **Source PDF:** N/A for Level 1
- **Review Date:** 2026-02-05
- **Reviewer:** AI Assistant

---

## File: 00-document-info.mdx

### Issue 1: Unused import

- **Location:** Line 16
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import: `import addBaseUrl from "@docusaurus/useBaseUrl";`
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 2: Incorrect linkTitle in NavContainer

- **Location:** Line 22
- **Category:** MDX
- **Severity:** Major
- **Problem:** `linkTitle="RMC-BestFit"` is incorrect for an RMC-RFA document.
- **Recommended Fix:** Change to `linkTitle="RMC-RFA"`
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

---

## File: 00-version-history.mdx

No issues found.

---

## File: 01-preface.mdx

### Issue 3: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 4: Unused import

- **Location:** Line 10
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 5: Grammar error

- **Location:** Line 21-22
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "has been peer review" should be "has been peer reviewed" (missing 'ed').
- **Recommended Fix:** Change "peer review" to "peer reviewed"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

---

## File: 02-welcome-to-rmc-rfa.mdx

### Issue 6: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 7: Unused import

- **Location:** Line 12
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 8: Spelling error

- **Location:** Line 162
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "scerening" should be "screening".
- **Recommended Fix:** Change "scerening" to "screening"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 9: Missing hyphen

- **Location:** Line 168
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "objectoriented" should be "object-oriented".
- **Recommended Fix:** Change "objectoriented" to "object-oriented"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

---

## File: 03-overview-of-rmc-rfa-methodology.mdx

### Issue 10: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 11: Unused import

- **Location:** Line 14
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 12: Inconsistent prop formatting

- **Location:** Lines 42, 67, 150, 151
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Spaces around `=` in figKey props (e.g., `figKey = "figure-6"`) are inconsistent with other files that use `figKey="figure-6"`.
- **Recommended Fix:** Remove spaces around `=` for consistency: `figKey="figure-6"`
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 13: Spelling error in table

- **Location:** Line 104
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Emprirical" should be "Empirical" in the table cell.
- **Recommended Fix:** Change `{ value: "Emprirical", rowSpan: 1, colSpan: 1}` to `{ value: "Empirical", rowSpan: 1, colSpan: 1}`
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 14: Missing hyphen

- **Location:** Line 195
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "stagestorage-discharge" should be "stage-storage-discharge".
- **Recommended Fix:** Change "stagestorage-discharge" to "stage-storage-discharge"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 48: Missing Citation component

- **Location:** Line 28
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Author-year reference "(Vose 2008)" does not have a `<Citation>` component. Citation key `Vose2008` exists in bib.json.
- **Recommended Fix:** Add `<Citation citationKey="Vose2008"/>` after the author-year text.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 49: Missing Citation components

- **Location:** Line 60
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Author-year references "(Nathan and Weinmann, 2013)" and "(Nathan, Jordan, et al. 2016)" do not have `<Citation>` components. Citation keys `NathanWeinmann2013` and `NathanEtAl2016` exist in bib.json.
- **Recommended Fix:** Add `<Citation citationKey="NathanWeinmann2013"/>` and `<Citation citationKey="NathanEtAl2016"/>` after the respective author-year text.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 50: Missing Citation component

- **Location:** Line 137
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Author-year reference "(Efron 1979)" does not have a `<Citation>` component. Citation key `Efron1979` exists in bib.json.
- **Recommended Fix:** Add `<Citation citationKey="Efron1979"/>` after the author-year text.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 51: Missing Citation component

- **Location:** Line 154
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Author-year reference "(Efron and Tibshirani, 1998)" does not have a `<Citation>` component. Citation key `EfronTibshirani1998` exists in bib.json.
- **Recommended Fix:** Add `<Citation citationKey="EfronTibshirani1998"/>` after the author-year text.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

---

## File: 04-overview-of-the-user-interface.mdx

### Issue 15: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 16: Unused import

- **Location:** Line 14
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 17: Inconsistent prop formatting

- **Location:** Line 26
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Space around `=` in figKey prop (`figKey = "figure-10"`) is inconsistent with other usages.
- **Recommended Fix:** Remove spaces around `=` for consistency.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 18: Grammar error

- **Location:** Lines 125-126
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Display when a window is being edited and has been saved yet." is missing "not" - should be "has not been saved yet."
- **Recommended Fix:** Change to "Display when a window is being edited and has not been saved yet."
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 19: Capitalization error

- **Location:** Line 198
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Sentence starts with lowercase "in order to re-dock".
- **Recommended Fix:** Capitalize "In order to re-dock"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 20: Missing word

- **Location:** Line 279
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "The chart image can be saved use in other documents" is missing "for" after "saved".
- **Recommended Fix:** Change to "The chart image can be saved for use in other documents"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 21: Typo - extra space

- **Location:** Line 716
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "sam e" should be "same" (extra space).
- **Recommended Fix:** Change "sam e" to "same"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No
- **Note:** This issue was actually in 05-working-with-rmc-rfa.mdx, not 04-overview-of-the-user-interface.mdx

---

## File: 05-working-with-rmc-rfa.mdx

### Issue 22: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 23: Unused import

- **Location:** Line 16
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 24: Duplicate figure key

- **Location:** Line 54
- **Category:** MDX
- **Severity:** Major
- **Problem:** `figKey="figure-3"` duplicates the same key used in 02-welcome-to-rmc-rfa.mdx (line 58).
- **Recommended Fix:** Verify if this is intentional cross-reference or rename to unique key.
- **Fix Applied:** N/A - Verified as intentional (2026-02-05)
- **Human Verification Required:** Yes
- **Comment:** This is intentional, no revision required.

### Issue 25: Spelling error

- **Location:** Line 166
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "enw" should be "new".
- **Recommended Fix:** Change "enw" to "new"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 26: Duplicate figure definition

- **Location:** Lines 226-231
- **Category:** MDX
- **Severity:** Major
- **Problem:** `figKey="figure-48"` is defined twice consecutively (identical Figure components).
- **Recommended Fix:** Remove the duplicate Figure component.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No
- **Comment:** This is a true duplicate, it can be removed.

### Issue 27: Spelling error in alt text

- **Location:** Lines 238-239, 244
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Manager accss" should be "Manager access" (typo in alt and caption).
- **Recommended Fix:** Change "accss" to "access"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 28: Unclosed bold markdown

- **Location:** Line 248
- **Category:** MDX
- **Severity:** Major
- **Problem:** `**From Project Explorer"` is missing closing asterisks.
- **Recommended Fix:** Change to `**From Project Explorer**`
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 29: Inconsistent capitalization

- **Location:** Line 265
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Volume frequency Curve" has inconsistent capitalization.
- **Recommended Fix:** Change to "Volume Frequency Curve"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 30: Missing hyphen

- **Location:** Line 403
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "HECDSSVue" should be "HEC-DSSVue".
- **Recommended Fix:** Change "HECDSSVue" to "HEC-DSSVue"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 31: List formatting error

- **Location:** Line 471
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "-After" is missing space after hyphen for list item.
- **Recommended Fix:** Change "-After" to "- After"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 32: List formatting error

- **Location:** Line 476
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "4.**Plot**" is missing space after number.
- **Recommended Fix:** Change "4.**Plot**" to "4. **Plot**"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 33: Missing space

- **Location:** Line 477
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "90%uncertainty" is missing space.
- **Recommended Fix:** Change "90%uncertainty" to "90% uncertainty"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 34: List formatting errors

- **Location:** Lines 490-491
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Inconsistent list formatting with extra spaces after hyphens.
- **Recommended Fix:** Standardize list item formatting.
- **Fix Applied:** Not applicable - no actionable change identified
- **Human Verification Required:** No

### Issue 35: Typo and grammar error

- **Location:** Lines 541-543
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "The longer in tthe years of record" contains typo "tthe" and awkward phrasing.
- **Recommended Fix:** Change "tthe" to "the"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 36: Spelling error

- **Location:** Line 547
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "cricial" should be "critical".
- **Recommended Fix:** Change "cricial" to "critical"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 37: Duplicate figure definition

- **Location:** Lines 817-823
- **Category:** MDX
- **Severity:** Major
- **Problem:** `figKey="figure-85"` is defined twice consecutively (identical Figure components).
- **Recommended Fix:** Remove the duplicate Figure component.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No
- **Comment:** This is a true duplicate, it can be removed.

### Issue 38: Duplicate table key

- **Location:** Lines 826, 916
- **Category:** MDX
- **Severity:** Major
- **Problem:** `tableKey="table-1"` is used multiple times within the same document.
- **Recommended Fix:** Assign unique table keys (e.g., "table-2", "table-3").
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 39: Inconsistent note formatting

- **Location:** Line 961
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "_Note_:" uses italics while other notes in the document use "**Note**:" (bold).
- **Recommended Fix:** Change "_Note_:" to "**Note**:" for consistency.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 40: Duplicate word

- **Location:** Line 1062
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "the the any" contains duplicate word "the".
- **Recommended Fix:** Remove duplicate "the"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 41: Duplicate words

- **Location:** Line 1334
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "any window for any window" contains duplicate phrase.
- **Recommended Fix:** Change to "the message window for any warnings"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 42: Spelling error

- **Location:** Line 1336
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "simiulation" should be "simulation".
- **Recommended Fix:** Change "simiulation" to "simulation"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 43: Spelling error

- **Location:** Line 1441
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "sesnsitivity" should be "sensitivity".
- **Recommended Fix:** Change "sesnsitivity" to "sensitivity"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 44: Spelling error

- **Location:** Line 1442
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "teh" should be "the".
- **Recommended Fix:** Change "teh" to "the"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 46: Equation "where" block formatting

- **Location:** Lines 1239-1241
- **Category:** Equation
- **Severity:** Major
- **Problem:** The "where" block after Equation 2 does not use proper blockquote formatting. Currently uses inline text with semicolons instead of blockquote lines with `> ` prefix and double spaces at line ends.
- **Recommended Fix:** Reformat as:

  ```
  where:

  > $I_{t-1}$ and *I* = inflow hydrograph ordinates at times $t-1$ and $t$, respectively
  > $O_{t-1}$ and *O* = outflow hydrograph ordinates at times $t-1$ and $t$, respectively
  > $S_{t-1}$ and *S* = storage in the reservoir at times $t-1$ and $t$, respectively
  ```

- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 47: Duplicate word

- **Location:** Line 1244
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "the the Modified Puls" contains duplicate word "the".
- **Recommended Fix:** Remove duplicate "the"
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

### Issue 52: Citation reference without bib.json entry

- **Location:** Line 526
- **Category:** Citation
- **Severity:** Major
- **Problem:** Author-year reference "(Chow, 1954)" appears in text but no matching citation key exists in bib.json.
- **Recommended Fix:** Either add a `Chow1954` entry to bib.json and use `<Citation citationKey="Chow1954"/>`, or verify if citation should be removed.
- **Fix Applied:** N/A - Left as-is per user decision (2026-02-05)
- **Human Verification Required:** Yes

---

## File: 06-references.mdx

### Issue 45: Unused import

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `addBaseUrl` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import.
- **Fix Applied:** Yes (2026-02-05)
- **Human Verification Required:** No

---

## Summary

| Severity  | Count | Resolved |
| --------- | ------ | -------- |
| Blocker   | 0      | 0        |
| Major     | 8      | 7        |
| Minor     | 44     | 43       |
| **Total** | **52** | **50**   |

**Fixes Applied:** 2026-02-05

### Remaining Issues

1. **Issue 24:** Duplicate figure key (05-working-with-rmc-rfa.mdx) - Verified as intentional, no fix needed
2. **Issue 34:** Inconsistent list formatting - No actionable change identified

### Major Issues Summary

1. Issue 2: Incorrect linkTitle in NavContainer (00-document-info.mdx) - **FIXED**
2. Issue 24: Duplicate figure key (05-working-with-rmc-rfa.mdx) - **INTENTIONAL**
3. Issue 26: Duplicate figure definition (05-working-with-rmc-rfa.mdx) - **FIXED**
4. Issue 28: Unclosed bold markdown (05-working-with-rmc-rfa.mdx) - **FIXED**
5. Issue 37: Duplicate figure definition (05-working-with-rmc-rfa.mdx) - **FIXED**
6. Issue 38: Duplicate table key (05-working-with-rmc-rfa.mdx) - **FIXED**
7. Issue 46: Equation "where" block formatting (05-working-with-rmc-rfa.mdx) - **FIXED**
8. Issue 52: Citation reference without bib.json entry (05-working-with-rmc-rfa.mdx) - **LEFT AS-IS**
