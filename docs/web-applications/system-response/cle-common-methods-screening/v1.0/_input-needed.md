# Input Needed — Concentrated Leak Erosion Common Methods Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Applicability — `03-input-parameters.mdx`

**Regarding:** The length unit the CLE family is intended to be used in. Several
mechanism-specific relationships carry dimensional values with no unit conversion (the
desiccation and frost-cracking crack depths are tabulated in feet; the compaction models band
the flaw base width at fixed numerical thresholds), only the cross-valley settlement model
converts its crack-depth relationship between feet and meters, and the shear stress
relationship uses the unit weight of water in pounds per cubic foot.

**Needed:** The intended unit system for the family, and whether the statement belongs in this
manual or in each model's manual.

**Proposed (unconfirmed):** The family is intended for US customary units (elevations and
lengths in feet); a user working in SI units converts before running any model other than the
cross-valley settlement model.

**Answer:**

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The upstream-element categories "modern cutoff wall" and "non-cementitious
wall", which are listed without a definition alongside the soil-cement-bentonite and column-wall
categories.

**Needed:** What each category covers (construction type, era, or material), or the table in
Fell et al. (2024) that defines them.

**Answer:**

---

## IN-03 — Engineering Basis — `05-flaw-conventions.mdx`

**Regarding:** The conversion of the risk-factor/likelihood-factor weighted sum to a flaw
probability by interpolating the logarithm of probability linearly between tabulated points,
holding the end value beyond the tabulated range, and (in several models) anchoring the lowest
tabulated point at a negligibly small probability.

**Needed:** Whether Fell et al. (2024) presents these relationships as curves to be
interpolated this way (with the figure or table), or the engineering-judgment attribution.

**Proposed (unconfirmed):** The tabulated probabilities span several orders of magnitude, so
interpolation in the logarithm of probability is the natural reading of a relationship plotted
on a logarithmic probability axis; the negligible anchor reproduces a relationship that falls
toward zero at the lowest attainable score.

**Answer:**

---

## IN-04 — Engineering Basis — `05-flaw-conventions.mdx`

**Regarding:** The flaw-continuity stage applied by the core, wall or cliff, and foundation or
abutment compaction models, and its shared curve (likelihood factor 1, 2, 3, 4 → negligible,
1 × 10⁻⁴, 1 × 10⁻³, 1 × 10⁻¹), keyed to a different compaction factor in each model.

**Needed:** The physical meaning of the flaw-continuity probability, its source (or the
engineering-judgment attribution), and confirmation that one curve is intended for all three
models.

**Answer:**

---

## IN-05 — Engineering Basis — `05-flaw-conventions.mdx`

**Regarding:** The normal-pool heuristic placing the base of a core or abutment compaction flaw
one third of the way from the normal pool elevation to the crest.

**Needed:** Literature source or engineering-judgment attribution, including why the normal pool
and not the base of the embankment is the lower reference.

**Proposed (unconfirmed):** A screening convention that places the flaw within the band of pools
the embankment experiences, so that initiation is evaluated above normal pool where loading is
frequent.

**Answer:**

---

## IN-06 — Engineering Basis — `06-initiation.mdx`

**Regarding:** The initiation probability of 1.0 applied by the crest-crack models once the pool
rises above the bottom of an open crest crack (0 at or below it). The model records two
different attributions: a conservative screening convention that is not an explicit finding of
Pierson (2023), and an attribution of the certain initiation to Pierson (2023).

**Needed:** Which attribution is intended. If Pierson (2023) is to be cited, its full
bibliographic details (authors, title, publisher or journal, report number) for the
bibliography.

**Proposed (unconfirmed):** An open transverse crack at the crest is wide enough that the shear
stress of any flow through it exceeds the critical shear stress of the crack walls, so
initiation is taken as certain once water can enter the crack — a conservative screening
posture under which a site needing a lower value adjusts the SRP.

**Answer:**

---

## IN-07 — Engineering Basis — `06-initiation.mdx`

**Regarding:** The default critical shear stress ranges by soil classification shared by the
four compaction models (lb/ft²: SM, SC, ML 0.02089 / 0.04177 / 0.1044; GM 0.021 / 0.08354 /
0.2089; CL-ML 0.04177 / 0.08354 / 0.2089; GC 0.04177 / 0.08354 / 0.418; CL, MH 0.04177 /
0.1044 / 0.4177; CH 0.2089 / 0.5221 / 1.044).

**Needed:** Literature source with full bibliographic details for the bibliography, or the
engineering-judgment attribution.

**Proposed (unconfirmed):** The values are conversions of round values in pascals (1, 2, 4, 5,
10, 20, 25, 50 Pa), suggesting a source table published in SI units.

**Answer:**

---

## IN-08 — Decision — `06-initiation.mdx`

**Regarding:** Two entries of the critical shear stress table that do not follow the pascal
conversion of the rest: the GM low value 0.021 lb/ft² (1 Pa = 0.02089 lb/ft²) and the GC high
value 0.418 lb/ft² (20 Pa = 0.4177 lb/ft²).

**Needed:** Whether these values are intended as printed or should match the converted values.

**Answer:**

---

## IN-09 — Engineering Basis — `06-initiation.mdx`

**Regarding:** The exclusion of the six clean and nearly clean sand and gravel classes (SP-SM,
SW, SP, GP-GM, GW, GP; less than 12 percent fines) as the
core soil classification of all four compaction models.

**Needed:** Engineering basis or engineering-judgment attribution.

**Proposed (unconfirmed):** A cohesionless soil cannot sustain an open pipe or crack, so a
compaction flaw in it would collapse rather than carry a concentrated leak; such soils are
addressed by other internal-erosion failure modes.

**Answer:**

---

## IN-10 — Engineering Basis — `06-initiation.mdx`

**Regarding:** The triangular form of the default critical shear stress distribution over the
tabulated low, most likely, and high values.

**Needed:** Engineering basis or engineering-judgment attribution.

**Proposed (unconfirmed):** The triangular form follows the probabilistic input of the
Concentrated Leak Erosion Initiation toolbox, which represents the critical shear stress and the
initial pipe diameter by triangular distributions over their minimum, most likely, and maximum
values.

**Answer:**

---

## IN-11 — Engineering Basis — `06-initiation.mdx`

**Regarding:** The default initial pipe diameter ranges (triangular, mm): core compaction 2 / 3
/ 5; conduit compaction 5 / 10 / 12.5; wall or cliff compaction 5 / 5 / 10; foundation or
abutment compaction 2 / 3 / 5.

**Needed:** Literature source or engineering-judgment attribution, including why the conduit
range is larger than the core range and why the wall or cliff range has its most likely value at
its low value.

**Answer:**

---

## IN-12 — Engineering Basis — `07-failure-pathway-and-progression.mdx`

**Regarding:** The crest-crack pathway convention: (1) continuation and roof support share one
gate at the top of the first filter the pathway meets, with certain continuation above it; (2)
the below-filter roof materials are taken at the bottom-of-crack elevation; (3) a filter whose
top reaches the crest, with no full-pathway materials given, caps the pathway at every pool
level.

**Needed:** Literature source or engineering-judgment attribution.

**Proposed (unconfirmed):** A crest crack is open over its full depth, so a pool above the
filter's top drives flow through the upper part of the crack over the filter, where nothing
filters the exit; below the filter's top, all flow through the crack reaches the filter.

**Answer:**

---

## IN-13 — Definition — `07-failure-pathway-and-progression.mdx`

**Regarding:** The meaning of the crack-filling values by embankment type (homogeneous earthfill
1.0, zoned earthfill 1.0, central-core earth and rockfill 0.5). The source table is described
as giving the probability of crack filling, while the event tree multiplies the value directly
as the probability of no crack filling.

**Needed:** Which reading the source table supports, and its table number in Fell et al. (2024).

**Proposed (unconfirmed):** The value is the probability that crack filling does not stop the
erosion — an earthfill embankment has no upstream zone of material able to fill the pipe, so no
credit is taken, while the upstream zone of a central-core earth and rockfill embankment is
credited with a one-in-two chance of filling it.

**Answer:**

---

## IN-14 — Engineering Basis — `07-failure-pathway-and-progression.mdx`

**Regarding:** The flow-limitation conventions: (1) the minimum across several upstream elements
governs; (2) a wall stops limiting flow above its top — per pool level for a crest crack, and
against the base of the flaw for a compaction flaw — while an upstream facing element applies at
every pool level; (3) the conduit compaction model takes no flow-limitation credit.

**Needed:** Literature source (including the table in Fell et al. (2024) that gives the
flow-limitation probabilities) or the engineering-judgment attribution.

**Answer:**

---

## IN-15 — Definition — `03-input-parameters.mdx`

**Regarding:** The elevation, or range of elevations, at which the full-pathway roof materials
of the crest-crack models are taken. The below-filter materials are taken at the
bottom-of-crack elevation; the full-pathway materials are described only as every non-filter
material from the upstream face to the downstream face.

**Needed:** The elevation or elevation range at which the user should cut the section when
listing the full-pathway materials (for example, the bottom of the crack, the top of the
filter, or the whole depth of the crack above the filter's top).

**Answer:**

---
