# Full Page Review: Johnstown

**URL:** `http://localhost:3000/RMC-Software-Documentation/docs/desktop-applications/lifesim/validation-studies/v1.0/johnstown`
**Source file:** `docs/desktop-applications/lifesim/validation-studies/v1.0/03-johnstown.mdx`
**Date:** 2026-02-19
**Screenshots:** `review-output/review-page/johnstown/`

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 66/100 | **Warn** |
| Accessibility | 93/100 | Pass |
| SEO | 100/100 | Pass |
| Best Practices | 100/100 | Pass |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.3s | < 2.5s | Pass |
| FCP | 0.1s | < 1.8s | Pass |
| CLS | 0.022 | < 0.1 | Pass |
| TBT | 1,060ms | < 200ms | **Fail** |
| Speed Index | 1.3s | < 3.4s | Pass |

### Lighthouse Failures

**Performance — Total Blocking Time (1,060ms):**
The main thread is blocked for over 1 second. This is a dev-mode artifact — React development builds include extra reconciliation checks and warnings that inflate TBT. Production builds (`npm run build && npm run serve`) should be significantly lower. No code change needed unless TBT persists in production.

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass | None |
| Desktop 16:9 | 1920x1080 | 1 | Pass | None |
| Laptop | 1280x720 | 1.5 | Pass | None |
| Tablet landscape | 1180x820 | 2 | Pass | Sidebar + TOC both visible; content slightly narrower but readable |
| Tablet portrait | 820x1180 | 2 | Pass | Sidebar correctly collapses at <996px; "On this page" button appears |
| Phone landscape | 852x393 | 3 | Pass | Content fills width well; no overflow |
| Phone portrait | 393x852 | 3 | Pass | Content readable; figure scales proportionally |

### Analysis

- **Docusaurus sidebar**: Correctly visible at widths >= 996px, collapses to hamburger below. Standard behavior.
- **Content width**: At desktop 1920px, the article area is 1154px with a 300px sidebar and TOC rail — good use of horizontal space.
- **Tables and figures**: The single figure (South Fork Dam artist's conception) scales down responsively at all breakpoints. No horizontal overflow.
- **Typography**: Headings and body text remain readable at all viewport sizes. No text truncation or overlap observed.
- **DRAFT watermark**: Visible at all sizes as a diagonal overlay — does not interfere with readability.
- **Previous/Next navigation**: Renders correctly at all viewports with proper alignment.

---

## 3. Heading Hierarchy

| Level | Text | Font Size | Margin Top / Bottom |
|-------|------|-----------|---------------------|
| H1 | Johnstown | 36px | 0px / 25px |
| H2 | Overview | 28px | 40px / 20px |
| H2 | Data | 28px | 40px / 20px |
| H3 | Hydraulics | 24px | 30px / 20px |
| H3 | Structure Inventory | 24px | 30px / 20px |
| H3 | Road Network | 24px | 30px / 20px |
| H3 | Destinations | 24px | 30px / 20px |
| H3 | Emergency Planning Zones | 24px | 30px / 20px |
| H3 | Alternative | 24px | 30px / 20px |
| H2 | Modeling Conclusion | 28px | 40px / 20px |
| H2 | Model Version | 28px | 40px / 20px |
| H2 | Our Mission | 18px | *Groundwork (external)* |
| H2 | About this Website | 18px | *Groundwork (external)* |

**Verdict:** Pass. Single H1 per page. Heading levels are fully sequential (H1 -> H2 -> H3) with no skipped levels. Font weight is consistently 700 for all page headings. Color is consistent `rgb(51, 51, 51)`. The two footer H2s are from the Groundwork package and are not site-controlled.

---

## 4. Spacing & Layout Quality

| Element | Width | Padding (T/R/B/L) | Margin (T/R/B/L) |
|---------|-------|-------------------|-------------------|
| Sidebar | 300px | 0/0/0/0 | -76px/0/0/0 |
| Container | 1605px | 16/16/32/40px | 0/0/0/0 |
| Article | 1154px | 0/0/0/0 | 0/0/0/0 |
| Markdown content | 1154px | 0/0/0/0 | 0/0/0/0 |

- H2 headings: consistent 40px margin-top, 20px margin-bottom
- H3 headings: consistent 30px margin-top, 20px margin-bottom
- Container has asymmetric horizontal padding (40px left, 16px right) — balanced by the TOC sidebar occupying the right margin

**Verdict:** Pass. Spacing is uniform and consistent. The heading margin rhythm (40/20 for H2, 30/20 for H3) provides clear visual separation between sections. No irregularities detected.

---

## 5. Touch Targets

**Total undersize elements at phone portrait (393x852):** 45

### Site-Controlled Issues (18 elements)

| Element | Text | Size (WxH) | Min Dim | Severity |
|---------|------|------------|---------|----------|
| `a` in NavLink | "← LifeSim" | 59x15px | **15px** | **High** |
| `a.text-ifm-link` (x8) | Citation refs [28]–[34] | ~21x15px | **15px** | **Medium** |
| `a.hash-link` (x8) | Heading anchor "#" | ~19-20x22-24px | 19-20px | Low |
| `button.clean-btn` | "On this page" | 348x37px | 37px | Low |
| `a.breadcrumbs__link` | Home breadcrumb icon | 38x34px | 34px | Low |
| `button.h-8` | Dark mode toggle | 32x32px | 32px | Low |
| `button.DocSearch` | Search | 36x36px | 36px | Low |

### Groundwork (external) — Not Actionable

- 16 footer links (`gw-hover:gw-underline`): all 17px height
- 1 hamburger menu button: 46x30px (30px min dimension)

These are rendered by the `@usace/groundwork` `SiteWrapper` component and are not site-controlled.

---

## 6. Fix Recommendations

### FIX 1 — NavLink back-link touch target is 15px (High Priority)

**Problem:** The "← LifeSim" back link in `NavLink` renders as unstyled inline text inside a `<Link>`. At phone viewports, the tap target is only 59x15px — far below the WCAG 2.5.8 minimum of 44x44px.

**File:** `src/components/NavLink.js`, line 10

**Current code:**
```jsx
<Link to={`${useBaseUrl(link)}`}>&larr; {linkTitle}</Link>
```

**Recommended fix — add `py-3` and `inline-block` to the `<Link>` element:**
```jsx
<Link to={`${useBaseUrl(link)}`} className="py-3 inline-block">&larr; {linkTitle}</Link>
```

This adds 12px vertical padding on each side (24px total), bringing the rendered height from 15px to ~39px. Combined with the existing line-height, the total tap area will meet or exceed 44px. The `inline-block` ensures padding is rendered (inline elements ignore vertical padding in some contexts).

**Alternative (if `py-3` alone doesn't reach 44px):** Use `min-h-[44px] inline-flex items-center` instead:
```jsx
<Link to={`${useBaseUrl(link)}`} className="min-h-[44px] inline-flex items-center">&larr; {linkTitle}</Link>
```

---

### FIX 2 — Citation superscript links are 15px (Medium Priority)

**Problem:** Citation reference links like `[28]`, `[29]` etc. are rendered as inline `<a>` elements inside a `<span>`. At phone viewports, each link measures approximately 21x15px — well below the 44px minimum tap target. These are heavily used throughout the validation study pages (8 instances on this page alone).

**File:** `src/components/Citation.js`, lines 129–137

**Current code:**
```jsx
return (
  <span className="font-usace text-[inherit]">
    <a
      href={`#footnote-${citationKey}`}
      className="text-ifm-link no-underline hover:text-ifm-link-hover"
    >
      [{citationNumber}]
    </a>
  </span>
);
```

**Recommended fix — add invisible padding to expand the tap area without changing visual appearance:**
```jsx
return (
  <span className="font-usace text-[inherit]">
    <a
      href={`#footnote-${citationKey}`}
      className="text-ifm-link no-underline hover:text-ifm-link-hover relative py-3 -my-3"
    >
      [{citationNumber}]
    </a>
  </span>
);
```

The `py-3 -my-3` pattern adds 12px padding on top and bottom (expanding the clickable area) while using negative margin to prevent the padding from affecting surrounding line spacing. The `relative` ensures the expanded area is positioned correctly in the stacking context.

**Visual impact:** None — the link text stays the same size and position. Only the invisible tap target expands.

---

### FIX 3 (Optional / Low Priority) — Heading anchor hash-links are 19-24px

**Problem:** The `#` anchor links that appear next to headings on hover are 19-24px tall.

**Impact:** Very low. These links are hidden by default and only appear on hover — a mouse interaction. On mobile where tap targets matter, users navigate via the "On this page" TOC button instead. No fix recommended.

---

### FIX 4 (Optional / Low Priority) — "On this page" button is 37px tall

**Problem:** The mobile TOC toggle button measures 348x37px (37px min dimension), 7px short of the 44px target.

**File:** This is a Docusaurus theme element (`button.clean-btn`). To override, add a CSS rule.

**File:** `src/css/custom.css`

**Recommended fix — add a min-height override:**
```css
/* Ensure "On this page" TOC button meets 44px touch target on mobile */
button.clean-btn.tocCollapsibleButton_node_modules {
  min-height: 44px;
}
```

**Note:** The exact class name may vary between Docusaurus versions. A safer selector:
```css
@media (max-width: 996px) {
  .tocCollapsible button.clean-btn {
    min-height: 44px;
  }
}
```

---

### FIX 5 (Informational) — Verify TBT in production build

**Problem:** TBT of 1,060ms drags the performance score to 66. This is almost certainly a dev-mode artifact.

**Action:** Run the following and re-test with Lighthouse:
```bash
npm run build && npx serve build
```

If TBT exceeds 200ms in the production build, investigate JavaScript bundle size with `npm run build -- --bundle-analyzer` or review the Lighthouse "Reduce JavaScript execution time" audit for specific script culprits.

---

## 7. Overall Assessment

| Area | Verdict |
|------|---------|
| Lighthouse Performance | Warn (66) — dev-mode TBT |
| Lighthouse Accessibility | Pass (93) |
| Lighthouse SEO | Pass (100) |
| Lighthouse Best Practices | Pass (100) |
| Core Web Vitals (LCP/FCP/CLS) | Pass |
| Core Web Vitals (TBT) | Fail — dev mode |
| Responsive (7 viewports) | Pass (all 7) |
| Heading Hierarchy | Pass |
| Spacing Consistency | Pass |
| Touch Targets (site-controlled) | 2 high/medium issues |
| Touch Targets (Groundwork) | 17 issues — not actionable |

**Total site-controlled issues:** 4 (2 actionable, 2 optional)

**Priority order for fixes:**
1. **NavLink back-link** — 15px touch target, affects all doc pages site-wide (`src/components/NavLink.js:10`)
2. **Citation links** — 15px touch target, affects every page with citations (`src/components/Citation.js:129-137`)
3. *(Optional)* TOC button min-height (`src/css/custom.css`)
4. *(Informational)* Verify TBT in production build

The page is in excellent shape overall. Content structure, responsive behavior, SEO, and best practices all pass. The two actionable fixes (NavLink and Citation touch targets) are component-level changes that will improve mobile usability across the entire site, not just this page.
