# QC Report

- **Document:** docs/desktop-applications/rmc-bestfit/users-guide
- **Version:** 1.0
- **Review Level:** 1 (Syntax & Grammar)
- **Source PDF:** N/A for Level 1
- **Review Date:** 2026-02-20
- **Reviewer:** AI Assistant

---

## File: 00-document-info.mdx

No issues found.

---

## File: 00-version-history.mdx

No issues found.

---

## File: 01-preface.mdx

### Issue 1: Unused import — VersionSelector

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in this file.
- **Recommended Fix:** Remove `import VersionSelector from "@site/src/components/VersionSelector";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 02-welcome-to-rmc-bestfit.mdx

### Issue 2: Unused import — VersionSelector

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in this file.
- **Recommended Fix:** Remove `import VersionSelector from "@site/src/components/VersionSelector";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 3: Missing space before bold text

- **Location:** Line 72
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `open**.bestfit**` is missing a space before the bold marker.
- **Recommended Fix:** Change to `open **.bestfit**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 4: Missing space after period

- **Location:** Line 73
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `file.Select` is missing a space after the period.
- **Recommended Fix:** Change to `file. Select`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 5: Typo — "appon"

- **Location:** Line 82
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `click **Try an appon this PC**` contains a typo — "appon" should be two words.
- **Recommended Fix:** Change to `click **Try an app on this PC**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 6: Missing space before bold text

- **Location:** Line 83
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `select**Look for another app on this PC**` is missing a space before the bold marker.
- **Recommended Fix:** Change to `select **Look for another app on this PC**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 7: Malformed bold markers

- **Location:** Line 84
- **Category:** MDX
- **Severity:** Major
- **Problem:** `click** Open. **When` has misplaced bold markers that will cause incorrect rendering. The space is inside the bold markers instead of outside.
- **Recommended Fix:** Change to `click **Open**. When`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 03-graphical-user-interface.mdx

### Issue 8: Unused import — VersionSelector

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in this file.
- **Recommended Fix:** Remove `import VersionSelector from "@site/src/components/VersionSelector";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 9: Missing space — "panesas"

- **Location:** Line 27
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `panesas desired` is missing a space — should be two words.
- **Recommended Fix:** Change to `panes as desired`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 10: Inconsistent naming — "MenuBar"

- **Location:** Line 151
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `**MenuBar**` is inconsistent with the established naming `**Menu Bar**` (with space) used elsewhere in the document (e.g., line 38).
- **Recommended Fix:** Change to `**Menu Bar**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 11: Missing space — "belocated"

- **Location:** Line 209
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `will belocated` is missing a space.
- **Recommended Fix:** Change to `will be located`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 12: Typo — "shared area" should be "shaded area"

- **Location:** Line 235
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `light blue shared area` should be `light blue shaded area`, matching the terminology used on line 223.
- **Recommended Fix:** Change `shared` to `shaded`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 13: Duplicate figKey — "project-explorer-element"

- **Location:** Lines 276, 287, 297
- **Category:** Figure
- **Severity:** Blocker
- **Problem:** Three different figures share the same `figKey="project-explorer-element"`: figure23.png (line 276), figure24.png (line 287), and figure25.png (line 297). Figure keys must be unique for proper numbering and referencing. The `<FigReference>` on line 294 is ambiguous since it could refer to any of the three.
- **Recommended Fix:** Assign unique figKeys to each figure. For example: `figKey="project-explorer-header-menu"` (figure23), `figKey="project-explorer-element-menu"` (figure24), `figKey="project-explorer-drag-drop"` (figure25). Update the FigReference on line 294 accordingly.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 14: Missing space after period

- **Location:** Line 388
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `deleted.The database` is missing a space after the period.
- **Recommended Fix:** Change to `deleted. The database`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 15: Missing space and typo — "aComma Separate"

- **Location:** Line 433
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `aComma Separate (.csv)` has a missing space between "a" and "Comma", and "Separate" should be "Separated".
- **Recommended Fix:** Change to `a Comma Separated (.csv)`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 16: Wrong product name — "RMC-RFA" should be "RMC-BestFit"

- **Location:** Lines 440–442
- **Category:** Text
- **Severity:** Major
- **Problem:** The figure's figKey, alt text, and caption all say "RMC-RFA" but this document is about RMC-BestFit. The figKey is `rmcrfa-plot-features`, alt is "RMC-RFA Plot Features", and caption is "RMC-RFA Plot Features."
- **Recommended Fix:** Change figKey to `rmcbestfit-plot-features`, alt to `"RMC-BestFit Plot Features."`, and caption to `"RMC-BestFit Plot Features."`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 17: Missing space after bold — "Pan the"

- **Location:** Line 465
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `**Pan**the plot area` is missing a space after the closing bold marker.
- **Recommended Fix:** Change to `**Pan** the plot area`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 04-working-with-rmc-bestfit.mdx

### Issue 18: Unused import — VersionSelector

- **Location:** Line 6
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `VersionSelector` is imported but never used in this file.
- **Recommended Fix:** Remove `import VersionSelector from "@site/src/components/VersionSelector";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 19: Equation variable inconsistency

- **Location:** Line 284
- **Category:** Equation
- **Severity:** Major
- **Problem:** In the general plotting position formula, the numerator uses `α` (Greek alpha) but the denominator uses `2a` (Latin letter "a"). The variable should be consistent.
- **Recommended Fix:** Change `2a` to `2α` in the equation string: `equation="P_i = \frac{i - α}{n + 1 - 2α}"`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 20: Stray opening parenthesis

- **Location:** Line 311
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `the Weibull parameter (is set as the default value` has a stray opening parenthesis that is never closed.
- **Recommended Fix:** Remove the parenthesis: `the Weibull parameter is set as the default value`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 21: Citation key case mismatch

- **Location:** Line 327
- **Category:** Citation
- **Severity:** Major
- **Problem:** `citationKey="usgs2018"` uses lowercase, but the bibliography key is `USGS2018` (uppercase). Citation keys are case-sensitive and this citation will not resolve.
- **Recommended Fix:** Change to `citationKey="USGS2018"`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 22: Missing space — "checkboxand"

- **Location:** Line 344
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `checkboxand enter` is missing a space.
- **Recommended Fix:** Change to `checkbox and enter`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 23: Missing space — "thelow"

- **Location:** Line 350
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `if thelow outlier` is missing a space.
- **Recommended Fix:** Change to `if the low outlier`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 24: Inconsistent heading capitalization

- **Location:** Line 357
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `### Interval data` uses lowercase "data", but all other H3 headings in this file use title case (e.g., "Systematic Data", "Perception Thresholds", "Summary Statistics").
- **Recommended Fix:** Change to `### Interval Data`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 25: Missing space — "magnitudesthat"

- **Location:** Line 359
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `magnitudesthat are not known` is missing a space.
- **Recommended Fix:** Change to `magnitudes that are not known`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 26: HTML entity in equation prop

- **Location:** Line 480
- **Category:** Equation
- **Severity:** Minor
- **Problem:** `equation="x_i \leq x &lt; x_{i+1}"` uses the HTML entity `&lt;` instead of the character `<`. While JSX may decode this, the standard practice is to use the character directly or `\lt` in LaTeX.
- **Recommended Fix:** Change `&lt;` to `<` in the equation string.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 27: Unnecessary comma after "Once"

- **Location:** Line 539
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `Once, the new **Distribution Fitting Analysis** is created` has an unnecessary comma after "Once".
- **Recommended Fix:** Change to `Once the new **Distribution Fitting Analysis** is created`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 28: Where block uses {"\n"} instead of blockquote prefix

- **Location:** Lines 599–600
- **Category:** MDX
- **Severity:** Minor
- **Problem:** The "where" block after the likelihood function equation uses `{"\n"}` on line 600 instead of the `> ` blockquote prefix. Each line in a "where" block should begin with `> `.
- **Recommended Fix:** Replace `{"\n"} <EquationNoRef equation="f(∙)" />` with `> <EquationNoRef equation="f(∙)" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 29: Where block uses {"\n"} instead of blockquote prefix

- **Location:** Lines 610–615
- **Category:** MDX
- **Severity:** Minor
- **Problem:** The "where" block after the log-likelihood equation uses `{"\n"}` on lines 612–615 instead of the `> ` blockquote prefix.
- **Recommended Fix:** Replace each `{"\n"} <EquationNoRef...` with `> <EquationNoRef...`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 30: Missing space after period

- **Location:** Line 657
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `values.AIC and BIC` is missing a space after the period.
- **Recommended Fix:** Change to `values. AIC and BIC`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 31: Wrong FigReference — points to wrong figure

- **Location:** Line 849
- **Category:** Figure
- **Severity:** Major
- **Problem:** `<FigReference figKey="create-new-distribution" />` in the "Create New Bayesian Analysis" section references the Distribution Fitting Analysis creation figure (line 533) instead of the Bayesian Estimation Analysis creation figure (line 852, figKey="create-new-bayesian").
- **Recommended Fix:** Change to `<FigReference figKey="create-new-bayesian" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 32: Unnecessary comma after "Once"

- **Location:** Line 858
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `Once, the new **Bayesian Estimation Analysis** is created` has an unnecessary comma after "Once".
- **Recommended Fix:** Change to `Once the new **Bayesian Estimation Analysis** is created`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 33: Where block uses {"\n"} instead of blockquote prefix

- **Location:** Lines 883–885
- **Category:** MDX
- **Severity:** Minor
- **Problem:** The "where" block after Bayes' theorem uses `{"\n"}` on lines 884–885 instead of the `> ` blockquote prefix.
- **Recommended Fix:** Replace each `{"\n"} <EquationNoRef...` with `> <EquationNoRef...`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 34: Extra space before period

- **Location:** Line 894
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `posterior parameter sets .` has an extra space before the period.
- **Recommended Fix:** Change to `posterior parameter sets.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 35: Incomplete caption text with missing references

- **Location:** Lines 914–915
- **Category:** Text
- **Severity:** Major
- **Problem:** The caption reads `"Diagram Illustrating the Basic Steps in Bayesian Analysis (adapted from , which was originally taken  (Perreault, 2000))."` — there is a missing source name after "adapted from" and a double space before "(Perreault, 2000)".
- **Recommended Fix:** Verify the original source references and insert the missing citation text. The caption appears to be missing one or two author/source names.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 36: Missing variable name in sentence

- **Location:** Line 981
- **Category:** Grammar
- **Severity:** Major
- **Problem:** `where is the number of parent distribution parameters` is missing the variable name. The sentence is grammatically incomplete.
- **Recommended Fix:** Change to `where _d_ is the number of parent distribution parameters` (or whatever variable symbol is appropriate).
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 37: Missing subject in sentence

- **Location:** Line 985
- **Category:** Grammar
- **Severity:** Major
- **Problem:** `It is recommended that be very small, such as 0.001.` is missing the subject. The noise parameter variable name is absent.
- **Recommended Fix:** Change to `It is recommended that _b_ be very small, such as 0.001.`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 38: Missing space after period

- **Location:** Line 997
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `AEP.The default` is missing a space after the period.
- **Recommended Fix:** Change to `AEP. The default`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 39: Missing space after period

- **Location:** Line 1024
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `results.However` is missing a space after the period.
- **Recommended Fix:** Change to `results. However`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 40: Missing space before bold text

- **Location:** Line 1131
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `select the**Skew (of log)(γ)**` is missing a space before the bold marker.
- **Recommended Fix:** Change to `select the **Skew (of log)(γ)**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 41: Missing space after comma

- **Location:** Line 1218
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `prior,the` is missing a space after the comma.
- **Recommended Fix:** Change to `prior, the`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 42: Missing space before bold text

- **Location:** Line 1268
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** `in the**Frequency Results**` is missing a space before the bold marker.
- **Recommended Fix:** Change to `in the **Frequency Results**`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 43: Citations missing author-year text throughout file

- **Location:** Lines 295, 588, 634, 825, 895, 897, 902, 907, 941–942, 969, 1138, 1181, 1184, 1237, 1248, 1300, 1314, 1352–1353
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Multiple `<Citation>` components throughout this file are used without the accompanying author-year text. Per project convention, citations should use the format `(Author, Year) <Citation citationKey="..."/>` rather than `<Citation citationKey="..."/>` alone. Examples: line 295 (`formula <Citation citationKey="HirschStedinger1987" />`), line 588 (`<Citation citationKey="Rao2000" /> <Citation citationKey="Jongejan2018" />`), line 634 (`in <Citation citationKey="Stedinger1983" />`).
- **Recommended Fix:** Add author-year text before each `<Citation>` component. For example, line 295 should read: `formula (Hirsch and Stedinger, 1987) <Citation citationKey="HirschStedinger1987" /> (U.S. Geological Survey, 2018) <Citation citationKey="USGS2018" />`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 44: Author-year text without Citation component

- **Location:** Line 410
- **Category:** Citation
- **Severity:** Minor
- **Problem:** `Bulletin 17C (U.S. Geological Survey, 2018)` contains author-year citation text but is missing the accompanying `<Citation citationKey="USGS2018" />` component.
- **Recommended Fix:** Change to `Bulletin 17C (U.S. Geological Survey, 2018) <Citation citationKey="USGS2018" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 05-references.mdx

No issues found.

---

## File: 06-appendix-acronyms.mdx

No issues found.

---

## File: 07-appendix-probability-distributions.mdx

### Issue 45: Unused import — TableAcronyms

- **Location:** Line 5
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `TableAcronyms` is imported but never used in this file. The file uses `TableBestFitDistributions` instead.
- **Recommended Fix:** Remove `import TableAcronyms from "@site/src/components/TableAcronyms";`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 46: Citations missing author-year text

- **Location:** Lines 695, 792, 939
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Three instances of `Hosking's parameterization <Citation citationKey="HoskingWallis1997" />` are missing the formal author-year citation text.
- **Recommended Fix:** Change to `Hosking's parameterization (Hosking and Wallis, 1997) <Citation citationKey="HoskingWallis1997" />`
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## Summary

| Severity  | Count  |
| --------- | ------ |
| Blocker   | 1      |
| Major     | 7      |
| Minor     | 38     |
| **Total** | **46** |

### Issues by File

| File                                      | Blocker | Major | Minor  | Total  |
| ----------------------------------------- | ------- | ----- | ------ | ------ |
| 00-document-info.mdx                      | 0       | 0     | 0      | 0      |
| 00-version-history.mdx                    | 0       | 0     | 0      | 0      |
| 01-preface.mdx                            | 0       | 0     | 1      | 1      |
| 02-welcome-to-rmc-bestfit.mdx             | 0       | 1     | 5      | 6      |
| 03-graphical-user-interface.mdx           | 1       | 1     | 8      | 10     |
| 04-working-with-rmc-bestfit.mdx           | 0       | 5     | 22     | 27     |
| 05-references.mdx                         | 0       | 0     | 0      | 0      |
| 06-appendix-acronyms.mdx                  | 0       | 0     | 0      | 0      |
| 07-appendix-probability-distributions.mdx | 0       | 0     | 2      | 2      |
| **Total**                                 | **1**   | **7** | **38** | **46** |
