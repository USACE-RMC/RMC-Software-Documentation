---
name: check-accessibility
description: Check Section 508 / WCAG AA compliance using Lighthouse axe-core audit plus touch target and heading hierarchy checks via Playwright. Use when reviewing accessibility, contrast, or ARIA compliance.
---

# Check Accessibility (Section 508 / WCAG AA)

Audit a documentation page for Section 508 and WCAG AA compliance using Lighthouse for standardized axe-core analysis, supplemented by Playwright for device-specific checks.

**Arguments:** `$ARGUMENTS` — a page URL path (e.g., "/", "/docs/desktop-applications/lifesim/users-guide/v2.0/01-introduction") or a full URL.

## Step 1: Resolve the URL and Prepare Output

### URL Resolution
- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly
- If `$ARGUMENTS` starts with `/`, prepend `http://localhost:3000`
- If `$ARGUMENTS` is a page name, construct the URL from the docs/ directory structure

Derive a **target slug** from `$ARGUMENTS` (lowercase, hyphens for spaces).

Clean and create the output directory:
```bash
rm -rf review-output/check-accessibility/{slug} && mkdir -p review-output/check-accessibility/{slug}
```

## Step 2: Run Lighthouse Accessibility Audit

Use the Lighthouse MCP tool `get_accessibility_score` to run a full axe-core accessibility audit:

- **url**: the resolved URL from Step 1
- **device**: `"desktop"`
- **includeDetails**: `true`

This covers ~80 WCAG rules including:
- Color contrast (AA thresholds: 4.5:1 normal text, 3:1 large text/UI components)
- ARIA labels, roles, and properties
- Form field label associations
- Image alt text
- Document language
- Heading hierarchy
- Link and button accessible names
- Duplicate IDs
- Focus management

Record the **score**, **pass count**, **fail count**, and **all failing audit details**.

Then run the same audit for mobile:
- **device**: `"mobile"`
- **includeDetails**: `true`

Note any differences between desktop and mobile results.

**Note**: If Lighthouse MCP is not available, skip this step and proceed to Step 3 for Playwright-only analysis.

## Step 3: Navigate with Playwright for Visual Baseline

1. Navigate to the resolved URL with `browser_navigate`
2. Wait for the page to fully load (`browser_wait_for` with `time: 2`)
3. Set to desktop viewport using `browser_run_code`:
   ```javascript
   async (page) => {
     const client = await page.context().newCDPSession(page);
     await client.send('Emulation.setDeviceMetricsOverride', {
       width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false
     });
   }
   ```
4. Take a full-page screenshot (`browser_take_screenshot` with `fullPage: true`, filename: `review-output/check-accessibility/{slug}/accessibility-baseline.png`)
5. Take an accessibility snapshot with `browser_snapshot` — this gives the heading hierarchy and ARIA tree

## Step 4: Check Touch Targets at Phone Viewport

Set to Phone portrait (393x852 @ 3x DPR) using `browser_run_code`:
```javascript
async (page) => {
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 393, height: 852, deviceScaleFactor: 3, mobile: true
  });
}
```

Wait 1 second for layout to settle, then run via `browser_evaluate`:

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

## Step 5: Verify Heading Hierarchy from Accessibility Snapshot

From the accessibility snapshot taken in Step 3, verify:

1. **Heading order**: h1 → h2 → h3 etc. No skipped levels (e.g., h1 → h3 is a violation)
2. **Single h1**: Only one h1 per page
3. **Meaningful headings**: Section headers should describe their content
4. **Landmark regions**: Check for proper `main`, `nav`, `header`, `footer` landmarks

## Step 6: Check Image Alt Text

```javascript
() => {
  const images = [];
  document.querySelectorAll('img').forEach(img => {
    images.push({
      src: img.src.substring(img.src.lastIndexOf('/') + 1),
      alt: img.alt || null,
      hasAlt: img.hasAttribute('alt'),
      isDecorative: img.getAttribute('alt') === '',
      ariaHidden: img.getAttribute('aria-hidden') === 'true',
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  });
  const missing = images.filter(i => !i.hasAlt && !i.ariaHidden);
  return JSON.stringify({ total: images.length, missingAlt: missing.length, details: missing });
}
```

## Step 7: Report

### Lighthouse Accessibility Score

**Desktop score**: X/100
**Mobile score**: X/100

### Lighthouse Audit Failures

| Rule ID | Impact | Description | Affected Elements |
|---------|--------|-------------|-------------------|
| color-contrast | serious | Elements must have sufficient color contrast | ... |
| image-alt | critical | Images must have alt text | ... |

### Touch Targets (Phone Portrait 393x852)

List any interactive elements under 44px minimum dimension.

### Heading Hierarchy

Show the heading tree from the accessibility snapshot and flag any violations.

### Image Alt Text

List any images missing alt text.

### Landmark Regions

List the landmark regions found and flag any missing.

### Component-Level Fix Recommendations

For **every issue** found above, provide:

**Issue**: [Rule ID or check] — [Description]
**File**: `path/to/file:line`
**Current code**:
```jsx
{current code}
```
**Recommended fix**:
```jsx
{fixed code}
```
**Rationale**: [Why this fixes the issue and which WCAG criterion it addresses]

#### Specific guidance:

- **Contrast failures**: Reference colors from `src/css/custom.css` or Tailwind config. Verify recommendations pass WCAG AA.
- **Missing alt text**: For `<Figure>` components, ensure `alt` prop is set. For raw `<img>`, add `alt` attribute.
- **Missing labels**: Show exactly which `aria-label` or `<label>` to add.
- **Touch targets undersized**: Show how to increase min-height/min-width or add padding.

Do NOT give vague advice. Every recommendation must show the exact code change in the exact file.

### Overall Assessment

Brief summary: Lighthouse score, total issues found, most critical items.

## USACE Color Palette Reference

- **Primary steel blue**: `#4a7c9b`
- **Page background**: `#f7f8fa`
- **Text primary**: `#333333`
- **Text secondary**: `#4b5563`
- **Borders**: `#bfbfbf`

Refer to `src/css/custom.css` for the full set of CSS custom properties.
