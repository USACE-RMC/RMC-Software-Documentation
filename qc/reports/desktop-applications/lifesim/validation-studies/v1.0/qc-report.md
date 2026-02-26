# QC Report

- **Document:** docs/desktop-applications/lifesim/validation-studies
- **Version:** v1.0
- **Review Level:** 3 (Level 1 + Level 3 editorial; no source PDF)
- **Source PDF:** N/A (not available)
- **Review Date:** 2026-02-26
- **Reviewer:** AI Assistant

---

## File: 00-document-info.mdx

### Issue 1: Unused import — Link

- **Location:** Line 15
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `import Link from "@docusaurus/Link"` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import line.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 2: Unused import — addBaseUrl

- **Location:** Line 16
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `import addBaseUrl from "@docusaurus/useBaseUrl"` is imported but never used in the file.
- **Recommended Fix:** Remove the unused import line.
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 00-version-history.mdx

### Issue 3: Unused import — Link

- **Location:** Line 5
- **Category:** MDX
- **Severity:** Minor
- **Problem:** `import Link from "@docusaurus/Link"` is imported but never used.
- **Recommended Fix:** Remove the unused import line.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 4: Incorrect document path in NavContainer

- **Location:** Line 12
- **Category:** MDX
- **Severity:** Major
- **Problem:** The `document` prop is set to `"desktop-applications/lifesim/users-guide"` but this file belongs to the validation-studies document. All other files in this directory use `document="desktop-applications/lifesim/validation-studies"`.
- **Recommended Fix:** Change `document="desktop-applications/lifesim/users-guide"` to `document="desktop-applications/lifesim/validation-studies"`.
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 01-preface.mdx

### Issue 5: Unused imports (6 components)

- **Location:** Lines 5, 6, 9, 11, 14, 17
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Six imported components are never used: Link, addBaseUrl, CollectionList, FigureInline, ProcessList, VersionSelector.
- **Recommended Fix:** Remove all unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 6: Consider defining "agent-based simulation model"

- **Location:** Line 27
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The term "agent-based simulation model" is used without definition. The preface serves as the introduction and may be read by a broader audience.
- **Recommended Fix:** Consider adding a brief parenthetical clarification, or leave as-is if the target audience is assumed to be familiar with agent-based modeling.
- **Human Response:** Target audience is assumed to be familiar with agent-based modeling. No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 7: Hardcoded absolute paths in links

- **Location:** Lines 51-67, 94-102
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** Uses hardcoded absolute paths with the base URL prefix (e.g., `href="/RMC-Software-Documentation/docs/..."`) in figure caption and table links. If `baseUrl` changes, all these links break.
- **Recommended Fix:** Consider replacing with Docusaurus `<Link to="/docs/...">` or `addBaseUrl()` for resilience. Accept as-is if hardcoded paths are the established convention.
- **Fix Applied:** Yes — Replaced 18 hardcoded `<a href="/RMC-Software-Documentation/docs/...">` links with `<Link to="/docs/...">` using Docusaurus Link component. Added `import Link from "@docusaurus/Link"`.
- **Human Verification Required:** Yes

### Issue 66: External links missing target="_blank"

- **Location:** Lines 22, 71
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Two external `<a href="https://www.rmc.usace.army.mil/...">` links navigate away from the documentation site but do not include `target="_blank" rel="noopener noreferrer"` to open in a new browser tab.
- **Recommended Fix:** Add `target="_blank" rel="noopener noreferrer"` to both links.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 8: Misspelling "Sandford Dam" should be "Sanford Dam"

- **Location:** Line 111
- **Category:** Text
- **Severity:** Major
- **Problem:** Table cell reads "Edenville Dam and Sandford Dam" but the correct name is "Sanford Dam" (no 'd'). The same document's chapter 08-midland-dams.mdx consistently spells it "Sanford Dam" on lines 35, 57, 60, 79, 81, 82.
- **Recommended Fix:** Change "Sandford Dam" to "Sanford Dam".
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 02-brumadinho.mdx

### Issue 9: Unused imports (7 components)

- **Location:** Lines 5-7, 10, 12, 15-17
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Seven imported components are never used: Link, addBaseUrl, CollectionList, FigureInline, TableReference, TableVertical, VersionSelector.
- **Recommended Fix:** Remove unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 10: Citation reference missing parentheses around year

- **Location:** Line 52
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "the Morrill-Winter & Johnstone 2025 abstract" — should follow the in-text citation pattern with parentheses around the year.
- **Recommended Fix:** Change to "the Morrill-Winter and Johnstone (2025) abstract".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 11: Inconsistent parenthetical nesting in data sources

- **Location:** Lines 58-60
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Mismatched parentheses in the data sources citation string. The semicolon after the first closing paren suggests a list within one set of parens, but the opening/closing don't match.
- **Recommended Fix:** Remove the extra closing paren so the full parenthetical reads consistently, or split into two separate parenthetical citations.
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 12: Citation components placed inside parentheses (11 instances)

- **Location:** Lines 59, 60 (×2), 61, 65 (×2), 66, 71 (×2), 93 (×2)
- **Category:** Citation
- **Severity:** Major
- **Problem:** 11 Citation components are placed inside author-year parentheses instead of outside. Examples:
  - Line 59: `(Assembleia Ligislativa do Minas Gerais, 2019 <Citation citationKey="AssembleiaMinas2019"/>);` — should close paren before Citation
  - Line 65: `(da Rocha, Silva, & da Silva, 2022 <Citation citationKey="Rocha2022"/>; Quierati, 2019 <Citation citationKey="Quierati2019"/>)` — both Citations inside parens
  - Line 71: `(Vale & Walm Engenharia, 2018a <Citation citationKey="ValeWalm2018a"/>, 2018b <Citation citationKey="ValeWalm2018b"/>)` — both inside parens
  - Line 93: same pattern repeated
- **Recommended Fix:** Move closing parenthesis before each Citation component. For grouped references, close the parenthetical group first, then place Citation components after. For example: `(Assembleia Ligislativa do Minas Gerais, 2019) <Citation citationKey="AssembleiaMinas2019"/>;`
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 13: Undefined acronym PAEBM

- **Location:** Line 93
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** "Vale's emergency action plan design (PAEBM)" — PAEBM is a Portuguese acronym not expanded in the text.
- **Recommended Fix:** Expand: "Vale's Plano de Ação de Emergência de Barragens de Mineração (PAEBM)" or clarify it is the Portuguese-language acronym.
- **Human Response:** Also need to add these acronyms to the Acronym appendix if this is not already flagged.
- **Fix Applied:** Yes — Expanded PAEBM in-text. No acronym appendix exists in this document.
- **Human Verification Required:** Yes

### Issue 14: "firstresponder" should be hyphenated

- **Location:** Line 124
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "compromised firstresponder rescues" — "firstresponder" is not a standard compound word.
- **Recommended Fix:** Change "firstresponder" to "first-responder".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 15: Undefined acronyms TDBA and CDA

- **Location:** Line 133
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** "one of four types of TDBA event identified by the CDA's 2021 Bulletin" — neither "TDBA" nor "CDA" are defined anywhere in this file or the preface.
- **Recommended Fix:** Expand on first use, e.g., "Tailings Dam Breach Analysis (TDBA) event identified by the Canadian Dam Association's (CDA's) 2021 Bulletin".
- **Human Response:** Also need to add these acronyms to the Acronym appendix if this is not already flagged.
- **Fix Applied:** Yes — Expanded TDBA and CDA in-text. No acronym appendix exists in this document.
- **Human Verification Required:** Yes

### Issue 16: "Importance to study" breaks imperative pattern

- **Location:** Line 137
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The bullet reads "Importance to study other TSF incidents..." while preceding bullets use imperative verbs ("Develop...", "Investigate...", "Add...").
- **Recommended Fix:** Rephrase to match the imperative pattern, e.g., "Study other TSF incidents and failures with different characteristics such as:..."
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

---

## File: 03-johnstown.mdx

### Issue 17: Unused imports (7 components)

- **Location:** Lines 5-7, 10, 12, 15-17
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Seven imported components are never used: Link, addBaseUrl, CollectionList, FigureInline, TableReference, TableVertical, VersionSelector.
- **Recommended Fix:** Remove unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 18: Double space before Citation component

- **Location:** Lines 34, 41
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "(McCullough, 1968 <Citation .../>" has two spaces before the Citation component.
- **Recommended Fix:** Remove the extra space so there is exactly one space before `<Citation>`.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 19: Citation components placed inside parentheses (6 instances)

- **Location:** Lines 34, 38, 41, 65 (×2), 71
- **Category:** Citation
- **Severity:** Major
- **Problem:** 6 Citation components are placed inside author-year parentheses. Examples:
  - Line 34: `(McCullough, 1968  <Citation citationKey="McCullough1968"/>).` — Citation inside parens
  - Line 38: `(HDR, 2022 <Citation citationKey="HDR2022"/>).` — Citation inside parens
  - Line 65: `(Kaktins et al., 2013 <Citation citationKey="Kaktins2013"/>, Coleman et al., 2016 <Citation citationKey="Coleman2016"/>).` — both inside parens
  - Line 71: `(HDR, 2022\n<Citation citationKey="HDR2022"/>).` — Citation inside parens
- **Recommended Fix:** Move closing parenthesis before each Citation component. Example: `(McCullough, 1968) <Citation citationKey="McCullough1968"/>.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 20: Spelling error "devasting" should be "devastating"

- **Location:** Line 119
- **Category:** Grammar
- **Severity:** Major
- **Problem:** "the devasting flooding of Johnstown" — missing letter 'a' in "devastating".
- **Recommended Fix:** Change "devasting" to "devastating".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 21: Extra blank lines before Model Version section

- **Location:** Lines 126-127
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Two blank lines between the end of the Modeling Conclusion bullets and the "## Model Version" heading, inconsistent with single blank lines used elsewhere.
- **Recommended Fix:** Remove one blank line.
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 04-joso.mdx

### Issue 22: Unused imports (6 components)

- **Location:** Lines 5-6, 11, 15-17
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Six imported components are never used: Link, addBaseUrl, FigureInline, TableReference, TableVertical, VersionSelector.
- **Recommended Fix:** Remove unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 23: Invalid double-default import

- **Location:** Line 10
- **Category:** MDX
- **Severity:** Major
- **Problem:** `import { default as Figure, default as Video } from '@site/src/components/Figure'` destructures the default export twice. This is technically invalid JavaScript. Additionally, Video is never used.
- **Recommended Fix:** Replace with `import Figure from "@site/src/components/Figure";`.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 24: "lifeloss" should be two words

- **Location:** Line 72
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "evacuation and lifeloss modeling" — "lifeloss" should be "life loss" (two words), consistent with usage elsewhere.
- **Recommended Fix:** Change "lifeloss" to "life loss".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 25: Citations missing author-year text

- **Location:** Line 84
- **Category:** Citation
- **Severity:** Major
- **Problem:** In-text citations use only the Citation component without author-year text: `(<Citation citationKey="StatisticsBureau2015"/>, <Citation citationKey="GIAJ2014"/>)`. Per project convention, author-year text must accompany the component.
- **Recommended Fix:** Change to `(Statistics Bureau, 2015) <Citation citationKey="StatisticsBureau2015"/>; (GIAJ, 2014) <Citation citationKey="GIAJ2014"/>.`
- **Fix Applied:** Yes — Changed to `(Statistics Bureau, 2015; GIAJ, 2014) <Citation citationKey="StatisticsBureau2015"/> <Citation citationKey="GIAJ2014"/>`.
- **Human Verification Required:** Yes

### Issue 26: Citation components placed inside parentheses with no author-year text

- **Location:** Line 84
- **Category:** Citation
- **Severity:** Major
- **Problem:** `(<Citation citationKey="StatisticsBureau2015"/>, <Citation citationKey="GIAJ2014"/>).` — Citations are inside parentheses AND have no author-year text. This is the most severe form of the incorrect pattern.
- **Recommended Fix:** Change to: `(Statistics Bureau, 2015) <Citation citationKey="StatisticsBureau2015"/>; (GIAJ, 2014) <Citation citationKey="GIAJ2014"/>.` or `(Statistics Bureau, 2015; GIAJ, 2014) <Citation citationKey="StatisticsBureau2015"/> <Citation citationKey="GIAJ2014"/>.`
- **Fix Applied:** Yes — Combined with Issue 25 fix.
- **Human Verification Required:** Yes

### Issue 27: Missing period after "U.S"

- **Location:** Line 107
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "In Japan, as in the U.S, local municipalities..." — missing final period in "U.S." abbreviation.
- **Recommended Fix:** Change "U.S," to "U.S.,".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 28: "Additionally," sentence fragment before ProcessList

- **Location:** Line 136
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Additionally," is a dangling sentence fragment followed by a blank line and then the ProcessList component.
- **Recommended Fix:** Expand to a complete introductory sentence (e.g., "Additionally, the following lessons were identified:") or remove "Additionally,".
- **Fix Applied:** Yes — Changed to "Additionally, the following lessons were identified:"
- **Human Verification Required:** Yes

---

## File: 05-katrina-east-bowl.mdx

### Issue 29: Citations missing author-year text throughout file

- **Location:** Lines 34, 38, 39, 47, 54, 55, 57, 65, 87, 96, 112, 120, 121
- **Category:** Citation
- **Severity:** Minor
- **Problem:** 13 in-text citations use only the Citation component without accompanying author-year text. Peer files (Brumadinho, Johnstown) consistently include author-year text.
- **Recommended Fix:** Add author-year text before each standalone Citation component.
- **Fix Applied:** Yes — Added author-year text for all 13 citations (Medlin et al., USACE, NYT, Jonkman, Boyd, Sorensen & Mileti, CNN).
- **Human Verification Required:** Yes

### Issue 30: Typo in Figure alt text — "blooded" should be "flooded"

- **Location:** Line 44
- **Category:** Figure
- **Severity:** Major
- **Problem:** Alt text reads "NOLA blooded during Hurricane Katrina due to l-wall breach." The word "blooded" is a typo for "flooded".
- **Recommended Fix:** Change "blooded" to "flooded" in the alt attribute.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 31: Subject-verb disagreement — "79% was flooded"

- **Location:** Line 53
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "79% was flooded" — since the subject refers to countable housing units, the verb should be plural.
- **Recommended Fix:** Change "79% was flooded" to "79% were flooded".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 32: Subject-verb disagreement — "fatalities...is 54"

- **Location:** Line 57
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "Reported flood fatalities in NOLA East Bowl is 54" — plural subject requires plural verb.
- **Recommended Fix:** Change to "Reported flood fatalities in NOLA East Bowl totaled 54".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 33: Misspelling "Initation" should be "Initiation"

- **Location:** Line 115
- **Category:** Grammar
- **Severity:** Major
- **Problem:** "Protective Action Initation" is missing a letter. The correct spelling "Protective Action Initiation" is used in all other files.
- **Recommended Fix:** Change "Initation" to "Initiation".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 34: Wrong year in citation — "Jonkman (2019)" should be "(2009)"

- **Location:** Line 116
- **Category:** Citation
- **Severity:** Major
- **Problem:** Text reads "Jonkman (2019)" but the citation key `Jonkman2009` references a 2009 publication. The year "2019" is incorrect.
- **Recommended Fix:** Change "Jonkman (2019)" to "Jonkman (2009)".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 35: Missing "Modeling Conclusion" section

- **Location:** Between Alternative and Model Version sections
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** All seven other validation study files include a "Modeling Conclusion" section. This file omits it, creating a structural inconsistency. HTML comments acknowledge this gap.
- **Recommended Fix:** Add a "Modeling Conclusion" section summarizing model results vs. the historical 54 fatalities.
- **Human Response:** No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 67: Curly quote in JSX attribute breaks MDX compilation

- **Location:** Line 38
- **Category:** MDX
- **Severity:** Blocker
- **Problem:** `citationKey=\u201CUSACE2006\u201D` uses Unicode curly double quotes (U+201C, U+201D) instead of straight ASCII quotes in a JSX attribute value. This causes an MDX compilation error: "Unexpected character `\u201D` before attribute value."
- **Recommended Fix:** Replace curly quotes with straight quotes: `citationKey="USACE2006"`.
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 06-kelly-barnes.mdx

### Issue 36: Unused imports (5 components)

- **Location:** Lines 5, 6, 11, 14, 16
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Five imported components are never used: Link, addBaseUrl, FigureInline, TableReference, VersionSelector.
- **Recommended Fix:** Remove unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 37: Citations missing author-year text

- **Location:** Lines 47, 59, 69, 80
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Several citations lack author-year text before the Citation component (e.g., line 59: "in 1977 <Citation citationKey='FIB1977'/>" with no author name).
- **Recommended Fix:** Add author-year text, e.g., "(Federal Investigative Board, 1977) <Citation citationKey='FIB1977'/>".
- **Fix Applied:** Yes — Added author-year text for all 4 citations (Federal Investigative Board, Sanders & Sauer, Foster, OpenStreetMap).
- **Human Verification Required:** Yes

### Issue 38: "Open Street Map" should be "OpenStreetMap"

- **Location:** Line 80
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Written as three separate words. The correct brand name is "OpenStreetMap" (one word). Other files use the correct spelling.
- **Recommended Fix:** Change "Open Street Map" to "OpenStreetMap".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 39: Modeling Conclusion lacks summary of overall model performance

- **Location:** Lines 106-158
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The section goes directly into per-structure discrepancies without a high-level summary. The mean life loss of ~49 is never compared to the historical 39 fatalities in the conclusion.
- **Recommended Fix:** Add an introductory paragraph summarizing overall model performance before the detailed table.
- **Human Response:** No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 40: Citation component placed inside parentheses

- **Location:** Line 108
- **Category:** Citation
- **Severity:** Major
- **Problem:** `(Foster & Mills, 1978 <Citation citationKey="Foster1978"/>),` — Citation is inside the parenthetical reference.
- **Recommended Fix:** Change to: `(Foster & Mills, 1978) <Citation citationKey="Foster1978"/>,`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 41: Subject-verb disagreement — "results estimates"

- **Location:** Lines 146, 149 (TableVertical data)
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** Two table cells contain "modeled results estimates this survival" — "results" is plural, so the verb should be "estimate".
- **Recommended Fix:** Change "results estimates" to "results estimate" in both cells.
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 07-malpasset.mdx

### Issue 42: Unused imports (7 components)

- **Location:** Lines 5, 6, 11, 12, 14, 15, 16
- **Category:** MDX
- **Severity:** Minor
- **Problem:** Seven imported components are never used: Link, addBaseUrl, FigureInline, FigReference, TableReference, TableVertical, VersionSelector.
- **Recommended Fix:** Remove unused import lines.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 43: Inconsistent accent on "Fréjus"

- **Location:** Line 32
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** The town name appears as "Fréjus" on lines 26 and 72 but without the accent on line 32.
- **Recommended Fix:** Add the é accent on line 32 to match lines 26 and 72.
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 44: Citation components placed inside parentheses (2 instances)

- **Location:** Lines 63, 67
- **Category:** Citation
- **Severity:** Major
- **Problem:** Two Citations inside parentheses:
  - Line 63: `(EDF 1998 <Citation citationKey="EDF1998"/>).` — Citation inside parens
  - Line 67: `(Hervouet 1999 <Citation citationKey="Hervouet1999"/>).` — Citation inside parens
- **Recommended Fix:** Change to: `(EDF, 1998) <Citation citationKey="EDF1998"/>.` and `(Hervouet, 1999) <Citation citationKey="Hervouet1999"/>.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 45: "mobylette" may be unfamiliar to English-speaking audience

- **Location:** Line 86
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** "Mobylette" is a French brand name for a moped. Many English-speaking readers may not know what it means.
- **Recommended Fix:** Add a parenthetical: "set out on his mobylette (moped)" or replace with "moped".
- **Fix Applied:** Yes — Added parenthetical "(moped)".
- **Human Verification Required:** Yes

### Issue 46: "autoroute" may be unfamiliar to English-speaking audience

- **Location:** Line 88
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** "Autoroute" is the French term for highway/motorway and may not be immediately understood by all readers.
- **Recommended Fix:** Add a parenthetical: "autoroute (highway)" or replace with "highway".
- **Fix Applied:** Yes — Added parenthetical "(highway)".
- **Human Verification Required:** Yes

### Issue 47: Missing "Modeling Conclusion" section

- **Location:** Between Alternative and Model Version sections (lines 96-98)
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** All seven other validation study files include a "Modeling Conclusion" section. This file omits it, creating a structural inconsistency.
- **Recommended Fix:** Add a "Modeling Conclusion" section summarizing how modeled life loss compared to the historical 421 fatalities.
- **Human Response:** No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 08-midland-dams.mdx

### Issue 48: "Sandford" should be "Sanford"

- **Location:** Line 28
- **Category:** Grammar
- **Severity:** Major
- **Problem:** The introductory line reads "Sandford Dam" but every other occurrence in the file (lines 35, 57, 60, 79, 81, 82) consistently spells it "Sanford Dam".
- **Recommended Fix:** Change "Sandford Dam" to "Sanford Dam".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 49: Missing article "the" before "Midland County area"

- **Location:** Line 36
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** "evacuation of approximately 10,000 people in Midland County area" reads slightly awkwardly.
- **Recommended Fix:** Change to "in the Midland County area".
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 50: "occured" is misspelled

- **Location:** Line 38
- **Category:** Grammar
- **Severity:** Major
- **Problem:** "Zero fatalities occured." should be "occurred" (double 'r').
- **Recommended Fix:** Change "occured" to "occurred".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 51: "Consequnce" is misspelled

- **Location:** Line 73
- **Category:** Grammar
- **Severity:** Major
- **Problem:** "Hydraulic and Consequnce Modeling" — correct word is "Consequence". The bib.json entry has the correct spelling.
- **Recommended Fix:** Change "Consequnce" to "Consequence".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 52: "Warning Issance Delay" is misspelled

- **Location:** Line 110
- **Category:** Grammar
- **Severity:** Major
- **Problem:** Should be "Warning Issuance Delay". This term is correctly spelled in all other files.
- **Recommended Fix:** Change "Issance" to "Issuance".
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 09-oroville.mdx

### Issue 53: Citation component placed inside parentheses

- **Location:** Line 73
- **Category:** Citation
- **Severity:** Major
- **Problem:** `(DWR, 2020 <Citation citationKey="DWR2020"/>).` — Citation inside parentheses.
- **Recommended Fix:** Change to: `(DWR, 2020) <Citation citationKey="DWR2020"/>.`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 54: Sparse Modeling Conclusion section

- **Location:** Lines 118-120
- **Category:** Editorial
- **Severity:** Suggestion
- **Problem:** The "Modeling Conclusion" section contains only a single sentence about sensitivity analysis. Unlike other chapters (Midland, Teton) which include substantive conclusions, this section is notably sparse.
- **Recommended Fix:** Consider expanding with results summary, lessons learned, or key findings consistent with other validation study chapters.
- **Human Response:** No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

---

## File: 10-teton.mdx

### Issue 55: "15-feet" compound adjective should use singular

- **Location:** Line 35
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "a wall of water 15-feet high" — compound modifiers use the singular form.
- **Recommended Fix:** Change to "15 feet high" or "15-foot-high".
- **Fix Applied:** Yes — Changed to "15 feet high".
- **Human Verification Required:** No

### Issue 56: Citation components placed inside parentheses (6 instances)

- **Location:** Lines 35, 88, 89, 103, 139
- **Category:** Citation
- **Severity:** Major
- **Problem:** 6 Citations placed inside parentheses:
  - Line 35: `(USGS, 1978 <Citation citationKey="USGS1978"/>).` — inside parens
  - Line 88: `(<Citation citationKey="Census1970"/>, <Citation citationKey="Census1971"/>),` — inside parens with no author-year text
  - Line 89: `(McDonald, 2006 <Citation citationKey="McDonald2006"/>)` — inside parens
  - Line 103: `(USGS, 1978 <Citation citationKey="USGS1976"/>)` — inside parens (also has year mismatch per Issue 61)
  - Line 139: `(McDonald, 2006 <Citation citationKey="McDonald2006"/>)` — inside parens
- **Recommended Fix:** Move closing parenthesis before each Citation component. For line 88, add author-year text: `(U.S. Census Bureau, 1970; 1971) <Citation citationKey="Census1970"/> <Citation citationKey="Census1971"/>,`
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 57: Missing article "a" before "federal dam safety program"

- **Location:** Line 41
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "the creation of federal dam safety program" is missing the article "a".
- **Recommended Fix:** Change to "the creation of a federal dam safety program".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 58: Citation for HDR_Teton_2022 lacks author-year text (line 68)

- **Location:** Line 68
- **Category:** Citation
- **Severity:** Major
- **Problem:** "to support the calibration of the hydraulic model <Citation citationKey='HDR_Teton_2022'/>" — the Citation component appears without author-year text.
- **Recommended Fix:** Change to "...hydraulic model (HDR, 2022) <Citation citationKey='HDR_Teton_2022'/>".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 59: Citation for Census1970/Census1971 lacks author-year text

- **Location:** Line 88
- **Category:** Citation
- **Severity:** Major
- **Problem:** `(<Citation citationKey='Census1970'/>, <Citation citationKey='Census1971'/>)` — both Citation components appear without author-year text.
- **Recommended Fix:** Change to "(U.S. Census Bureau, 1970 <Citation citationKey='Census1970'/>; 1971 <Citation citationKey='Census1971'/>)".
- **Fix Applied:** Yes — Changed to `(U.S. Census Bureau, 1970; 1971) <Citation citationKey="Census1970"/> <Citation citationKey="Census1971"/>` with Citations outside parens.
- **Human Verification Required:** No

### Issue 60: Citation for HDR_Teton_2022 lacks author-year text (line 95)

- **Location:** Line 95
- **Category:** Citation
- **Severity:** Major
- **Problem:** "used in the hydraulic model calibration <Citation citationKey='HDR_Teton_2022'/>" — Citation component appears alone without author-year text.
- **Recommended Fix:** Change to "...calibration (HDR, 2022) <Citation citationKey='HDR_Teton_2022'/>".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 61: Citation year mismatch — "(USGS, 1978)" with key USGS1976

- **Location:** Line 103
- **Category:** Citation
- **Severity:** Minor
- **Problem:** Inline text says "(USGS, 1978)" but the citation key is `USGS1976` (year 1976). A separate `USGS1978` entry exists for a different report by Ray et al.
- **Recommended Fix:** Verify whether the intended reference is USGS1976 (1976) or USGS1978 (1978), and correct either the key or the inline year text.
- **Human Response:** Date of the reference in parentheses should be updated from 1978 to 1976.
- **Fix Applied:** Yes — Changed inline year from 1978 to 1976 per human direction.
- **Human Verification Required:** Yes

### Issue 62: Inline quote "(USACE RMC 2021)" lacks Citation component

- **Location:** Lines 107-109
- **Category:** Citation
- **Severity:** Major
- **Problem:** A block quote is attributed to "(USACE RMC 2021)" but no `<Citation>` component is used, and there is no matching key in bib.json. The closest key is "USACE_RMC2024" (year 2024).
- **Recommended Fix:** Either add a bib.json entry for "USACE RMC 2021" with a Citation component, or update the text to reference the existing "USACE_RMC2024" entry if that is the correct source.
- **Human Response:** No revision required.
- **Fix Applied:** No
- **Human Verification Required:** Yes

### Issue 63: "Protective Action Initation" misspelled

- **Location:** Line 116
- **Category:** Grammar
- **Severity:** Major
- **Problem:** "Protective Action Initation" should be "Protective Action Initiation" (missing 'i'). The correct spelling appears on lines 119, 129 of the same file.
- **Recommended Fix:** Change "Initation" to "Initiation".
- **Fix Applied:** Yes
- **Human Verification Required:** No

### Issue 64: "homogenous" should be "homogeneous"

- **Location:** Line 140
- **Category:** Grammar
- **Severity:** Minor
- **Problem:** "religiously homogenous" — standard English adjective is "homogeneous".
- **Recommended Fix:** Change "homogenous" to "homogeneous".
- **Fix Applied:** Yes
- **Human Verification Required:** Yes

### Issue 65: "Don Elis'" misspelled — should be "Don Ellis'"

- **Location:** Line 144
- **Category:** Grammar
- **Severity:** Major
- **Problem:** Line 144 reads "Don Elis' timely reporting" but line 139 reads "Don Ellis" — the correct spelling. Missing an 'l'.
- **Recommended Fix:** Change "Don Elis'" to "Don Ellis'".
- **Fix Applied:** Yes
- **Human Verification Required:** No

---

## File: 11-references.mdx

No issues found. The file correctly imports and renders the Bibliography component with a properly configured NavContainer.

---

## Document-Wide Observations

### Citation Placement Convention

**30 instances** of incorrect Citation component placement were found across 7 of 10 case study files. The Citation component is placed inside the author-year parentheses instead of outside them. This is the most common issue category in the document. Only 05-katrina-east-bowl.mdx and 08-midland-dams.mdx consistently use the correct placement. **All 30 instances have been corrected.**

| File                | Incorrect Placements | Fixed |
| ------------------- | -------------------- | ----- |
| 02-brumadinho.mdx   | 11                   | Yes   |
| 03-johnstown.mdx    | 6                    | Yes   |
| 10-teton.mdx        | 6                    | Yes   |
| 07-malpasset.mdx    | 2                    | Yes   |
| 04-joso.mdx         | 1                    | Yes   |
| 06-kelly-barnes.mdx | 1                    | Yes   |
| 09-oroville.mdx     | 1                    | Yes   |
| **Total**           | **30**               | **All** |

### Unused Boilerplate Imports

All 13 MDX files shared a common set of boilerplate imports. Most files used only 4-6 of the 12+ imported components. **Unused imports have been removed from all affected files (Issues 1-3, 5, 9, 17, 22, 36, 42).**

### Figure Caption Citation Convention

Throughout the document, figure captions use the Citation component without accompanying author-year text (e.g., `<Citation citationKey="Greenpeace2019"/>` at end of caption). This appears to be an intentional convention for compact photo credits. In-text citations should still include author-year text per project standards.

### Missing Modeling Conclusion Sections

Two of nine case study chapters (05-katrina-east-bowl.mdx and 07-malpasset.mdx) lack the "Modeling Conclusion" section present in all other case studies. **Per human response, no revision required for either file (Issues 35, 47).**

---

## Summary

- **Total issues:** 67
- **Fixes applied:** 61
- **Not applied (human response — no revision required):** 6 (Issues 6, 35, 39, 47, 54, 62)
