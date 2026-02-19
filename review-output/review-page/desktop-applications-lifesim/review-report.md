# Full Page Review: LifeSim Landing Page

**URL:** `http://localhost:3000/RMC-Software-Documentation/desktop-applications/lifesim`
**Source:** `src/pages/desktop-applications/lifesim.js`
**Date:** 2026-02-19
**Screenshots:** `review-output/review-page/desktop-applications-lifesim/`

---

## 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | 69/100 | **Warn** |
| Accessibility | 96/100 | Pass |
| SEO | 100/100 | Pass |
| Best Practices | 100/100 | Pass |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | 1.2s | < 2.5s | Pass |
| CLS | 0 | < 0.1 | Pass |
| FCP | 0.1s | < 1.8s | Pass |
| TBT | 990ms | < 200ms | **Fail** |
| Speed Index | 1.2s | < 3.4s | Pass |

### Lighthouse Failures by Category

**Performance:**
- **Total Blocking Time (990-1,050ms)** -- The main thread is blocked for nearly 1 second during hydration. This is the sole driver of the 69 performance score. Caused by JavaScript bundle size from Docusaurus + React hydration + Groundwork. This is a framework-level cost and is not specific to this page.

**Accessibility:**
- **Color contrast** -- Background/foreground colors have insufficient contrast ratio (score: 0 for this specific audit). See Recommendation 2 below.

---

## 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass | No issues |
| Desktop 16:9 | 1920x1080 | 1 | Pass | No issues |
| Laptop | 1280x720 | 1.5 | Pass | No issues |
| Tablet landscape | 1180x820 | 2 | Pass | Full navbar visible (above 996px breakpoint) |
| Tablet portrait | 820x1180 | 2 | Pass | Navbar collapses to hamburger correctly; tiles stack vertically |
| Phone landscape | 852x393 | 3 | Pass | Tiles stack, content well-sized |
| Phone portrait | 393x852 | 3 | Pass | Good mobile layout |

**Analysis:**
- **Docusaurus sidebar:** Not applicable on this landing page (no sidebar).
- **Content width:** ContentBox uses `w-[70%]` which provides good margins at desktop. At phone viewports, the tiles use `basis-full` and stack correctly.
- **Tiles:** Adapt correctly -- side-by-side at `lg:` breakpoint and above, stacked below. The `2xl:` breakpoint supports 3-column but only 2 tiles exist, so layout looks fine.
- **Typography:** Readable at all sizes. The title "LifeSim" and description render clearly across all viewports.
- **Large empty space:** Significant vertical whitespace between content tiles and footer at all viewports due to `min-h-[50vh]` on the ContentBox container. This is a design choice but makes the page feel sparse with only 2 tiles.

---

## 3. Heading Hierarchy

**Issue: No `<h1>` on the page.**

The page title "LifeSim" is rendered as `<p className="text-title">`, not an `<h1>`. The only headings on the page are two `<h2>` elements in the Groundwork footer ("Our Mission" and "About this Website"). This means:
- Screen readers have no `<h1>` landmark for the page
- Heading levels skip from none to `<h2>` (in footer only)

---

## 4. Spacing & Layout Quality

| Element | Padding | Dimensions | Notes |
|---------|---------|------------|-------|
| `div.title-container` | 40px top, 24px sides/bottom | 1905x228px | Well-spaced hero area |
| `div.text-container` | 0 | 436x72px | Centered text block |
| Content tiles (`a`) | inner: 16px horiz, 10px vert | 431x130px | Consistent sizing |

- Spacing is **consistent** between the hero and content areas.
- The `gap-5` (20px) between tiles provides adequate separation.
- Title container uses `gap: 12px` for icon-to-text spacing -- well balanced.

---

## 5. Touch Targets

**20 elements under 44px minimum dimension at phone portrait (393px).**

| Element | Text | Size (WxH) | Min | Source |
|---------|------|------------|-----|--------|
| `a` (homepage link) | unnamed | 70x38 | 38px | Groundwork (external) |
| `button.h-8` (dark mode) | unnamed | 32x32 | 32px | Groundwork (external) |
| `button.DocSearch` | Search | 36x36 | 36px | Docusaurus |
| `button.gw-relative` (hamburger) | unnamed | 46x30 | 30px | Groundwork (external) |
| 16x footer links | Various | ~Wx17 | 17px | Groundwork (external) |

All 20 undersized touch targets are in the **Groundwork header/footer** or Docusaurus search button -- none are in the site's own content area. The two LifeSim content tiles are well-sized (full-width on mobile, 90px+ height).

---

## 6. Recommendations

### Recommendation 1: Change page title from `<p>` to `<h1>` (Accessibility / SEO)

**Priority:** High
**File:** `src/pages/desktop-applications/lifesim.js`, line 60
**What to do:** Change the `<p>` element to `<h1>` while keeping the same className.

Current code:
```jsx
<p className="text-title">LifeSim</p>
```

Change to:
```jsx
<h1 className="text-title">LifeSim</h1>
```

Then verify in `src/css/custom.css` that the `.text-title` class explicitly sets `margin`, `font-weight`, and `font-size` so the `<h1>` default browser styles don't change the visual appearance. The existing `.text-title` class likely already does this, but confirm the rendered output looks identical after the change.

**Why:** Every page must have exactly one `<h1>` for WCAG compliance and proper screen reader navigation. This is the single most impactful accessibility fix for this page. This same pattern (`<p className="text-title">`) likely exists on all other application landing pages (`src/pages/desktop-applications/*.js`, `src/pages/toolbox-technical-manuals/*.js`, `src/pages/web-applications/*.js`) and should be fixed across all of them.

---

### Recommendation 2: Fix color contrast on description text (Accessibility)

**Priority:** High
**File:** `src/pages/desktop-applications/lifesim.js`, line 61 and `src/css/custom.css` (`.text-description` class)
**What to do:** Increase the brightness of the `.text-description` text color to meet WCAG AA 4.5:1 contrast ratio against the dark page background.

The description text "Agent-based life loss and damage estimation for flood events" uses the `.text-description` class. Find this class in `src/css/custom.css` and increase its `color` value brightness. For example, if the current color is something like `#999` or `rgba(255,255,255,0.5)`, increase it to at least `#b0b0b0` / `rgba(255,255,255,0.65)` or higher until the contrast ratio reaches 4.5:1 against the background.

Use a contrast checker (e.g., WebAIM) to verify the final values. The page background appears to be approximately `#2b2b2b` (dark gray from Docusaurus dark theme), so the text needs to be at least `#a3a3a3` for 4.5:1 ratio.

**Why:** This is the only failing accessibility audit from Lighthouse. Fixing it would likely push the accessibility score from 96 to 100.

---

### Recommendation 3 (Optional): Reduce empty space for pages with few tiles

**Priority:** Low
**File:** `src/components/ContentBox.js`, line 5
**What to do:** Consider reducing or removing the `min-h-[50vh]` when there are few content tiles.

Current code:
```jsx
<div className="mx-auto mb-[50px] mt-[25px] min-h-[50vh] w-[70%]">
```

Options:
- **Option A:** Remove `min-h-[50vh]` entirely. This would make the footer sit closer to the content on pages with few tiles, which may actually look better.
- **Option B:** Reduce to `min-h-[30vh]` as a compromise.
- **Option C:** Leave as-is if the consistent spacing across all landing pages is preferred.

**Why:** With only 2 tiles, there is a large empty gap between the content and footer. This is purely aesthetic and not a functional issue.

---

### Recommendation 4 (Informational): Total Blocking Time -- no action required

**Priority:** None (informational)
**Source:** Docusaurus framework + React hydration + Groundwork bundle
**Details:** TBT of ~1,000ms is the sole reason for the 69 performance score. This is caused by JavaScript parsing and React hydration on page load -- a framework-level cost that affects all pages equally. There is no page-specific optimization available here. Possible future mitigations would be Docusaurus-level (e.g., upgrading Docusaurus, code-splitting, or lazy-loading Groundwork components), but these are outside the scope of this page.

---

## 7. Overall Assessment

| Metric | Result |
|--------|--------|
| Lighthouse score average | **91/100** |
| Responsive design issues | **0** (all 7 viewports pass) |
| Accessibility issues (site-controlled) | **2** (missing h1, contrast) |
| Touch target issues (site-controlled) | **0** (all undersized targets are Groundwork/external) |
| Heading hierarchy issues | **1** (no h1) |
| Critical fixes needed | **2** (Recommendations 1 and 2) |

The LifeSim landing page is in good shape overall. SEO and Best Practices are perfect at 100, accessibility is near-perfect at 96, and responsive design works correctly across all 7 reference device viewports with no issues. The two actionable fixes are:

1. **Change `<p className="text-title">` to `<h1 className="text-title">`** in `src/pages/desktop-applications/lifesim.js` (and likely all other landing pages using this pattern)
2. **Increase `.text-description` color brightness** in `src/css/custom.css` to meet WCAG AA 4.5:1 contrast ratio

Both fixes are small, low-risk changes that would bring accessibility to 100/100.
