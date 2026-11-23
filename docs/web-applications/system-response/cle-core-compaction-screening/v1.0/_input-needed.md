# Input Needed — Concentrated Leak Erosion Core Compaction Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

The bases of the methods this model shares with the CLE family (the log-linear interpolation of
the flaw-probability curves, the flaw-continuity curve, the normal-pool heuristic for the base
of the flaw, the default critical shear stress and initial pipe diameter ranges, and the
progression tables) and the intended length unit are requested in the CLE Common Methods manual and are not repeated
here.

---

## IN-01 — Definition — `03-input-parameters.mdx`

**Regarding:** The four core compaction categories (Well compacted, Poorly compacted, Very
poorly compacted, Unknown), offered without a definition.

**Needed:** What construction practice or evidence each category represents (for example,
compaction equipment, lift thickness, moisture control, and density testing), or the table of
Fell et al. (2024) that defines them; and when Unknown should be selected rather than a judged
category, given that Unknown scores between Poorly compacted and Very poorly compacted.

**Answer:** Each category describes the compaction equipment and effort used to place the core. Well
compacted: soil compacted by suitable rollers, with discing and a layer thickness appropriate to
the equipment. Poorly compacted: soil placed and compacted by bulldozer without compaction by
rollers, or rolled in thick layers. Very poorly compacted: no formal compaction (for example,
material pushed into place by excavator or bulldozer in very thick layers). Unknown: selected
whenever the records do not support one of the three judged categories; it is scored
conservatively so that missing documentation does not lower the screening result. (from Oct 2025
methodology document)

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** The optional user-supplied flaw base width W and flaw height H_s, which replace the
dimensions derived from the embankment section in the continuity scoring only.

**Needed:** What W and H_s are meant to represent and when they should be supplied in place of
the derived dimensions.

**Proposed (unconfirmed):** W is the horizontal width of the section at its base, measured from
the upstream toe to the first drain or filter zone the pathway meets (or toe to toe when there
is none), and H_s is the height from the crest to the lower of the two toes.

**Answer:**

Note (Oct 2025 methodology document): the geometry inputs listed for this mechanism are the
width at the top of the core and the core height, which suggests the continuity factor describes
the core rather than the whole embankment; the document does not define the base width W or say
when a user-supplied W or H_s should replace the section-derived values.

---

## IN-03 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The choice of the three scored factors and their risk factors (core compaction 3,
section geometry 2, borrow variability 1).

**Needed:** The table of Fell et al. (2024) from which the factors and weights are taken, or the
engineering-judgment attribution.

**Answer:**

Note (Oct 2025 methodology document): the method is stated to be adapted from Fell et al.
(2024), with the flaw probability a function of core compaction (equipment, layer thickness,
moisture content), core geometry, borrow area variability, and site supervision (the last two
combined in the fixed factor). The risk factors 3, 2, 1 and the source table are not given.

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

Note (Oct 2025 methodology document): the document describes the continuity of the flaw as
taken from the Compaction Method categories of Fell et al. (2024) Table 6.4, with "the first
two categories ... combined into a single category and assigned probability of 0.1 for the
continuity of the flaw"; the mapping onto the model's curve is unclear (left open as CLE Common
Methods IN-04). For the likelihood factors it gives only the general screening policy that an
Unknown selection assumes conservative conditions, which supports the proposed rationale; it
does not explain the values 1, 3, and 4, the absence of a category scored 2, or the value 3.5.

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The section geometry bands (base width boundaries 50, 30, and 15; width-to-height
ratio boundaries 2, 0.75, and 0.25) and the rule that the larger of the two scores governs.

**Needed:** The source table of Fell et al. (2024) or the engineering-judgment attribution.

**Answer:**

Note: the length-unit part of this question (the base-width boundaries are applied with no unit
conversion) is consolidated into CLE Common Methods IN-01 (intended length unit) and has been
removed from the admonition.

---

## IN-06 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The borrow variability factor and its fixed likelihood factor of 2.5.

**Needed:** What the factor represents physically, why it is fixed rather than selected by the
user, and the basis for the value of 2.5.

**Answer:** The factor represents borrow area variability and site supervision, the two conditions of
the Fell et al. (2024) poor-compaction method that the user is not asked to describe. The model
assumes borrow area variability between minor and variable and site supervision between good and
moderate, and scores the combined factor at 2.5, midway between neutral (2) and more likely (3),
as a fixed screening assumption. (from Oct 2025 methodology document)

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The raw flaw probability curve (weighted sum 6, 9, 11, 13, 18, 24 → negligible,
1e-4, 5e-4, 2e-3, 4e-2, 0.5).

**Needed:** The figure or table of Fell et al. (2024) from which the values are taken, or the
engineering-judgment attribution, including the basis for anchoring the curve at a negligible
probability at a weighted sum of 6, below the lowest attainable sum of 7.5.

**Answer:**

Note (Oct 2025 methodology document): the document states only that the flaw probabilities
are adapted from Fell et al. (2024) and that the above-pool-of-record probabilities are used at
every headwater; it gives no table or figure number for this curve and does not address the
anchor at a weighted sum of 6.

---

## IN-08 — Definition — `04-flaw-assessment.mdx`

**Regarding:** The leakage or wet-spot elevation, which becomes the base of the flaw (the invert
of a horizontal pipe through the core) under the observation override.

**Needed:** Which elevation the user should enter (for example, the elevation of the observed
seepage exit on the downstream face, or the lowest wet spot when several are observed), and the
basis for taking it as the invert of a horizontal pipe through the core.

**Answer:** The elevation at which the observed leakage through the embankment exits the downstream
face; the base of the flaw is set equal to this exit elevation. (from Oct 2025 methodology
document)

---
