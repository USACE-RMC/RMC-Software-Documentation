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

### Issue 1: Wetted Perimeter Symbol (Equation 1)
- **Location:** Equation 1
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 2: Wetted Perimeter Symbol (Equation 2)
- **Location:** Equation 2
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 3: Missing Raw Citation Text
- **Location:** Paragraph referencing probability tables
- **Category:** Citation
- **Severity:** Major
- **Problem:** PDF cites "Fell et al. (2008)" for the probability tables, but MDX has only `<Citation citationKey="Fell2008" />` with no raw reference text.
- **Recommended Fix:** Add the raw reference text (e.g., "Fell et al. (2008)") adjacent to the `<Citation>` component.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 4: Missing Citation Component in Figure Caption
- **Location:** Figure 8 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Fell et al. 2015" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Fell2015" />` in the caption text alongside the author-year.
- **Fix Applied:** No
- **Human Verification Required:** No

---

## File: 05-cylindrical-pipe.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 3)
- **Location:** Equation 3
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 2: Unit Weight Symbol Casing (Equation 5)
- **Location:** Equation 5
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 3: "Where" Term Prefix Formatting (Equation 3)
- **Location:** Equation 3 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 4: "Where" Term Prefix Formatting (Equation 4)
- **Location:** Equation 4 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

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

### Issue 2: Unit Weight Symbol Casing (Equation 6)
- **Location:** Equation 6
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 3: Unit Weight Symbol Casing (Equation 7)
- **Location:** Equation 7
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 4: "Where" Term Prefix Formatting (Equation 6)
- **Location:** Equation 6 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

---

## File: 07-vertical-rectangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 8)
- **Location:** Equation 8
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 2: Unit Weight Symbol Casing (Equation 9)
- **Location:** Equation 9
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 3: Missing Citation Component in Figure Caption
- **Location:** Figure 35 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Foster et al. 2002" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Foster2002" />` in the caption text alongside the author-year.
- **Fix Applied:** No
- **Human Verification Required:** No

---

## File: 08-vertical-triangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 10)
- **Location:** Equation 10
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 2: Unit Weight Symbol Casing (Equation 11)
- **Location:** Equation 11
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

### Issue 2: Missing Citation Component in Figure Caption
- **Location:** Figure 42 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Fell et al. (2008)" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Fell2008" />` in the caption text alongside the author-year.
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

### Issue 3: Corrupted Tau Symbol in Text (Sentence 1)
- **Location:** First "Solving Equation..." sentence
- **Category:** Text
- **Severity:** Major
- **Problem:** Tau symbol in text appears corrupted in the first sentence.
- **Recommended Fix:** Restore correct tau symbol in text.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 4: Corrupted Tau Symbol in Text (Sentence 2)
- **Location:** Second "Solving Equation..." sentence
- **Category:** Text
- **Severity:** Major
- **Problem:** Tau symbol in text appears corrupted in the second sentence.
- **Recommended Fix:** Restore correct tau symbol in text.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 5: Stray Brace in Tau Symbol
- **Location:** Equation A-94 sentence
- **Category:** Equation
- **Severity:** Major
- **Problem:** Stray brace in `&tau;}` (`<em>&tau;}<sub>c</sub></em>`).
- **Recommended Fix:** Remove stray brace.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 6: Wetted Perimeter Symbol Casing (Equation A-6)
- **Location:** Equation A-6 (equation-17)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 7: Wetted Perimeter Symbol Casing (Equation A-20)
- **Location:** Equation A-20 (equation-31)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 8: Wetted Perimeter Symbol Casing (Equation A-38)
- **Location:** Equation A-38 (equation-49)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 9: Wetted Perimeter Symbol Casing (Equation A-64)
- **Location:** Equation A-64 (equation-75)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 10: "Where" Term Prefix Formatting (Equation A-1)
- **Location:** Equation A-1 where block (equation-12)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 11: "Where" Term Prefix Formatting (Equation A-6)
- **Location:** Equation A-6 where block (equation-17)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 12: "Where" Term Prefix Formatting (Equation A-15)
- **Location:** Equation A-15 where block (equation-26)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 13: "Where" Term Prefix Formatting (Equation A-20)
- **Location:** Equation A-20 where block (equation-31)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 14: "Where" Term Prefix Formatting (Equation A-35)
- **Location:** Equation A-35 where block (equation-46)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 15: "Where" Term Prefix Formatting (Equation A-38)
- **Location:** Equation A-38 where block (equation-49)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 16: "Where" Term Prefix Formatting (Equation A-55)
- **Location:** Equation A-55 where block (equation-66)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 17: "Where" Term Prefix Formatting (Equation A-64)
- **Location:** Equation A-64 where block (equation-75)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

### Issue 18: "Where" Term Prefix Formatting (Equation A-66)
- **Location:** Equation A-66 where block (equation-77)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** No
- **Human Verification Required:** No

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
