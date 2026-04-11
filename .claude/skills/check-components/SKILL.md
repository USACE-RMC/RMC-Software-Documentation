---
name: check-components
description: Validate correct usage of custom React components (Figure, Table, Equation, Citation, NavContainer, etc.) in MDX files. Checks required props, validates key formats, verifies imports, and ensures consistent patterns.
---

# Check Components

Validate the usage of custom React components in MDX documentation files.

**Arguments:** `$ARGUMENTS` — a file path, directory path, or document version path (e.g., "docs/desktop-applications/lifesim/users-guide/v2.0/", or a specific `.mdx` file).

## Step 1: Resolve Scope

- If `$ARGUMENTS` is a specific `.mdx` file, check that file only
- If `$ARGUMENTS` is a directory path, check all `.mdx` files in that directory recursively
- If empty, default to `docs/` (entire documentation set)

List all MDX files in scope.

## Step 2: Read Component Definitions

Read the source of key components to understand their required and optional props:

- `src/components/Figure.js` — `figKey`, `src`, `alt`, `caption`
- `src/components/TableHorizontal.js` — `tableKey`
- `src/components/TableVertical.js` — `tableKey`
- `src/components/Equation.js` — `equationKey`
- `src/components/Citation.js` — `citationKey`
- `src/components/NavContainer.js` — `link`, `linkTitle`, `document`
- `src/components/FigureReference.js` — `figKey`
- `src/components/TableReference.js` — `tableKey`
- `src/components/EquationReference.js` — `equationKey`

## Step 3: Check Each MDX File

For each MDX file in scope, perform these checks:

### 3a: Import Validation

- Every component used in the file must have a corresponding `import` statement
- Import paths should use `@site/src/components/...` alias
- No unused imports (component imported but never used in the file)
- No duplicate imports

### 3b: Figure Component Checks

For each `<Figure ... />`:
- **Required props**: `figKey`, `src`, `alt`, `caption` must all be present
- **figKey format**: Should be a descriptive string (e.g., `"fig1"`, `"dam-cross-section"`) — no empty strings
- **src path**: Must point to an image file (`.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.webp`)
- **alt text**: Must not be empty — should describe the image content
- **Self-closing**: `<Figure ... />` not `<Figure ...></Figure>`

### 3c: Table Component Checks

For each `<TableHorizontal ... />` and `<TableVertical ... />`:
- **Required prop**: `tableKey` must be present and non-empty
- **tableKey uniqueness**: No duplicate tableKeys within the same document version directory
- **Self-closing tag**: Should be self-closing

### 3d: Equation Component Checks

For each `<Equation ... >...</Equation>`:
- **Required prop**: `equationKey` must be present and non-empty
- **Has content**: Must contain LaTeX content between tags (not self-closing)
- **equationKey uniqueness**: No duplicate equationKeys within the same document version directory

### 3e: Citation Component Checks

For each `<Citation ... />`:
- **Required prop**: `citationKey` must be present and non-empty
- **Bibliography present**: If any `<Citation>` is used, `<Bibliography />` must appear in at least one file in the document

### 3f: NavContainer Component Checks

For each `<NavContainer ... />`:
- **Required props**: `link`, `linkTitle`, `document` must all be present
- **link format**: Should be a valid URL path
- **Placement**: Should appear near the top of the file (before main content headings)

### 3g: Reference Component Checks

For each `<FigureReference>`, `<TableReference>`, `<EquationReference>`:
- **Required prop**: The corresponding key prop must be present and non-empty
- **Key exists**: The referenced key should match a defined component in the same document

## Step 4: Check Key Uniqueness Across Document

Within each document version directory (e.g., `docs/.../v2.0/`):

- Collect all `figKey` values — flag any duplicates
- Collect all `tableKey` values — flag any duplicates
- Collect all `equationKey` values — flag any duplicates

Duplicates within a document will cause counter numbering issues.

## Step 5: Check Heading Hierarchy

For each MDX file, verify:

- Headings follow sequential order (h1 → h2 → h3, no skipping)
- The file starts with an appropriate heading level
- No raw `<h1>` tags (use markdown `#` syntax)

## Step 6: Report

### Component Validation: {scope}

| Check | Files | Issues |
|-------|-------|--------|
| Missing imports | N | X |
| Unused imports | N | X |
| Figure props | N | X |
| Table props | N | X |
| Equation props | N | X |
| Citation props | N | X |
| NavContainer props | N | X |
| Reference keys | N | X |
| Key uniqueness | N | X |
| Heading hierarchy | N | X |
| **Total** | **N** | **X** |

### Issues Found

For each issue:

**File**: `path/to/file:line`
**Component**: `<Figure>` / `<TableHorizontal>` / etc.
**Issue**: [Description — missing prop, empty value, duplicate key, etc.]
**Current code**:
```jsx
{current usage}
```
**Fix**:
```jsx
{corrected usage}
```

### Key Inventory

For each document version reviewed, list all defined keys:

**{document path}**:
- Figures: `fig1`, `fig2`, `fig3` ...
- Tables: `tab1`, `tab2` ...
- Equations: `eq1`, `eq2` ...

Flag any naming inconsistencies (e.g., mixed naming conventions within the same document).

### Summary

Total files scanned, total issues found, most common issue types, and overall component usage health.
