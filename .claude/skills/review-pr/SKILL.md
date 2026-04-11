---
name: review-pr
description: Review a GitHub pull request for code quality, component correctness, MDX patterns, and documentation standards. Provides structured feedback with specific file and line references.
---

# Review Pull Request

Perform a code review of a GitHub pull request.

**Arguments:** `$ARGUMENTS` — a PR number, PR URL, or empty (uses current branch's PR).

## Step 1: Resolve the PR

1. If `$ARGUMENTS` is a number, use it as the PR number
2. If `$ARGUMENTS` is a URL, extract the PR number from it
3. If `$ARGUMENTS` is empty, get the current branch's PR:
   ```bash
   gh pr view --json number -q .number
   ```
   If no PR exists for the current branch, stop with an error.

## Step 2: Fetch PR Details

```bash
gh pr view {number} --json title,body,files,additions,deletions,commits,baseRefName,headRefName,state,reviews,labels
```

Record: title, branch names, number of files, total additions/deletions.

## Step 3: Get the Full Diff

```bash
gh pr diff {number}
```

Also get the list of changed files:
```bash
gh pr view {number} --json files -q '.files[].path'
```

## Step 4: Read Changed Files

For **every** changed file, read the complete file (not just the diff) to understand context. Use the Read tool for each file.

Also read any closely related files that aren't in the diff but are needed to understand the changes (e.g., if a component changed, read files that import it).

## Step 5: Documentation Review

### MDX file checks:
- **Valid JSX syntax**: Properly closed tags, correct attribute formatting
- **Correct imports**: All components are imported before use
- **Component usage**: Required props present (`figKey`, `tableKey`, `equationKey`, `citationKey`)
- **Heading hierarchy**: No skipped levels (h1 → h2 → h3)
- **Figure/Table references**: `<FigureReference>` and `<TableReference>` keys match defined figures/tables
- **Citations**: `<Citation citationKey="...">` keys exist in the bibliography JSON
- **NavContainer**: Correct `link`, `linkTitle`, and `document` props
- **File naming**: Numbered prefixes (`01-`, `02-`) for ordering, correct version paths

### React component checks:
- **Tailwind patterns**: Uses project Tailwind classes and USACE branding colors (`#4a7c9b`)
- **Consistent patterns**: Follows existing component conventions in `src/components/`
- **Import paths**: Uses `@site/src/...` alias correctly
- **No hardcoded colors**: Uses Tailwind classes or CSS variables, not inline hex values (except in style definitions)

### CSS checks:
- **Tailwind compliance**: Uses Tailwind utilities where possible
- **Custom CSS**: New rules in `src/css/custom.css` or component-level styles follow existing patterns
- **No conflicting rules**: New styles don't break existing components

### Build script checks:
- **Auto-generated files**: Changes to `sidebars.js`, `src/reportIdMap.js`, `static/counters/`, `static/versions/` should come from running scripts, not manual edits
- **Script correctness**: Changes to `scripts/` files produce correct output

## Step 6: Code Quality Review

For each changed file, check:

- **Logic errors**: Bugs, null reference risks, incorrect conditionals
- **Readability**: Clear naming, appropriate comments for complex logic, no dead code
- **Duplication**: Copy-pasted code that should be extracted
- **Performance**: Unnecessary re-renders, missing React optimization hooks where needed
- **Accessibility**: Images have alt text, proper semantic HTML, ARIA labels where needed

## Step 7: Security Review

- **No secrets**: No API keys, passwords, tokens in code
- **XSS**: No `dangerouslySetInnerHTML` or unescaped user content
- **Dependencies**: Any new dependencies are from trusted sources

## Step 8: Git Conventions

Read `.claude/skills/git-conventions.md` and check:

- Commit messages start with action verbs
- No AI attribution in commits
- Logical commit granularity

## Step 9: Compile the Review

### PR Overview

| Field | Value |
|-------|-------|
| **Title** | {title} |
| **Branch** | `{head}` → `{base}` |
| **Files changed** | N |
| **Additions** | +X |
| **Deletions** | -Y |
| **Commits** | Z |

### Documentation Quality

For each finding:
**Finding**: [Description]
**File**: `path/to/file:line`
**Severity**: Critical / Warning / Info
**Expected**: [What the pattern requires]
**Found**: [What the code actually does]
**Recommendation**: [Specific fix]

### Code Quality

For each issue:
**Issue**: [Description]
**File**: `path/to/file:line`
**Severity**: Critical / Warning / Nit
**Current code**:
```
{problematic code}
```
**Suggested fix**:
```
{improved code}
```
**Rationale**: [Why this change improves the code]

### Security

List any security concerns found, or confirm "No security issues found."

### Positive Observations

Note things done well — good patterns followed, clean code, thoughtful design decisions.

### Summary

| Category | Critical | Warnings | Nits |
|----------|----------|----------|------|
| Documentation | X | Y | Z |
| Code Quality | X | Y | Z |
| Security | X | Y | Z |

### Verdict

One of:
- **Approve** — No critical issues. Ready to merge.
- **Approve with suggestions** — Minor issues that can be addressed after merge.
- **Request changes** — Critical issues that should be fixed before merge. List the blocking items.

## Important Notes

- Be constructive, not just critical. Acknowledge good work.
- Distinguish between blocking issues (must fix) and suggestions (nice to have).
- Provide specific code alternatives, not just "this should be different."
- Consider the PR's scope — don't request changes unrelated to the PR's purpose.
- If the PR is large, organize findings by file for easier navigation.
