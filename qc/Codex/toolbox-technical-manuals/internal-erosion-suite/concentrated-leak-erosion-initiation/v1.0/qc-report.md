# QC Report: RMC Concentrated Leak Erosion (Initiation) Toolbox

**Source PDF:** `RMC-CPD-2023-08 - RMC Concentrated Leak Erosion (Initiation) Toolbox.pdf`
**Review Date:** 2025-12-21
**Reviewer:** Codex (Automated QC)

---

## File: 00-document-info.mdx

### Issue 1: Report Date Format
- **Location:** frontmatter `reportDate`
- **Category:** Text
- **Severity:** Minor
- **Problem:** `reportDate` uses "April 2024" but PDF shows "Apr 2024".
- **Recommended Fix:** Align date format with PDF if required for metadata consistency.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 2: Citation Guide Year
- **Location:** frontmatter `citationGuide`
- **Category:** Text
- **Severity:** Minor
- **Problem:** Citation guide text/year (2025) not found in PDF; may be template content.
- **Recommended Fix:** Confirm intended citation template/year for this document.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 00-version-history.mdx

### Issue 1: Approved By Name
- **Location:** `<TableVersionHistory>` approvedBy
- **Category:** Text
- **Severity:** Minor
- **Problem:** Approved by listed as "Nathan Snorteland"; PDF shows "Nate Snorteland".
- **Recommended Fix:** Update to "Nate Snorteland".
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 04-background.mdx

### Issue 1: Wetted Perimeter Symbol
- **Location:** Equation 1 and Equation 2
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 05-cylindrical-pipe.mdx

### Issue 1: Unit Weight Symbol Casing
- **Location:** Equation 3 and Equation 5
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 06-horizontal-crack.mdx

### Issue 1: Figure Caption Typo
- **Location:** Figure 31 caption
- **Category:** Figure
- **Severity:** Minor
- **Problem:** Caption typo: "geoemetry".
- **Recommended Fix:** Change to "geometry".
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 2: Unit Weight Symbol Casing
- **Location:** Equation 6 and Equation 7
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 07-vertical-rectangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing
- **Location:** Equation 8 and Equation 9
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 08-vertical-triangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing
- **Location:** Equation 10 and Equation 11
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 09-probability-tables.mdx

### Issue 1: "Fell et. al." Typo
- **Location:** Step 4 paragraph
- **Category:** Text
- **Severity:** Minor
- **Problem:** "Fell et. al." includes an extra period after "et"; PDF uses "Fell et al."
- **Recommended Fix:** Remove the extra period.
- **Fix Applied:** No
- **Human Verification Required:** No

---

## File: 11-appendix-derivation-of-hydraulic-shear-stress-equations.mdx

### Issue 1: Figure Alt Text Typo
- **Location:** Figure 50 alt text
- **Category:** Figure
- **Severity:** Minor
- **Problem:** Alt text says "hoirzontal" instead of "horizontal".
- **Recommended Fix:** Change to "horizontal".
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 2: Missing Parenthesis in Equation A-36
- **Location:** Equation A-36 (equation-47)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation text is missing a closing parenthesis: `\tau L(H_{1}+H_{2}+W=...`.
- **Recommended Fix:** Correct equation formatting to match PDF.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 3: Corrupted Tau Symbol in Text
- **Location:** Two "Solving Equation..." sentences
- **Category:** Text
- **Severity:** Major
- **Problem:** Tau symbol in text appears corrupted in two sentences.
- **Recommended Fix:** Restore correct tau symbol in text.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 4: Stray Brace in Tau Symbol
- **Location:** Equation A-94 sentence
- **Category:** Equation
- **Severity:** Major
- **Problem:** Stray brace in `&tau;}` (`<em>&tau;}<sub>c</sub></em>`).
- **Recommended Fix:** Remove stray brace.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 5: Wetted Perimeter Symbol Casing
- **Location:** Multiple equations using `P_W`
- **Category:** Equation
- **Severity:** Major
- **Problem:** Inconsistent `P_W` vs `P_w` notation for wetted perimeter.
- **Recommended Fix:** Confirm correct casing per PDF and update consistently.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 13-appendix-acronym-list.mdx

### Issue 1: UDF Expansion
- **Location:** Acronym table
- **Category:** Table
- **Severity:** Minor
- **Problem:** UDF expansion is plural "User-Defined Functions"; PDF uses singular "User-Defined Function".
- **Recommended Fix:** Update to match PDF if strict match required.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 2: Heading Text
- **Location:** H1 heading
- **Category:** Text
- **Severity:** Minor
- **Problem:** Heading says "Appendix C - Acronyms"; PDF uses "Appendix C. Acronym List".
- **Recommended Fix:** Align heading text if desired.
- **Fix Applied:** No
- **Human Verification Required:** No

---

*Report will be appended as additional files are reviewed.*
