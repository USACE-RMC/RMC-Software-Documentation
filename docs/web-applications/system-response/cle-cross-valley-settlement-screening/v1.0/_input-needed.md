# Input Needed — Concentrated Leak Erosion Cross-Valley Settlement Screening (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** Definition of the dam height Hd and the maximum post-construction settlement s.

**Needed:** The dam height $H_d$ and the maximum post-construction settlement $s$, which form the normalized settlement $s/H_d$, are not defined beyond their names. State (1) how $H_d$ is measured — for example, whether it is the maximum height of the embankment at the deepest section of the valley or the height of the embankment at the section being evaluated, and whether it is measured from the crest to the lowest foundation contact or to the original ground surface; and (2) how $s$ is measured — whether it is the largest crest settlement along the crest or the settlement at the section being evaluated, over what period it is taken (for example, from the end of construction to the time of the assessment, or the expected long-term settlement), and whether it includes settlement of the foundation.

**Proposed (unconfirmed):** $H_d$ is the maximum embankment height at the deepest section, and $s$ is the largest crest settlement observed since the end of construction, both from survey records. Confirm or replace.

**Answer:**

Note (Oct 2025 methodology document): the document defines $s$ only as the maximum post-construction settlement, and forms $s/H_d$ with the single dam height entered for the dam as a whole rather than a height specific to the section analyzed. It gives no measurement definition for either quantity (the reference surface for $H_d$, the location along the crest or the time period for $s$, or the treatment of foundation settlement). Left open; the same note is recorded in both settlement manuals.

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** Definition and measurement of the abutment slope, which abutment to analyze, and the basis for analyzing one abutment.

**Needed:** The abutment slope $\beta_a$ is not defined beyond its name and unit. State how it is measured — for example, the angle of the abutment surface from the horizontal in the cross-valley profile beneath the crest, taken over what height — and which abutment is to be analyzed when the two differ (for example, the steeper, or each in turn as separate analyses). Also state the engineering basis for describing the crack with one abutment per analysis (Assumption 3 in `06-assumptions-and-limitations.mdx`).

**Proposed (unconfirmed):** the angle from the horizontal of the abutment surface in the longitudinal profile along the dam axis, with the steeper abutment analyzed, or each abutment analyzed separately. Confirm or replace.

**Answer:**

---

## IN-03 — Definition — `03-input-parameters.mdx`

**Regarding:** Definition and measurement of the abutment step height h1.

**Needed:** The abutment step height $h_1$ is not defined beyond its name. State how the step and its height are to be identified in the abutment profile, including the reference from which $h_1$ is measured (for example, the height of the step above the valley floor, or the height of the near-vertical face of the step), so that $h_1/H_d$ is consistent with the tabulated relative step heights of 0.6, 0.8, and 0.9.

**Answer:**

---

## IN-04 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Deterministic treatment of the settlement, dam height, abutment slope, and step height.

**Needed:** The flaw assessment treats the settlement (or the year-of-construction default), the dam height, the abutment slope, and the step height, or the measured crack depth, as single values, so the flaw probability, crack width, and crack depth carry no uncertainty and the bottom of the crack is one elevation. State the engineering basis for this deterministic treatment, or provide the engineering-judgment attribution to state here.

**Proposed (unconfirmed):** the inputs are geometric and survey quantities entered as best estimates at the screening stage, and the analyst brackets their uncertainty by repeating the analysis. Confirm or replace.

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Default normalized settlement from the year of construction (0.5% before 1950; 0.25% in 1950 or later).

**Needed:** The default normalized settlement used when no settlement is supplied (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-2" />: 0.5 percent of the dam height for a dam completed before 1950, and 0.25 percent for a dam completed in 1950 or later) requires an engineering basis. Provide the literature source for the two values and for the 1950 boundary (with full bibliographic details if it is not Fell et al. (2024), and the table or section if it is), or the engineering-judgment attribution to state here.

**Proposed (unconfirmed):** dams built before about 1950 were generally compacted less thoroughly than later dams and settled more after construction, so the older dams take the larger default. Confirm or replace.

**Answer:**

Note (Oct 2025 methodology document): the document states the same two defaults — a normalized settlement of 0.50 percent for dams constructed before 1950 and 0.25 percent for dams constructed after 1950 — and applies them to both settlement mechanisms (cross-valley differential settlement and settlement adjacent to a wall or cliff). It gives no literature source or engineering basis for the values or for the 1950 boundary, and its wording ("after 1950") leaves a dam completed in 1950 unassigned, where the model classes 1950 with the later dams (CrossValleySettleConstants.cs:35-57; WallCliffSettleConstants.cs:19-41). Left open; the same note is recorded in both settlement manuals.

---

## IN-06 — Definition — `04-flaw-assessment.mdx`

**Regarding:** Physical meaning of the localized tensile strain eL.

**Needed:** State the physical meaning of the localized tensile strain $e_L$: where along the crest and at what depth it applies (for example, the horizontal tensile strain along the dam axis in the crest region over the abutment), and over what gauge length it is "localized." The tables below are stated in percent, and the flaw probability and crack width relationships are stated in the same strain.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Source of the no-step strain tables and their bilinear interpolation.

**Needed:** The strain tables for an abutment without a step (<TableReference tableKey="cle-cross-valley-settlement-screening-table-6" /> and <TableReference tableKey="cle-cross-valley-settlement-screening-table-7" />) require a literature source, and the bilinear interpolation between their tabulated values (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-3" />) requires a basis. Provide the source (author, year, title, publisher or report number, and the figure or table digitized), or the engineering-judgment attribution, and state whether the source presents the relationship as curves that are to be interpolated linearly in both settlement and slope.

**Answer:**

Note (Oct 2025 methodology document): the document attributes the method — localized tensile strain at the crest from the abutment geometry and the normalized settlement $s/H_d$, then the flaw probability from that strain — to Fell et al. (2024) (UNICIV Report No. R470, already in the bibliography), and this attribution has been added to the manual text. It does not identify the table or figure digitized, the interpolation basis, or the rounding of the no-step values. Left open for those details.

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Source of the with-step strain tables (h1/Hd = 0.6, 0.8, 0.9) and the interpolation over h1/Hd.

**Needed:** The strain tables for an abutment with a step (<TableReference tableKey="cle-cross-valley-settlement-screening-table-8" /> to <TableReference tableKey="cle-cross-valley-settlement-screening-table-10" />) require a literature source, and the linear interpolation over the relative step height (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-4" />) requires a basis. Provide the source (author, year, title, publisher or report number, and the figure or table digitized) or the engineering-judgment attribution, and confirm that the tables for relative step heights of 0.6 and 0.8 are intended to differ only at zero settlement.

**Answer:**

Note (Oct 2025 methodology document): the document lists the presence and height of an abutment step as an input to the Fell et al. (2024) cross-valley method but does not identify the step tables, the relative step heights 0.6, 0.8, and 0.9, the interpolation over $h_1/H_d$, or why the tables for 0.6 and 0.8 differ only at zero settlement. Left open.

---

## IN-09 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Zero-strain point at h1/Hd = 0.4 and how a small step should be entered.

**Needed:** The zero-strain point at a relative step height of 0.4 (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-4" />) requires an engineering basis, and its consequence requires a decision. With it, a step with $h_1/H_d \le 0.4$ — including an entered step height of zero — gives zero strain, the smallest flaw probability, and a negligible crack, while the same abutment entered with no step can give a substantial strain; a step between 0.4 and 0.6 is interpolated toward zero. State the basis for the point, and state how an abutment with a small step is to be entered (for example, describe no step when $h_1/H_d \le 0.4$, or take the larger of the step and no-step strains).

**Proposed (unconfirmed):** small steps contribute no strain in addition to the baseline abutment geometry, so the point was intended to represent "no added strain" rather than "no strain." Confirm or replace.

**Answer:**

---

## IN-10 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Source of the strain-to-flaw-probability relationship, its added end point, log-linear interpolation, and floor.

**Needed:** The flaw probability relationship of <TableReference tableKey="cle-cross-valley-settlement-screening-table-11" /> requires a literature source, including (1) the tabulated probabilities from a strain of 0.0005 to 0.03, (2) the added point at a strain of 0.0443 with a probability of 1.0, which extends the relationship beyond its last value of 0.1, (3) the interpolation of the logarithm of probability linearly in strain (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-5" />), and (4) the floor of $5 \times 10^{-5}$ held for every smaller strain, including zero strain. Provide the source (author, year, title, publisher or report number, and the figure or table) or the engineering-judgment attribution for each.

**Answer:**

Note (Oct 2025 methodology document): the document attributes the strain-to-flaw-probability relationship to Fell et al. (2024) and states that where the strain exceeds the published limits the relationship is extrapolated beyond the published range. That is consistent with the added point at a strain of 0.0443 being a model extension rather than a published value (CrossValleySettleFlawData.cs:142-147), but the document gives no table number, no basis for the 0.0443 point or the log-linear interpolation, and no statement of the $5 \times 10^{-5}$ floor. Left open.

---

## IN-11 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Use of the above-period-of-record probabilities at every pool level.

**Needed:** The source relationship carries two sets of probabilities, one for a pool at or below the period of record and one for a pool above it, and the model always uses the set for a pool above the period of record, at every pool level. State the engineering basis for always using it — and whether the at-or-below set should be offered when the pool range of interest has already been experienced — or provide the engineering-judgment attribution.

**Proposed (unconfirmed):** a conservative screening choice, since a crack that existed would likely have revealed itself at pools already experienced, so the above-record set represents the untested condition. Confirm or replace.

**Answer:** The model conservatively uses the Fell et al. (2024) probabilities for a pool above the period of record at every pool level, regardless of headwater elevation; the at-or-below set is not offered at the screening level (from Oct 2025 methodology document).

---

## IN-12 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Source of the strain-to-crack-width relationship.

**Needed:** The crack-width relationship of <TableReference tableKey="cle-cross-valley-settlement-screening-table-12" /> requires a literature source, including its linear interpolation (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-7" />), the negligible width at a strain of 0.0005 and below, and the width held at 75 mm for every strain above 0.025. Note that the width relationship ends at a strain of 0.025 while the flaw probability relationship continues to 0.0443. Provide the source (author, year, title, publisher or report number, and the figure or table) or the engineering-judgment attribution.

**Answer:**

---

## IN-13 — Bibliography — `04-flaw-assessment.mdx`

**Regarding:** Bibliographic details of Pierson (2023), the crack width-depth relationship.

**Needed:** The crack-depth relationship (<EquationReference equationKey="cle-cross-valley-settlement-screening-eq-8" />) is attributed to Pierson (2023), whose bibliographic details are not recorded. If Pierson (2023) is to be cited, provide its full bibliographic details (authors, title, publisher or journal, and report number) so that it can be added to the bibliography. Also confirm that the published form gives the depth in feet as $d_c = (w_c/1000)(250 - 1.33\,w_c)/0.3048$ with the width in millimeters.

**Answer:**

Note (Oct 2025 methodology document): the document cites "Peirson et al. (2023)" only for the hydraulic stresses in transverse crest cracks (the basis of the certain initiation of a crest crack), and its reference list gives the matching work as Peirson, W. L., and Fell, R. (2024), "Pressurised flow in cracks in embankment dam cores," European Journal of Environmental and Civil Engineering, 29(6), 1076-1080, doi:10.1080/19648189.2024.2428253. It does not mention the crack width-depth relationship, so it does not establish whether the "Pierson (2023)" of the model is the same work (note also the spelling Peirson/Pierson). Left open.

---

## IN-14 — Applicability — `04-flaw-assessment.mdx`

**Regarding:** Crack depth not limited by the dam height.

**Needed:** The computed crack depth is not limited by the height of the embankment. Up to about 37 ft (11.3 m) of crack depth is possible, so for a low dam the bottom-of-crack elevation can fall below the foundation contact, and initiation then begins at the lowest pool evaluated. State whether the crack depth should be limited to the dam height (or to another bound) or whether the model is not intended for dams lower than the largest crack depth, and whether the relationship applies to the full range of widths the model produces.

**Answer:**

---

## IN-15 — Applicability — `04-flaw-assessment.mdx`

**Regarding:** Applicable range of abutment slope, normalized settlement, and relative step height.

**Needed:** State the range of abutment slopes, normalized settlements, and relative step heights over which the model is applicable. Beyond the tabulated range the model holds the end value rather than extrapolating, so a slope steeper than 60 degrees or a normalized settlement above 2.5 percent (2 percent with a step) is assessed as if it were at the end of the table, which may understate the strain. State whether such inputs are outside the intended use of the model, or whether holding the end value is an accepted screening treatment.

**Answer:**

Note (Oct 2025 methodology document): the document states that where $s/H_d$ or the strain exceeds the limits of Fell et al. (2024), the relationships are extrapolated to expand the published range. The current model does not extrapolate the strain tables: it holds the end value for settlement, slope, and relative step height (CrossValleySettleFlawModel.cs:168-170 and the clamped Bilinear lookups), and extends only the strain-to-probability relationship (the 0.0443 point). The document conflicts with the code on this point. Left open.

---
