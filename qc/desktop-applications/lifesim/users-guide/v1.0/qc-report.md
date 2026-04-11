# QC Report

- **Document:** docs/desktop-applications/lifesim/users-guide
- **Version:** v1.0
- **Review Level:** 3 (Technical Edit)
- **Source PDF:** LifeSim_Original_2.0_Users_Manual_AUG21.pdf
- **Review Date:** 2026-02-10
- **Reviewer:** AI Assistant

---

## File: 00-version-history.mdx

### Issue 1: Placeholder value in approvedBy field

- **Location:** Line 23
- **Category:** MDX
- **Severity:** Blocker
- **Problem:** The `approvedBy` prop contains a placeholder value `"xx"` instead of an actual name.
- **Recommended Fix:** Replace `"xx"` with the actual approver's name.
- **Fix Applied:** No
- **Human Verification Required:** Yes
- **Response**: Concur. Need Adam to confirm and list appropriate RMC approver name.

---

## File: 01-preface.mdx

### Issue 2: Malformed email address

- **Location:** Line 32
- **Category:** Text
- **Severity:** Major
- **Problem:** Email address has an extraneous `@` prefix: `@RMC.Software@usace.army.mil`. This will render incorrectly.
- **Recommended Fix:** Change to `RMC.Software@usace.army.mil` (remove leading `@`).
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 03-installing-and-starting-lifesim.mdx

### Issue 3: Reviewer comment left in source

- **Location:** Line 91
- **Category:** MDX
- **Severity:** Minor
- **Problem:** JSX comment `{/*Comment for Woody or other reviewer: Include the below three lines? Agree with it? Please revise as necessary or delete.*/}` is a draft review comment that should be resolved and removed before publication.
- **Recommended Fix:** Resolve the reviewer question and remove the comment.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Response**: Concur and resolved. Removed comment for Woody and revised with professional judgement.

### Issue 4: Spelling error "preceeding"

- **Location:** Line 154
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "preceeding" is misspelled.
- **Recommended Fix:** Change "preceeding" to "preceding".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 04-lifesim-interface.mdx

### Issue 5: `<a href>` instead of `<Link>` — Installing and Starting LifeSim

- **Location:** Line 31
- **Category:** MDX
- **Severity:** Major
- **Problem:** Uses `<a href="/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0/installing-and-starting-lifesim" target="_blank" rel="noopener noreferrer">` for inter-document navigation. Hardcoded base URL path will break if site base URL changes. Also opens in new tab unnecessarily for internal navigation.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/installing-and-starting-lifesim">Installing and Starting LifeSim</Link>`. The `Link` component is already imported.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 6: `<a href>` instead of `<Link>` — Appendix B references (6 instances)

- **Location:** Lines 116, 123, 139, 252, 401
- **Category:** MDX
- **Severity:** Major
- **Problem:** Multiple `<a href>` elements link to Appendix B (`appendix-map-preferences`) using hardcoded absolute paths with `target="_blank"`. All should use Docusaurus `<Link>` for inter-document navigation.
- **Recommended Fix:** Replace each `<a href="/RMC-Software-Documentation/docs/desktop-applications/lifesim/users-guide/v1.0/appendix-map-preferences" target="_blank" rel="noopener noreferrer">` with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/appendix-map-preferences">`.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 7: `<a href>` instead of `<Link>` — Simulation Results Table

- **Location:** Line 661
- **Category:** MDX
- **Severity:** Major
- **Problem:** Uses `<a href>` to link to viewing-lifesim-results section.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/viewing-lifesim-results#simulation-results-table">Simulation Results Table</Link>`.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 8: `<a href>` instead of `<Link>` — Hydraulic Data Import Options

- **Location:** Line 902
- **Category:** MDX
- **Severity:** Major
- **Problem:** Uses `<a href>` to link to hydraulic-data section.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/hydraulic-data#hydraulic-data-import-options">`.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 9: `<a href>` instead of `<Link>` — Customizing Plots Overview and figure references (7 instances)

- **Location:** Lines 1110, 1172, 1219, 1230, 1240, 1248, 1266, 1283
- **Category:** MDX
- **Severity:** Major
- **Problem:** Multiple `<a href>` elements link to sections within the same page using absolute paths (e.g., `lifesim-interface#customizing-plots-overview`, `lifesim-interface#newfigure-8`, `lifesim-interface#newfigure-7`).
- **Recommended Fix:** For same-page anchors, use simple markdown anchors `[text](#anchor)` or `<Link to="#anchor">`. For the figure references wrapped in `<a href>`, consider whether a `<FigReference>` component would be more appropriate.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 10: `<a href>` instead of `<Link>` — View Result Map

- **Location:** Line 1318
- **Category:** MDX
- **Severity:** Major
- **Problem:** Uses `<a href>` to link to viewing-lifesim-results section.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/viewing-lifesim-results#view-result-map-in-the-map-window">`.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 11: Grammar — "an LifeSim" (multiple instances)

- **Location:** Lines 50, 75, 82, 86, 105
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Uses "an LifeSim" instead of "a LifeSim". The article "a" should precede words starting with a consonant sound.
- **Recommended Fix:** Change all instances of "an LifeSim" to "a LifeSim".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 12: Typo — "Agricultural Crop Dat"

- **Location:** Line 88
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Missing letter: "Agricultural Crop Dat" should be "Agricultural Crop Data".
- **Recommended Fix:** Change "Crop Dat" to "Crop Data".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 13: Hyphenation — "geo-graphical"

- **Location:** Line 298
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Incorrectly hyphenated word "geo-graphical" (hyphen breaks across syllable boundary incorrectly).
- **Recommended Fix:** Change to "geographical" (single word, no hyphen).
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 05-hydraulic-data.mdx

### Issue 14: Citations missing author-year text — HEC-RAS, FLO-2D, MIKE 21, AdH, ADCIRC

- **Location:** Lines 28-29, 31, 42
- **Category:** Citation
- **Severity:** Major
- **Problem:** Five `<Citation>` components are used without preceding author-year text. The current pattern is:
  - `software <Citation citationKey="HECRAS2024"/>` (line 28)
  - `AZ <Citation citationKey="FLO2022"/>` (line 29)
  - `Denmark <Citation citationKey="DHI2018"/>` (line 29)
  - `system <Citation citationKey="ADH2024"/>` (line 31)
  - `files <Citation citationKey="ADCIRC2018"/>` (line 42)

  These render as random footnote numbers with no contextual author-year text for the reader.

- **Recommended Fix:** Add author-year text before each Citation:
  - `software (HEC, 2024) <Citation citationKey="HECRAS2024"/>`
  - `AZ (FLO-2D, 2022) <Citation citationKey="FLO2022"/>`
  - `Denmark (DHI, 2018) <Citation citationKey="DHI2018"/>`
  - `system (ERDC, 2024) <Citation citationKey="ADH2024"/>`
  - `files (Luettich & Westerink, 2018) <Citation citationKey="ADCIRC2018"/>`
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** Yes
- **Response**: Concur. Have Claude perform fix.

### Issue 15: `<a href>` instead of `<Link>` — 29 instances of internal links

- **Location:** Lines 133, 252, 260, 318, 414, 423, 455, 552, 561, 603, 699, 708, 750, 833, 842, 937, 1033, 1042, 1071, 1081, 1153, 1173, 1203, 1229, 1270, 1420, 1421, 1429, 1625
- **Category:** MDX
- **Severity:** Major
- **Problem:** 29 `<a href>` elements are used for inter-document and intra-document navigation instead of Docusaurus `<Link>` components. These include:
  - Same-page anchors (e.g., `#hydraulic-data-import-options`, `#import-from-ras`, `#create-hydrograph-manually`, `#first-hydraulic-timestep-and-hazard-occurrence`)
  - Cross-page links (e.g., to `lifesim-interface`, `appendix-map-preferences`)
    All use hardcoded `/RMC-Software-Documentation/docs/...` paths that will break if the base URL changes.
- **Recommended Fix:** Replace all `<a href>` internal links with `<Link to="...">` components using relative doc paths (without the `/RMC-Software-Documentation/docs/` prefix). For same-page anchors, use `[text](#anchor)` markdown syntax.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 16: Grammar — "an LifeSim"

- **Location:** Line 122
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Uses "an LifeSim study" instead of "a LifeSim study".
- **Recommended Fix:** Change "an LifeSim" to "a LifeSim".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 06-structure-inventories.mdx

### Issue 17: Subject-verb agreement — "describe"

- **Location:** Line 34
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "This chapter describe the ways..." — should use singular verb.
- **Recommended Fix:** Change "describe" to "describes".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 18: Citation missing author-year text — NSI

- **Location:** Line 33
- **Category:** Citation
- **Severity:** Major
- **Problem:** `(NSI) <Citation citationKey="NSI"/>` — the Citation renders as a footnote number without the reader seeing author-year text. The NSI entry in bib.json has no year.
- **Recommended Fix:** Add author text before Citation: `(NSI) (USACE, n.d.) <Citation citationKey="NSI"/>` or incorporate the full name and citation reference.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** Yes
- **Response**: Concur. Have Claude perform fix.

### Issue 19: `<a href>` for external link — NSI technical documentation

- **Location:** Line 446
- **Category:** MDX
- **Severity:** Suggestion
- **Problem:** Uses `<a href="https://www.hec.usace.army.mil/...">here</a>` for an external link. While external links using `<a>` are acceptable, the link text "here" is poor for accessibility.
- **Recommended Fix:** Change link text from "here" to a more descriptive text, e.g., "NSI Technical Documentation".
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Response**: Concur and resolved. Revised "here" to "USACE HEC"

### Issue 20: `<a href>` instead of `<Link>` — Customizing Plots references (2 instances)

- **Location:** Lines 1122, 1719
- **Category:** MDX
- **Severity:** Major
- **Problem:** Uses `<a href="/RMC-Software-Documentation/docs/.../lifesim-interface#customizing-plots-and-plotting-tools">` for inter-document links.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/lifesim-interface#customizing-plots-and-plotting-tools">`.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 21: Word choice — "respectfully" vs "respectively"

- **Location:** Line 536
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "describe how to edit the occupancy types and structure inventory criteria, respectfully" — "respectfully" means "with respect/politeness"; the intended word is "respectively" meaning "in the order mentioned".
- **Recommended Fix:** Change "respectfully" to "respectively".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 07-emergency-planning-data.mdx

### Issue 22: Citation — "et. al." should be "et al."

- **Location:** Line 26
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Sorensen et. al." — "et" is a complete Latin word meaning "and" so no period after it. The period should only follow "al." (abbreviation of "alii").
- **Recommended Fix:** Change "et. al." to "et al.".
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 23: Citations missing year text — Sorensen & Mileti references

- **Location:** Lines 26, 36, 49
- **Category:** Citation
- **Severity:** Major
- **Problem:** Three citation patterns are missing year text:
  - Line 26: `Sorensen et. al. (<Citation citationKey="SorensenMileti2014a"/>, <Citation citationKey="SorensenMileti2014b"/>, <Citation citationKey="SorensenMileti2014c"/>)` — has author name but no years (2014a, 2014b, 2014c).
  - Line 36: `first alert <Citation citationKey="SorensenMileti2014c"/>` — no author or year text at all.
  - Line 49: `Sorensen & Mileti <Citation citationKey="SorensenMileti2015"/>` — has author names but no year (2015).
- **Recommended Fix:**
  - Line 26: `Sorensen et al. (2014a <Citation .../>, 2014b <Citation .../>, 2014c <Citation .../>)`
  - Line 36: `first alert (Sorensen & Mileti, 2014c) <Citation citationKey="SorensenMileti2014c"/>`
  - Line 49: `Sorensen & Mileti (2015) <Citation citationKey="SorensenMileti2015"/>`
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** Yes
- **Response**: Concur. Have Claude perform fix.

### Issue 24: `<a href>` instead of `<Link>` — Warning and Protective Action Data Editor (3 instances)

- **Location:** Lines 856, 913, 948
- **Category:** MDX
- **Severity:** Major
- **Problem:** Three `<a href>` elements link to the `emergency-planning-data#warning-and-protective-action-data-editor` section using hardcoded absolute paths.
- **Recommended Fix:** Replace with `<Link to="/desktop-applications/lifesim/users-guide/v1.0/emergency-planning-data#warning-and-protective-action-data-editor">` or use relative markdown link `[text](#warning-and-protective-action-data-editor)` for same-page anchors.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 08-road-network-data.mdx

### Issue 25: Citations missing year text — OpenStreetMap (2 instances)

- **Location:** Lines 211, 367
- **Category:** Citation
- **Severity:** Major
- **Problem:** `OpenStreetMap <Citation citationKey="OSM"/>` — the OSM entry in bib.json has no year. The Citation renders as a footnote number without year context.
- **Recommended Fix:** Add year or "n.d." text: `OpenStreetMap (OSM Foundation, n.d.) <Citation citationKey="OSM"/>`.
- **Fix Applied:** N/A
- **Human Verification Required:** Yes
- **Response**: Non-concur. No year or "n.d." required.

### Issue 26: `<a href>` instead of `<Link>` — 3 instances

- **Location:** Lines 86, 307, 310
- **Category:** MDX
- **Severity:** Major
- **Problem:** Three `<a href>` elements link to `lifesim-interface#customizing-plots-and-plotting-tools`, `appendix-map-preferences#map-layer-attributes-dialog-box`, and `road-network-data#road-classification-data` using hardcoded paths.
- **Recommended Fix:** Replace with Docusaurus `<Link>` components.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 09-destination-data.mdx

### Issue 27: `<a href>` for external link — FEMA

- **Location:** Line 27
- **Category:** MDX
- **Severity:** Suggestion
- **Problem:** External link to FEMA uses `<a href>`. While acceptable for external URLs, this is noted for completeness.
- **Recommended Fix:** No change needed for external links, but ensure `target="_blank"` and `rel="noopener noreferrer"` are present (they are).
- **Fix Applied:** No
- **Human Verification Required:** No
- **Response**: Concur. No fix needed.

---

## File: 10-agricultural-data.mdx

### Issue 28: `<a href>` for external links — NASS/USDA (2 instances)

- **Location:** Lines 37, 265
- **Category:** MDX
- **Severity:** Suggestion
- **Problem:** External links to USDA NASS website. These are acceptable as external `<a href>` links.
- **Recommended Fix:** No change needed for external links.
- **Fix Applied:** No
- **Human Verification Required:** No
- **Response**: Concur. No fix needed.

---

## File: 12-alternatives.mdx

### Issue 29: `<a href>` instead of `<Link>` — 8 instances

- **Location:** Lines 138, 156, 169, 190, 281, 314, 574, 695
- **Category:** MDX
- **Severity:** Major
- **Problem:** Eight `<a href>` elements link to various internal sections (hydraulic-data, emergency-planning-data, road-network-data, alternatives, lifesim-interface) using hardcoded paths.
- **Recommended Fix:** Replace all with Docusaurus `<Link>` components using relative paths.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 14-viewing-lifesim-results.mdx

### Issue 30: `<a href>` instead of `<Link>` — 3 instances

- **Location:** Lines 612, 1028, 1240
- **Category:** MDX
- **Severity:** Major
- **Problem:** Three `<a href>` elements link to internal sections (simulations#create-a-simulation, appendix-map-preferences#feature-draw-properties-tab).
- **Recommended Fix:** Replace with Docusaurus `<Link>` components.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 18-appendix-map-preferences.mdx

### Issue 31: `<a href>` instead of `<Link>` — 33 instances

- **Location:** Lines 173, 959, 961, 1713, 1790, 1803, 1822, 1834, 1854, 1934, 1936, 2035, 2037, 2135, 2137, 2214, 2216, 2282, 2284, 2420, 2422, 2869, 3281, 3454, 3838, 3957, 3971, 3991, 4005, 4011, 4079, 4725, 4808
- **Category:** MDX
- **Severity:** Major
- **Problem:** 33 `<a href>` elements are used for intra-document and inter-document navigation throughout Appendix B. These include self-referential links within the same page (e.g., `appendix-map-preferences#map-layer-attributes-dialog-box`) and cross-page links (e.g., `alternatives#destination-assignments`). All use hardcoded `/RMC-Software-Documentation/docs/...` paths.
- **Recommended Fix:** Replace all internal `<a href>` elements with Docusaurus `<Link>` components. For same-page anchors, use markdown `[text](#anchor)` syntax instead.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## File: 19-appendix-editing-road-network-data-for-use-in-lifesim.mdx

### Issue 32: `<a href>` instead of `<Link>` — 4 instances

- **Location:** Lines 28, 113, 249, 368
- **Category:** MDX
- **Severity:** Major
- **Problem:** Four `<a href>` elements link to Appendix B sections (`appendix-map-preferences`, `appendix-map-preferences#editor-toolbar`) using hardcoded paths.
- **Recommended Fix:** Replace with Docusaurus `<Link>` components.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

---

## Summary — `<a href>` Usage Across All Files

| File                                                         | Internal `<a href>` Count | External `<a href>` Count |
| ------------------------------------------------------------ | ------------------------- | ------------------------- |
| 04-lifesim-interface.mdx                                     | 17                        | 0                         |
| 05-hydraulic-data.mdx                                        | 29                        | 0                         |
| 06-structure-inventories.mdx                                 | 2                         | 2                         |
| 07-emergency-planning-data.mdx                               | 3                         | 0                         |
| 08-road-network-data.mdx                                     | 3                         | 0                         |
| 09-destination-data.mdx                                      | 0                         | 1                         |
| 10-agricultural-data.mdx                                     | 0                         | 2                         |
| 12-alternatives.mdx                                          | 8                         | 0                         |
| 14-viewing-lifesim-results.mdx                               | 3                         | 0                         |
| 18-appendix-map-preferences.mdx                              | 33                        | 0                         |
| 19-appendix-editing-road-network-data-for-use-in-lifesim.mdx | 4                         | 0                         |
| **Total**                                                    | **102**                   | **5**                     |

**Recommendation:** All 102 internal `<a href>` elements should be converted to Docusaurus `<Link>` components. The 5 external links are acceptable as `<a href>` with `target="_blank"` and `rel="noopener noreferrer"`.

---

## Summary — Citation Issues

| File                           | Line(s)  | Citation Key(s)         | Issue                                        |
| ------------------------------ | -------- | ----------------------- | -------------------------------------------- |
| 05-hydraulic-data.mdx          | 28       | HECRAS2024              | No author-year text before Citation          |
| 05-hydraulic-data.mdx          | 29       | FLO2022                 | No author-year text before Citation          |
| 05-hydraulic-data.mdx          | 29       | DHI2018                 | No author-year text before Citation          |
| 05-hydraulic-data.mdx          | 31       | ADH2024                 | No author-year text before Citation          |
| 05-hydraulic-data.mdx          | 42       | ADCIRC2018              | No author-year text before Citation          |
| 06-structure-inventories.mdx   | 33       | NSI                     | No year text (entry has no year)             |
| 07-emergency-planning-data.mdx | 26       | SorensenMileti2014a/b/c | Author name present but no years             |
| 07-emergency-planning-data.mdx | 36       | SorensenMileti2014c     | No author or year text                       |
| 07-emergency-planning-data.mdx | 49       | SorensenMileti2015      | Author name present but no year              |
| 08-road-network-data.mdx       | 211, 367 | OSM                     | Name present but no year (entry has no year) |

**Recommendation:** All `<Citation>` components should be preceded by visible author-year text so the reader sees context rather than isolated footnote numbers.

---

## Summary — Grammar and Spelling Issues

| File                                   | Line(s)             | Issue                                           |
| -------------------------------------- | ------------------- | ----------------------------------------------- |
| 01-preface.mdx                         | 32                  | Malformed email: `@RMC.Software@usace.army.mil` |
| 03-installing-and-starting-lifesim.mdx | 154                 | "preceeding" → "preceding"                      |
| 04-lifesim-interface.mdx               | 50, 75, 82, 86, 105 | "an LifeSim" → "a LifeSim"                      |
| 04-lifesim-interface.mdx               | 88                  | "Crop Dat" → "Crop Data"                        |
| 04-lifesim-interface.mdx               | 298                 | "geo-graphical" → "geographical"                |
| 05-hydraulic-data.mdx                  | 122                 | "an LifeSim" → "a LifeSim"                      |
| 06-structure-inventories.mdx           | 34                  | "describe" → "describes"                        |
| 06-structure-inventories.mdx           | 536                 | "respectfully" → "respectively"                 |
| 07-emergency-planning-data.mdx         | 26                  | "et. al." → "et al."                            |

---

## Level 3 — Editorial Suggestions

### Issue 33: Consistent use of markdown links vs `<Link>` components

- **Location:** Throughout all files
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The document uses a mix of markdown links `[text](./file.mdx#anchor)` (in 06-structure-inventories.mdx, 07-emergency-planning-data.mdx) and `<a href>` elements for internal linking. This inconsistency makes maintenance harder and risks broken links.
- **Recommended Fix:** Establish a single pattern for internal links — preferably Docusaurus `<Link>` components for cross-page navigation and markdown `[text](#anchor)` for same-page anchors.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Claude, implement the `<Link>` solution globally in this context for the LifeSim User's Guide document.

### Issue 34: Reviewer draft comments in source

- **Location:** 03-installing-and-starting-lifesim.mdx (line 91), 04-lifesim-interface.mdx (line 90, line 369, line 1127)
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** Several JSX comments contain reviewer questions and TODO notes (e.g., `{/*Comment for Woody...*/}`, `{/*Do we want to update LifeSim...*/}`, `{/*Add gif here...*/}`, `{/*Come back and fix...*/}`). These should be resolved before publication.
- **Recommended Fix:** Review each comment, resolve the question or implement the TODO, then remove the comment.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes
- **Response**: Concur and resolved. Searched and revised each one. One has been for Woody's general awareness in the future.

### Issue 35: Repeated "an LifeSim" grammar pattern throughout document

- **Location:** Multiple files (04-lifesim-interface.mdx, 05-hydraulic-data.mdx, and potentially others)
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The original source document may use "an LifeSim" consistently, but this is grammatically incorrect in English ("a" before consonant sounds). A document-wide find-and-replace would improve readability.
- **Recommended Fix:** Perform a global find-and-replace of "an LifeSim" with "a LifeSim" across all MDX files.
- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No
- **Response**: Concur. Have Claude perform fix.

### Issue 36: Link text accessibility — "here" link

- **Location:** 06-structure-inventories.mdx line 446
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The link `is available <a href="...">here</a>` uses non-descriptive "here" as link text. This is poor practice for accessibility (screen readers) and usability.
- **Recommended Fix:** Change to `Technical documentation is available at <a href="...">NSI Technical Documentation</a>` or similar descriptive text.
- **Fix Applied:** Yes
- **Human Verification Required:** No
- **Response**: Concur and resolved. "Here" revised to "USACE HEC"

---

## Duplicate Key Analysis

### Issue 37: Duplicate `tableKey` values across 04-lifesim-interface.mdx and 18-appendix-map-preferences.mdx (4 instances)

- **Location:** Both `04-lifesim-interface.mdx` and `18-appendix-map-preferences.mdx`
- **Category:** MDX
- **Severity:** Major
- **Problem:** Four `tableKey` values are used in `<TableVertical>` definitions in both Chapter 4 (LifeSim Interface) and Appendix B (Map Preferences). Because the counter generation script processes files in order and the appendix file (`18-`) is processed after chapter 4 (`04-`), the counter data maps all four keys to the appendix. This causes all `<TableReference>` links in Chapter 4 to navigate the user to Appendix B instead of the table on the same page.

  The affected keys and their counter assignments:

  | `tableKey` | Table # | Counter points to | Files with `<TableVertical>` definition |
  |---|---|---|---|
  | `general-toolbar-table` | 12 | 18-appendix-map-preferences.mdx | 04 (line 147) and 18 (line 72) |
  | `editor-toolbar-table` | 13 | 18-appendix-map-preferences.mdx | 04 (line 396) and 18 (line 3992) |
  | `export-and-copy-tools-table` | 16 | 18-appendix-map-preferences.mdx | 04 (lines 656, 659) and 18 (lines 1089, 1092) |
  | `selection-tools-table` | 17 | 18-appendix-map-preferences.mdx | 04 (lines 784, 787) and 18 (lines 1218, 1221) |

- **Recommended Fix:** Rename the `tableKey` values in the appendix file (`18-appendix-map-preferences.mdx`) by appending an `-app` suffix to make them unique. For example:
  - `general-toolbar-table` → `general-toolbar-table-app`
  - `editor-toolbar-table` → `editor-toolbar-table-app`
  - `export-and-copy-tools-table` → `export-and-copy-tools-table-app`
  - `selection-tools-table` → `selection-tools-table-app`

  Also update any `<TableReference>` components in the appendix that reference these keys to use the new `-app` suffixed keys. After renaming, regenerate the counter data with `npm run counters`.

- **Fix Applied:** Yes
- **Completed:** 2026-02-12
- **Human Verification Required:** No

### Issue 38: Cross-file `figKey` analysis — no duplicates found

- **Location:** All files in `docs/desktop-applications/lifesim/users-guide/v1.0/`
- **Category:** MDX
- **Severity:** Info
- **Problem:** Analysis was performed to check whether any `figKey` values have duplicate `<Figure>` definitions across multiple files. Eleven `figKey` values appear in multiple files, but all are single-definition with cross-file `<FigReference>` references (expected behavior). No duplicate figure definitions were found.

  Cross-file `figKey` references (all correct):

  | `figKey` | Defined in | Referenced from |
  |---|---|---|
  | `figure-1` | 03-installing-and-starting-lifesim.mdx | 05-hydraulic-data.mdx |
  | `figure-86` | 06-structure-inventories.mdx | 07, 08, 09, 10, 11, 12 |
  | `figure-87` | 06-structure-inventories.mdx | 07 |
  | `figure-95` | 06-structure-inventories.mdx | 07, 08, 12 |
  | `figure-101` | 06-structure-inventories.mdx | 08 |
  | `figure-127` | 08-road-network-data.mdx | 10 |
  | `figure-141` | 09-destination-data.mdx | 11 |
  | `figure-159` | 10-agricultural-data.mdx | 11 |
  | `figure-204` | 14-viewing-lifesim-results.mdx | 18 |
  | `figure-312` | 18-appendix-map-preferences.mdx | 19 |
  | `first-alert-table` | 07-emergency-planning-data.mdx | 12 |

- **Recommended Fix:** No fix needed. All figure keys are unique at the definition level.
- **Fix Applied:** N/A
- **Human Verification Required:** No
