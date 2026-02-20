---
name: lint-fix
description: Run ESLint on specified files or directories, auto-fix what's possible, and provide guidance for remaining issues. Uses ESLint MCP when available, falls back to CLI.
---

# Lint Fix

Run ESLint and fix issues in the specified scope.

**Arguments:** `$ARGUMENTS` (optional) — a file path, directory path, or blank for all (e.g., "src/components/Figure.js", "src/components/", or empty).

## Step 1: Resolve Scope

- If `$ARGUMENTS` is a file/directory path, use it directly
- If empty, default to `src/`

## Step 2: Run ESLint

### If ESLint MCP is available:
Use the ESLint MCP `lint-files` tool to analyze the target files. Provide the absolute file paths.

### If ESLint MCP is not available, use CLI:

First, get structured results:
```bash
npx eslint {path} --format json 2>/dev/null
```

Then auto-fix what's possible:
```bash
npx eslint {path} --fix
```

## Step 3: Categorize Issues

Group all issues into:

1. **Auto-fixed** — Issues that `--fix` resolved automatically
2. **Manual fix needed** — Issues requiring code changes
3. **Warnings** — Non-blocking issues to be aware of

## Step 4: Provide Manual Fixes

For each issue that requires manual fixing:

1. Read the relevant file to understand context
2. Provide the exact code change needed
3. Explain why the rule exists and what it prevents

## Step 5: Report

### ESLint Results: {scope}

| Category | Count |
|----------|-------|
| Auto-fixed | X |
| Manual fixes needed | Y |
| Warnings | Z |

### Auto-Fixed Issues

| File | Rule | Description |
|------|------|-------------|
| path:line | rule-name | What was fixed |

### Manual Fixes Required

For each:

**File**: `path/to/file:line`
**Rule**: `rule-name`
**Message**: {ESLint message}
**Current code**:
```javascript
{problematic code}
```
**Fix**:
```javascript
{corrected code}
```
**Why**: {What this rule prevents}

### Warnings

| File | Rule | Description |
|------|------|-------------|
| path:line | rule-name | Warning message |

### Summary

Total issues found, auto-fixed count, remaining count, most common rule violations.
