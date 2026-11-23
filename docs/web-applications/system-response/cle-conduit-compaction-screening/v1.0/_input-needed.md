# Input Needed — Concentrated Leak Erosion Conduit Compaction Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document. IN-06 and IN-12 asked questions owned by the CLE Common Methods
manual; they are consolidated there (its IN-11 and IN-14) and their admonitions have been removed
from this manual.

---

## IN-01 — Applicability — `02-model-overview.mdx`

**Regarding:** The scope of the flaw. The model scores only a continuous zone of poorly
compacted fill adjacent to the conduit; the typical event tree for a crack along an embedded
structure also names a low-stress zone (differential settlement, arching over the conduit),
and erosion into a defective conduit is a further conduit-related mechanism.

**Needed:** Whether a low-stress zone or hydraulic fracture along the conduit is intended to
be screened with this model, with another model, or not at the screening level, and whether
erosion into a defective conduit is outside the model's scope.

**Proposed (unconfirmed):** The model screens poor compaction adjacent to the conduit only;
low-stress zones and erosion into the conduit are separate failure modes it does not address.

**Answer:** The model screens poor compaction adjacent to the conduit only. A low-stress zone or
hydraulic fracture along the conduit is not evaluated at the screening level (embankment placed
against a conduit is screened only for poor compaction), and erosion into a defective conduit is
a separate failure mode, internal migration into the conduit, outside this model's scope. (from
Oct 2025 methodology document)

---

## IN-02 — Definition — `03-input-parameters.mdx`

**Regarding:** Which soil the core soil classification describes for this model (it selects
the default critical shear stress range): the earthfill adjacent to the conduit, or the core.

**Needed:** The soil the user should classify, and how to choose when the fill adjacent to
the conduit differs from the core.

**Proposed (unconfirmed):** The earthfill adjacent to the conduit, since that is the soil
whose walls the concentrated leak erodes.

**Answer:**

---

## IN-03 — Definition — `03-input-parameters.mdx`

**Regarding:** Fuller definitions of the conduit-factor categories.

**Needed:** (1) Whether "round pipe not encased" includes corrugated metal and other flexible
pipes, and which choice applies to conduits not listed (cast-in-place rectangular or
horseshoe conduits, concrete box culverts); (2) whether "no formal compaction" also covers
poor compaction in very thick lifts without moisture control; (3) the trench widths, depths,
and side slopes that separate the wide, medium, and narrow trench categories (only the wide
category has a stated slope limit, flatter than 1H:1V). Cite the defining table of Fell et
al. (2024) if the categories come from it.

**Proposed (unconfirmed):** "Round pipe not encased" includes corrugated metal pipe; "no
formal compaction" covers poor compaction with very thick lifts and no moisture control; the
narrow, deep trench is one backfilled with soil.

**Answer:**

Note (Oct 2025 methodology document): the category names given there are "round pipe not
encased in concrete including corrugated metal pipe" and "no formal compaction or poor
compaction", which confirm the proposed answer to items (1) for corrugated metal pipe and (2);
these wordings are now in the manual. The wall or cliff model's equivalent category adds "very
thick lifts, no moisture control". The document gives no rule for unlisted conduit shapes and no
trench dimensions for item (3), and names no defining table.

---

## IN-04 — Definition — `03-input-parameters.mdx`

**Regarding:** What observation qualifies as "leakage adjacent to the conduit" for the flaw
override.

**Needed:** The qualifying observations (for example, seepage emerging along the outside of
the conduit at its outlet, wet areas over the conduit alignment on the downstream slope, flow
carrying fines), and whether leakage into the conduit through its joints qualifies.

**Answer:**

Note (Oct 2025 methodology document): leakage observed adjacent to the conduit and leakage
into the conduit (or known open defects in it) are treated as separate observations; leakage into
the conduit is evidence for internal migration into the conduit, not for this model's override.
The document does not list the qualifying observations of leakage adjacent to the conduit.

---

## IN-05 — Applicability — `03-input-parameters.mdx`

**Regarding:** The model recognizes only a diaphragm filter around the conduit as a filter on
the failure pathway.

**Needed:** Whether the user should answer yes for other filters that intercept the zone along
the conduit (a chimney or blanket filter the conduit passes through, a filter envelope around
the downstream portion of the conduit), or whether those are intended to be left uncredited.

**Answer:**

---

## IN-06 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The default initial pipe diameter (triangular: low 5 mm, most likely 10 mm,
high 12.5 mm).

**Needed:** Literature source or engineering-judgment attribution. Same question as CLE Common
Methods IN-11.

**Answer:** Consolidated into CLE Common Methods IN-11 (default initial pipe diameter ranges).

Note (Oct 2025 methodology document): the document gives the same ranges (core 2-3-5 mm,
conduit 5-10-12.5 mm, wall or cliff 5-5-10 mm, foundation or abutment 2-3-5 mm) and says the
initial pipe diameter "is also informed by Fell et al. (2024) depending on the CLE mechanism"
(this attribution was added to 06-initiation.mdx of the CLE Common Methods manual), but it does
not explain the differences between the ranges.

---

## IN-07 — Bibliography — `04-flaw-assessment.mdx`

**Regarding:** The four conduit factors and their risk factors (3 for the conduit type and
surround; 2 each for cutoff collars, compaction adjacent to the conduit, and trench details),
and the absence of a flaw-continuity stage in this model.

**Needed:** The table of Fell et al. (2024) that gives the factors and weights for poor
compaction adjacent to a conduit, or the engineering-judgment attribution; and the basis for
applying no flaw-continuity stage (see the CLE Common Methods Flaw-Continuity Stage section).

**Answer:**

Note (Oct 2025 methodology document): the four factors (conduit type, seepage collars,
compaction adjacent to the conduit, trench size during construction) are stated to follow Fell et
al. (2024) for poor compaction adjacent to a conduit; no table number, risk factors, or reason
for omitting a flaw-continuity stage is given.

---

## IN-08 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The cutoff-collar likelihood factors (Absent 1, Present 3, Unknown 3).

**Needed:** Why collars present raise the likelihood of a flaw, why no intermediate value is
used, and why Unknown scores the same as Present. Source table or engineering-judgment
attribution. Also the site conditions under which the collar scores should not be relied on
(the "When it may not hold" line of Assumption 3 in `06-assumptions-and-limitations.mdx`).

**Proposed (unconfirmed):** Fill around cutoff collars is difficult to compact, so collars
increase the likelihood of a poorly compacted zone; Unknown takes the unfavorable value so a
missing record does not lower the screening result. The scores may not hold where the fill
around the collars is known to have been compacted to the standard of the rest of the fill.

**Answer:** All cutoff collars present are assumed to be poorly detailed, which Fell et al. (2024)
scores as more likely (LF = 3), so no intermediate value is used; when their presence is unknown,
collars are assumed to exist, so Unknown scores the same as Present. The scores overstate the
likelihood where the collars are known to be well detailed and the fill around them well
compacted. (from Oct 2025 methodology document)

---

## IN-09 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The likelihood factors of the conduit type and surround (1, 2, 3, 4; Unknown 3),
the compaction adjacent to the conduit (1, 2, 3, 4; Unknown 3), and the trench details (wide 2,
medium 3, narrow 4; Unknown 3).

**Needed:** The source table of Fell et al. (2024) or the engineering-judgment attribution,
including the Unknown score of 3 for each factor and why the trench factor has no choice
scored 1.

**Answer:**

Note (Oct 2025 methodology document): the Unknown assumptions are stated as LF = 3 for the
conduit type, "more likely" (LF = 3) for compaction adjacent to the conduit, and a trench of
medium width, depth, and slope (LF = 3) for the trench; the trench assumption is now in the
manual. The document's general screening policy is that an Unknown selection assumes
conservative conditions. It gives no source table and does not explain why the trench factor has
no choice scored 1.

---

## IN-10 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** The flaw-probability curve (weighted sum 11, 14, 17, 20, 28, 36 →
1.5e-4, 3e-4, 6e-4, 2e-3, 1e-2, 8e-2), recorded in the model as the curve for the
"pool of record plus 20 percent" loading condition and applied at every pool level.

**Needed:** (1) The table or figure of Fell et al. (2024) giving the six points; (2) a
definition of the "pool of record plus 20 percent" loading condition; (3) the basis for using
that one loading condition's curve at every pool level when the source may tabulate others
(below the pool of record, first filling).

**Answer:**

Note (Oct 2025 methodology document): the document states that the above-pool-of-record
probabilities of Fell et al. (2024) are used for every CLE mechanism, regardless of headwater,
as a conservative choice; this supports item (3). It gives no table or figure for the six
points and does not define "pool of record plus 20 percent".

---

## IN-11 — Engineering Basis — `04-flaw-assessment.mdx`

**Regarding:** (1) Placing the flaw at the bottom of the conduit rather than at its haunches or
springline; (2) keeping it there when leakage is observed, whatever the elevation at which the
leakage emerges.

**Needed:** Literature source or engineering-judgment attribution.

**Proposed (unconfirmed):** The bottom of the conduit is the lowest elevation a flaw along the
conduit can occupy, so initiation can begin at the lowest pool and the net head is largest
there (the seepage path is also longest there, partly offsetting it); leakage along a conduit
follows the conduit, so its emergence point does not locate the flaw better than the conduit.

**Answer:**

Note (Oct 2025 methodology document): the document places the base of the flaw at the
bottom elevation of the conduit, confirming item (1) without a basis. It also states, for all
compaction mechanisms, that observed leakage sets the base of the flaw to the leakage exit
elevation; the model does not do this for the conduit (base of flaw unchanged under the
override), so that statement was not adopted.

---

## IN-12 — Engineering Basis — `05-event-tree.mdx`

**Regarding:** No flow-limitation credit for a conduit flaw (probability of no flow limitation
fixed at 1.0), even where an upstream facing or cutoff wall is present.

**Needed:** Literature source or engineering-judgment attribution. Same question as CLE Common
Methods IN-14 item (3).

**Proposed (unconfirmed):** An upstream facing or cutoff wall does not reliably seal the zone
around a conduit that passes through or beneath it, so no credit is taken (conservative).

**Answer:** Consolidated into CLE Common Methods IN-14 (flow-limitation conventions, item 3).

Note (Oct 2025 methodology document): the document identifies Table 13.3 of Fell et al. (2024)
as the source of the flow-limitation probabilities. It predates the combination and gating
conventions (it describes a single selected element), so it gives no basis for items (1) to (3).
(Same note as CLE Common Methods IN-14.)

---
