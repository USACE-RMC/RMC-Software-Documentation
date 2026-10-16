# Input Needed — Continuation (Filter Evaluation) Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** The four filter categories (Sand, Sand with gravel, Gravel with sand, Gravel),
which the model defines only by name and by their filter D15 ranges.

**Needed:** The definition of each category — in particular the gravel or sand content that
separates Sand from Sand with gravel, Sand with gravel from Gravel with sand, and Gravel with
sand from Gravel. Also the reason the filter is described by these categories rather than by
USCS classes.

**Proposed (unconfirmed):** The categories follow the USCS naming convention for the secondary
component, in which a sand "with gravel" contains 15 percent or more gravel, and a gravel has
more gravel than sand. They may be used in place of USCS classes because a clean sand or gravel
class can fall in either of two categories, depending on its gravel or sand content, which only
a gradation can resolve.

**Answer:**

---

## IN-02 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The reshaping exponent k of the gap-graded filter segregation adjustment: default
0.5, valid range 0.4 to 0.7.

**Needed:** Literature citation (full bibliographic details for the bibliography) or the
engineering-judgment attribution for the default and for the range.

**Answer:**

---

## IN-03 — Bibliography — `03-input-parameters.mdx`

**Regarding:** The reshape relationships of the filter segregation adjustment: for a broadly
graded band, a uniform lowering of the percent passing by FF × W / 100 above the finer-fraction
breakpoint and a proportional scaling by (100 − W) / 100 below it; a linear blend above the
breakpoint and a power curve (D / D_FF)^k below it for a gap-graded band; adjusted percent
passing at the breakpoint FF × (100 − W) / 100. The Filter Evaluation (Continuation) Toolbox
manual describes the adjustment only conceptually.

**Needed:** The source of these relationships (full bibliographic details), or confirmation that
they are the toolbox's own formulation with the attribution to state.

**Answer:**

---

## IN-04 — Engineering Basis — `05-year-of-construction-method.mdx`

**Regarding:** The construction periods (before 1950, 1950 to 1970, 1971 to 1985, after 1985)
and the probability of continuing erosion assigned to each (0.9, 0.5, 0.25, 0.1).

**Needed:** Literature citation or engineering-judgment attribution, including the reasoning for
each period boundary and each probability.

**Proposed (unconfirmed):** The periods follow the development of filter design practice;
filters designed before the modern no-erosion criteria of the mid-1980s are progressively more
likely to be too coarse the earlier they were designed.

**Answer:**

---

## IN-05 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** When the soil classification method takes the base soil D85 and fines content
from a single supplied base soil gradation, it uses the gradation as entered, without
the regrading on the No. 4 sieve or on a missing particle size that the gradation method
applies.

**Needed:** Engineering basis or engineering-judgment attribution for using the unregraded
gradation, or confirmation that regrading should be applied.

**Answer:**

---

## IN-06 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** The base soil ranges by USCS classification — D85: SM and GM 0.4–1.0 mm; SC and
GC 0.3–0.8 mm; ML and CL-ML 0.005–0.05 mm; CL and MH 0.005–0.02 mm; CH 0.005–0.01 mm. Fines
content: 5–50 percent for SM, GM, SC, GC; 50–100 percent for ML, CL-ML, CL, MH, CH. Also the
exclusion of GP, GW, GP-GM, SP, SW, and SP-SM (no ranges; rejected with a filter category).

**Needed:** Literature citation or engineering-judgment attribution for each range, and the
reason the clean and slightly silty sands and gravels carry no ranges.

**Proposed (unconfirmed):** The fines content ranges follow the USCS boundaries between
coarse-grained soils with fines (more than 5 and at most 50 percent fines) and fine-grained
soils (50 percent fines or more).

**Answer:**

---

## IN-07 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** The filter D15 ranges by category — Sand 0.1–1.0 mm, Sand with gravel 0.5–3.0 mm,
Gravel with sand 3.0–10.0 mm, Gravel 10.0–50.0 mm.

**Needed:** Literature citation or engineering-judgment attribution, including the reasoning for
the overlap between the Sand and Sand with gravel ranges.

**Answer:**

---

## IN-08 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** Range-resolved quantities are sampled from uniform distributions, and the base
soil D85, the base soil fines content, and the filter D15 are sampled independently of one
another (including D85 and fines content of the same soil).

**Needed:** Engineering basis or engineering-judgment attribution for the uniform distribution
and for independent sampling of D85 and fines content.

**Proposed (unconfirmed):** With only a classification or category known, a uniform
distribution takes no position on where within the range the soil lies.

**Answer:**

---

## IN-09 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** The category 3 floor of the no-erosion criterion: when 4 × D85B is smaller than
the category 2 limit (0.7 mm, or 0.5 mm dispersive), the category 2 limit is used. The particle
retention check applies the floor; the Foster and Fell no-erosion boundary does not.

**Needed:** Literature citation or engineering-judgment attribution for the floor, and
confirmation of whether the Foster and Fell no-erosion boundary should apply it too.

**Proposed (unconfirmed):** The floor corresponds to the instruction in published filter
criteria to use the category 2 limit when 4 × D85B is less than it.

**Answer:**

---

## IN-10 — Engineering Basis — `06-soil-classification-method.mdx`

**Regarding:** The soil classification method counts every realization that fails the
no-erosion criterion as continuing erosion, although a filter coarser than the no-erosion limit
may still seal after some or excessive erosion.

**Needed:** Engineering basis or engineering-judgment attribution for this treatment.

**Proposed (unconfirmed):** Without gradation envelopes the some-erosion and excessive-erosion
boundaries cannot be evaluated, so the screening method resolves the uncertainty conservatively.

**Answer:**

---

## IN-11 — Engineering Basis — `07-gradation-method.mdx`

**Regarding:** When a base soil band's broad-grading assessment is undetermined (Cu and Cc
cannot be calculated) and no answer is supplied, the band is treated as not broadly graded. For
a gravelly band with less than 15 percent fines, this skips regrading on the No. 4 sieve.

**Needed:** Engineering basis or engineering-judgment attribution for this default, or
confirmation that the opposite default (broadly graded, therefore regraded) is intended.

**Answer:**

---

## IN-12 — Decision — `07-gradation-method.mdx`

**Regarding:** The toolbox manual's Excessive Erosion Boundary section says the boundary
depends on whether the base soil is dispersive, but the model's excessive erosion boundary does
not depend on dispersivity.

**Needed:** Confirmation of which is intended, and whether this document or the toolbox manual
should be corrected.

**Answer:**

---

## IN-13 — Engineering Basis — `07-gradation-method.mdx`

**Regarding:** The screening probability of continuing erosion is the sum of the Foster and
Fell probabilities of continuing and excessive erosion.

**Needed:** Literature citation or engineering-judgment attribution for treating excessive
erosion as continuing erosion at the screening level.

**Answer:**

---

## IN-14 — Decision — `07-gradation-method.mdx`

**Regarding:** The probability always comes from the Foster and Fell evaluation of the original
filter gradation; the adjusted (segregated or washed-out) filter gradation only decides whether
that evaluation runs.

**Needed:** Confirmation that this is the intended screening treatment and the wording of its
basis, or a statement of how the adjusted gradation should enter the probability (for example,
the larger of the two results).

**Answer:**

---

## IN-15 — Engineering Basis — `07-gradation-method.mdx`

**Regarding:** The probability of continuing erosion does not consider the permeability
(drainage) criterion of the filter, although the toolbox evaluation checks it.

**Needed:** Engineering basis or engineering-judgment attribution for excluding drainage from
the continuation node.

**Proposed (unconfirmed):** The continuation node addresses whether the filter retains the
eroding base soil; drainage bears on other aspects of performance.

**Answer:**

---

## IN-16 — Decision — `07-gradation-method.mdx`

**Regarding:** When a filter band does not reach 15 percent passing, its D15 is undetermined and
the Foster and Fell division takes it as zero. With the fine band's D15 undetermined, every
erosion proportion except no erosion is zero and the probability of continuing erosion is 0,
even for a coarse filter whose coarse band fails the particle retention check. With only the
coarse band's D15 undetermined, the result depends only on whether the fine band's D15 reaches
the continuing erosion boundary of each representative gradation.

**Needed:** Confirmation that this treatment is intended and the wording of its basis, or a
statement of how an undetermined filter D15 should be handled (for example, rejecting the input
or taking the probability as 1.0).

**Answer:**

---

## IN-17 — Engineering Basis — `07-gradation-method.mdx`

**Regarding:** The broad-grading assessment treats a band as a gravel when its gravel content
exceeds 50 percent of the band, rather than when its gravel content exceeds its sand content as
in ASTM D2487. A band with more gravel than sand but no more than 50 percent gravel is held to
the sand limit Cu ≥ 6; with less than 15 percent fines it is more often taken as not broadly
graded and not regraded, giving a larger D85B and a less restrictive no-erosion limit.

**Needed:** Engineering basis or engineering-judgment attribution for the 50 percent rule, or
confirmation that the ASTM D2487 comparison of gravel with sand is intended.

**Answer:**

---

## IN-18 — Engineering Basis — `07-gradation-method.mdx`

**Regarding:** When a base soil band's fines content is undetermined (its gradation does not
extend down to 0.075 mm), the band is treated as having less than 15 percent fines; when its
gravel content is undetermined, it is treated as having no particles larger than the No. 4
sieve; and when the fine band's fines content is undetermined, the particle retention check uses
base soil category 4. These defaults can skip regrading and can raise or lower the no-erosion
limit.

**Needed:** Engineering basis or engineering-judgment attribution for these defaults, or a
statement of how an undetermined fines or gravel content should be handled (for example,
rejecting the input).

**Answer:**

---
