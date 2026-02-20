---
name: commit-push
description: Stage changes, create a git commit following project conventions, and push to remote. Combines the commit and push workflows into a single operation.
---

# Commit & Push

Create a git commit for the current changes and push to the remote repository.

**Arguments:** `$ARGUMENTS` (optional) — guidance for the commit message scope or focus (e.g., "lifesim docs update", "homepage redesign").

---

## Phase 1: Commit

### Step 1: Read Conventions

Read `.claude/skills/git-conventions.md` for the project's commit message conventions.

### Step 2: Gather State

Run these git commands to understand the current state:

1. `git status` (never use `-uall` flag) — see all changed, staged, and untracked files
2. `git diff` — see unstaged changes
3. `git diff --cached` — see already-staged changes
4. `git log --oneline -10` — see recent commit messages for style reference

### Step 3: Analyze Changes

Review all changes (both staged and unstaged) and categorize them:

- **What changed**: Which files were modified, added, or deleted
- **Why it changed**: The purpose of the changes (bug fix, new feature, refactor, etc.)
- **Scope**: Is this one logical change or multiple? If multiple, suggest separate commits

#### Safety checks:

- **Sensitive files**: Check for `.env`, credentials, or any file that might contain secrets. If found, warn the user and exclude them from staging.
- **Large binaries**: Check for large binary files (images, PDFs) that shouldn't be committed unless intentional. Warn if found.
- **Auto-generated files**: Check for `sidebars.js`, `src/reportIdMap.js`, `static/counters/`, `static/versions/`, `src/data/`, `node_modules/`, `.docusaurus/`, `build/` that shouldn't be committed. Warn if found.

### Step 4: Draft Commit Message

Draft a commit message following the conventions:

- **Start with an action verb**: Add, Update, Fix, Remove, Refine, Rework, Merge
- **Be concise**: One line preferred. Use a multi-line body only for complex changes.
- **Focus on "why"**: Describe the purpose, not just what files changed.
- **No AI attribution**: Do NOT include "Co-Authored-By" or any mention of Claude/AI.

If `$ARGUMENTS` was provided, use it as guidance for the message focus.

### Step 5: Present for Confirmation

Show the user:

1. **Proposed commit message**
2. **Files to be staged** (listed by name)
3. **Files excluded** (if any, with reason)

Ask the user to confirm, modify the message, or cancel.

### Step 6: Execute the Commit

After user confirmation:

1. **Stage files** by name — use `git add {file1} {file2} ...` for each file. Never use `git add -A` or `git add .`
2. **Create the commit** using a HEREDOC for the message:
   ```bash
   git commit -m "$(cat <<'EOF'
   {commit message here}
   EOF
   )"
   ```
3. **Verify** — run `git status` to confirm the commit succeeded

### Step 7: Handle Commit Failures

If the commit fails (e.g., pre-commit hook failure):

1. Report the error clearly
2. Identify the cause (lint failure, test failure, etc.)
3. Suggest specific fixes
4. After fixing, create a **NEW** commit — never use `--amend` unless the user explicitly asks for it
5. Re-run `git status` to verify
6. **Do not proceed to Phase 2 until the commit succeeds**

---

## Phase 2: Push

### Step 8: Gather Push State

Run these commands:

1. `git branch --show-current` — get current branch name
2. `git rev-parse --abbrev-ref @{upstream} 2>/dev/null` — check if branch tracks a remote
3. `git log @{upstream}..HEAD --oneline 2>/dev/null` — count unpushed commits (if upstream exists)

### Step 9: Push Safety Checks

#### Check 1: Branch name
If on `main` or `master`:
- Warn: "You are about to push directly to `{branch}`. This is unusual — most changes should go through a feature branch and pull request."
- Ask user to confirm this is intentional.

#### Check 2: Force push
- **Never** force push unless `$ARGUMENTS` explicitly contains "force push"
- If force push is requested AND the branch is `main` or `master`, refuse and explain the risk
- If force push is requested on a feature branch, warn about overwriting remote history and ask for confirmation

### Step 10: Push

#### If no upstream (new branch):
```bash
git push -u origin {branch}
```

#### If upstream exists:
```bash
git push
```

#### If force push explicitly requested (non-main branch):
```bash
git push --force-with-lease
```

### Step 11: Report

After a successful push, report:

- **Branch**: `{branch name}`
- **Commit**: the commit message
- **Commits pushed**: N commits
- **Remote**: `origin/{branch}`
- **Status**: Successfully committed and pushed

If the push fails:
- Report the error
- Common causes: remote has diverged (suggest `git pull --rebase`), authentication failure, branch protection rules
- Suggest specific resolution steps

---

## Important Rules

- **Never commit without user confirmation** of the message and file list
- **Never use `git add -A` or `git add .`** — always stage specific files
- **Never use `--amend`** unless explicitly requested
- **Never use `--no-verify`** unless explicitly requested
- **Never include AI attribution** in the commit message
- **Never force push** unless explicitly requested in `$ARGUMENTS`
- **Never force push to `main` or `master`** — refuse even if requested
