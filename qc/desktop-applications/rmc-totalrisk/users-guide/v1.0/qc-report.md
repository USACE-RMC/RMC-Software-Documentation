# QC Report

- **Document:** docs/desktop-applications/rmc-totalrisk/users-guide
- **Version:** v1.0
- **Review Level:** 1 (Syntax & Grammar)
- **Source PDF:** N/A for Level 1
- **Review Date:** 2026-02-20
- **Reviewer:** AI Assistant
- **Special Emphasis:** Citation components must have Author, Year context text

---

## File: 02-welcome.mdx

### Issue 1: Grammatical number agreement — "complex system"

- **Location:** Line 23
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "complex system with multiple components" should use the plural "systems" since the sentence describes multiple systems.
- **Recommended Fix:** Change `as well as for complex system with multiple` to `as well as for complex systems with multiple`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 03-overview.mdx

### Issue 2: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 51
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef"/>` appears without accompanying Author, Year text. The Citation component renders as a bracketed number (e.g., [1]) and must be accompanied by author-year text so the reader knows the source.
- **Recommended Fix:** Change `refer to the technical reference manual <Citation citationKey="TechRef"/>` to `refer to the technical reference manual (Smith et al., 2025) <Citation citationKey="TechRef"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 3: Bare Citation — EM1619 missing Author, Year context

- **Location:** Line 52
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="EM1619"/>` appears without accompanying Author, Year text.
- **Recommended Fix:** Change `is in <Citation citationKey="EM1619"/>` to `is in EM 1110-2-1619 (USACE, 1996) <Citation citationKey="EM1619"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 4: Bare Citation — BestPractices missing Author, Year context

- **Location:** Line 53
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="BestPractices"/>` appears without accompanying Author, Year text.
- **Recommended Fix:** Change `and <Citation citationKey="BestPractices"/>` to `and Best Practices in Dam and Levee Safety Risk Analysis (USBR and USACE, 2019) <Citation citationKey="BestPractices"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 04-installation.mdx

### Issue 5: Unused import — Citation component imported but never used

- **Location:** Line 11
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `import Citation from "@site/src/components/Citation"` is declared but no `<Citation>` component is used anywhere in this file.
- **Recommended Fix:** Remove the unused import line: `import Citation from "@site/src/components/Citation";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 05-gui.mdx

### Issue 6: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 115
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "EqAC is required in USACE cost evaluation procedures `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `cost evaluation procedures <Citation citationKey="TechRef" />` to `cost evaluation procedures (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 07-hazard-functions.mdx

### Issue 7: Bare Citation — BestPractices missing Author, Year context

- **Location:** Line 25
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="BestPractices"/>` appears without accompanying Author, Year text. The text reads: "...the primary hazard parameters for evaluating a potential failure mode `<Citation citationKey="BestPractices"/>` `<Citation citationKey="SmithBartlesFleming"/>`."
- **Recommended Fix:** Change to `...failure mode (USBR and USACE, 2019) <Citation citationKey="BestPractices"/> (Smith et al., 2018) <Citation citationKey="SmithBartlesFleming"/>.`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 8: Bare Citation — SmithBartlesFleming missing Author, Year context

- **Location:** Line 25
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="SmithBartlesFleming"/>` appears without accompanying Author, Year text (same location as Issue 7).
- **Recommended Fix:** See Issue 7 recommended fix.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 9: Bare Citation — SmithBestFitGuide missing Author, Year context

- **Location:** Line 35
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="SmithBestFitGuide"/>` appears without accompanying Author, Year text. The text reads: "...communities of practice `<Citation citationKey="SmithBestFitGuide"/>`."
- **Recommended Fix:** Change `practice <Citation citationKey="SmithBestFitGuide"/>` to `practice (Smith and Daughty, 2020) <Citation citationKey="SmithBestFitGuide"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 10: Broken FigReference — figKey "options" does not exist

- **Location:** Line 56
- **Category:** MDX
- **Severity:** Major
- **Problem:** `<FigReference figKey="options"/>` references a figure key that does not exist in any file of this document. The text reads: "For more information, refer to section `<FigReference figKey="options"/>`." The intended target appears to be the Default Options figure in 05-gui.mdx, which uses `figKey="default-options"`.
- **Recommended Fix:** Change `<FigReference figKey="options"/>` to `<FigReference figKey="default-options"/>`, or replace with a markdown link to the Default Options section of the GUI chapter.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 11: Bare Citation — SmithBartlesFleming missing Author, Year context

- **Location:** Line 122
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="SmithBartlesFleming"/>` appears without accompanying Author, Year text. The text reads: "...rather than fixed values `<Citation citationKey="SmithBartlesFleming"/>`."
- **Recommended Fix:** Change `fixed values <Citation citationKey="SmithBartlesFleming"/>` to `fixed values (Smith et al., 2018) <Citation citationKey="SmithBartlesFleming"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 12: Typo — "nput" should be "input"

- **Location:** Line 140
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** The word "input" is misspelled as "nput" in: "the Properties window displays the nput data properties".
- **Recommended Fix:** Change `nput` to `input`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 08-transform-functions.mdx

### Issue 13: Equation where block not in blockquote format

- **Location:** Line 36
- **Category:** Equation
- **Severity:** Minor
- **Problem:** The where clause `where ε ∼N (0,σ).` after the linear transform equation is written as inline text instead of using the required blockquote format with `> ` prefix.
- **Recommended Fix:** Replace the inline where clause with blockquote format:
  ```
  where:

  > $\varepsilon \sim N(0, \sigma)$
  ```
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 14: Equation where block not in blockquote format

- **Location:** Line 81
- **Category:** Equation
- **Severity:** Minor
- **Problem:** The where clause `where ε ∼ N(0,σ). Ensure the standard error (σ) is in log-space.` after the power transform equation is written as inline text instead of using the required blockquote format with `> ` prefix.
- **Recommended Fix:** Replace the inline where clause with blockquote format:
  ```
  where:

  > $\varepsilon \sim N(0, \sigma)$

  Ensure the standard error ($\sigma$) is in log-space.
  ```
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 15: Redundant "Figure" prefix before FigReference

- **Location:** Line 165
- **Category:** MDX
- **Severity:** Minor
- **Problem:** The text reads `Figure <FigReference figKey="tabular-validation-error" />`, but the `<FigReference>` component already renders the word "Figure" followed by the number. This results in "Figure Figure N" in the rendered output.
- **Recommended Fix:** Remove the redundant "Figure" prefix. Change `Figure <FigReference figKey="tabular-validation-error" />` to `<FigReference figKey="tabular-validation-error" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 09-response-functions.mdx

### Issue 16: Bare Citation — BestPractices missing Author, Year context

- **Location:** Line 37
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="BestPractices" />` appears without accompanying Author, Year text. The text reads: "...can lead to various types of damage and failure `<Citation citationKey="BestPractices" />`."
- **Recommended Fix:** Change `failure <Citation citationKey="BestPractices" />` to `failure (USBR and USACE, 2019) <Citation citationKey="BestPractices" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 17: Bare Citation — HartfordBaecher missing Author, Year context

- **Location:** Line 37
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="HartfordBaecher" />` appears without accompanying Author, Year text. The text reads: "...interconnected nodes and branches `<Citation citationKey="HartfordBaecher" />`."
- **Recommended Fix:** Change `branches <Citation citationKey="HartfordBaecher" />` to `branches (Hartford and Baecher, 2004) <Citation citationKey="HartfordBaecher" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 18: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 41
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `refer to <Citation citationKey="TechRef" />` to `refer to the technical reference manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 19: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 71
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...event tree terminology `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `terminology <Citation citationKey="TechRef" />` to `terminology (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 20: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 453
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `refer to <Citation citationKey="TechRef" />` to `refer to the technical reference manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 10-consequence-functions.mdx

### Issue 21: Bare Citation — LifeSimManual missing Author, Year context

- **Location:** Line 34
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="LifeSimManual" />` appears without accompanying Author, Year text. The text reads: "...estimating life loss and economic damage `<Citation citationKey="LifeSimManual" />`."
- **Recommended Fix:** Change `damage <Citation citationKey="LifeSimManual" />` to `damage (USACE, 2021) <Citation citationKey="LifeSimManual" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 22: Bare Citation — Fields2016 missing Author, Year context

- **Location:** Line 36
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="Fields2016" />` appears without accompanying Author, Year text. The text reads: "...(e.g., flooding) `<Citation citationKey="Fields2016" />`."
- **Recommended Fix:** Change `(e.g., flooding) <Citation citationKey="Fields2016" />` to `(e.g., flooding) (Fields, 2016) <Citation citationKey="Fields2016" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 11-risk-analyses.mdx

### Issue 23: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 39
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `manual <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 24: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 139
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `manual <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 25: Typo — "Spilway" should be "Spillway"

- **Location:** Line 272
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Spilway" is misspelled in the bold heading `**Spilway erosion failure mode (PFM 1)**`.
- **Recommended Fix:** Change `**Spilway erosion failure mode (PFM 1)**` to `**Spillway erosion failure mode (PFM 1)**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 26: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 255
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `reference <Citation citationKey="TechRef" />` to `reference manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 27: Redundant "Figure" prefix before FigReference

- **Location:** Line 423
- **Category:** MDX
- **Severity:** Minor
- **Problem:** The text reads `Figure <FigReference figKey="totalrisk-simulation" />`, but the `<FigReference>` component already renders "Figure N". This results in "Figure Figure N" in the rendered output.
- **Recommended Fix:** Change `Figure <FigReference figKey="totalrisk-simulation" />` to `<FigReference figKey="totalrisk-simulation" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 28: Broken word across lines — "a ssessment"

- **Location:** Lines 427–428
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** The word "assessment" is broken across two lines in the MDX source: `a more accurate a` (end of line 427) and `ssessment.` (start of line 428). In MDX, a line break within a paragraph inserts a space, rendering this as "a ssessment" with an extra space.
- **Recommended Fix:** Join the lines so "assessment" is a single unbroken word: `for a more accurate assessment.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 29: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 431
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `manual <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 12-risk-analysis-results.mdx

### Issue 30: Bare Citation — EM1619 missing Author, Year context

- **Location:** Line 55
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="EM1619" />` appears without accompanying Author, Year text. The text reads: "...refer to total risk as residual risk (i.e., the risk that remains) `<Citation citationKey="EM1619" />` `<Citation citationKey="ER1156" />`."
- **Recommended Fix:** Change to `...residual risk (i.e., the risk that remains) (USACE, 1996) <Citation citationKey="EM1619" /> (USACE, 2014) <Citation citationKey="ER1156" />.`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 31: Bare Citation — ER1156 missing Author, Year context

- **Location:** Line 55
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="ER1156" />` appears without accompanying Author, Year text (same location as Issue 30).
- **Recommended Fix:** See Issue 30 recommended fix.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 32: Extra space before period

- **Location:** Line 58
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** There is an extra space before the period in "included ." The text reads: "...total_ does not necessarily mean that _all_ potential sources of risk have been included ."
- **Recommended Fix:** Remove the extra space: `included.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 33: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 71
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual. `<Citation citationKey="TechRef" />`"
- **Recommended Fix:** Change `manual. <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />.`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 34: Bare Citation — CenterforChemicalProcessSafety missing Author, Year context

- **Location:** Line 78
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="CenterforChemicalProcessSafety" />` appears without accompanying Author, Year text. The text reads: "...or Farmer's diagram `<Citation citationKey="CenterforChemicalProcessSafety" />`."
- **Recommended Fix:** Change `diagram <Citation citationKey="CenterforChemicalProcessSafety" />` to `diagram (Center for Chemical Process Safety, 2009) <Citation citationKey="CenterforChemicalProcessSafety" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 35: Bare Citation — ER1156 missing Author, Year context

- **Location:** Line 83
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="ER1156"/>` appears without accompanying Author, Year text. The text reads: "...the USACE tolerable risk limit is displayed as a dotted black line `<Citation citationKey="ER1156"/>`."
- **Recommended Fix:** Change `line <Citation citationKey="ER1156"/>` to `line (USACE, 2014) <Citation citationKey="ER1156"/>`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 13-risk-analysis-diagnostics.mdx

### Issue 36: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 72
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `manual <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 37: Bare Citation — TechRef missing Author, Year context

- **Location:** Line 125
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="TechRef" />` appears without accompanying Author, Year text. The text reads: "...refer to the technical reference manual `<Citation citationKey="TechRef" />`."
- **Recommended Fix:** Change `manual <Citation citationKey="TechRef" />` to `manual (Smith et al., 2025) <Citation citationKey="TechRef" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 38: Bare Citation — ECB2019 missing Author, Year context

- **Location:** Line 178
- **Category:** Citation
- **Severity:** Major
- **Problem:** `<Citation citationKey="ECB2019" />` appears without accompanying Author, Year text. The text reads: "...and other factors `<Citation citationKey="ECB2019" />`."
- **Recommended Fix:** Change `factors <Citation citationKey="ECB2019" />` to `factors (USACE, 2019) <Citation citationKey="ECB2019" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
