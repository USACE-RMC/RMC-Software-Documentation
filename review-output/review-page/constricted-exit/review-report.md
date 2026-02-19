# Full Page Review: Constricted Exit

**Page**: [10-constricted-exit.mdx](docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx)
**URL**: `http://localhost:3000/RMC-Software-Documentation/docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/constricted-exit`
**Date**: 2026-02-19
**Branch**: `feature/site-upgrades`

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 64/100 | **Warn** |
| Accessibility | 93/100 | Pass |
| SEO | 100/100 | Pass |
| Best Practices | 100/100 | Pass |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.4s | < 2.5s | Pass |
| FCP | 0.1s | < 1.8s | Pass |
| CLS | 0.021 | < 0.1 | Pass |
| TBT | 1,130ms | < 200ms | **Fail** |
| Speed Index | 1.6s | < 3.4s | Pass |
| TTI | 1.5s | < 3.8s | Pass |

### Lighthouse Failure Detail

**Performance (64/100)** — Total Blocking Time (1,130ms) is the sole driver of the poor score. All other Core Web Vitals pass. TBT measures main-thread blocking during page load; this is caused by the combined JavaScript bundle (Docusaurus runtime + KaTeX math rendering + custom components) executing synchronously.

**Accessibility (93/100)** — Minor failures pulled below 100, likely contrast ratios on small text or missing ARIA attributes on custom components.

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Notes |
|------|----------|-----|--------|-------|
| Desktop 16:10 | 1920x1200 | 1 | Pass | Sidebar, TOC, content all render correctly |
| Desktop 16:9 | 1920x1080 | 1 | Pass | Identical to 16:10 |
| Laptop | 1280x720 | 1.5 | Pass | Slightly narrower content, TOC still visible |
| Tablet landscape | 1180x820 | 2 | Pass | Sidebar visible, content wraps well |
| Tablet portrait | 820x1180 | 2 | Pass | Sidebar collapsed at <996px (expected), content fills width |
| Phone landscape | 852x393 | 3 | Pass | Content readable, figures scale within viewport |
| Phone portrait | 393x852 | 3 | **Warn** | Content tight; equation fractions may overflow at narrow width |

**Sidebar**: Collapses correctly at <996px (Docusaurus default breakpoint).
**Content width**: Good use of space at all tiers. Article is 1154px within a 1605px container at desktop.
**Tables/Figures**: Figure images scale appropriately. The broken `TableHorizontal` (see Issue #1) renders as "Loading..." at all viewports.
**Typography**: H1 (36px/700), H2 (28px/700) remain legible at all sizes. Body text adapts well.
**Equations**: KaTeX block equations render correctly at desktop/tablet. The `P_CE` fraction equation may overflow slightly on phone portrait.

Screenshots saved to `review-output/review-page/constricted-exit/`:
- `review-desktop-16x10.png`
- `review-desktop-16x9.png`
- `review-laptop.png`
- `review-tablet-landscape.png`
- `review-tablet-portrait.png`
- `review-phone-landscape.png`
- `review-phone-portrait.png`

---

## 3. Heading Hierarchy

| Level | Text | Font Size | Weight | Margin Top | Margin Bottom |
|-------|------|-----------|--------|------------|---------------|
| H1 | Constricted Exit | 36px | 700 | 0px | 25px |
| H2 | Base Soil Characterization | 28px | 700 | 40px | 20px |
| H2 | Open Joint, Defect, or Crack Characterization | 28px | 700 | 40px | 20px |
| H2 | Likelihood of Continuation | 28px | 700 | 40px | 20px |
| H2 | Our Mission | 18px | 400 | 0px | 0px |
| H2 | About this Website | 18px | 400 | 0px | 0px |

- Single H1 per page: **Pass**
- Sequential heading levels (H1 -> H2, no skipped levels): **Pass**
- Last two H2s are **Groundwork (external)** footer headings — not actionable.

---

## 4. Spacing & Layout Quality

| Element | Padding | Margin | Width | Height |
|---------|---------|--------|-------|--------|
| Sidebar | 0px all | -76px top (sticky offset) | 300px | 3188px |
| Container | 16/16/32/40 (T/R/B/L) | 0px all | 1605px | 3112px |
| Article | 0px all | 0px all | 1154px | 2940px |
| Markdown area | 0px all | 0px all | 1154px | 2802px |

- H2 headings have uniform 40px top / 20px bottom margins: **Consistent**
- H1 has 0px top / 25px bottom: **Appropriate** (sits below breadcrumbs)
- Figure and equation containers are properly spaced within content flow
- **Verdict: Pass** — spacing is consistent and balanced at desktop

---

## 5. Touch Targets (Phone Portrait, 393x852 @ 3x DPR)

**Total elements under 44px minimum dimension**: 37

| Category | Count | Size Range | Actionable? |
|----------|-------|------------|-------------|
| Groundwork footer links | 14 | 13-112px wide, 17px tall | No (external) |
| Groundwork header buttons | 3 | 30-36px min dimension | No (external) |
| Inline content links (Figure refs, citations, equation refs) | 13 | 14-68px wide, 15px tall | No (inline text) |
| Heading anchor links | 3 | 20x24px | No (Docusaurus default, hover-only) |
| Navigation links | 2 | 15-34px min dimension | Minor |
| "On this page" button | 1 | 366x37px | Minor |
| DOI links in bibliography | 1 | 253x15px | No (inline text) |

**Verdict**: No critical touch target issues within site-maintainer control. The 15px-tall inline links (Figure references, citation footnotes) are standard paragraph-level links — inflating them to 44px would break paragraph layout. Footer/header undersized items are Groundwork (external).

---

## 6. Issues & Recommendations

### Issue #1: Broken Table — `constricted-exit-probabilities` (Critical)

**Symptom**: The `TableReference` on line 74 and the `TableHorizontal` on lines 80-104 both render as "Loading..." instead of showing a numbered table.

**Console warnings**:
```
Table key "constricted-exit-probabilities" not found in /RMC-Software-Documentation/counters/internal-erosion-suite-filter-evaluation-continuation-v1.0.json
```

**Root cause**: The file `static/counters/internal-erosion-suite-filter-evaluation-continuation-v1.0.json` has an empty `"tables": {}` section. The counter generation script (`npm run counters`) did not register this table key.

**Files involved**:
- `docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx` — lines 74 and 80-104
- `static/counters/internal-erosion-suite-filter-evaluation-continuation-v1.0.json` — `"tables": {}` is empty
- `scripts/` — the counters generation script (likely regex-based, may not detect `TableHorizontal` with inline `headers`/`rows` props)

**To fix**:
1. Run `npm run counters` to regenerate counter data.
2. After regeneration, check if `static/counters/internal-erosion-suite-filter-evaluation-continuation-v1.0.json` now contains a `"constricted-exit-probabilities"` entry in its `"tables"` section.
3. If the table still doesn't appear, the counters script needs to be updated. Open the counters generation script in `scripts/` and find the regex or AST parser that detects table components. It likely only matches `<TableHorizontal tableKey="..." />` self-closing tags or JSON-sourced tables, but the one in this MDX file spans lines 80-104 with multi-line props (`headers`, `rows`, `colWidths`, `colAlign`, `caption`). Update the detection pattern to handle multi-line `TableHorizontal` components.
4. After fixing, run `npm run counters` again and verify the table renders with a numbered caption on the page.

---

### Issue #2: High Total Blocking Time (Moderate, Site-Wide)

**Symptom**: TBT of 1,130ms causes the Performance score to drop to 64/100. The page is otherwise fast (LCP 1.4s, FCP 0.1s).

**Root cause**: The combined JavaScript bundle (Docusaurus core + KaTeX math library + custom React components) blocks the main thread during initial page load. KaTeX is particularly heavy — it parses and renders all math expressions synchronously on load.

**Files involved**:
- `docusaurus.config.js` — plugin/theme configuration
- `src/components/Equation.js` — KaTeX rendering component
- `package.json` — KaTeX dependency

**To fix**:
1. This is a site-wide concern, not specific to this page. Any page with KaTeX equations will have elevated TBT.
2. Consider lazy-loading KaTeX: wrap the `Equation` component's KaTeX import with `React.lazy()` and `Suspense` so the KaTeX library only loads when an equation is present in the viewport. In `src/components/Equation.js`, replace the static `import katex from 'katex'` with a dynamic `import('katex')` inside a `useEffect` or via `React.lazy`.
3. Alternatively, consider pre-rendering KaTeX to static HTML at build time using `rehype-katex` / `remark-math` Docusaurus plugins instead of client-side rendering. This would eliminate the client-side KaTeX bundle entirely.
4. As a lower-effort option, add `<link rel="preload">` for the KaTeX CSS/JS in `docusaurus.config.js` head tags to start loading earlier.

---

### Issue #3: Equation Overflow on Phone Portrait (Minor)

**Symptom**: The block equation (Equation 10, the `P_CE` fraction) at line 115-118 of the MDX file is 1154px wide at desktop. On phone portrait (393px), the fraction with `log_{10}(coarsest D_{95}B)` terms may overflow horizontally.

**Files involved**:
- `docs/toolbox-technical-manuals/internal-erosion-suite/filter-evaluation-continuation/v1.0/10-constricted-exit.mdx` — lines 115-118
- `src/components/Equation.js` — equation container styling
- `src/css/custom.css` — potential overflow styles

**To fix**:
1. In `src/components/Equation.js` (or its CSS), ensure the equation container has `overflow-x: auto` so long equations scroll horizontally on narrow viewports rather than overflowing the page. Add to the equation wrapper element:
   ```css
   .equation-container {
     overflow-x: auto;
     max-width: 100%;
   }
   ```
2. This is a defensive fix that will benefit all pages with wide equations, not just this one.

---

## 7. Overall Assessment

| Area | Rating | Summary |
|------|--------|---------|
| Lighthouse Performance | **Warn** (64) | TBT 1,130ms is the sole drag; all other vitals pass |
| Lighthouse Accessibility | Pass (93) | Minor issues, likely contrast or ARIA |
| Lighthouse SEO | Pass (100) | Perfect |
| Lighthouse Best Practices | Pass (100) | Perfect |
| Responsive Design | Pass | All 7 viewports render correctly; minor equation overflow on phone |
| Heading Hierarchy | Pass | Single H1, sequential H2s, no skipped levels |
| Spacing & Layout | Pass | Consistent margins and padding throughout |
| Touch Targets | Pass | Undersized items are Groundwork (external) or inline text links |

### Priority Summary

| # | Issue | Severity | Scope | Action |
|---|-------|----------|-------|--------|
| 1 | Broken table `constricted-exit-probabilities` | **Critical** | This page | Run `npm run counters`; if unresolved, fix counters script detection for multi-line `TableHorizontal` |
| 2 | TBT 1,130ms | Moderate | Site-wide | Lazy-load or pre-render KaTeX |
| 3 | Equation overflow on phone | Minor | Site-wide | Add `overflow-x: auto` to equation container CSS |
