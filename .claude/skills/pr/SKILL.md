---
name: pr
description: Create a GitHub pull request from the current branch with auto-generated title and description based on the full commit history and code changes.
---

# Create Pull Request

Create a GitHub pull request from the current branch.

**Arguments:** `$ARGUMENTS` (optional) — guidance for the PR title/description focus, or a base branch name if not `main`.

## Step 1: Prerequisites

1. Verify `gh` CLI is available: `gh --version`
   - If not available, stop and instruct the user to install it: https://cli.github.com/
2. Verify authentication: `gh auth status`
   - If not authenticated, instruct the user to run `gh auth login`

## Step 2: Gather Branch State

Run these commands:

1. `git branch --show-current` — get current branch name
   - If on `main` or `master`, stop with error: "Cannot create a PR from the main branch. Please switch to a feature branch."
2. `git status` (never `-uall`) — check for uncommitted changes
   - If uncommitted changes exist, warn the user and suggest running `/commit` first
3. `git log main..HEAD --oneline` — get all commits on this branch (use the base branch from `$ARGUMENTS` if specified, otherwise `main`)
4. `git diff main...HEAD --stat` — get changed files summary
5. `git diff main...HEAD` — read the actual changes

## Step 3: Ensure Branch is Pushed

Check if the branch has a remote upstream:

```bash
git rev-parse --abbrev-ref @{upstream} 2>/dev/null
```

If no upstream exists, push the branch:
```bash
git push -u origin {branch}
```

If upstream exists, check for unpushed commits:
```bash
git log @{upstream}..HEAD --oneline
```

If there are unpushed commits, push them:
```bash
git push
```

## Step 4: Check for Existing PR

```bash
gh pr view --json number,url 2>/dev/null
```

If a PR already exists for this branch, report it and ask if the user wants to update it instead.

## Step 5: Draft the PR

Read `.claude/skills/git-conventions.md` for PR conventions.

### Title
- Short, action-verb-first, under 70 characters
- Derived from the **overall purpose** of all commits on the branch, not just the latest commit
- Example: "Redesign homepage with product tile grid layout"

### Body — choose the format based on the change

**If the change affects a document** → use the **Template Style** (Step 5a). Reproduce the repository template when passing `--body`, including the one-document scope, `doc_location`, related issues, validation, and review notes. Branch prefixes describe intent; an administrator's controller classification is authoritative.

**Otherwise (infrastructure, tooling, dependency, or any non-doc branch)** → use the **Summary Style** (Step 5b). These PRs still require administrator classification as `code`, the review-workflow gate, and CI; they do not require formal document-review stages.

In both styles, the summary content should be based on **ALL** commits on the branch, not just the most recent one. Read through all the commit messages and the diff to understand the full scope. If `$ARGUMENTS` was provided, use it to focus the title and description.

**Do NOT include in either style:**
- A "Test plan" section
- Any AI attribution, "Generated with Claude", or "Co-Authored-By" lines

### Step 5a: Template Style (for `docs/` branches)

1. Read [.github/pull_request_template.md](.github/pull_request_template.md). Use it as the structural skeleton.
2. Compute the auto-generated summary: 1–3 bullets describing the changes.
3. Compute the list of affected MDX documents: from `git diff --name-only main...HEAD`, keep entries matching `docs/**/*.mdx`. If the base is not `main`, use that instead.
4. Build the PR body by transforming the template:
   - Under `## Description`, replace the `<!-- Briefly describe what this PR does and why. -->` comment with the summary bullets.
   - Under `## Document scope`, identify the single document and its `doc_location`. List affected MDX files when useful. For an administrator infrastructure overhaul spanning guides, explicitly describe that scope instead of presenting it as a routine one-document author PR.
   - Leave the `## Related issue(s)` section's comment placeholder unchanged so the author can fill it in.
   - Mark validation items only when evidence supports them. Do not add a technical-edit advancement checkbox or manually request stage reviewers.
   - Under `## Review notes`, include any relevant activation requirements or reviewer context.

The result should follow the current template with its Description and Document scope sections populated.

### Step 5b: Summary Style (for non-`docs/` branches)

Use this format — **Summary section only, no Test plan**:

```markdown
## Summary
- {1-3 bullet points describing the changes and their purpose}
```

## Step 6: Create the PR

```bash
gh pr create --title "{title}" --body "$(cat <<'EOF'
{body from Step 5a or Step 5b}
EOF
)"
```

If the base branch is not `main`, add `--base {base-branch}`.

## Step 7: Report

After creation, report:

- **PR URL**: (the URL returned by `gh pr create`)
- **Title**: {title}
- **Branch**: `{branch}` → `{base}`
- **Commits**: N commits
- **Files changed**: M files

If creation fails:
- Report the error
- Common causes: no commits difference from base, PR already exists, authentication issues
- Suggest specific resolution
