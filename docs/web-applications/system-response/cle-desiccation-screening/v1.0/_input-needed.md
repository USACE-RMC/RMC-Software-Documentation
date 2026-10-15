# Input Needed — CLE Desiccation Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** The four climate descriptions (Arid: less than 10 in of rainfall and high summer
temperatures; Monsoonal: distinct wet and dry periods with high summer temperatures; Seasonal:
annual rainfall greater than 20 in with no prolonged hot, dry periods; Temperate: uniform
rainfall throughout the year). As stated they leave gaps (10 to 20 in of rainfall with no
distinct wet and dry periods) and overlap (less than 10 in with distinct wet and dry periods).

**Needed:** The table of Fell et al. (2024) the descriptions come from, and the rule for
classifying a site that falls between them (for example, select the drier category, or supply a
measured net evaporation instead).

**Answer:**

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The definition of the average annual net evaporation input (mm).

**Needed:** How it is determined (for example, annual pan or lake evaporation less annual
rainfall), over what period of record it is averaged, and the source that defines it for use
with the desiccation crack-depth tables.

**Proposed (unconfirmed):** Annual evaporation less annual rainfall, averaged over the period
of record, as used by Fell et al. (2024) to characterize climate in its desiccation crack-depth
tables.

**Answer:**

---

## IN-03 — Applicability — `03-input-parameters.mdx`

**Regarding:** The tabulated crack depths are in feet and are subtracted from the crest
elevation without unit conversion, so a crest elevation in meters gives a wrong bottom-of-crack
elevation. (Desiccation-model instance of marker IN-01 of the CLE Common Methods manual.)

**Needed:** The length unit the model is intended to be used in, and the instruction for a user
working in SI units.

**Proposed (unconfirmed):** The model is intended for elevations in feet; a user working in SI
converts the elevations to feet before running it.

**Answer:**

---

## IN-04 — Engineering Basis — `04-flaw-probability.mdx`

**Regarding:** The net-evaporation relationship for the climate likelihood factor (net
evaporation 175, 425, 450, 900, 925, 1500, just above 1500, 2000 mm → likelihood factor 1, 1, 2,
2, 3, 3, 4, 4): the band boundaries, the linear transitions at 425–450 and 900–925 mm against
the abrupt step at 1500 mm, the end values held beyond 175 and 2000 mm, and the equivalence of
each band with one climate category.

**Needed:** Citation of the Fell et al. (2024) table relating net evaporation to the climate
categories, or the engineering-judgment attribution, and why the 1500 mm transition is abrupt.

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-probability.mdx`

**Regarding:** The Unknown crest-soil likelihood factor of 2 (the score of a silty or lean
clay, below high-plasticity silt 3 and fat clay 4). It also selects the crack-depth column.

**Needed:** The source of the value or the engineering-judgment attribution, and why an
intermediate rather than the most crack-prone score is adopted for an unknown soil at the
screening level.

**Answer:**

---

## IN-06 — Engineering Basis — `04-flaw-probability.mdx`

**Regarding:** The factor scores: risk factors 3 (surface layer), 2 (climate), 1 (crest soil);
surface-layer scores Paved 1, Gravel road 2.5, No road or pathway 4; climate scores Arid 4,
Monsoonal 3, Seasonal 2, Temperate 1; crest-soil scores SM, GM, ML, SC, GC 1; CL-ML, CL 2; MH 3;
CH 4.

**Needed:** The Fell et al. (2024) table each is taken from, or the engineering-judgment
attribution for any adapted value, in particular the gravel-road score of 2.5.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-probability.mdx`

**Regarding:** The weighted-sum curve (13, 16, 20, 24 → 1 × 10⁻³, 1 × 10⁻², 1 × 10⁻¹, 0.5) and
the lower threshold (a weighted sum below 13 gives a zero flaw probability; exactly 13 takes
1 × 10⁻³).

**Needed:** The figure or table of Fell et al. (2024) they are taken from, or the
engineering-judgment attribution, including why the probability is zero rather than continuing
to fall below 13. (The log-linear interpolation form itself is marker IN-03 of the CLE Common
Methods manual.)

**Answer:**

---

## IN-08 — Engineering Basis — `04-flaw-probability.mdx`

**Regarding:** Treating SP-SM, SW, SP, GP-GM, GW, and GP as soils in which desiccation cracking
does not occur (passed over when listed with other soils; the mechanism is inapplicable when
they are listed alone), while the silty classes SM, GM, and ML, which can also be non-plastic,
are retained with the lowest score.

**Needed:** The literature source or engineering-judgment attribution, and confirmation that
retaining SM, GM, and ML is deliberate.

**Proposed (unconfirmed):** Clean and nearly clean sands and gravels, with less than 12 percent
fines, have too little plasticity to shrink on drying and hold open a crack, so a crest built
only of them cannot develop a desiccation crack.

**Answer:**

---

## IN-09 — Engineering Basis — `05-crack-depth.mdx`

**Regarding:** The adaptation of Fell et al. (2024) Tables 5.10 to 5.13 into the two crack-depth
tables (one for a crest with no road or pathway, one for a gravel roadway; each four climates ×
crest-soil likelihood factor 1 to 4).

**Needed:** Confirmation that each source table corresponds to one climate; how the source
soil descriptions were mapped onto the four soil-score columns; whether the tabulated values are
the source depths or a selection from a range (for example a central or upper value); and the
source of the zero gravel-roadway depths for a soil scored 1 in the temperate,
seasonal, and monsoonal climates. Page or table references, or the engineering-judgment
attribution, for each adaptation.

**Answer:**

---

## IN-10 — Engineering Basis — `05-crack-depth.mdx`

**Regarding:** A paved crest takes the crack depths tabulated for a gravel roadway, although it
is scored as less likely to crack (likelihood factor 1 against 2.5).

**Needed:** Literature source or engineering-judgment attribution for treating the depth of a
desiccation crack beneath a paved surface as equal to that beneath a gravel road.

**Proposed (unconfirmed):** The source tables give depths only for an unprotected crest and a
crest under a roadway; a sealed pavement is a roadway, and treating it as such keeps the crack
depth on the deeper of the two available values for a protected crest.

**Answer:**

---

## IN-11 — Engineering Basis — `05-crack-depth.mdx`

**Regarding:** When a net evaporation is supplied, the crack depth is interpolated between the
depths of the four climate categories on the same net-evaporation band boundaries as the
climate likelihood factor.

**Needed:** Whether Fell et al. (2024) relates crack depth to net evaporation directly (cite the
table), or the engineering-judgment attribution for using the climate-category depths at fixed
net-evaporation bands.

**Answer:**

---

## IN-12 — Applicability — `05-crack-depth.mdx`

**Regarding:** The crack depth is always the tabulated value, even when continuous desiccation
cracking has been observed. An observed crack in a low-plasticity crest (soil score 1) under a
paved crest or gravel road in a temperate, seasonal, or monsoonal climate has a tabulated depth
of zero, so it contributes nothing to the SRP below the crest.

**Needed:** Whether this outcome is intended, and how the user should treat an observed crack of
known depth (for example, by evaluating it by other means).

**Answer:**

---

## IN-13 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The defaults of the two flaw selections. When no surface layer is given the model
takes a crest with no road or pathway (the most crack-prone surface); when no climate is given it
takes a temperate climate (the least crack-prone climate: likelihood factor 1, and crack depths
no deeper than those of any other climate), which is the least conservative of the four.

**Needed:** The engineering basis or engineering-judgment attribution for each default — in
particular the temperate climate default — or a statement that both selections are always to be
supplied and the defaults are not to be relied on.

**Answer:**

---
