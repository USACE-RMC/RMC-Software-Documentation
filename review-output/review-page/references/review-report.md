# Full Page Review: RMC-TotalRisk References

**URL:** `http://localhost:3000/RMC-Software-Documentation/docs/desktop-applications/rmc-totalrisk/users-guide/v1.0/references`
**Source file:** `docs/desktop-applications/rmc-totalrisk/users-guide/v1.0/14-references.mdx`
**Date:** 2026-02-19

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 53/100 | **Warn** |
| Accessibility | 93/100 | Pass |
| SEO | 100/100 | Pass |
| Best Practices | 100/100 | Pass |

Scoring: 90+ = Pass, 50-89 = Warn, <50 = Fail

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.5s | < 2.5s | Pass |
| FCP | 0.1s | < 1.8s | Pass |
| CLS | 0.191 | < 0.1 | **Fail** |
| TBT | 1,330ms | < 200ms | **Fail** |
| Speed Index | 1.9s | < 3.4s | Pass |
| TTI | 1.7s | < 3.8s | Pass |

### Lighthouse Failures by Category

**Performance:**
- **Total Blocking Time (1,330ms):** Main thread blocked for extended periods. This is a site-wide JS bundle issue, not specific to this page.
- **Cumulative Layout Shift (0.191):** The `<Bibliography/>` component fetches data asynchronously (two JSON files) and renders citations after mount, causing a significant layout shift when the reference list appears.

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass | Clean layout, sidebar visible, good spacing |
| Desktop 16:9 | 1920x1080 | 1 | Pass | Same as above |
| Laptop | 1280x720 | 1.5 | Pass | Content wraps well, sidebar visible (>996px) |
| Tablet landscape | 1180x820 | 2 | Pass | Sidebar visible (>996px), content adapts |
| Tablet portrait | 820x1180 | 2 | Pass | Sidebar collapses correctly (<996px), full width content |
| Phone landscape | 852x393 | 3 | Pass | Sidebar collapsed, content fills width |
| Phone portrait | 393x852 | 3 | **Fail** | Content clipped on right, horizontal overflow from long URLs |

**Analysis:**
- **Docusaurus sidebar:** Collapses correctly at <996px (tablet portrait and below). Behaves as expected at all viewports.
- **Content width:** Good use of available space at desktop and laptop. Proper full-width at tablet portrait and phone.
- **Typography:** Headings and body text remain readable at all sizes.
- **Critical issue — Phone portrait:** Reference text and URLs are truncated/clipped at the right edge of the 393px viewport. The long URLs in bibliography entries do not break or wrap, causing horizontal overflow. The `html { overflow-x: clip; }` rule in `src/css/custom.css:626` hides the scrollbar but clips the content instead.

Screenshots saved to `review-output/review-page/references/`:
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
| H1 | "References" | 36px | 700 | Page content |
| H2 | "Our Mission" | 18px | 400 | Groundwork footer (external) |
| H2 | "About this Website" | 18px | 400 | Groundwork footer (external) |

- Single H1 per page — correct.
- No skipped heading levels in page content — correct.
- H2s are in the Groundwork footer (external) — expected.

---

## 4. Spacing & Layout Quality

| Element | Width | Padding (T/R/B/L) | Margin (T/R/B/L) |
|---------|-------|-------------------|-------------------|
| Sidebar | 300px | 0/0/0/0 | -76px/0/0/0 |
| Container | 1605px | 16/16/32/40px | 0/0/0/0 |
| Article | 1154px | 0/0/0/0 | 0/0/0/0 |
| Markdown area | 1154px | 0/0/0/0 | 0/0/0/0 |

- **Asymmetric container padding:** Left padding (40px) is larger than right (16px). Minor, likely intentional to offset from the sidebar.
- **Spacing between references:** Each bibliography `<li>` has `mb-2.5` (10px bottom margin) — consistent and readable.
- **Overall balance:** Page feels balanced at desktop. Good vertical rhythm between the heading and the reference list.

---

## 5. Touch Targets

**30 elements under 44px minimum dimension at phone portrait (393px).**

### Site-Owned Undersized Targets

| Element | Text | Size (WxH) | Min Dim |
|---------|------|-----------|---------|
| Back link | "← RMC-TotalRisk" | 100x15 | **15px** |
| Reference URL links (x8) | Various URLs | varies x 15 | **15px** |
| Breadcrumb home link | Home icon | 38x34 | 34px |

### Groundwork (External) Undersized Targets

| Element | Text | Size (WxH) | Min Dim |
|---------|------|-----------|---------|
| Dark mode toggle | icon | 32x32 | 32px |
| Search button | "Search" | 36x36 | 36px |
| Hamburger menu | icon | 46x30 | 30px |
| Footer links (x16) | Various | varies x 17 | 17px |

---

## 6. Fix Recommendations

### FIX 1: Phone Portrait — Long URLs Cause Horizontal Overflow [Critical]

**Problem:** Long bibliography URLs (e.g., `https://www.publications.usace.army.mil/Portals/76/...`) extend past the viewport at 393px width, causing content to clip on the right side. The page is essentially unreadable on phone portrait.

**File:** `src/components/Bibliography.js`, line 119

**Current code:**
```jsx
<span className="block">{formatCitation(citation)}</span>
```

**Change to:**
```jsx
<span className="block break-words">{formatCitation(citation)}</span>
```

**What this does:** Tailwind's `break-words` applies `overflow-wrap: break-word`, which allows long unbroken strings (like URLs) to wrap at the container boundary instead of overflowing. The existing `word-break: break-word` rule in `src/css/custom.css:162` only applies to `pre`/`code` elements, so the bibliography span needs its own class.

---

### FIX 2: CLS 0.191 — Async Bibliography Render Causes Layout Shift [Moderate]

**Problem:** The Bibliography component starts with an empty `citations` array and renders nothing until two JSON fetches (`bib.json` and counters JSON) complete. When citations load, the entire reference list pops in, pushing the "Last updated" timestamp, Previous/Next navigation, and footer downward. This produces a CLS of 0.191 (threshold is 0.1).

**File:** `src/components/Bibliography.js`, line 114

**Current code:**
```jsx
return (
  <div>
    <ol className="list-none pl-0 mt-5">
```

**Change to:**
```jsx
return (
  <div className="min-h-[300px]">
    <ol className="list-none pl-0 mt-5">
```

**What this does:** Reserves approximately 300px of vertical space (roughly the height of 11 references at desktop) during the async load. This prevents the footer elements from shifting when citations render. The value 300px is an estimate — the actual rendered height at desktop 16:9 is ~686px for the markdown area, but a conservative minimum prevents the worst of the shift without leaving excessive blank space if the component has fewer citations.

---

### FIX 3: Back Link Touch Target Too Small on Mobile [Minor]

**Problem:** The "← RMC-TotalRisk" back link rendered by `NavContainer` is only 15px tall on mobile, well below the 44px WCAG minimum touch target.

**File:** `src/components/NavContainer.js` — find the `<Link>` or `<a>` element that renders the back arrow link (the one with `← {linkTitle}`).

**Current markup** (approximate — the link renders as an inline element with no minimum height):
```jsx
<Link to={link}>← {linkTitle}</Link>
```

**Change to** (add minimum touch target sizing):
```jsx
<Link to={link} className="min-h-[44px] inline-flex items-center">← {linkTitle}</Link>
```

**What this does:** Ensures the link's clickable/tappable area meets the 44px minimum dimension required by WCAG 2.5.8 (Target Size). The `inline-flex items-center` keeps the text vertically centered within the taller hit area without affecting visual layout.

---

### NOT RECOMMENDED TO FIX (Informational Only)

**TBT 1,330ms:** This is a site-wide JavaScript bundle size issue affecting all pages, not specific to the References page. Addressing it would require bundle analysis and code splitting across the entire Docusaurus build — out of scope for a single-page fix.

**Groundwork header/footer touch targets:** The dark mode toggle (32px), search button (36px), hamburger menu (30px), and all 16 footer links (17px) are undersized, but these are rendered by the `@usace/groundwork` package via `SiteWrapper` and are not controlled by this project.

---

## 7. Overall Assessment

| Area | Verdict |
|------|---------|
| Lighthouse Overall | 3/4 categories Pass, Performance Warn (53) |
| Accessibility | Pass (93) |
| SEO | Pass (100) |
| Best Practices | Pass (100) |
| Core Web Vitals | 2/4 Fail (CLS 0.191, TBT 1,330ms) |
| Responsive Design | 6/7 Pass, Phone portrait Fail |
| Heading Hierarchy | Pass |
| Spacing & Layout | Pass |
| Touch Targets | 9 site-owned undersized elements |

**Priority order for fixes:**
1. **FIX 1** — Add `break-words` to Bibliography citation span (Critical, 1-line change)
2. **FIX 2** — Add `min-h-[300px]` to Bibliography container (Moderate, 1-line change)
3. **FIX 3** — Add touch target sizing to NavContainer back link (Minor, 1-line change)
