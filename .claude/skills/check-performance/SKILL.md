---
name: check-performance
description: Check page performance using Lighthouse including Core Web Vitals, unused JavaScript, resource analysis, and mobile vs desktop comparison. Use when investigating load times, bundle size, or performance optimization.
---

# Check Performance

Audit the performance of a documentation page using Lighthouse.

**Arguments:** `$ARGUMENTS` — a page URL path (e.g., "/", "/docs/desktop-applications/lifesim/users-guide/v2.0/01-introduction") or a full URL.

## Step 1: Resolve the URL

### URL Resolution
- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly
- If `$ARGUMENTS` starts with `/`, prepend `http://localhost:3000`
- If `$ARGUMENTS` is a page name, construct the URL from the docs/ directory structure

**Note**: If Lighthouse MCP is not available, stop and inform the user: "Lighthouse MCP is not configured. Add it to your MCP settings to use this skill."

## Step 2: Run Core Web Vitals

Use the Lighthouse MCP tool `get_core_web_vitals`:

- **url**: the resolved URL from Step 1
- **device**: `"desktop"`
- **includeDetails**: `true`

Record: LCP, CLS, FID/INP, TTFB, Speed Index, Total Blocking Time.

## Step 3: Run Full Performance Score

Use the Lighthouse MCP tool `get_performance_score`:

- **url**: the resolved URL
- **device**: `"desktop"`

Record the overall performance score.

## Step 4: Find Unused JavaScript

Use the Lighthouse MCP tool `find_unused_javascript`:

- **url**: the resolved URL
- **device**: `"desktop"`
- **minBytes**: `1024`

Record all modules with significant unused bytes.

## Step 5: Analyze Resources

Use the Lighthouse MCP tool `analyze_resources`:

- **url**: the resolved URL
- **device**: `"desktop"`

Record resource breakdown by type (scripts, styles, images, fonts, etc.) with sizes and counts.

## Step 6: Compare Mobile vs Desktop

Use the Lighthouse MCP tool `compare_mobile_desktop`:

- **url**: the resolved URL
- **categories**: `["performance"]`
- **includeDetails**: `true`

Record score differences and any mobile-specific performance issues.

## Step 7: Report

### Performance Score

**Desktop**: X/100
**Mobile**: X/100

Scoring: 90+ = Good, 50-89 = Needs Improvement, <50 = Poor

### Core Web Vitals

| Metric | Desktop | Mobile | Threshold | Status |
|--------|---------|--------|-----------|--------|
| LCP (Largest Contentful Paint) | X.Xs | X.Xs | < 2.5s | Pass/Fail |
| CLS (Cumulative Layout Shift) | X.XX | X.XX | < 0.1 | Pass/Fail |
| INP (Interaction to Next Paint) | Xms | Xms | < 200ms | Pass/Fail |
| TTFB (Time to First Byte) | Xms | Xms | < 800ms | Pass/Fail |
| Speed Index | X.Xs | X.Xs | < 3.4s | Pass/Fail |
| Total Blocking Time | Xms | Xms | < 200ms | Pass/Fail |

### Resource Analysis

| Resource Type | Count | Total Size | Largest Item |
|---------------|-------|------------|--------------|
| JavaScript | X | X KB | ... |
| CSS | X | X KB | ... |
| Images | X | X KB | ... |
| Fonts | X | X KB | ... |
| Other | X | X KB | ... |
| **Total** | **X** | **X KB** | |

### Unused JavaScript

| Module/File | Total Size | Unused Size | Unused % |
|-------------|-----------|-------------|----------|
| ... | X KB | X KB | X% |

### Mobile vs Desktop Comparison

| Metric | Desktop | Mobile | Difference |
|--------|---------|--------|------------|
| Performance Score | X | X | ... |
| LCP | X | X | ... |
| CLS | X | X | ... |
| TBT | X | X | ... |

### Optimization Recommendations

For each performance issue, provide:

**Issue**: [Metric/Category] — [Description]
**Impact**: [Estimated savings in ms or KB]
**File**: `path/to/file` (if identifiable)
**Recommendation**: [Specific action to take]
**Rationale**: [Why this helps]

#### Common fix categories:

- **Unused JavaScript**: Recommend lazy loading or removing unused imports.
- **Large images**: Recommend compression, WebP/AVIF format, or `loading="lazy"`.
- **Render-blocking CSS**: Recommend critical CSS inlining or async loading.
- **Layout shifts (CLS)**: Recommend explicit `width`/`height` on images or `aspect-ratio` on containers.
- **KaTeX/Mermaid bundles**: These are large but necessary for math/diagram rendering. Note if they dominate the bundle but don't flag as removable.

### Overall Assessment

Brief summary: Is performance acceptable? What are the top 1-3 optimizations? Is there a significant mobile vs desktop gap?

## Groundwork Header & Footer

The site header (navbar) and footer are provided by the `@usace/groundwork` package via the `SiteWrapper` component. The site maintainers do not control the look, feel, or markup of these elements. When reporting issues, **do not give significant weight to findings related to the Groundwork header or footer** (e.g., resource weight from Groundwork bundles, layout shifts caused by the navbar/footer). Mention them briefly if found, but clearly label them as **"Groundwork (external)"** and do not include them in optimization recommendations.

## Docusaurus-Specific Notes

- Docusaurus uses Webpack for bundling with automatic code splitting per route.
- KaTeX (for equations) and Mermaid (for diagrams) add significant JS weight on pages that use them.
- Static site generation means TTFB should be very fast.
- Image optimization can be handled by Docusaurus `@docusaurus/plugin-ideal-image` if not already configured.
