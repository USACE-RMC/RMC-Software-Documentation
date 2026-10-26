# Input Needed — Overtopping Erosion Screening Technical Reference Manual (v1.0)

Answer inline and return this file (or paste its contents into the conversation). Leave an
Answer blank to keep that marker in place. Do not renumber — the IDs tie each entry to its
admonition in the document.

---

## IN-01 — Bibliography — `02-model-overview.mdx`

**Regarding:** WinDAM C, cited in Chapters 2, 5 and 7. Its former bibliography entry had no
year, version or full title, so it is cited in prose and was removed from `bib.json`.

**Needed:** Complete bibliographic details (author or agency, title, version or report number,
year, publisher, URL) for WinDAM C or its user's manual, and for DLBreach and EMBREA, which are
named in Chapter 2 with no source.

**Proposed (unconfirmed):** U.S. Department of Agriculture, Natural Resources Conservation
Service, WinDAM C software and user's manual, release year of the version used for comparison.

**Answer:**

---

## IN-02 — Decision — `03-input-parameters.mdx`

**Regarding:** Embankment height. It is a required input (must be greater than zero) but the
current model does not use it in any calculation.

**Needed:** Confirm whether to present it as a required descriptive input with no effect on
results (as written), or describe an intended role.

**Answer:**

---

## IN-03 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default Manning's roughness ranges per erodibility classification (0.025–0.040
Very Erodible, 0.030–0.045 Erodible, 0.035–0.045 Moderately Resistant, 0.035–0.050 Resistant,
0.040–0.050 Very Resistant) and the choice of a Uniform distribution for n.

**Needed:** Literature source (full bibliographic details for `bib.json`) or the
engineering-judgment attribution.

**Answer:**

---

## IN-04 — Bibliography — `03-input-parameters.mdx`

**Regarding:** The model attributes its erodibility classification to Briaud (2008), which is not
in the bibliography; the document cites Briaud et al. (2019) and Wibowo and Robbins (2018).

**Needed:** Which publication defines the classification and the default kd and τc ranges, with
full bibliographic details for any source to add.

**Proposed (unconfirmed):** Briaud, J.-L. (2008), "Case Histories in Soil and Rock Erosion:
Woodrow Wilson Bridge, Brazos River Meander, Normandy Cliffs, and New Orleans Levees," Journal of
Geotechnical and Geoenvironmental Engineering, 134(10).

**Answer:**

---

## IN-05 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default base duration t0 = 4.0 hours at the reference depth.

**Needed:** Literature source or engineering-judgment attribution for the default, or confirmation
that the base duration should be presented as a required site-specific input with no recommended
default.

**Answer:**

---

## IN-06 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default broad-crested weir coefficient Cd = 3.0 (US Customary units). The weir
equation is cited to Fell et al. (2015); the coefficient value is not.

**Needed:** Source or engineering-judgment attribution for the coefficient value.

**Proposed (unconfirmed):** A typical broad-crested weir coefficient for flow over an embankment
crest in US Customary units.

**Answer:**

---

## IN-07 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default Darcy-Weisbach friction factor f = 0.015 for flow over the grass cover.

**Needed:** Literature source (full bibliographic details) or engineering-judgment attribution.

**Proposed (unconfirmed):** The friction factor used with the CIRIA-based grass cover method of
Hughes and Thornton (2015).

**Answer:**

---

## IN-08 — Applicability — `03-input-parameters.mdx`

**Regarding:** The option to exclude the critical shear stress from the erosion equation.

**Needed:** The conditions under which an engineer should choose the Exclude option, and the basis
for that guidance.

**Proposed (unconfirmed):** The Overtopping Erosion Toolbox Notes state that, in the WinDAM C
evaluation process, the critical shear stress is typically conservatively assumed to be zero for
efficiency.

**Answer:**

---

## IN-09 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** Default correlations ρ(kd, τc) = −0.6 and ρ(τc, n) = −0.2.

**Needed:** Literature source (full bibliographic details) or engineering-judgment attribution for
each value.

**Proposed (unconfirmed):** The inverse kd–τc relationship reported by Hanson and Simon (2001),
"Erodibility of cohesive streambeds in the loess area of the midwestern USA," Hydrological
Processes 15:23–38 (listed in the previous bibliography but never cited).

**Answer:**

---

## IN-10 — Engineering Basis — `04-hydrograph-generation.mdx`

**Regarding:** Duration scaling law t_H = t0 (H / H_ref)^(1/1.8), with H_ref = 0.5 ft (0.15 m).

**Needed:** Literature source or engineering-judgment attribution for the exponent and the
reference depth, including what reservoir behavior the exponent represents. Also a source or
attribution for the previous edition's unsourced guidance that reservoirs with large storage
relative to inflow have long overtopping events that lengthen slowly with depth, and reservoirs
with small storage short, sharply peaked events (removed from Chapter 7 pending an answer).

**Answer:**

---

## IN-11 — Engineering Basis — `04-hydrograph-generation.mdx`

**Regarding:** The gamma hydrograph form, the default shape parameter a = 3.5, and the time scale
that gives the curve the volume of a triangular hydrograph of base t_H (the factor of 2).

**Needed:** Literature source or engineering-judgment attribution for each.

**Answer:**

---

## IN-12 — Engineering Basis — `04-hydrograph-generation.mdx`

**Regarding:** The simulation ends each hydrograph at t_H, when the discharge is still about 7
percent of the peak (about 2 percent of the volume omitted) with the default shape parameter. The
previous edition described the recession as continuing asymptotically.

**Needed:** Engineering basis or attribution for ending the hydrograph at t_H, and confirmation of
the stated effect on results.

**Answer:**

---

## IN-13 — Engineering Basis — `05-erosion-model.mdx`

**Regarding:** Breach criterion: breach when the uniformly retreating downstream face reaches the
upstream edge of the crest.

**Needed:** Literature source or engineering-judgment attribution.

**Answer:**

---

## IN-14 — Engineering Basis — `05-erosion-model.mdx`

**Regarding:** Minimum critical erosion depth of 2.0 ft (0.6 m).

**Needed:** Literature source or engineering-judgment attribution.

**Answer:**

---

## IN-15 — Engineering Basis — `06-monte-carlo-simulation.mdx`

**Regarding:** Implied correlation structure: kd and n associated only through τc, so
ρ(kd, n) = ρ(kd, τc) × ρ(τc, n).

**Needed:** Literature source or engineering-judgment attribution.

**Answer:**

---

## IN-16 — Decision — `07-assumptions-and-limitations.mdx`

**Regarding:** Assumptions 1 (homogeneous embankment), 2 (uniform face erosion), 9 (grass cover
the only protection), 10 (no non-erodible elements), 12 (normal flow depth on the face) and 14 (the
same material sample used at every overtopping depth), and the Chapter 3 advisory checks
(downstream slopes steeper than 1H:1V, base durations longer than one week), whose basis is
engineering judgment. Also Assumption 13: the erosion phase uses the slope gradient tanθ while the
grass cover phase uses sinθ.

**Needed:** The attribution wording to print for each (for example, the model developers, the Risk
Management Center, or a named review), and any supporting literature. For Assumption 13, confirm
whether the tanθ/sinθ difference is intended; if not, the model owner should review the
erosion-phase equations; if so, provide its basis and attribution.

**Answer:**

---

## IN-17 — Bibliography — `07-assumptions-and-limitations.mdx`

**Regarding:** The comparison of screening results with QRA response functions from USACE dam
safety studies (Benbrook, Cherry Creek, Delaware, Grapevine, J. Percy Priest, Keystone, Kinzua,
Lookout Point, Mojave, Painted Rock, Stillhouse Hollow, W. Kerr Scott and Wister Dams).

**Needed:** The report or study documenting the comparison (author, title, year, report number) or
the attribution wording to print, and how closely the screening curves matched.

**Answer:**

---

## IN-18 — Definition — `05-erosion-model.mdx`

**Regarding:** The friction factor f in q_c = f·u_c³ / (2 g sinθ) and VET_c = G_f·f / (2 g sinθ).
The model calls it the Darcy-Weisbach friction factor, but this form corresponds to the Fanning
friction factor; with the Darcy-Weisbach factor the denominator would be 8 g sinθ.

**Needed:** Which friction factor is meant, checked against Hughes and Thornton (2015), so that the
name, the default of 0.015 (IN-07) and the equations agree.

**Answer:**

---

## IN-19 — Definition — `05-erosion-model.mdx`

**Regarding:** The erosional limit G_f, tabulated as lb·s/ft³. Those units do not combine with f and
g (m/s²) to give a volume per unit crest length for VET_c. As evaluated, the US Customary result
(tabulated G_f, result divided by 0.3048²) and the SI result (G_f multiplied by 0.3048, no further
conversion) differ by 1/0.3048³, whereas a m²-to-ft² conversion requires 1/0.3048². The model owner
should check whether both unit systems give the same grass cover threshold.

**Needed:** The physical quantity G_f represents (with reference to Hughes and Thornton, 2015), its
consistent units, and confirmation of the US Customary and SI conversions.

**Answer:**

---

## IN-20 — Bibliography — `06-monte-carlo-simulation.mdx`

**Regarding:** The Gaussian copula and Latin Hypercube sampling, stated without a citation.

**Needed:** Literature sources with full bibliographic details for `bib.json`.

**Answer:**

---

## IN-21 — Engineering Basis — `03-input-parameters.mdx`

**Regarding:** The default overtopping depth range of 0.0 to 5.0 (ft in US Customary units; the
5.0 is not converted when SI is selected). The previous edition said only that it "covers most
screening scenarios."

**Needed:** Source or engineering-judgment attribution for the default range, or confirmation that
the range should be presented as a site-specific choice with no recommended default.

**Answer:**

---

## IN-22 — Bibliography — `07-assumptions-and-limitations.mdx`

**Regarding:** The statement that overtopping erosion of embankment dams often proceeds by headcut
formation and migration. The Overtopping Erosion Toolbox Notes page on the WinDAM C evaluation
process mentions headcut breach only in passing and does not support it.

**Needed:** A literature source with full bibliographic details for `bib.json`.

**Answer:**

---
