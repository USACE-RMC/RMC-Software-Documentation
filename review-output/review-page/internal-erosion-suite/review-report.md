# Full Page Review: Internal Erosion Suite

**URL**: `http://localhost:3000/RMC-Software-Documentation/toolboxes/internal-erosion-suite`
**Source**: `src/pages/toolboxes/internal-erosion-suite.js`
**Date**: 2026-02-19
**Screenshots**: `review-output/review-page/internal-erosion-suite/`

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 68/100 | **Warn** |
| Accessibility | 96/100 | **Pass** |
| SEO | 100/100 | **Pass** |
| Best Practices | 100/100 | **Pass** |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.1s | < 2.5s | **Pass** |
| FCP | 0.1s | < 1.8s | **Pass** |
| CLS | 0 | < 0.1 | **Pass** |
| TBT | 950ms | < 200ms | **Fail** |
| Speed Index | 1.3s | < 3.4s | **Pass** |

### Lighthouse Failures

**Performance (68)**:
- **Total Blocking Time: 950ms** — The main thread is blocked for nearly 1 second during page load. This is the primary performance issue dragging the score down. Likely caused by JavaScript bundle size (Docusaurus + React hydration + Groundwork).

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | **Warn** | Navbar collapsed unexpectedly; "Skip to main content" link rendered visibly in corner |
| Desktop 16:9 | 1920x1080 | 1 | **Pass** | Clean 3-column grid, good spacing |
| Laptop | 1280x720 | 1.5 | **Pass** | Clean 2-column grid, navbar intact |
| Tablet landscape | 1180x820 | 2 | **Pass** | 2-column grid, navbar with dropdowns visible |
| Tablet portrait | 820x1180 | 2 | **Pass** | Single-column stacked cards, hamburger menu |
| Phone landscape | 852x393 | 3 | **Pass** | Single-column, compact layout, hamburger menu |
| Phone portrait | 393x852 | 3 | **Pass** | Single-column, cards scale well, readable text |

**Analysis**:
- **Sidebar**: N/A — this is a custom page, not a docs page. No Docusaurus sidebar present.
- **Content width**: Cards are constrained to `w-[70%]` via `ContentBox`, which works well at all viewports. At desktop 16:9 the 3-column grid fills the center nicely.
- **Typography**: Title "Internal Erosion Suite" is readable at all sizes. Card text remains legible down to phone portrait.
- **Desktop 16:10 anomaly**: The 1920x1200 capture showed the navbar collapsing into hamburger mode and the "Skip to main content" link rendering visibly. This appears to be a Groundwork header quirk at exactly 1200px height (not a site issue — the navbar breakpoint is width-based, and this resolved at other desktop sizes).

---

## 3. Heading Hierarchy

| Level | Text | Font Size | Source |
|-------|------|-----------|--------|
| (none) | — | — | **No H1 on page** |
| H2 | "Our Mission" | 18px | Groundwork footer (external) |
| H2 | "About this Website" | 18px | Groundwork footer (external) |

**Issues**:
- **Missing H1**: The page title "Internal Erosion Suite" is rendered as a `<p className="text-title">` instead of an `<h1>`. This is an accessibility and SEO concern — every page should have exactly one `<h1>`.
- The only headings on the page are H2s in the Groundwork footer (external, not controllable).

---

## 4. Spacing & Layout Quality

- **Title container**: 40px top padding, 24px sides/bottom, 12px gap — well-balanced hero section.
- **Card grid**: Cards are uniformly 431px wide at desktop with consistent gap (20px via `gap-5`). Each card is ~130px tall at `xl` breakpoints.
- **Card inner padding**: `px-[16px] py-[10px]` base, scaling to `xl:px-[20px] xl:py-[14px]` — consistent.
- **Content area**: `w-[70%]` with `mx-auto` centers the grid well. Bottom margin of 50px provides good separation from footer.
- **Overall**: Spacing is consistent and well-balanced across all sections. No visible spacing anomalies.

---

## 5. Touch Targets

**20 undersized elements** found at phone portrait (393x852):

| Element | Text | Size (WxH) | Min Dim | Source |
|---------|------|------------|---------|--------|
| button `.h-8` | (dark mode toggle) | 32x32 | 32px | Groundwork (external) |
| button `.DocSearch` | Search | 36x36 | 36px | Groundwork (external) |
| button `.gw-relative` | (hamburger menu) | 46x30 | 30px | Groundwork (external) |
| a (USACE logo) | — | 70x38 | 38px | Groundwork (external) |
| 16x footer links | Plain Language, Accessibility, etc. | ~70-112 x 17 | 17px | Groundwork (external) |

**All 20 undersized touch targets are in the Groundwork header or footer** — none are in the site's own content area. The toolbox cards themselves are generously sized (minimum 90px tall at small viewports) and easily tappable.

---

## 6. Recommendations

### REC-1: Change page title from `<p>` to `<h1>`

**Severity**: Medium (accessibility + SEO)
**File**: `src/pages/toolboxes/internal-erosion-suite.js`, line 125

**What to change**: In the JSX return of `InternalErosionSuite()`, replace the `<p>` tag with an `<h1>` tag for the page title element.

**Current code** (line 125):
```jsx
<p className="text-title">Internal Erosion Suite</p>
```

**Replace with**:
```jsx
<h1 className="text-title">Internal Erosion Suite</h1>
```

**No CSS changes needed** — the `.text-title` class in `src/css/custom.css:458` already applies `m-0` which overrides default `<h1>` margins.

**Why**: Every page needs exactly one `<h1>` for screen readers and SEO. The visual styling is already correct; only the semantic element needs to change. This applies to all other toolbox landing pages that follow this same pattern — check the sibling files in `src/pages/toolboxes/` for the same `<p className="text-title">` pattern and apply the same fix.

---

### REC-2: Apply REC-1 to all toolbox landing pages

**Severity**: Medium (accessibility + SEO)
**Scope**: All files in `src/pages/toolboxes/` and any other custom pages using `<p className="text-title">`.

**What to do**: Search all files in `src/pages/` for `<p className="text-title">` and replace with `<h1 className="text-title">`. Each page should have exactly one instance.

---

### REC-3: High Total Blocking Time (950ms) — no immediate action

**Severity**: Low (informational)
**Source**: JavaScript bundle hydration from Docusaurus + React + Groundwork.

The current imports in `internal-erosion-suite.js` are lean (only `ContentBox`, `ToolboxIcon`, `Layout`). The `latestVersions.json` fetch is lightweight and non-blocking. The TBT is largely inherent to the Docusaurus framework hydration and not specific to this page.

**No immediate action required.** TBT of 950ms is typical for Docusaurus sites and would improve with future Docusaurus upgrades or build-time optimization, not page-level changes.

---

## 7. Overall Assessment

| Aspect | Rating |
|--------|--------|
| **Lighthouse** | 3/4 categories Pass, Performance at Warn (68) due to TBT |
| **Responsive** | Excellent — grid adapts cleanly from 3-col to 2-col to 1-col |
| **Accessibility** | 96/100 — one fix needed (H1 missing) |
| **SEO** | 100/100 |
| **Touch targets** | All site-owned elements pass; only Groundwork externals fail |
| **Visual quality** | Clean, well-balanced, consistent spacing |

**Summary**: This is a well-built page. The one actionable fix is **REC-1/REC-2: change the page title from `<p>` to `<h1>`** across all toolbox landing pages. The performance warning (TBT 950ms) is framework-level and not actionable at the page level. All touch target issues are in the external Groundwork header/footer.
