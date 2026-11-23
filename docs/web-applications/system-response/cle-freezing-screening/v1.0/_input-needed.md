# Input Needed — Concentrated Leak Erosion Freezing Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

Questions shared by the whole CLE family (the certain initiation of an open crest crack, the
log-linear weighted-sum interpolation, the crest-crack filter gate, the roof-support,
crack-filling and flow-limitation conventions, and the family unit system) are asked once, in the
CLE Common Methods manual's own `_input-needed.md`, and are not repeated here.

---

## IN-01 — Definition — `02-model-overview.mdx`

**Regarding:** The physical mechanism by which freezing opens a transverse crack at the crest,
and why each of the three flaw factors bears on it — a longer freeze duration, the crest soil
classification, and the surface cover over the core (paved, gravel road, or no road or pathway,
with a paved crest scoring as the least likely condition).

**Needed:** A description of the mechanism and of the direction of each factor, with a
literature source where one applies.

**Proposed (unconfirmed):** Freezing of the crest soils causes contraction and ice segregation
that open transverse cracks, which deepen and widen with the duration of freezing; fine-grained
soils are the most susceptible, and a surface cover kept clear of snow, such as a paved road,
changes the insulation of the crest and so the cracking. In particular, confirm the direction of
the surface-cover factor.

**Answer:** Freezing draws water into the crest soils by capillary action, where it forms ice lenses that heave the soil and open cracks. The flaw probability is scored from the climate (freeze duration, most heavily weighted, longer duration more likely), the crest soil classification, and the surface cover over the core; the crest or surface-cover selections of Fell et al. (2024) are adapted to Paved (concrete or sealed pathway, LF = 2), Gravel road (LF = 3), and No road or pathway (LF = 4), so a paved crest is the least likely condition, as the model implements (from Oct 2025 methodology document)

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The criterion for placing a site in one of the four freeze-duration climate
categories (below freezing 3 months or more; 1 to 3 months; up to a month; above freezing
except possibly overnight).

**Needed:** The temperature measure "below freezing" refers to (mean daily air temperature,
daily minimum, ground temperature at the crest, …), how the duration is counted (continuous or
cumulative; typical or severe winter), and the source of the categories in Fell et al. (2024) if
they are defined there.

**Answer:**

Note (Oct 2025 methodology document): the document uses the same four freeze-duration categories (below freezing for 3 months or more; 1 to 3 months; up to a month; above freezing except possibly overnight for a couple of days) but does not define the temperature measure, how the duration is counted, or the source of the categories. Left open.

---

## IN-03 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The crest-soil likelihood factor of 3 assigned to an Unknown crest soil (no
class listed). The value is below the 4 of GC and MH and the 3.5 of CL-ML, so an Unknown crest
scores lower than a crest known to be of any of those classes.

**Needed:** The crest-soil likelihood factor of 3 assigned to an unknown crest soil (no class listed) requires an engineering basis. State whether Unknown is a category of the source table of Fell et al. (2024) or a screening choice, and if the latter, provide the engineering-judgment attribution and state why an intermediate rather than the most crack-prone score is adopted for an unknown soil at the screening level. The value lies below the scores of GC and MH (4) and CL-ML (3.5), so an unknown crest soil scores lower than a crest known to be of any of those classes.

**Proposed (unconfirmed):** An intermediate value representing the most common fine-grained
crest soils (SM, GM, ML, SC, CL all score 3).

**Answer:**

---

## IN-04 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The weighted-sum curve for frost cracking (Σ = 13, 16, 21, 24 → 0.001, 0.01,
0.1, 0.9) and its lower threshold of 13, below which the raw flaw probability is zero.

**Needed:** The table or figure of Fell et al. (2024) that gives this relationship, or the
engineering-judgment attribution, and why a weighted sum below 13 is treated as incompatible
with a continuous frost crack rather than as a small probability.

**Proposed (unconfirmed):** The frost-cracking relationship between the weighted sum and the
probability of cracking of Fell et al. (2024), with the threshold at the lowest weighted sum the
source tabulates.

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The treatment of SP-SM, SW, SP, GP-GM, GW, and GP as crest soils that cannot
frost-crack — set aside when other classes are listed, and making the mechanism inapplicable
(no crack, negligible SRP, observation override not consulted) when they are the only classes
listed — while the silty classes SM, GM, and ML, which can also be non-plastic, are scored.

**Needed:** The treatment of SP-SM, SW, SP, GP-GM, GW, and GP as crest soils in which the mechanism cannot open a crack — set aside when other classes are listed, and making the mechanism inapplicable when they are the only classes listed — requires an engineering basis, including why the silty classes SM, GM, and ML, which can also be non-plastic, are scored. Provide the literature source or the engineering-judgment attribution.

**Proposed (unconfirmed):** Clean and nearly clean sands and gravels, with less than 12 percent fines, are cohesionless and cannot sustain an open crack, so a crest built only of them cannot develop the crack. Confirm or replace.

**Answer:**

---

## IN-06 — Applicability — `04-flaw-assessment.mdx`

**Regarding:** The crack depths (6, 4, 2, 1 ft) are tabulated in feet and subtracted from the
crest elevation with no unit conversion, so elevations entered in meters would place the bottom
of the crack 6, 4, 2, or 1 m below the crest — about 3.3 times too deep.

**Needed:** Whether the model is to be used only with elevations in feet, or how a user working
in SI units should proceed, so the limitation can be stated. (The family-level question is
marker IN-01 of the CLE Common Methods manual.)

**Answer:** Consolidated into CLE Common Methods IN-01 (unit system of the CLE family).

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The crack depths by climate category (sub-arctic 3 months or more 6 ft; sub-arctic
1 to 3 months 4 ft; temperate up to a month 2 ft; above freezing 1 ft), and their independence
from the crest soil and the surface cover.

**Needed:** Literature source (for example, a frost-penetration or frost-crack-depth
relationship) or the engineering-judgment attribution.

**Proposed (unconfirmed):** The depths represent the depth of frost penetration into the crest
for each freeze duration, over which frost cracks can extend.

**Answer:**

---
