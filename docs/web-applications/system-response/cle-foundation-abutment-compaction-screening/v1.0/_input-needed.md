# Input Needed — CLE Foundation/Abutment Compaction Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document. Questions shared by the whole CLE family (the length unit, the
log-linear interpolation, the flaw-continuity curve, the normal-pool heuristic in general, the
critical shear stress table, and the default initial pipe diameter ranges) are asked once in the
CLE Common Methods manual and are not repeated here.

---

## IN-01 — Applicability — `03-input-parameters.mdx`

**Regarding:** The foundation and abutment contacts are two alternative flaw locations selected by
the user, one per run.

**Needed:** How the user chooses between them for a given embankment (for example, what makes a
contact an abutment contact), and whether an embankment with concerns at both contacts is
evaluated once for each, with the larger result or both results carried forward.

**Answer:**

---

## IN-02 — Applicability — `03-input-parameters.mdx`

**Regarding:** The foundation material is either soil or rock; no choice describes a contact that
is partly soil and partly rock.

**Needed:** How the user selects the material for a mixed contact (for example, an alluvial valley
floor against rock abutments, or weathered rock grading to soil).

**Answer:**

---

## IN-03 — Definition — `03-input-parameters.mdx`

**Regarding:** The foundation preparation choices (Compacted soil; Regular or treated rock surface;
Irregular or poorly prepared) and the contact-zone compaction method choices (Special methods with
good documentation; Special methods; Bulldozer, layer at the limit of compaction; Poor compaction,
thick layers), described in the document only by their names.

**Needed:** A definition of each choice, or the table in Fell et al. (2024) that defines them.

**Answer:**

---

## IN-04 — Definition — `03-input-parameters.mdx`

**Regarding:** The filter-presence selection along the foundation or abutment contact.

**Needed:** What counts as a filter intercepting the pathway along the contact (for example, a
foundation filter or drain downstream of the core, a chimney filter reaching the foundation, a
filter blanket on an abutment), and which soils are supplied as the base soils to the
continuation method (contact-zone fill, core soil, foundation soil, or each).

**Answer:**

---

## IN-05 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** An abutment-contact flaw is placed one third of the way from the normal pool to
the crest.

**Needed:** The abutment-specific basis: why one elevation represents a flaw that can lie anywhere
up the valley wall, and why the normal-pool heuristic is used rather than, for example, the
lowest abutment elevation below normal pool or a user-supplied elevation, given that the
placement is unconservative for a flaw lower on the abutment (negligible SRP up to the heuristic
elevation above normal pool; Assumption 2 in `06-assumptions-and-limitations.mdx`). Literature
source or engineering-judgment attribution.

**Answer:**

---

## IN-06 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Risk factors 3 (foundation preparation), 2 (contact-zone compaction method), and 1
(section geometry).

**Needed:** The table in Fell et al. (2024) that assigns these weights, or the engineering-judgment
attribution.

**Answer:**

---

## IN-07 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Foundation preparation likelihood factors: 1 for compacted soil and for a regular or
treated rock surface; 3.5 for irregular or poorly prepared; 3.5 for Unknown.

**Needed:** The source table in Fell et al. (2024) or the engineering-judgment attribution,
including why Unknown scores the same as irregular or poorly prepared and why the factor has no
intermediate categories between 1 and 3.5.

**Answer:**

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Contact-zone compaction method likelihood factors: 1, 2, 3, 4 for the four methods,
and 3 for Unknown.

**Needed:** The source table in Fell et al. (2024) or the engineering-judgment attribution,
including the reason Unknown scores the same as bulldozer compaction.

**Answer:**

---

## IN-09 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Section geometry banding: base width thresholds 50, 30, 15; width-to-height ratio
thresholds 2, 0.75, 0.25; the larger of the two likelihood factors governs.

**Needed:** The length unit the base width thresholds assume (applied without unit conversion),
and the source table in Fell et al. (2024) or the engineering-judgment attribution.

**Answer:**

---

## IN-10 — Applicability — `04-flaw-assessment.mdx`

**Regarding:** The geometry factor (and the initiation seepage path) uses the section supplied; for
an abutment contact the section through the flaw is lower and narrower than the maximum section.

**Needed:** Whether the user supplies the section at the flaw location, or the maximum section with
the base width and height at the flaw entered in the optional flaw base width and flaw height
inputs.

**Answer:**

---

## IN-11 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** Weighted-sum curve 9, 11, 13, 18, 24 → negligible, 1E-4, 7E-4, 1E-2, 1E-1.

**Needed:** The figure or table in Fell et al. (2024) for a flaw along the foundation or abutment
contact, or the engineering-judgment attribution, including the 7E-4 value at 13 (the wall or
cliff compaction model uses 1E-3 on the same weighted sums).

**Answer:**

---

## IN-12 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** (1) A well-prepared surface (foundation preparation likelihood factor of 1) forces
the flaw probability to a negligible value regardless of the other factors; (2) the model accepts
no observation (seepage, wet spots, sinkholes along the contact) that sets the flaw probability to
1.0, unlike the core, conduit, and wall or cliff compaction models.

**Needed:** Literature source or engineering-judgment attribution for each.

**Answer:**

---

## IN-13 — Applicability — `05-event-tree.mdx`

**Regarding:** Roof support is the minimum over the embankment materials the user lists; the pipe
lies between the fill and the foundation or abutment.

**Needed:** Which materials the user lists for a contact flaw: whether the foundation soil (for a
soil foundation) is listed with the fill, and whether only the contact-zone fill or every
embankment zone the contact passes beneath is listed.

**Answer:**

---

## IN-14 — Applicability — `03-input-parameters.mdx`

**Regarding:** The model assigns one critical shear stress to the pipe wall, from the core soil
classification or a user-supplied distribution, although a pipe along the contact lies against both
the contact-zone fill and the foundation or abutment surface. The clean and nearly clean sand and
gravel classes (SP-SM, SW, SP, GP-GM, GW, GP) are not accepted as the classification.

**Needed:** Which soil the classification (and any user-supplied critical shear stress
distribution) should describe for a contact flaw: the contact-zone fill, an erodible soil
foundation forming the floor of the pipe, or the more erodible of the two; and how the user should
proceed where the erodible material at the contact is a clean or nearly clean sand or gravel.

**Answer:**

---
