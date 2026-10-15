# Input Needed — CLE Core Compaction Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

The bases of the methods this model shares with the CLE family (the log-linear interpolation of
the flaw-probability curves, the flaw-continuity curve, the normal-pool heuristic for the base
of the flaw, the default critical shear stress and initial pipe diameter ranges, and the
progression tables) are requested in the CLE Common Methods manual and are not repeated here.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** The four core compaction categories (Well compacted, Poorly compacted, Very
poorly compacted, Unknown), offered without a definition.

**Needed:** What construction practice or evidence each category represents (for example,
compaction equipment, lift thickness, moisture control, and density testing), or the table of
Fell et al. (2024) that defines them; and when Unknown should be selected rather than a judged
category, given that Unknown scores between Poorly compacted and Very poorly compacted.

**Answer:**

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The optional user-supplied flaw base width W and flaw height H, which replace the
dimensions derived from the embankment section in the continuity scoring only.

**Needed:** What W and H are meant to represent and when they should be supplied in place of
the derived dimensions.

**Proposed (unconfirmed):** W is the horizontal width of the section at its base, measured from
the upstream toe to the first drain or filter zone the pathway meets (or toe to toe when there
is none), and H is the height from the crest to the lower of the two toes.

**Answer:**

---

## IN-03 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The choice of the three scored factors and their risk factors (core compaction 3,
continuity 2, borrow variability 1).

**Needed:** The table of Fell et al. (2024) from which the factors and weights are taken, or the
engineering-judgment attribution.

**Answer:**

---

## IN-04 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The compaction likelihood factors (Well compacted 1, Poorly compacted 3, Very
poorly compacted 4, Unknown 3.5).

**Needed:** The source of the values, why no category scores 2, and why Unknown is scored at 3.5
(above Poorly compacted) rather than at a central value; the table of Fell et al. (2024) they are
taken from, or the engineering-judgment attribution.

**Proposed (unconfirmed):** Unknown is scored toward the poorly compacted end of the scale as a
conservative screening posture, so that a core whose compaction cannot be judged is not
credited as better compacted than the evidence supports.

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The continuity bands (base width boundaries 50, 30, 15; width-to-height
boundaries 2, 0.75, 0.25) and the rule that the larger of the two scores governs.

**Needed:** The source table or the engineering-judgment attribution, and the unit of the
base-width boundaries (the model applies them in whatever length unit the elevations use, with
no conversion).

**Proposed (unconfirmed):** The base-width boundaries are in feet, so a user working in meters
should convert the section before running the model.

**Answer:**

---

## IN-06 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The borrow variability factor and its fixed likelihood factor of 2.5.

**Needed:** What the factor represents physically, why it is fixed rather than selected by the
user, and the basis for the value of 2.5.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The raw flaw probability curve (weighted sum 6, 9, 11, 13, 18, 24 → negligible,
1e-4, 5e-4, 2e-3, 4e-2, 0.5).

**Needed:** The figure or table of Fell et al. (2024) from which the values are taken, or the
engineering-judgment attribution, including the basis for anchoring the curve at a negligible
probability at a weighted sum of 6, below the lowest attainable sum of 7.5.

**Answer:**

---

## IN-08 — Definition — `04-flaw-assessment.mdx`

**Regarding:** The leakage or wet-spot elevation, which becomes the base of the flaw (the invert
of a horizontal pipe through the core) under the observation override.

**Needed:** Which elevation the user should enter (for example, the elevation of the observed
seepage exit on the downstream face, or the lowest wet spot when several are observed), and the
basis for taking it as the invert of a horizontal pipe through the core.

**Answer:**

---
