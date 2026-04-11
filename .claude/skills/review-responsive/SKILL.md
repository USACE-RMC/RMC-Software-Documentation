---
name: review-responsive
description: Review responsive design by taking screenshots and snapshots at all 7 reference device viewports (including portrait/landscape) with DPR emulation. Use when checking layout, breakpoints, or responsive behavior of documentation pages.
---

# Review Responsive Design

Review the responsive layout of a documentation page across all 7 reference devices (including portrait and landscape orientations for phone and tablet).

**Arguments:** `$ARGUMENTS` — a page URL path (e.g., "/", "/docs/desktop-applications/lifesim/users-guide/v2.0/01-introduction") or a full URL.

## Step 1: Resolve the URL and Prepare Output

### URL Resolution
- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly
- If `$ARGUMENTS` starts with `/`, prepend `http://localhost:3000`
- If `$ARGUMENTS` is a page name (e.g., "homepage", "lifesim"), use best judgment to construct the URL path based on the Docusaurus docs/ directory structure

Derive a **target slug** from `$ARGUMENTS` (lowercase, hyphens for spaces, strip special characters). Examples: "homepage" → `homepage`, "/docs/desktop-applications/lifesim" → `lifesim`.

Clean and create the output directory:
```bash
rm -rf review-output/review-responsive/{slug} && mkdir -p review-output/review-responsive/{slug}
```

All screenshots for this run are saved under `review-output/review-responsive/{slug}/`.

## Step 2: Navigate

1. Navigate to the resolved URL with `browser_navigate`
2. Wait for the page to fully load (`browser_wait_for` with `time: 2`)

## Step 3: Capture Each Reference Device

Work through all 7 devices in order from **largest to smallest** so you can observe what collapses at each step down.

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
3. Take a full-page screenshot (`browser_take_screenshot` with `fullPage: true`, filename: `review-output/review-responsive/{slug}/responsive-{suffix}.png`)
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

## Step 4: Analyze and Report

After capturing all seven devices, provide a structured report.

### Per-Device Analysis

For **each device tier**, report:

**{Tier Name} ({width}x{height} @ {DPR}x DPR)**
- **Layout**: Does the content fill the viewport appropriately? Any wasted space or overflow?
- **Navigation**: Is the Docusaurus sidebar visible, collapsed, or hidden as expected for this viewport?
- **Content area**: Does the main content area use available width well?
- **Tables**: Do tables scroll horizontally or adapt? Check for overflow.
- **Figures**: Do images scale properly? Are captions readable?
- **Typography**: Is text readable? Are heading sizes appropriate?
- **Spacing**: Does padding/margin feel appropriate for the screen size?
- **Issues**: List any specific problems with file:line references if identifiable

### Desktop 16:9 vs 16:10 Comparison

Specifically note any differences between the two desktop aspect ratios:
- Does the extra 120px of vertical space change anything?
- Are any elements cut off at 1080px that are visible at 1200px?

### Portrait vs Landscape Comparisons

**Tablet**: Portrait (820px) vs Landscape (1180px)
- Does the Docusaurus sidebar behave correctly at each width?
- Does content reflow appropriately?

**Phone**: Portrait (393px) vs Landscape (852px)
- Is content readable at the narrow 393px width?
- Does the hamburger menu work correctly?

### Summary Table

| Tier | Viewport | DPR | Status | Key Issues |
|------|----------|-----|--------|------------|
| Desktop 16:10 | 1920x1200 | 1 | Pass/Fail | ... |
| Desktop 16:9 | 1920x1080 | 1 | Pass/Fail | ... |
| Laptop | 1280x720 | 1.5 | Pass/Fail | ... |
| Tablet landscape | 1180x820 | 2 | Pass/Fail | ... |
| Tablet portrait | 820x1180 | 2 | Pass/Fail | ... |
| Phone landscape | 852x393 | 3 | Pass/Fail | ... |
| Phone portrait | 393x852 | 3 | Pass/Fail | ... |

### Component-Level Fix Recommendations

For **every issue** found above, you MUST:

1. **Identify the source component or CSS**: Use the accessibility snapshot element names and class names to locate the responsible file in `src/components/`, `src/css/`, or `src/theme/`.
2. **Pinpoint the exact location**: Reference the specific file path and line number(s).
3. **Provide the exact code change**: Show the current code and the recommended replacement. Use Tailwind utility classes consistent with the existing codebase patterns.
4. **Explain the rationale**: Briefly state why this change fixes the issue.

Format each recommendation as:

**Issue**: [Description of what's broken and at which viewport(s)]
**File**: `path/to/file:line`
**Current code**: `{current}`
**Recommended fix**: `{fix}`
**Rationale**: [Why this fixes it]

Do NOT give vague advice like "consider adjusting the layout." Every recommendation must be a specific, implementable code change.

## Groundwork Header & Footer

The site header (navbar) and footer are provided by the `@usace/groundwork` package via the `SiteWrapper` component. The site maintainers do not control the look, feel, or markup of these elements. When reporting issues, **do not give significant weight to findings related to the Groundwork header or footer** (e.g., layout, spacing, overflow, typography within the navbar/footer). Mention them briefly if found, but clearly label them as **"Groundwork (external)"** and do not include them in fix recommendations.

## Important Notes

- Docusaurus has its own responsive breakpoints. The sidebar auto-collapses at 996px by default. Don't flag this as a bug.
- The site uses Tailwind CSS with USACE branding colors (primary: `#4a7c9b`).
- Custom component styles are in `src/css/custom.css` and `src/css/tables.css`.
- If something looks broken, read the relevant source file before flagging it.
