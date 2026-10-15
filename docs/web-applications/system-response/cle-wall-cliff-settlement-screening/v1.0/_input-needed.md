# Input Needed — CLE Wall/Cliff Settlement Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** The geometric definitions of the wall or cliff height Hw, the bench width Wb,
and the abutment slope below the wall or cliff β1.

**Needed:** (1) Whether Hw is the full height of the wall or cliff or only the part in contact
with the embankment fill, and whether it may exceed the dam height H; (2) where Wb is measured
(horizontally from the base of the wall or cliff to the edge of the bench?) and whether along or
across the dam axis; (3) which surface β1 describes (the abutment foundation surface between the
bench and the valley floor?) and how it is measured where that surface is not planar; (4)
whether the top of the wall or cliff is assumed to be at or near crest level, since the crack
depth is measured down from the crest elevation and the model takes no top-of-wall or
top-of-cliff elevation. A reference to the defining sketch is ideal.

**Answer:**

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The dam height H and the maximum post-construction settlement s that form the
normalized settlement s/H.

**Needed:** (1) Whether H is the maximum dam height or the embankment height at the wall or
cliff section; (2) whether s is the crest settlement at the wall or cliff section or the maximum
along the crest, and over what period it is taken (end of construction to the assessment, or
expected long-term settlement).

**Answer:**

---

## IN-03 — Applicability — `03-input-parameters.mdx`

**Regarding:** Screening an embankment with more than one wall or cliff (one on each abutment,
or several steps along one abutment). The model evaluates one wall or cliff geometry per run.

**Needed:** How such an embankment is to be screened.

**Proposed (unconfirmed):** Each wall or cliff is evaluated in its own run with its own
geometry and abutment slope, and the run giving the largest SRP governs the mechanism.

**Answer:**

---

## IN-04 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The default normalized settlement used when no settlement is supplied: 0.5
percent of the dam height for dams completed before 1950, 0.25 percent for dams completed in
1950 or later (the year 1950 itself classed with the later dams).

**Needed:** Literature source for the two values and the 1950 boundary (full bibliographic
details if not Fell et al. (2024); the table or section if it is), or the engineering-judgment
attribution.

**Proposed (unconfirmed):** The two values represent typical post-construction crest
settlements of embankments built before and after the general adoption of controlled compaction
of earthfill, with older, less well compacted embankments settling more.

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The likelihood-factor bands (cross-valley profile on Wb/Hw: > 2.5 / > 1 to 2.5 /
0.25 to 1 / < 0.25; settlement on s/H: ≤ 0.25 / > 0.25 to 0.75 / > 0.75 to 2 / > 2 percent;
abutment slope: ≤ 25 / > 25 to 45 / > 45 to 60 / > 60 degrees, scoring 1 to 4) and the risk
factors (3, 2, 1), attributed to Fell et al. (2024).

**Needed:** The table or section of Fell et al. (2024) that gives them, and confirmation of the
factor names and band limits as printed, including that the source's cross-valley profile
bands for likelihood factors of 2 and 3 both include Wb/Hw = 1 (the model scores 1 as 3).

**Answer:**

---

## IN-06 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The rule that a cross-valley profile score of 1 (Wb/Hw > 2.5) or an abutment
slope score of 1 (β1 ≤ 25°) forces the flaw probability to zero, while a settlement score of 1
does not.

**Needed:** Literature source (table or section of Fell et al. (2024), if it is the source) or
the engineering-judgment attribution.

**Proposed (unconfirmed):** A bench that wide sets the fill far enough from the wall or cliff,
and an abutment that flat gives a gradual enough transition, that the geometry cannot
concentrate differential settlement into a continuous transverse crack, whereas some settlement
is always present.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The flaw-probability curve: weighted sums 9, 11, 13, 19, 24 → negligible,
1 × 10⁻³, 5 × 10⁻³, 2 × 10⁻², 2 × 10⁻¹, interpolated log-linearly. The lowest reachable
weighted sum is 10.

**Needed:** The table or figure of Fell et al. (2024) that gives the curve, and whether the
source gives a probability at a weighted sum of 9 (or a lower limit below which the probability
is zero) that the negligible point represents. (The general interpolation form is documented in the
Flaw Probability from the Weighted Sum section of the common methods manual.)

**Answer:**

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The absence of an observation override in this model, where the cross-valley
settlement, desiccation, and frost-cracking models each accept an observation of continuous
transverse cracking that sets the flaw probability to 1.0.

**Needed:** The engineering basis or documentation decision: why an observed crack adjacent to
the wall or cliff is not used to override the scored probability, and what a user who has
observed such a crack should do.

**Answer:**

---

## IN-09 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The crack width relationships: the 6 × 6 table of crack width w45 at an abutment
slope of 45° (mm), printed in two parts split by bench-width ratio, by normalized settlement (0, 0.1, 0.25, 0.5, 1, 2 percent) and bench-width
ratio (0, 0.25, 0.5, 1, 2, 2.5), and the adjustment factor by abutment slope (15°, 30°, 45°,
60° → 0.25, 0.75, 1.0, 1.0), attributed to Fell et al. (2024).

**Needed:** The table or figure of Fell et al. (2024) that gives each, and confirmation of
(1) where the width is defined (for example, at the crest surface); (2) the zero width at a
bench-width ratio of 2.5 and the 1 mm width at zero settlement; and (3) that the adjustment
factor's slope axis is 15°, 30°, 45°, 60°, where the effective wall height table uses 15°,
25°, 45°, 60°.

**Answer:**

---

## IN-10 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The effective wall height ratio He/Hw (4 × 5 table by abutment slope 15°, 25°,
45°, 60° and bench-width ratio 0, 0.25, 0.5, 1, 2) and the normalized crack depth rd = dc/He (0, 0.1,
0.25, 0.5, 1, 2 percent settlement → 15, 50, 65, 90, 100, 100 percent), attributed to Fell et
al. (2024).

**Needed:** The table or figure of Fell et al. (2024) that gives each, the definition of the
effective wall height He, and confirmation that a crack depth of 15 percent of He is intended
at zero settlement.

**Answer:**

---

## IN-11 — Applicability — `04-flaw-assessment.mdx`

**Regarding:** Inputs beyond the tabulated range of the crack width and depth relationships
(normalized settlement above 2 percent, abutment slopes steeper than 60° or flatter than 15°,
bench-width ratios above 2), where each relationship is held at its edge value.

**Needed:** Whether the model is intended for such inputs, and whether a caution on such
results belongs in the document.

**Answer:**

---
