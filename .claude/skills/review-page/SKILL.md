---
name: review-page
description: Full frontend page audit combining Lighthouse scores (performance, accessibility, SEO, best practices) with Playwright responsive design review across all 7 reference devices, spacing analysis, and visual quality. Use for comprehensive page reviews.
---

# Full Page Review

Perform a comprehensive review of a documentation page using Lighthouse for standardized auditing and Playwright for responsive design and visual quality.

**Arguments:** `$ARGUMENTS` — a page URL path (e.g., "/", "/docs/desktop-applications/lifesim/users-guide/v2.0/01-introduction") or a full URL.

## Step 1: Resolve the URL and Prepare Output

### URL Resolution
- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly
- If `$ARGUMENTS` starts with `/`, prepend `http://localhost:3000`
- If `$ARGUMENTS` is a page name, construct the URL from the docs/ directory structure

Derive a **target slug** from `$ARGUMENTS` (lowercase, hyphens for spaces). Clean and create the output directory:
```bash
rm -rf review-output/review-page/{slug} && mkdir -p review-output/review-page/{slug}
```

## Step 2: Run Lighthouse Full Audit

Use the Lighthouse MCP tool `run_audit` to get a complete assessment:

- **url**: the resolved URL from Step 1
- **categories**: `["performance", "accessibility", "seo", "best-practices"]`
- **device**: `"desktop"`

Record all scores and failing audits across all categories.

Then run `get_core_web_vitals` for detailed performance metrics:

- **url**: the resolved URL
- **device**: `"desktop"`
- **includeDetails**: `true`

**Note**: If Lighthouse MCP is not available, skip this step and note "Lighthouse not configured" in the report.

## Step 3: Responsive Design Review (Playwright)

Navigate to the resolved URL with `browser_navigate`, then wait for the page to fully load (`browser_wait_for` with `time: 2`).

Capture and analyze the page at all 7 reference devices. Work from **largest to smallest**.

For **each** device in the table below:

1. Set the viewport and DPR using `browser_run_code`:
   ```javascript
   async (page) => {
     const client = await page.context().newCDPSession(page);
     await client.send('Emulation.setDeviceMetricsOverride', {
       width: WIDTH, height: HEIGHT, deviceScaleFactor: DPR, mobile: MOBILE
     });
   }
   ```
2. Wait for layout to settle (`browser_wait_for` with `time: 1`)
3. Take a full-page screenshot (`browser_take_screenshot` with `fullPage: true`, filename: `review-output/review-page/{slug}/review-{suffix}.png`)
4. Take an accessibility snapshot with `browser_snapshot`

### Device Order

| Order | Tier | Width | Height | DPR | Mobile | Filename Suffix |
|-------|------|-------|--------|-----|--------|-----------------|
| 1 | Desktop 16:10 | 1920 | 1200 | 1 | false | `desktop-16x10` |
| 2 | Desktop 16:9 | 1920 | 1080 | 1 | false | `desktop-16x9` |
| 3 | Laptop | 1280 | 720 | 1.5 | false | `laptop` |
| 4 | Tablet landscape | 1180 | 820 | 2 | true | `tablet-landscape` |
| 5 | Tablet portrait | 820 | 1180 | 2 | true | `tablet-portrait` |
| 6 | Phone landscape | 852 | 393 | 3 | true | `phone-landscape` |
| 7 | Phone portrait | 393 | 852 | 3 | true | `phone-portrait` |

## Step 4: Spacing & Visual Quality Audit (Playwright)

After the responsive captures, set back to desktop 16:9 viewport (1920x1080 @ 1x DPR), then run this via `browser_evaluate`:

```javascript
() => {
  const sections = [];

  document.querySelectorAll('article, section, .theme-doc-markdown, [class*="card"], [class*="container"]').forEach(el => {
    const style = getComputedStyle(el);
    sections.push({
      element: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''),
      padding: { top: style.paddingTop, right: style.paddingRight, bottom: style.paddingBottom, left: style.paddingLeft },
      margin: { top: style.marginTop, right: style.marginRight, bottom: style.marginBottom, left: style.marginLeft },
      gap: style.gap || 'none',
      border: style.border !== 'none' ? style.border : null,
      width: el.offsetWidth,
      height: el.offsetHeight
    });
  });

  const headings = [];
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(el => {
    const style = getComputedStyle(el);
    headings.push({
      level: el.tagName,
      text: el.textContent.trim().substring(0, 60),
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      color: style.color,
      marginTop: style.marginTop,
      marginBottom: style.marginBottom
    });
  });

  return JSON.stringify({ sections, headings });
}
```

## Step 5: Touch Target Audit at Phone Viewports (Playwright)

Set viewport to Phone portrait (393x852 @ 3x DPR), then run via `browser_evaluate`:

```javascript
() => {
  const smalls = [];
  document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="link"], [role="tab"]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const minDim = Math.min(rect.width, rect.height);
    if (minDim < 44) {
      smalls.push({
        element: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''),
        text: el.textContent?.trim().substring(0, 30) || el.name || 'unnamed',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        minDimension: Math.round(minDim)
      });
    }
  });
  return JSON.stringify({ totalUndersize: smalls.length, elements: smalls });
}
```

## Step 6: Compile the Full Report

### 1. Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | X/100 | Pass/Warn/Fail |
| Accessibility | X/100 | Pass/Warn/Fail |
| SEO | X/100 | Pass/Warn/Fail |
| Best Practices | X/100 | Pass/Warn/Fail |

Scoring: 90+ = Pass, 50-89 = Warn, <50 = Fail

#### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| LCP | X.Xs | < 2.5s | Pass/Fail |
| CLS | X.XX | < 0.1 | Pass/Fail |
| INP | Xms | < 200ms | Pass/Fail |
| TTFB | Xms | < 800ms | Pass/Fail |

#### Lighthouse Failures by Category

List all failing audits grouped by category.

### 2. Responsive Design

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass/Fail | ... |
| Desktop 16:9 | 1920x1080 | 1 | Pass/Fail | ... |
| Laptop | 1280x720 | 1.5 | Pass/Fail | ... |
| Tablet landscape | 1180x820 | 2 | Pass/Fail | ... |
| Tablet portrait | 820x1180 | 2 | Pass/Fail | ... |
| Phone landscape | 852x393 | 3 | Pass/Fail | ... |
| Phone portrait | 393x852 | 3 | Pass/Fail | ... |

Analysis points:
- **Docusaurus sidebar**: Does it collapse/hide correctly at each viewport?
- **Content width**: Is the main content area using available space well?
- **Tables and figures**: Do they adapt or scroll as needed?
- **Typography**: Are headings and body text readable at all sizes?

### 3. Heading Hierarchy

- Are heading levels sequential (h1 → h2 → h3, no skipped levels)?
- Is there a single h1 per page?
- Do headings match the document's logical structure?

### 4. Spacing & Layout Quality

- Is spacing consistent between sections?
- Does the page feel balanced at desktop?
- Are figure/table containers properly spaced?

### 5. Touch Targets

List any interactive elements under 44px minimum dimension at phone viewport.

### 6. Component-Level Fix Recommendations

For **every issue** found, provide specific file, line, current code, recommended fix, and rationale. Do NOT give vague advice.

### 7. Overall Assessment

Brief summary of scores, total issues, and most critical items.

## Docusaurus-Specific Notes

- Docusaurus sidebar collapses at 996px — this is normal behavior.
- The site uses `@docusaurus/theme-classic` with Tailwind CSS overlay.
- Custom styles are in `src/css/custom.css` and `src/css/tables.css`.
- The primary USACE color is `#4a7c9b` (steel blue).
- Component source is in `src/components/`.
- Theme overrides are in `src/theme/`.
