# Input Needed — Concentrated Leak Erosion Wall/Cliff Compaction Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

Several bases this model relies on are requested once, in the CLE Common Methods Screening
Technical Reference Manual, and are not repeated here: the log-linear weighted-sum interpolation
(its IN-03), the flaw-continuity curve (its IN-04), the default critical shear stress table and
the exclusion of clean sands and gravels (its IN-07 to IN-10), the default initial pipe diameter
ranges including this model's 5 to 10 mm range (its IN-11), the crack-filling and flow-limitation
conventions (its IN-13 and IN-14), and the intended length unit (its IN-01).

---

## IN-01 — Applicability — `02-model-overview.mdx`

**Regarding:** The structures and faces the model covers, whether a wall and a cliff are treated
identically by every input (including the concrete-buttress factor, which has no direct
counterpart on a natural cliff), and the physical description of the mechanism.

**Needed:** The intended scope (types of walls and cliffs), how a cliff is to be scored for the
buttress factor, and a description of why fill against a face is prone to poor compaction and
how face slope and a buttress affect it, with its literature source.

**Proposed (unconfirmed):** The model applies to any steep, effectively rigid face against which
embankment fill was placed, natural or constructed; a cliff is scored with the buttress absent;
compaction equipment cannot work tight against a face, and a steeper face or a projecting
buttress enlarges the zone that receives less compactive effort.

**Answer:**

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** How the wall or cliff height is measured. The model places the base of the flaw at
the crest elevation less the height.

**Needed:** The intended definition, and how to enter the height when the wall or cliff does not
reach the crest, when its foot varies in elevation along the embankment, or when the fill against
it rests on a foundation above the wall's foot.

**Proposed (unconfirmed):** The vertical distance from the embankment crest down to the lowest
elevation at which fill is in contact with the face on the section being screened.

**Answer:**

---

## IN-03 — Definition — `03-input-parameters.mdx`

**Regarding:** Boundaries of the wall-fill compaction categories (mechanical slightly wet of
optimum; hand slightly dry of optimum; hand, thick layers, dry of optimum; no formal compaction;
unknown).

**Needed:** (1) The layer thickness that distinguishes "thick layers"; (2) the water-content range
meant by "slightly wet" and "slightly dry" of optimum; (3) which category to select for fill that
matches none exactly (for example mechanically compacted fill dry of optimum, or hand-compacted
fill wet of optimum).

**Answer:**

Note (Oct 2025 methodology document): the no-formal-compaction category is worded "No formal
compaction or poor compaction [very thick lifts, no moisture control]" (now in the manual). The
document gives no layer thickness or water-content ranges and no rule for fill that matches no
category.

---

## IN-04 — Definition — `03-input-parameters.mdx`

**Regarding:** The wall-slope categories (vertical; H/V from 0.1 to 0.25; H/V above 0.25;
unknown).

**Needed:** Which category applies to a face battered at less than 0.1 H/V and to an overhanging
face; whether the slope is that of the full height or the steepest part; whether a cliff's slope
is judged the same way.

**Proposed (unconfirmed):** "Vertical" covers every face steeper than 0.1 H/V, including an
overhanging face, judged over the height in contact with the fill.

**Answer:**

---

## IN-05 — Definition — `03-input-parameters.mdx`

**Regarding:** What qualifies as a concrete buttress, and why its presence makes a flaw more likely
(Present scores 3.5, Absent 1).

**Needed:** The definition to print and the physical effect of the buttress.

**Proposed (unconfirmed):** Any concrete element projecting from the face into the fill, which
creates confined corners and re-entrant zones against which fill is difficult to compact.

**Answer:**

---

## IN-06 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The risk-factor weights (3 wall-fill compaction, 2 wall slope, 1 concrete buttress)
and the likelihood factors of every category (compaction 1, 2, 3, 4; slope H/V above 0.25 → 1,
0.1 to 0.25 → 2, vertical → 3.5; buttress absent → 1, present → 3.5), including the intermediate
score of 3.5.

**Needed:** Confirmation that they are taken from Fell et al. (2024) with the table number, or the
engineering-judgment attribution.

**Answer:**

Note (Oct 2025 methodology document): the method is stated to be adapted from Fell et al.
(2024). The more-likely (3) and much-more-likely (4) scores for the slope and finish of the wall
and for concrete buttresses in Table 6.11 were combined into one category scored 3.5 (now in the
manual); the compaction categories are attributed to Table 6.4, with the first two combined and
assigned a flaw-continuity probability of 0.1 (see CLE Common Methods IN-04). The risk factors
3, 2, 1 are not given.

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The scores of the Unknown categories: 3 for wall-fill compaction, 3 for wall slope,
2 for the buttress (below the midpoint of its Absent and Present scores, unlike the other two).

**Needed:** The reasoning for each, or the literature source.

**Proposed (unconfirmed):** An Unknown selection is scored moderately unfavorably to avoid a false
negative; buttresses are judged uncommon enough that an unknown buttress is scored nearer to
Absent.

**Answer:**

Note (Oct 2025 methodology document): unknown wall-fill compaction is assumed to be hand
compaction in thick layers dry of optimum (LF = 3), which matches the model (now in the
manual). The document also says an unknown wall slope is assumed vertical "(LF=3)" and an
unknown buttress is assumed to exist "(LF = 2)", but the model scores a vertical face 3.5 and a
buttress present 3.5, so those two statements conflict with the model (Unknown slope 3, Unknown
buttress 2) and were not adopted. The general screening policy is that an Unknown selection
assumes conservative conditions.

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The weighted-sum curve: sums 9, 11, 13, 18, 24 → negligible, 1e-4, 1e-3, 1e-2,
1e-1.

**Needed:** The source of the curve for this mechanism (table or figure of Fell et al. (2024)) or
the engineering-judgment attribution, and why the curve extends to 24 when the largest attainable
sum is 22.5.

**Answer:**

Note (Oct 2025 methodology document): the document states only that the flaw probabilities
are adapted from Fell et al. (2024) and that the above-pool-of-record probabilities are used at
every headwater; it gives no table or figure number for this curve and does not explain why it
extends to a weighted sum of 24.

---

## IN-09 — Decision — `04-flaw-assessment.mdx`

**Regarding:** The model applies one weighted-sum curve at every pool level, with no pool-of-record
input. The curve applied is the one its source assigns to pools above the pool of record; the
companion curve for pools at or below the pool of record is not used.

**Needed:** Whether the manual should state that no credit is taken for past performance up to the
pool of record, and the engineering basis for applying the above-pool-of-record curve throughout.

**Proposed (unconfirmed):** A conservative screening simplification that removes the pool of record
as an input; past performance can be credited in a detailed analysis.

**Answer:** Yes. The curve applied is the one Fell et al. (2024) assign to pool levels above the pool
of record, used at every headwater as a conservative screening simplification, so no credit is
taken for past performance up to the pool of record; past performance can be credited in a
detailed analysis. (from Oct 2025 methodology document)

---

## IN-10 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Placing the base of the flaw at the foot of the wall or cliff (crest elevation less
the wall or cliff height) rather than at another elevation along the face or over a range of
elevations.

**Needed:** The literature source or the engineering-judgment attribution.

**Proposed (unconfirmed):** A poorly compacted zone may extend over the full height of the face,
and its lowest point carries the largest head above the flaw at any pool and is the first to be
loaded as the pool rises. The seepage path is also longest at the foot, so the gradient is not
necessarily largest there; state whether evaluating initiation at the foot is intended to be
conservative. The foot is the unconservative location for the upstream cutoff-wall comparison,
since a cutoff whose top reaches the foot is credited even where the zone extends above it.

**Answer:**

Note (Oct 2025 methodology document): the document places the base of the flaw at the base
elevation of the wall or cliff, confirming the placement without a basis. Its statement that
observed leakage sets the base of the flaw to the leakage exit elevation does not apply to this
model (the base of the flaw is unchanged under the override) and was not adopted.

---
