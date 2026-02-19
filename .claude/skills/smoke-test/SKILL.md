---
name: smoke-test
description: Quick smoke test of a documentation page — checks it loads without errors, interactive elements respond, and no console errors occur. Uses Playwright for rapid page verification.
---

# Smoke Test

Quick health check of a documentation page.

**Arguments:** `$ARGUMENTS` — a page URL path (e.g., "/", "/docs/desktop-applications/lifesim/users-guide/v2.0/01-introduction") or a full URL.

## Step 1: Resolve the URL and Prepare Output

### URL Resolution
- If `$ARGUMENTS` is a full URL (starts with `http`), use it directly
- If `$ARGUMENTS` starts with `/`, prepend `http://localhost:3000`
- If `$ARGUMENTS` is a page name, construct the URL from the docs/ directory structure

Derive a **target slug** from `$ARGUMENTS` (lowercase, hyphens for spaces).

Clean and create the output directory:
```bash
rm -rf review-output/smoke-test/{slug} && mkdir -p review-output/smoke-test/{slug}
```

## Step 2: Set Up Console Monitoring

Navigate and install console interceptors:

1. `browser_navigate` to the resolved URL
2. Immediately set up monitoring via `browser_evaluate`:
   ```javascript
   () => {
     window.__smoke = { errors: [], warnings: [], uncaught: [] };
     const origError = console.error;
     const origWarn = console.warn;
     console.error = (...args) => {
       window.__smoke.errors.push(args.map(String).join(' '));
       origError.apply(console, args);
     };
     console.warn = (...args) => {
       window.__smoke.warnings.push(args.map(String).join(' '));
       origWarn.apply(console, args);
     };
     window.addEventListener('error', (e) => {
       window.__smoke.uncaught.push(e.message);
     });
     window.addEventListener('unhandledrejection', (e) => {
       window.__smoke.uncaught.push(String(e.reason));
     });
     return 'Monitoring active';
   }
   ```
3. Wait for full load (`browser_wait_for` time: 3)

## Step 3: Screenshot and Snapshot

1. Take a full-page screenshot (`browser_take_screenshot` fullPage: true, filename: `review-output/smoke-test/{slug}/smoke-test.png`)
2. Take an accessibility snapshot (`browser_snapshot`)

## Step 4: Check Page Content

Verify the page loaded meaningfully:

```javascript
() => {
  const body = document.body;
  const text = body.innerText.trim();
  const hasContent = text.length > 50;
  const hasSpinner = !!document.querySelector('[class*="spinner"], [class*="loading"], [class*="skeleton"]');
  const hasError = !!document.querySelector('[class*="error"], [role="alert"]');
  const h1 = document.querySelector('h1')?.textContent?.trim();
  return JSON.stringify({ hasContent, hasSpinner, hasError, h1, textLength: text.length });
}
```

- Page should have meaningful content (not just a loading state)
- No error messages visible
- H1 heading present and relevant

## Step 5: Check Interactive Elements

```javascript
() => {
  const els = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
  const summary = {
    total: els.length,
    buttons: document.querySelectorAll('button, [role="button"]').length,
    links: document.querySelectorAll('a[href]').length,
    inputs: document.querySelectorAll('input, select, textarea').length,
    disabled: [...els].filter(el => el.disabled).length,
    hidden: [...els].filter(el => {
      const r = el.getBoundingClientRect();
      return r.width === 0 || r.height === 0;
    }).length
  };
  return JSON.stringify(summary);
}
```

## Step 6: Check for Visual Issues

```javascript
() => {
  const issues = [];
  // Broken images
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
      issues.push({ type: 'broken-image', src: img.src.substring(0, 100) });
    }
  });
  // Viewport overflow
  const vw = document.documentElement.clientWidth;
  document.querySelectorAll('main *, article *, .theme-doc-markdown *').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > vw + 5 && rect.width > 0) {
      issues.push({
        type: 'overflow',
        element: el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
        right: Math.round(rect.right),
        viewport: vw
      });
    }
  });
  return JSON.stringify({ count: issues.length, issues: issues.slice(0, 20) });
}
```

## Step 7: Check Docusaurus-Specific Elements

```javascript
() => {
  const checks = {
    sidebar: !!document.querySelector('.theme-doc-sidebar-container, [class*="sidebar"]'),
    breadcrumbs: !!document.querySelector('.theme-doc-breadcrumbs, [class*="breadcrumb"]'),
    pagination: !!document.querySelector('.pagination-nav, [class*="pagination"]'),
    toc: !!document.querySelector('.table-of-contents, [class*="tableOfContents"]'),
    navbar: !!document.querySelector('.navbar, [class*="navbar"]'),
    footer: !!document.querySelector('.footer, [class*="footer"]'),
    searchBar: !!document.querySelector('[class*="search"], [role="search"]'),
    docContent: !!document.querySelector('.theme-doc-markdown, article')
  };
  return JSON.stringify(checks);
}
```

## Step 8: Collect Console Output

```javascript
() => JSON.stringify(window.__smoke)
```

Categorize:
- **Console errors**: Application bugs, failed resource loads, React errors
- **Console warnings**: React dev warnings, deprecation notices
- **Uncaught exceptions**: Unhandled errors and promise rejections

## Step 9: Report

### Smoke Test: {page}

| Check | Status | Details |
|-------|--------|---------|
| Page loads | Pass/Fail | {content present} |
| No console errors | Pass/Fail | {N errors} |
| No console warnings | Pass/Warn | {N warnings} |
| Content renders | Pass/Fail | {has content, no stuck spinner} |
| Interactive elements | Pass/Fail | {N links, M buttons} |
| No visual overflow | Pass/Fail | {overflow count} |
| No broken images | Pass/Fail | {broken count} |
| Page heading | Pass/Fail | {h1 text} |
| Docusaurus elements | Pass/Fail | {sidebar, breadcrumbs, pagination, TOC} |

### Console Errors
{List each error, or "None"}

### Console Warnings
{List warnings, or "None"}

### Visual Issues
{List overflow/broken images, or "None"}

### Docusaurus Structure
{Which structural elements are present/missing}

### Verdict

**PASS** — Page loads and functions correctly
**WARN** — Page works but has non-blocking issues (warnings, minor visual problems)
**FAIL** — Page has critical problems (errors, broken content, crash)

{Brief summary}
