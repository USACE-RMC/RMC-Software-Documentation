---
name: technical-edit
description: Run an AI-assisted technical edit on the current PR. Reads all changed MDX files, evaluates them against the RMC technical editing prompt, and posts inline review comments on the PR via the GitHub API.
---

# Technical Edit

Run an AI-assisted technical edit on the current PR's documentation files.

**Arguments:** `$ARGUMENTS` — optional PR number. If omitted, infer from the current branch.

## Step 1: Identify the PR and changed files

Determine the PR number from the current branch (use `gh pr view --json number`). List all changed `.mdx` files in the PR using `gh pr diff --name-only | grep '\.mdx$'`.

## Step 2: Read the review prompt

Read the standardized review prompt from `.github/ai-review/technical-editor-prompt.md`. This file contains the full set of review instructions including grammar rules, tense requirements, terminology conventions, Section 508 compliance checks, and style guidelines.

## Step 3: Review each file

For each changed MDX file:
1. Read the file contents
2. Apply the review prompt to the file
3. For each finding, record: file path, line number or line range, severity (must-fix / should-fix / suggestion), the issue description, and a suggested fix if applicable

## Step 4: Post the review on the PR

Use the GitHub CLI to submit a bundled PR review with inline comments:

```bash
gh api repos/:owner/:repo/pulls/:pr/reviews \
  --method POST \
  -f body="AI technical edit complete. $(N) comments across $(M) files. Review prompt version: $(VERSION)." \
  -f event="COMMENT" \
  -f comments="[{\"path\": \"...\", \"line\": N, \"body\": \"...\"}]"
```

Each comment should be formatted as:
```
**[severity]** issue description

> Suggested fix (if applicable)
```

Where severity is one of: 🔴 Must fix, 🟡 Should fix, 🔵 Suggestion.

## Step 5: Report

Tell the user:
- How many comments were posted
- How many files were reviewed
- Which review prompt version was used
- Remind the author to check the "Technical edit comments addressed" checkbox in the PR description when they're done addressing comments
