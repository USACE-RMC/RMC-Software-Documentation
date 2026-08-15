# Input Needed — BEP Screening Model (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document. (IN-17 was retired in the August 2026 update: the mean-of-
distribution treatment it questioned no longer exists — supplied seepage-path lengths are now
single values by design.)

---

## IN-01 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The thickness ranges assigned to the qualitative confining-layer categories
(Very Thin 0–5 ft, Thin 5–10 ft, Moderate 10–20 ft, Thick 20–35 ft, Unknown 0–10 ft, each as
a uniform distribution).

**Needed:** Literature citation (full bibliographic details for the bibliography) or the
engineering-judgment attribution to state, including the reasoning for the Unknown band
spanning 0–10 ft.

**Answer:**

---

## IN-02 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default coefficient-of-uniformity distribution for the foundation sand
(triangular: low 1.1, mode 2.0, high 4.0).

**Needed:** Literature citation or engineering-judgment attribution.

**Proposed (unconfirmed):** Representative of the poorly graded, uniform fine to medium sands
susceptible to backward erosion piping.

**Answer:**

---

## IN-03 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default effective-grain-size (D10) distribution for the foundation sand
(normal: mean 0.25 mm, standard deviation 0.085 mm, values limited to no less than 0.1 mm).

**Needed:** Literature citation or engineering-judgment attribution for both the distribution
parameters and the 0.1 mm lower limit.

**Answer:**

---

## IN-04 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The relative-density category uniform ranges (Very Loose 0–15%, Loose 15–35%,
Medium Dense 35–65%, Dense 65–85%, Very Dense 85–100%, and the Default/Unknown band 15–65%).

**Needed:** Literature citation or engineering-judgment attribution for the band boundaries
and for the Default/Unknown selection.

**Proposed (unconfirmed):** Boundaries follow the standard qualitative relative-density
classification for granular soils; a uniform distribution over each band takes no position on
a most-likely value within the category; Default/Unknown spans loose to medium-dense as a
conservative screening posture. If confirmed, supply the classification source for the
bibliography.

**Answer:**

---

## IN-05 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default foundation-sand saturated unit weight (normal: mean 122.0 pcf,
standard deviation 3.0 pcf).

**Needed:** Literature citation or engineering-judgment attribution.

**Proposed (unconfirmed):** Typical of loose to medium-dense saturated alluvial sand.

**Answer:**

---

## IN-06 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default confining-layer saturated unit weight (normal: mean 118.0 pcf,
standard deviation 3.0 pcf).

**Needed:** Literature citation or engineering-judgment attribution.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The prior probability ranges by geologic depositional environment (glacial
outwash 0.500–0.900; high-energy fluvial 0.100–0.500; coastal shoreface/barrier 0.100–0.500;
aeolian dune 0.075–0.500; delta deposits 0.050–0.500; alluvial fans 0.050–0.300; shallow
marine shelf 0.050–0.300; low-energy deltaic/coastal mud 0.010–0.050; residual soils
0.001–0.100; unknown 0.050–0.300).

**Needed:** Literature citation or engineering-judgment attribution — including whether the
ranges derive from a published compilation of depositional-environment characteristics or
from elicited expert judgment.

**Answer:**

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The strength-of-evidence likelihood-ratio ranges (very strong 10–30; strong
3–10; moderate 1–3; neutral 1; weak 0.10–0.30; very weak 0.01–0.10) and the subsurface
data-quality factor ranges (high 1.00; moderate 0.75–0.90; low 0.50–0.75).

**Needed:** Literature citation or engineering-judgment attribution, including the reasoning
behind the order-of-magnitude likelihood bands and the quality discounts.

**Answer:**

---

## IN-09 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The seepage-observation likelihood-ratio ranges (sand boils 3.50–5.00;
concentrated seepage 2.00–3.50; stage-dependent wet areas 1.25–2.00; stage-independent wet
areas 1.00–1.25).

**Needed:** Literature citation or engineering-judgment attribution.

**Answer:**

---

## IN-10 — Engineering Basis — `05-hydraulic-loading-and-seepage-paths.mdx`

**Regarding:** Two judgments in the upstream seepage-path crediting rules: (1) a confirmed
Very Thin confining layer contributes no upstream path length (L1 = 0), taking precedence
over the impervious-extension credit; (2) only a layer characterized as Impervious is
credited — Semi-pervious and Unknown permeability contribute nothing.

**Needed:** Citation or engineering-judgment attribution for each judgment.

**Proposed (unconfirmed):** For (1): a layer thinner than about 5 ft cannot be relied on to
remain intact and carry head loss over its upstream extent.

**Answer:**

---

## IN-11 — Engineering Basis — `05-hydraulic-loading-and-seepage-paths.mdx`

**Regarding:** The default downstream seepage path length when the confining-layer extent (or
presence) is unknown: uniform between 1 and 5 embankment heights.

**Needed:** Literature citation or engineering-judgment attribution, including the reasoning
for scaling the range to embankment height.

**Answer:**

---

## IN-12 — Definition — `05-hydraulic-loading-and-seepage-paths.mdx`

**Regarding:** The physical interpretation of the exit-offset distance used when a berm
overlies a confirmed confining layer whose supplied downstream extent exceeds the berm
length — the berm-within-known-extent case in which the through-layer defect/blowout
composition is retained. The model design notes record the intended evaluation location as
the berm toe, but the model computes the offset as (supplied confining-layer extent − berm
length), measured from the embankment toe. Under the linear head profile, the head fraction
remaining at the computed offset equals (berm length ÷ confining-layer extent) — whereas an
exit evaluated at the berm toe (one berm length from the embankment toe) would retain the
complementary fraction, (extent − berm length) ÷ extent. The two coincide only when the berm
covers exactly half the extent; the computed construction is conservative for longer berms
and non-conservative for shorter ones relative to the berm-toe reading.

**Needed:** Confirmation of which exit location the offset is intended to represent, and the
engineering basis for the chosen construction. (If the intent is the berm toe, the
computation may warrant review — the document currently describes the computed behavior
as-is.)

**Answer:**

---

## IN-13 — Engineering Basis — `06-event-tree.mdx`

**Regarding:** The Weibull defect-survival parameters — characteristic defect penetration
depth 3.5 ft and shape parameter 1.25 — in the probability that a pre-existing defect fully
penetrates the confining layer.

**Needed:** The data source, calibration rationale, or engineering-judgment attribution.
These are recorded as empirical values with no published-literature provenance.

**Answer:**

---

## IN-14 — Engineering Basis — `06-event-tree.mdx`

**Regarding:** Two judgments in the revised berm treatment (updated August 2026 — the former
rule that any berm forces the unfiltered exit to certainty no longer exists; the treatment
now follows where the berm ends relative to the confining layer):

1. No berm is ever credited with filtering the exit — where the berm end remains beneath the
   layer, the exit resistance is carried entirely by the layer's defect/blowout composition
   (evaluated at the offset exit point), and where the berm daylights the exit, the
   unfiltered exit is certain.
2. When the layer's presence is unknown and a berm is present, a daylighting exit at the
   berm toe is assumed (forcing the unfiltered exit to certainty) rather than evaluated.

**Needed:** The engineering basis or judgment attribution for each.

**Proposed (unconfirmed):** For (1): seepage and stability berms are not engineered filters,
so no filtering credit is taken for any berm. For (2): with the layer itself unverified, its
lateral extent beneath the berm cannot be relied upon, and assuming a daylighting exit at the
berm toe is the conservative screening posture.

**Answer:**

---

## IN-15 — Engineering Basis — `06-event-tree.mdx`

**Regarding:** Treating the defect and blowout mechanisms as statistically independent
pathways in the unfiltered-exit union formula.

**Needed:** Engineering basis or judgment attribution for the independence treatment.

**Answer:**

---

## IN-16 — Engineering Basis — `07-delegated-models.mdx`

**Regarding:** The screening fines-content correction — a step from 1.0 to 1.4, with the
higher factor applying at exactly 5% fines and above — replacing the continuous
fines-content relationship in the dedicated Schmertmann documentation.

**Needed:** Source or engineering-judgment attribution for the step form, the 5% threshold,
and the 1.4 value.

**Answer:**

---
