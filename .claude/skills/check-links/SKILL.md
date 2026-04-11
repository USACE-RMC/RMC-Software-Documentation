---
name: check-links
description: Scan MDX files for broken internal links, missing figure/table references, invalid component imports, and dead asset paths. Use to validate document integrity before publishing.
---

# Check Links

Scan MDX files for broken references and links.

**Arguments:** `$ARGUMENTS` — a file path, directory path, or document version path (e.g., "docs/desktop-applications/lifesim/users-guide/v2.0/", "docs/", or a specific `.mdx` file).

## Step 1: Resolve Scope

- If `$ARGUMENTS` is a specific `.mdx` file, check that file only
- If `$ARGUMENTS` is a directory path, check all `.mdx` files in that directory recursively
- If empty, default to `docs/` (entire documentation set)

List all MDX files in scope using Glob: `{path}/**/*.mdx`

## Step 2: Check Component Imports

For each MDX file, verify that all imported components exist:

1. Extract all `import` statements from the file
2. For each import with `@site/src/...` path, verify the target file exists using Glob
3. Flag any imports pointing to non-existent files

Report format:
```
MISSING IMPORT: {file}:{line}
  import {Component} from "@site/src/components/{path}"
  Target file does not exist: src/components/{path}
```

## Step 3: Check Figure References

For each MDX file:

1. Find all `<Figure figKey="..." src="..." />` components
2. Verify the `src` path resolves to an existing file:
   - If `src` starts with `/`, check relative to `static/`
   - If `src` is a relative path, check relative to the MDX file's directory
3. Find all `<FigureReference figKey="..." />` components
4. Verify each `figKey` in a `FigureReference` matches a `figKey` defined in a `Figure` component within the same document (same version directory)

Report format:
```
BROKEN FIGURE SRC: {file}:{line}
  <Figure figKey="{key}" src="{path}" />
  Image file not found: {resolved_path}

ORPHAN FIGURE REF: {file}:{line}
  <FigureReference figKey="{key}" />
  No matching <Figure figKey="{key}"> found in document
```

## Step 4: Check Table References

For each MDX file:

1. Find all `<TableHorizontal tableKey="..." />` and `<TableVertical tableKey="..." />` components
2. Find all `<TableReference tableKey="..." />` components
3. Verify each `tableKey` in a `TableReference` matches a `tableKey` defined in a table component within the same document

Report format:
```
ORPHAN TABLE REF: {file}:{line}
  <TableReference tableKey="{key}" />
  No matching table component with tableKey="{key}" found in document
```

## Step 5: Check Equation References

For each MDX file:

1. Find all `<Equation equationKey="..." />` components
2. Find all `<EquationReference equationKey="..." />` components
3. Verify each `equationKey` in an `EquationReference` matches an `equationKey` defined in an `Equation` component within the same document

Report format:
```
ORPHAN EQUATION REF: {file}:{line}
  <EquationReference equationKey="{key}" />
  No matching <Equation equationKey="{key}"> found in document
```

## Step 6: Check Internal Links

For each MDX file:

1. Find all markdown links `[text](path)` and `<a href="path">` elements
2. For internal links (not starting with `http://` or `https://`):
   - If the link points to another MDX file, verify it exists
   - If the link points to an anchor (`#section-name`), note it (anchor validation is best done at build time)
3. For `<NavContainer link="..." />` components, verify the link path resolves

Report format:
```
BROKEN LINK: {file}:{line}
  [link text]({path})
  Target not found: {resolved_path}
```

## Step 7: Check Citation Keys

For each MDX file:

1. Find all `<Citation citationKey="..." />` components
2. Derive the bibliography path (replace `docs/` with `static/bibliographies/`, find `bib.json`)
3. If bibliography exists, verify each `citationKey` exists in the bibliography JSON
4. Check that `<Bibliography />` is present if any `<Citation>` components are used

Report format:
```
MISSING CITATION KEY: {file}:{line}
  <Citation citationKey="{key}" />
  Key "{key}" not found in {bib_path}

MISSING BIBLIOGRAPHY: {file}
  File uses <Citation> components but has no <Bibliography /> component
```

## Step 8: Report

### Link Check Results: {scope}

| Check | Files Scanned | Issues Found |
|-------|---------------|--------------|
| Component imports | N | X |
| Figure sources | N | X |
| Figure references | N | X |
| Table references | N | X |
| Equation references | N | X |
| Internal links | N | X |
| Citation keys | N | X |
| **Total** | **N** | **X** |

### Issues by Severity

**Broken** (files/images that don't exist):
{list each broken reference}

**Orphaned** (references with no matching definition):
{list each orphaned reference}

**Warnings** (potential issues that need human review):
{list any ambiguous cases}

### Summary

Total files scanned, total issues found, most common issue types, and recommended actions.
