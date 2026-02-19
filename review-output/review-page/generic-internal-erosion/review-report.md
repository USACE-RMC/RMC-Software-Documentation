# Full Page Review: Generic Internal Erosion

**Page**: `http://localhost:3000/RMC-Software-Documentation/docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database/v1.5/Generic-Internal-Erosion`
**Source**: `docs/toolbox-technical-manuals/risk-calculations-suite/typical-event-tree-database/v1.5/031-Generic-Internal-Erosion.mdx`
**Date**: 2026-02-19

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 63/100 | Warn |
| Accessibility | 96/100 | Pass |
| SEO | 100/100 | Pass |
| Best Practices | 100/100 | Pass |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.3s | < 2.5s | Pass |
| FCP | 0.1s | < 1.8s | Pass |
| CLS | 0.102 | < 0.1 | **Fail** |
| TBT | 1,090ms | < 200ms | **Fail** |
| Speed Index | 1.2s | < 3.4s | Pass |
| TTI | 1.5s | < 3.8s | Pass |

### Lighthouse Failures

**Performance (score 63)**:
- **Total Blocking Time (1,090ms)** — Main thread blocked for over 1 second during hydration. Caused by Docusaurus + React hydration + Groundwork bundle execution. Not specific to this page.
- **CLS (0.102)** — Marginally above the 0.1 "good" threshold. The event tree image loads without reserved space, causing a layout shift.

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass | Content well-laid out with sidebar; event tree image fits well |
| Desktop 16:9 | 1920x1080 | 1 | Pass | Identical layout; no issues |
| Laptop | 1280x720 | 1.5 | Pass | Sidebar still present; content area slightly narrower but image scales correctly |
| Tablet landscape | 1180x820 | 2 | Pass | Sidebar visible (above 996px threshold); all content readable |
| Tablet portrait | 820x1180 | 2 | Pass | Sidebar correctly collapses at 820px; hamburger menu available; full-width content |
| Phone landscape | 852x393 | 3 | Pass | Sidebar hidden; event tree image contained; action buttons accessible |
| Phone portrait | 393x852 | 3 | Pass | Single-column layout; event tree image small but viewable; buttons wrap correctly |

**Sidebar**: Correctly collapses below 996px (Docusaurus default). Verified at tablet portrait (820px), phone landscape (852px), and phone portrait (393px).

**Content width**: Main content area uses available space well at all viewports. The event tree image scales proportionally within its bordered container.

**Tables and figures**: The event tree diagram scales responsively and is contained within its bordered box at all viewports.

**Typography**: H1 "Generic Internal Erosion" at 36px/700 is readable at all sizes.

Screenshots saved alongside this report:
- `review-desktop-16x10.png`
- `review-desktop-16x9.png`
- `review-laptop.png`
- `review-tablet-landscape.png`
- `review-tablet-portrait.png`
- `review-phone-landscape.png`
- `review-phone-portrait.png`

---

## 3. Heading Hierarchy

| Level | Text | Font Size | Weight | Location |
|-------|------|-----------|--------|----------|
| H1 | Generic Internal Erosion | 36px | 700 | Page content |
| H2 | Our Mission | 18px | 400 | Groundwork footer (external) |
| H2 | About this Website | 18px | 400 | Groundwork footer (external) |

- Single H1 per page — Pass
- Sequential levels (H1 -> H2) — Pass
- No skipped levels — Pass

---

## 4. Spacing & Layout Quality

| Element | Padding (T/R/B/L) | Margin (T/R/B/L) | Width | Notes |
|---------|-------------------|-------------------|-------|-------|
| `aside.theme-doc-sidebar-container` | 0/0/0/0 | -76/0/0/0 | 300px | Standard Docusaurus sidebar |
| `div.container` | 16/16/32/40 | 0/0/0/0 | 1605px | Main content container |
| `article` | 0/0/0/0 | 0/0/0/0 | 1154px | Article wrapper |
| `div.theme-doc-markdown` | 0/0/0/0 | 0/0/0/0 | 1154px | Markdown content area |
| `section.not-prose` | 0/0/0/0 | 24/0/24/0 | 1154px | Event tree section |

- Spacing is consistent between sections — Pass
- Page feels balanced at desktop — Pass
- Action buttons well-spaced below the figure — Pass

---

## 5. Touch Targets (Phone Portrait, 393x852)

**23 total undersized elements** (3 site-controlled, 20 Groundwork external).

### Site-Controlled Elements

| Element | Text | Size (WxH) | Min Dim | Severity |
|---------|------|------------|---------|----------|
| `a.breadcrumbs__link` | Home icon | 38x34 | 34px | Medium |
| `a.breadcrumbs__link` | Geotechnical Hydrologic | 194x34 | 34px | Medium |
| `a` | "← Risk Calculations Suite" | 146x15 | 15px | **High** |

### Groundwork (External) Elements — Not Fixable

| Element | Text | Size (WxH) | Min Dim |
|---------|------|------------|---------|
| `button.h-8` | Dark mode toggle | 32x32 | 32px |
| `button.DocSearch` | Search | 36x36 | 36px |
| `button.gw-relative` | Hamburger menu | 46x30 | 30px |
| `a` | Site logo | 70x38 | 38px |
| Footer links (x15) | Various | ~Wx17 | 17px |

---

## 6. Fix Recommendations

### FIX 1 (High Priority): Add explicit image dimensions to EventTree to fix CLS

**File**: `src/components/EventTree.js`, line 200
**Problem**: The `<img>` uses `loading="lazy"` and `h-auto` with no explicit dimensions. When the image loads, it shifts content below it, causing CLS of 0.102 (above the 0.1 threshold).

**Current code** (line 200):
```jsx
<img src={imgUrl} alt={altText} className="w-full h-auto" loading="lazy" />
```

**Fix**: Add default `width` and `height` attributes so the browser reserves aspect-ratio space before the image loads:
```jsx
<img src={imgUrl} alt={altText} className="w-full h-auto" loading="lazy" width={1200} height={800} />
```

These values match the fallback dimensions already used in the SVG rasterization logic on lines 60-61 of the same file. The `w-full h-auto` CSS classes will still control the rendered size — the HTML attributes just tell the browser what aspect ratio to reserve.

---

### FIX 2 (Medium Priority): Increase NavLink touch target size on mobile

**File**: `src/components/NavLink.js`, lines 8-11
**Problem**: The "← Risk Calculations Suite" back-link renders at only 15px height on mobile — far below the 44px WCAG minimum touch target. There is no vertical padding on the link or its container.

**Current code**:
```jsx
<div className="flex mb-[var(--ifm-leading)]">
  <div className="font-usace text-normal cursor-pointer text-ifm-link">
    <Link to={`${useBaseUrl(link)}`}>&larr; {linkTitle}</Link>
  </div>
</div>
```

**Fix**: Move the link styling to the `<Link>` element itself and add vertical padding to create a 44px+ touch target:
```jsx
<div className="flex mb-[var(--ifm-leading)]">
  <Link to={`${useBaseUrl(link)}`} className="font-usace text-normal cursor-pointer text-ifm-link py-3 inline-flex items-center">
    &larr; {linkTitle}
  </Link>
</div>
```

The `py-3` adds 12px top + 12px bottom padding. Combined with the ~16px line-height of `text-normal`, this gives ~40px. Use `py-4` (16px + 16px = ~48px) to fully exceed the 44px minimum. The `inline-flex items-center` keeps the text vertically centered within the enlarged target.

---

### FIX 3 (Low Priority): Increase breadcrumb link height on mobile

**File**: `src/css/custom.css` (add new rule)
**Problem**: Docusaurus breadcrumb links render at 34px height on mobile, below the 44px minimum touch target.

**Fix**: Add this CSS rule to `src/css/custom.css`:
```css
@media (max-width: 996px) {
  .breadcrumbs__link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
}
```

This only applies on mobile/tablet viewports where touch targets matter. On desktop (above 996px), the default sizing remains unchanged.

---

## 7. Overall Assessment

| Area | Grade | Summary |
|------|-------|---------|
| Performance | Warn (63) | TBT is the primary drag (1,090ms, framework-level); CLS marginally over threshold (fixable). |
| Accessibility | Pass (96) | Excellent. Minor issues in Groundwork external elements only. |
| SEO | Pass (100) | Perfect. |
| Best Practices | Pass (100) | Perfect. |
| Responsive Design | Pass | All 7 viewports render correctly. Sidebar collapses as expected. Event tree scales well. |
| Heading Hierarchy | Pass | Single H1, sequential levels, clean structure. |
| Spacing & Layout | Pass | Balanced, consistent spacing throughout. |
| Touch Targets | Warn | 3 site-controlled elements below 44px on mobile. |

### Summary

This is a clean, well-structured page. The event tree image, action buttons, and navigation all work correctly across all 7 reference viewports. The main issues are:

1. **CLS 0.102** — One line change in `EventTree.js` to add `width`/`height` attributes should fix this.
2. **NavLink touch target (15px)** — The back-link is severely undersized on mobile. Adding padding in `NavLink.js` resolves it.
3. **Breadcrumb touch targets (34px)** — A CSS media query in `custom.css` brings these to 44px on mobile.

All three fixes are isolated, low-risk changes that won't affect desktop layout.
