# Input Needed — Backward Erosion Piping Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document. IN-18 to IN-21 were added in the October 2026 revision. (IN-17 was retired in the August 2026 update: the mean-of-
distribution treatment it questioned no longer exists — supplied seepage-path lengths are now
single values by design. IN-12 was retired in the October 2026 model update: blowout and heave beneath a berm
are now evaluated at the berm toe, the location the marker asked to confirm. IN-20 was retired in the same update: the
blowout and heave net head now combines the daylight exit level with the ground at the evaluation point.)

---

## IN-01 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The thickness ranges assigned to the qualitative confining-layer categories
(Very Thin 0–5 ft, Thin 5–10 ft, Moderate 10–20 ft, Thick 20–35 ft, Unknown 0–10 ft, each as
a uniform distribution).

**Needed:** Literature citation (full bibliographic details for the bibliography) or the
engineering-judgment attribution to state, including the reasoning for the Unknown band
spanning 0–10 ft.

**Answer:**

Note (Oct 2025 methodology document): the document had the analyst enter the confining-layer
thickness as a distribution; it has no qualitative thickness categories and gives no basis
for these ranges.

---

## IN-02 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default coefficient-of-uniformity distribution for the foundation sand
(triangular: low 1.1, mode 2.0, high 4.0).

**Needed:** Literature citation or engineering-judgment attribution.

**Proposed (unconfirmed):** Representative of the poorly graded, uniform fine to medium sands
susceptible to backward erosion piping.

**Answer:** Literature and experience basis: USCS classes sands with Cu < 6 as poorly graded
(ASTM D2487-17); backward erosion piping occurs mostly in sands with Cu between 1 and about
4; the triangular distribution (1.1, 2.0, 4.0) spans that range with a slightly conservative
skew toward more uniform sands, consistent with the range of the Schmertmann (2000)
laboratory data, and excludes well-graded soils subject to suffusion. (from Oct 2025
methodology document)

---

## IN-03 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default effective-grain-size (D10) distribution for the foundation sand
(normal: mean 0.25 mm, standard deviation 0.085 mm, values limited to no less than 0.1 mm).

**Needed:** Literature citation or engineering-judgment attribution for both the distribution
parameters and the 0.1 mm lower limit.

**Answer:** Hazen's permeability experiments used uniform clean sands with 0.1 mm < D10 < 0.3
mm and Cu < 5 (USACE EM 1110-2-1901), and Schmertmann (2000) reports D10 of 0.15–0.28 mm
(average about 0.20 mm) in the range applicable to BEP; the normal distribution (mean 0.25
mm, SD 0.085 mm) gives a 95% range of about 0.1–0.4 mm, and the 0.1 mm lower limit coincides
with the lower bound of Hazen's range. (from Oct 2025 methodology document)

---

## IN-04 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The relative-density category uniform ranges (Very Loose 0–15%, Loose 15–35%,
Medium Dense 35–65%, Dense 65–85%, Very Dense 85–100%, and the Unknown band 15–65%).

**Needed:** Literature citation or engineering-judgment attribution for the band boundaries
and for the Unknown selection.

**Proposed (unconfirmed):** Boundaries follow the standard qualitative relative-density
classification for granular soils; a uniform distribution over each band takes no position on
a most-likely value within the category; Unknown spans loose to medium-dense as a
conservative screening posture. If confirmed, supply the classification source for the
bibliography.

**Answer:** Category boundaries follow the qualitative relative-density descriptors of
Terzaghi and Peck (1967) (very loose 0–15%, loose 15–35%, medium dense 35–65%, dense 65–85%,
very dense 85–100%); the Unknown band spans 15–65% because natural sands are most often loose
to medium dense (Holtz and Kovacs 1981; Terzaghi, Peck, and Mesri 1996). (from Oct 2025
methodology document)

Note (Oct 2025 methodology document): the document modeled each category as a triangular
distribution with the mode at the band midpoint (Unknown as Triangular 15, 40, 65); the model
now uses uniform bands (BEPScreeningModel.cs:645–659), so no basis for the uniform shape is
recorded.

---

## IN-05 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default foundation-sand saturated unit weight (normal: mean 122.0 pcf,
standard deviation 3.0 pcf).

**Needed:** Literature citation or engineering-judgment attribution.

**Proposed (unconfirmed):** Typical of loose to medium-dense saturated alluvial sand.

**Answer:** Lambe and Whitman (1969) give about 111–130 pcf for clean sands, Budhu (2011)
115–127 pcf, Das (2010) about 112–125 pcf, and EM 1110-1-1905 design examples 120–130 pcf; a
normal distribution with mean 122 pcf and SD 3 pcf (95% range about 117–127 pcf) represents
fine to medium uniform sands in loose to dense states. (from Oct 2025 methodology document)

---

## IN-06 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default confining-layer saturated unit weight (normal: mean 118.0 pcf,
standard deviation 3.0 pcf).

**Needed:** Literature citation or engineering-judgment attribution.

**Answer:** Lambe and Whitman (1969) and Das (2010) give about 95–125 pcf for clays, Budhu
(2011) 100–125 pcf for fine-grained soils, EM 1110-2-2504 implies about 97–128 pcf and EM
1110-1-1905 examples use 100–120 pcf; values below about 100–105 pcf were avoided as
unrealistically low, and a normal distribution with mean 118 pcf and SD 3 pcf (95% range
about 113–123 pcf) covers fine-grained confining layers at the screening level. (from Oct
2025 methodology document)

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

Note (Oct 2025 methodology document): the document predates the Bayesian assessment. It had
the analyst select a five-level verbal likelihood (Very Likely 0.99, Likely 0.9, Neutral 0.5,
Unlikely 0.1, Very Unlikely 0.01) and gives no basis for the geologic priors (now
BEPFlawData.cs:18 onward).

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

Note (Oct 2025 methodology document): with no known daylighting exit, the document assumed
the full reservoir head beneath the confining layer (the infinite-blanket limit). The model
replaced that with the 1–5 embankment-height range (BEPScreeningModel.cs:590–595; BTCase4
UseFullHead = false at BEPScreeningModel.cs:796), so the document gives no basis for the
range.

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

## IN-16 — Engineering Basis — `07-delegated-methods.mdx`

**Regarding:** The fines-content correction applied in the Schmertmann analysis — a step from
1.0 to 1.4, with the higher factor applying at exactly 5% fines and above. The same step
applies in the toolbox Schmertmann analysis; the Schmertmann chapter of the BEP Progression
manual does not describe the term.

**Needed:** Source or engineering-judgment attribution for the step form, the 5% threshold,
and the 1.4 value, and an addition to the Schmertmann chapter of the BEP Progression manual.

**Answer:**

Note (Oct 2025 methodology document): the document cites Lucker and Robbins as the research
basis for a fines correction, but its values differ from the model: 1.0 at 0% fines, 2.0 at
5%, and 4.0 at 10% or more (capped at 10%). The model applies 1.0 below 5% and 1.4 at or
above 5% (SchmertmannData.cs:98–109). The conflict needs resolution before either is cited.

---

## IN-18 — Bibliography — `04-flaw-assessment.mdx`

**Regarding:** The Bayesian formulation of the flaw assessment: each evidence source expressed
as a likelihood ratio, the prior updated in log-odds form, and the subsurface likelihood ratio
weighted by the data-quality factor as an exponent. The same formulation is named in the
Physics Basis section of `02-model-overview.mdx`.

**Needed:** Full bibliographic details for the source of the formulation (for the
bibliography), or the engineering-judgment attribution for the quality-factor weighting if it
is specific to this model.

**Answer:**

---

## IN-19 — Engineering Basis — `08-assumptions-and-limitations.mdx`

**Regarding:** Assumption 11 (horizontal pipe path): the statements that the neglected
inclination effect is small at shallow angles and becomes significant beyond about 10° from
horizontal.

**Needed:** Literature source with full bibliographic details, or the engineering-judgment
attribution; confirm or replace the 10° threshold.

**Answer:**

---

## IN-21 — Engineering Basis — `08-assumptions-and-limitations.mdx`

**Regarding:** Assumption 18. Under a confining layer of unknown presence, the toe exit is
treated as plane-type (exit-geometry factor 1.0), which is less conservative than the
hole-type factor (0.5) applied to a confirmed layer whose exit stays beneath it.

**Needed:** Engineering basis or judgment attribution for this choice, or confirmation of
whether a possibly present layer should take the hole-type factor.

**Answer:**

Note (Oct 2025 methodology document): the document treated layer presence as Yes/No only and
assigned the hole-type factor (0.5) to any confined toe exit without a daylighting sand
layer, calling it conservative because many boils lessen flow convergence. It has no
Unknown-presence case, so it does not answer this marker; if anything it leans toward the
hole-type factor for a possibly present layer.

---
