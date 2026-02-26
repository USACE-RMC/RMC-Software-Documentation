# QC Report: RMC Concentrated Leak Erosion (Initiation) Toolbox

**Source PDF:** `RMC-CPD-2023-08 - RMC Concentrated Leak Erosion (Initiation) Toolbox.pdf`
**Review Date:** 2025-12-21
**Reviewer:** Codex (Automated QC)
**Secondary Review Date:** 2026-02-25
**Secondary Reviewer:** AI Assistant (Level 1 — Syntax & Grammar)

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
- **Addressed:** [x]

---

## File: 04-background.mdx

### Issue 1: Wetted Perimeter Symbol (Equation 1)

- **Location:** Equation 1
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 2: Wetted Perimeter Symbol (Equation 2)

- **Location:** Equation 2
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: Missing Raw Citation Text

- **Location:** Paragraph referencing probability tables
- **Category:** Citation
- **Severity:** Major
- **Problem:** PDF cites "Fell et al. (2008)" for the probability tables, but MDX has only `<Citation citationKey="Fell2008" />` with no raw reference text.
- **Recommended Fix:** Add the raw reference text (e.g., "Fell et al. (2008)") adjacent to the `<Citation>` component.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 4: Missing Citation Component in Figure Caption

- **Location:** Figure 8 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Fell et al. 2015" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Fell2015" />` in the caption text alongside the author-year.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 05-cylindrical-pipe.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 3)

- **Location:** Equation 3
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 2: Unit Weight Symbol Casing (Equation 5)

- **Location:** Equation 5
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: "Where" Term Prefix Formatting (Equation 3)

- **Location:** Equation 3 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 4: "Where" Term Prefix Formatting (Equation 4)

- **Location:** Equation 4 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 06-horizontal-crack.mdx

### Issue 1: Figure Caption Typo

- **Location:** Figure 31 caption
- **Category:** Figure
- **Severity:** Minor
- **Problem:** Caption typo: "geoemetry".
- **Recommended Fix:** Change to "geometry".
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 2: Unit Weight Symbol Casing (Equation 6)

- **Location:** Equation 6
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: Unit Weight Symbol Casing (Equation 7)

- **Location:** Equation 7
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 4: "Where" Term Prefix Formatting (Equation 6)

- **Location:** Equation 6 where block
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 5: Outdated Section Reference — "section 5.1"

- **Location:** Line 25
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.1."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.1` with `the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section`. Full line becomes: `The method of analysis is the same as that described for the Cylindrical Pipe worksheet in the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 6: Outdated Section Reference — "section 5.2"

- **Location:** Line 29
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"very similar to that described for the Cylindrical Pipe worksheet in section 5.2."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.2` with `the [Critical Shear Stress and Initial Pipe Diameter](05-cylindrical-pipe.mdx#critical-shear-stress-and-initial-pipe-diameter) section`. Full line becomes: `The critical shear stress and initial crack dimensions are very similar to that described for the Cylindrical Pipe worksheet in the [Critical Shear Stress and Initial Pipe Diameter](05-cylindrical-pipe.mdx#critical-shear-stress-and-initial-pipe-diameter) section. Instead`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 7: Outdated Section Reference — "section 5.3"

- **Location:** Line 42
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.3."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.3` with `the [Core Geometry](05-cylindrical-pipe.mdx#core-geometry) section`. Full line becomes: `The core geometry is the same as that described for the Cylindrical Pipe worksheet in the [Core Geometry](05-cylindrical-pipe.mdx#core-geometry) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 8: Outdated Section Reference — "section 5.4"

- **Location:** Lines 46–47
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.4"` — note this reference spans a line break. Text reads: `...the same as that described for the Cylindrical Pipe\nPipe worksheet in section 5.4, but using a different equation...`
- **Recommended Fix:** Replace `the Cylindrical\nPipe worksheet in section 5.4` with `the Cylindrical Pipe worksheet in the [Hydraulic Shear Stress](05-cylindrical-pipe.mdx#hydraulic-shear-stress) section`. Full rewritten text: `The hydraulic shear stress on the surface of the horizontal crack from flow of water in the crack is the same as that described for the Cylindrical Pipe worksheet in the [Hydraulic Shear Stress](05-cylindrical-pipe.mdx#hydraulic-shear-stress) section, but using a different equation and crack width instead of pipe diameter.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 9: Outdated Section Reference — "section 5.5"

- **Location:** Line 58
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.5"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.5` with `the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The likelihood of initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section, but using`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 10: Outdated Section Reference — "section 5.6"

- **Location:** Line 63
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.6"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.6` with `the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The headwater level for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section, but`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 11: Incorrect Terminology — "critical pipe diameter" in Horizontal Crack Chapter

- **Location:** Line 68
- **Category:** Text
- **Severity:** Major
- **Problem:** Under the heading "Critical Crack Width for Initiation of Concentrated Leak Erosion," the text reads `"The critical pipe diameter for initiation of concentrated leak erosion is the same as..."` — this should say "crack width," not "pipe diameter," to match the heading and context. Current text: `The critical pipe diameter for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in section`
- **Recommended Fix:** Change `The critical pipe diameter for initiation` to `The critical crack width for initiation`.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 12: Outdated Section Reference — "section 5.7"

- **Location:** Lines 68–69
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section\n5.7"` (spans line break) should be a Docusaurus link.
- **Recommended Fix:** Replace `section\n5.7` with `the [Critical Pipe Diameter for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#critical-pipe-diameter-for-initiation-of-concentrated-leak-erosion) section`. Combined with Issue 11 fix, full rewritten text: `The critical crack width for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Critical Pipe Diameter for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#critical-pipe-diameter-for-initiation-of-concentrated-leak-erosion) section, but using a different equation and crack width instead of pipe diameter.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 07-vertical-rectangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 8)

- **Location:** Equation 8
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 2: Unit Weight Symbol Casing (Equation 9)

- **Location:** Equation 9
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: Missing Citation Component in Figure Caption

- **Location:** Figure 35 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Foster et al. 2002" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Foster2002" />` in the caption text alongside the author-year.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 4: Outdated Section Reference — "section 5.1"

- **Location:** Line 27
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.1."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.1` with `the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section`. Full line becomes: `The method of analysis is the same as that described for the Cylindrical Pipe worksheet in the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 5: Outdated Section Reference — "section 5.3"

- **Location:** Line 82
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.3"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.3` with `the [Core Geometry](05-cylindrical-pipe.mdx#core-geometry) section`. Full line becomes: `The core geometry is the same as that described for the Cylindrical Pipe worksheet in the [Core Geometry](05-cylindrical-pipe.mdx#core-geometry) section, but the base elevation of the crack is not an input`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 6: Incorrect Terminology — "pipe diameters" in Vertical Rectangular Crack Chapter

- **Location:** Line 121
- **Category:** Text
- **Severity:** Major
- **Problem:** In the Vertical Rectangular Crack chapter under Hydraulic Shear Stress, the text reads: `"the hydraulic shear stress using the same hydraulic conditions as the first table but for pipe diameters ranging from 1 millimeter to 150 millimeters."` This should say "crack widths" since the context is about rectangular cracks, not cylindrical pipes. The surrounding text (line 124) correctly uses "crack width."
- **Recommended Fix:** Change `pipe diameters` to `crack widths`. Full corrected text: `the hydraulic shear stress using the same hydraulic conditions as the first table but for crack widths ranging from 1 millimeter to 150 millimeters.`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 7: Outdated Section Reference — "section 5.5"

- **Location:** Line 128
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.5"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.5` with `the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The likelihood of initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section, but using a`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 8: Outdated Section Reference — "section 5.6"

- **Location:** Line 133
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.6"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.6` with `the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The headwater level for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section, but`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 9: Outdated Section Reference — "section 5.7"

- **Location:** Lines 138–139
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe\nworksheet in section 5.7"` (spans line break) should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.7` with `the [Critical Pipe Diameter for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#critical-pipe-diameter-for-initiation-of-concentrated-leak-erosion) section`. Full rewritten text: `The critical crack width at the top of the core for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Critical Pipe Diameter for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#critical-pipe-diameter-for-initiation-of-concentrated-leak-erosion) section, but using a different equation and crack width instead of pipe diameter.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 08-vertical-triangular-crack.mdx

### Issue 1: Unit Weight Symbol Casing (Equation 10)

- **Location:** Equation 10
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 2: Unit Weight Symbol Casing (Equation 11)

- **Location:** Equation 11
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equations use `\gamma_{W}` (uppercase) instead of `\gamma_{w}`.
- **Recommended Fix:** Confirm PDF symbol casing and update if needed.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: Outdated Section Reference — "section 5.1"

- **Location:** Line 23
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.1."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.1` with `the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section`. Full line becomes: `The method of analysis is the same as that described for the Cylindrical Pipe worksheet in the [Method of Analysis](05-cylindrical-pipe.mdx#method-of-analysis) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 4: Outdated Section Reference — "section 7.2"

- **Location:** Line 27
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Vertical Rectangular Crack worksheet in section 7.2."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 7.2` with `the [Critical Shear Stress and Initial Crack Dimensions](07-vertical-rectangular-crack.mdx#critical-shear-stress-and-initial-crack-dimensions) section`. Full line becomes: `The critical shear stress and initial crack dimensions are the same as that described for the Vertical Rectangular Crack worksheet in the [Critical Shear Stress and Initial Crack Dimensions](07-vertical-rectangular-crack.mdx#critical-shear-stress-and-initial-crack-dimensions) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 5: Outdated Section Reference — "section 7.3"

- **Location:** Line 31
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Vertical Rectangular Crack worksheet in section 7.3."` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 7.3` with `the [Core Geometry](07-vertical-rectangular-crack.mdx#core-geometry) section`. Full line becomes: `The core geometry is the same as that described for the Vertical Rectangular Crack worksheet in the [Core Geometry](07-vertical-rectangular-crack.mdx#core-geometry) section.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 6: Outdated Section Reference — "section 7.4"

- **Location:** Lines 35–36
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the\nVertical Rectangular Crack worksheet in section 7.4"` (spans line break) should be a Docusaurus link.
- **Recommended Fix:** Replace `section 7.4` with `the [Hydraulic Shear Stress](07-vertical-rectangular-crack.mdx#hydraulic-shear-stress) section`. Full rewritten text: `The hydraulic shear stress on the surface of the vertical triangular crack from flow of water in the crack is the same as that described for the Vertical Rectangular Crack worksheet in the [Hydraulic Shear Stress](07-vertical-rectangular-crack.mdx#hydraulic-shear-stress) section, but using a different equation.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 7: Outdated Section Reference — "section 5.5"

- **Location:** Line 46
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.5"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.5` with `the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The likelihood of initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Likelihood of Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion) section, but using a`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 8: Outdated Section Reference — "section 5.6"

- **Location:** Line 51
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Cylindrical Pipe worksheet in section 5.6"` should be a Docusaurus link.
- **Recommended Fix:** Replace `section 5.6` with `the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section`. Full line becomes: `The headwater level for initiation of concentrated leak erosion is the same as that described for the Cylindrical Pipe worksheet in the [Headwater Level for Initiation of Concentrated Leak Erosion](05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion) section, but`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 9: Outdated Section Reference — "section 7.7"

- **Location:** Lines 56–57
- **Category:** Text
- **Severity:** Major
- **Problem:** PDF-style section reference: `"the same as that described for the Vertical Rectangular\nCrack worksheet in section 7.7"` (spans line break) should be a Docusaurus link.
- **Recommended Fix:** Replace `section 7.7` with `the [Critical Crack Width for Initiation of Concentrated Leak Erosion](07-vertical-rectangular-crack.mdx#critical-crack-width-for-initiation-of-concentrated-leak-erosion) section`. Full rewritten text: `The critical crack width at the top of the core for initiation of concentrated leak erosion is the same as that described for the Vertical Rectangular Crack worksheet in the [Critical Crack Width for Initiation of Concentrated Leak Erosion](07-vertical-rectangular-crack.mdx#critical-crack-width-for-initiation-of-concentrated-leak-erosion) section, but using a different equation.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 09-probability-tables.mdx

### Issue 1: "Fell et. al." Typo

- **Location:** Step 4 paragraph
- **Category:** Text
- **Severity:** Minor
- **Problem:** "Fell et. al." includes an extra period after "et"; PDF uses "Fell et al."
- **Recommended Fix:** Remove the extra period.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 2: Missing Citation Component in Figure Caption

- **Location:** Figure 42 caption
- **Category:** Citation
- **Severity:** Major
- **Problem:** Caption includes "Fell et al. (2008)" but no `<Citation>` component is present in the caption.
- **Recommended Fix:** Add `<Citation citationKey="Fell2008" />` in the caption text alongside the author-year.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 3: Duplicate Preposition — "from by"

- **Location:** Line 24
- **Category:** Grammar
- **Severity:** Major
- **Problem:** Text reads `"using the probability tables from by Fell et al. (2008)"` — duplicate preposition "from by". Current text: `This worksheet estimates the probability of initiation of concentrated leak erosion using the probability tables from by Fell et al. (2008)`
- **Recommended Fix:** Remove `by`. Corrected text: `...using the probability tables from Fell et al. (2008)`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 4: Incorrect Preposition — "diameter of crack width"

- **Location:** Line 152
- **Category:** Grammar
- **Severity:** Major
- **Problem:** Text reads `"the user-specified pipe diameter of crack width at the top of the core"` — "of" should be "or". Current text: `...the best estimate of the probability of initiation of concentrated leak erosion as a function of the\nuser-specified pipe diameter of crack width at the top of the core and headwater level`
- **Recommended Fix:** Change `of crack width` to `or crack width`. Corrected text: `...pipe diameter or crack width at the top of the core...`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## File: 11-appendix-derivation-of-hydraulic-shear-stress-equations.mdx

### Issue 1: Figure Alt Text Typo

- **Location:** Figure 50 alt text
- **Category:** Figure
- **Severity:** Minor
- **Problem:** Alt text says "hoirzontal" instead of "horizontal".
- **Recommended Fix:** Change to "horizontal".
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 2: Missing Parenthesis in Equation A-36

- **Location:** Equation A-36 (equation-47)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation text is missing a closing parenthesis: `\tau L(H_{1}+H_{2}+W=...`.
- **Recommended Fix:** Correct equation formatting to match PDF.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 3: Corrupted Tau Symbol in Text (Sentence 1)

- **Location:** First "Solving Equation..." sentence
- **Category:** Text
- **Severity:** Major
- **Problem:** Tau symbol in text appears corrupted in the first sentence.
- **Recommended Fix:** Restore correct tau symbol in text.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 4: Corrupted Tau Symbol in Text (Sentence 2)

- **Location:** Second "Solving Equation..." sentence
- **Category:** Text
- **Severity:** Major
- **Problem:** Tau symbol in text appears corrupted in the second sentence.
- **Recommended Fix:** Restore correct tau symbol in text.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 5: Stray Brace in Tau Symbol

- **Location:** Equation A-94 sentence
- **Category:** Equation
- **Severity:** Major
- **Problem:** Stray brace in `&tau;}` (`<em>&tau;}<sub>c</sub></em>`).
- **Recommended Fix:** Remove stray brace.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 6: Wetted Perimeter Symbol Casing (Equation A-6)

- **Location:** Equation A-6 (equation-17)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 7: Wetted Perimeter Symbol Casing (Equation A-20)

- **Location:** Equation A-20 (equation-31)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 8: Wetted Perimeter Symbol Casing (Equation A-38)

- **Location:** Equation A-38 (equation-49)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 9: Wetted Perimeter Symbol Casing (Equation A-64)

- **Location:** Equation A-64 (equation-75)
- **Category:** Equation
- **Severity:** Major
- **Problem:** Equation uses `P_W` but variable is defined as `P_w` in text/PDF.
- **Recommended Fix:** Update to `P_w` if consistent with PDF symbols.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 10: "Where" Term Prefix Formatting (Equation A-1)

- **Location:** Equation A-1 where block (equation-12)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 11: "Where" Term Prefix Formatting (Equation A-6)

- **Location:** Equation A-6 where block (equation-17)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 12: "Where" Term Prefix Formatting (Equation A-15)

- **Location:** Equation A-15 where block (equation-26)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 13: "Where" Term Prefix Formatting (Equation A-20)

- **Location:** Equation A-20 where block (equation-31)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 14: "Where" Term Prefix Formatting (Equation A-35)

- **Location:** Equation A-35 where block (equation-46)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 15: "Where" Term Prefix Formatting (Equation A-38)

- **Location:** Equation A-38 where block (equation-49)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 16: "Where" Term Prefix Formatting (Equation A-55)

- **Location:** Equation A-55 where block (equation-66)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 17: "Where" Term Prefix Formatting (Equation A-64)

- **Location:** Equation A-64 where block (equation-75)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 18: "Where" Term Prefix Formatting (Equation A-66)

- **Location:** Equation A-66 where block (equation-77)
- **Category:** MDX
- **Severity:** Minor
- **Problem:** "where" terms use bullet list formatting (`- Term`) instead of the required blockquote lines (`> Term`).
- **Recommended Fix:** Convert each "where" term to blockquote lines beginning with `> ` and ending with double-space line breaks, with no blank lines between terms.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 19: Missing Preposition — "as shown Equation A-64"

- **Location:** Line 390
- **Category:** Grammar
- **Severity:** Major
- **Problem:** Text reads `"the hydraulic shear stress along a crack as shown Equation A-64."` — missing preposition "in". Current text: `...the average hydraulic shear stress acting on the walls of the crack can be approximated by a more general formula for the hydraulic\nshear stress along a crack as shown Equation A-64.`
- **Recommended Fix:** Change `as shown Equation A-64` to `as shown in Equation A-64`. Corrected text: `...shear stress along a crack as shown in Equation A-64.`
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 20: Figure A-9 Caption Prefix Inconsistency

- **Location:** Lines 385–386
- **Category:** Figure
- **Severity:** Minor
- **Problem:** The Figure component caption reads `"Figure A-9. Hydrostatic force on a triangular face."` which will render as "Figure 55: Figure A-9. Hydrostatic force on a triangular face." — a redundant "Figure" prefix. All other appendix figure captions in this file use the format "A-N. Caption text" (without the "Figure" prefix), e.g., "A-1. Cylindrical pipe geometry."
- **Recommended Fix:** Change caption from `"Figure A-9. Hydrostatic force on a triangular face."` to `"A-9. Hydrostatic force on a triangular face."` to match the convention used by all other figures in this appendix. Also update the alt text to match.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 21: Internal Equation Inconsistency — Equation A-74 (equation-85)

- **Location:** Line 440
- **Category:** Equation
- **Severity:** Major
- **Problem:** In Equation A-74 (equation-85), one term reads `2H_{1}L` but should be `2H_{1}^{2}L` based on the derivation chain. Equation A-74 is an intermediate expansion step that should simplify to Equation A-75 (equation-86): `A = \frac{W}{12D}(2H_{1}^2+2H_{1}H_{2}+2H_{2}^2)`. Collecting like terms in equation-85 currently yields `(0)H_1^2 L + 2H_1 L + ...` which does not simplify to `2H_1^2` in equation-86. Current equation-85 text: `A=\frac{W}{12DL}\left(...+ 2H_{1}L - 2H_{1}H_{2}L + ...\right)`
- **Recommended Fix:** Change `2H_{1}L` to `2H_{1}^{2}L` in the equation string. Locate the substring `+ 2H_{1}L -` and replace with `+ 2H_{1}^{2}L -`.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

### Issue 22: Internal Equation Inconsistency — Equation A-87 (equation-98)

- **Location:** Line 496
- **Category:** Equation
- **Severity:** Major
- **Problem:** In Equation A-87 (equation-98), the second term on the left side uses `\tau^{2}` (without subscript) instead of `\tau_{c}^{2}`. This equation expands from Equation A-86 (equation-97): `\tau_{c}^{2}(H_{1}+H_{2})^{2}\left(1+\frac{W^2}{4D^2}\right)`. Distributing should give `\tau_{c}^{2}` in both terms. Current equation-98 text: `\tau_{c}^{2}(H_{1}+H_{2})^{2}+\frac{\tau^{2}(H_{1}+H_2)^{2}W^2}{4D^2} = ...`
- **Recommended Fix:** Change `\tau^{2}` to `\tau_{c}^{2}` in the second term of the left side. Locate `\frac{\tau^{2}(H_{1}` and replace with `\frac{\tau_{c}^{2}(H_{1}`.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Addressed:** [x]

---

## File: 13-appendix-acronym-list.mdx

### Issue 1: UDF Expansion

- **Location:** Acronym table
- **Category:** Table
- **Severity:** Minor
- **Problem:** UDF expansion is plural "User-Defined Functions"; PDF uses singular "User-Defined Function".
- **Recommended Fix:** Update to match PDF if strict match required.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

### Issue 2: USCS Acronym Expansion — "United" Should Be "Unified"

- **Location:** Line 52
- **Category:** Text
- **Severity:** Major
- **Problem:** The acronym expansion for USCS reads `'United Soil Classification System'` but the correct name is "Unified Soil Classification System." This is confirmed by usage in `09-probability-tables.mdx` line 136–137: "Unified Soil Classification (USCS)".
- **Recommended Fix:** Change `'United Soil Classification System'` to `'Unified Soil Classification System'`.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Addressed:** [x]

---

## Section Reference Mapping

For convenience, the complete mapping from PDF section numbers to Docusaurus link targets:

| PDF Section | Target Page | Target Heading | Docusaurus Link |
|-------------|-------------|----------------|-----------------|
| 5.1 | 05-cylindrical-pipe | Method of Analysis | `(05-cylindrical-pipe.mdx#method-of-analysis)` |
| 5.2 | 05-cylindrical-pipe | Critical Shear Stress and Initial Pipe Diameter | `(05-cylindrical-pipe.mdx#critical-shear-stress-and-initial-pipe-diameter)` |
| 5.3 | 05-cylindrical-pipe | Core Geometry | `(05-cylindrical-pipe.mdx#core-geometry)` |
| 5.4 | 05-cylindrical-pipe | Hydraulic Shear Stress | `(05-cylindrical-pipe.mdx#hydraulic-shear-stress)` |
| 5.5 | 05-cylindrical-pipe | Likelihood of Initiation of Concentrated Leak Erosion | `(05-cylindrical-pipe.mdx#likelihood-of-initiation-of-concentrated-leak-erosion)` |
| 5.6 | 05-cylindrical-pipe | Headwater Level for Initiation of Concentrated Leak Erosion | `(05-cylindrical-pipe.mdx#headwater-level-for-initiation-of-concentrated-leak-erosion)` |
| 5.7 | 05-cylindrical-pipe | Critical Pipe Diameter for Initiation of Concentrated Leak Erosion | `(05-cylindrical-pipe.mdx#critical-pipe-diameter-for-initiation-of-concentrated-leak-erosion)` |
| 7.2 | 07-vertical-rectangular-crack | Critical Shear Stress and Initial Crack Dimensions | `(07-vertical-rectangular-crack.mdx#critical-shear-stress-and-initial-crack-dimensions)` |
| 7.3 | 07-vertical-rectangular-crack | Core Geometry | `(07-vertical-rectangular-crack.mdx#core-geometry)` |
| 7.4 | 07-vertical-rectangular-crack | Hydraulic Shear Stress | `(07-vertical-rectangular-crack.mdx#hydraulic-shear-stress)` |
| 7.7 | 07-vertical-rectangular-crack | Critical Crack Width for Initiation of Concentrated Leak Erosion | `(07-vertical-rectangular-crack.mdx#critical-crack-width-for-initiation-of-concentrated-leak-erosion)` |

---

## Informational Note: Unused Imports

Many files in this document import components that are never used (e.g., `Link`, `addBaseUrl`, `VersionSelector`). This appears to be a repo-wide pattern across the toolbox technical manuals and is not flagged as individual issues. Consider a bulk cleanup if desired.
