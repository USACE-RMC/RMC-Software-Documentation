---
name: push
description: Push the current branch to remote with safety checks. Verifies branch state, remote tracking, uncommitted changes, and prevents dangerous operations.
---

# Push

Push the current branch to the remote repository with safety checks.

**Arguments:** `$ARGUMENTS` (optional) — special instructions (e.g., "force push" for explicit force-push request).

## Step 1: Gather Branch State

Run these commands:

1. `git branch --show-current` — get current branch name
2. `git status` (never `-uall`) — check for uncommitted changes
3. `git rev-parse --abbrev-ref @{upstream} 2>/dev/null` — check if branch tracks a remote
4. `git log @{upstream}..HEAD --oneline 2>/dev/null` — count unpushed commits (if upstream exists)

## Step 2: Safety Checks

### Check 1: Uncommitted changes
If `git status` shows uncommitted changes:
- Warn the user: "You have uncommitted changes. These will NOT be included in the push."
- Suggest: "Run `/commit` first to include them, or proceed to push only committed work."
- Ask user how to proceed.

### Check 2: Branch name
If on `main` or `master`:
- Warn: "You are about to push directly to `{branch}`. This is unusual — most changes should go through a feature branch and pull request."
- Ask user to confirm this is intentional.

### Check 3: No commits to push
If `git log @{upstream}..HEAD` returns nothing (when upstream exists):
- Report: "Already up to date — no unpushed commits on `{branch}`."
- Stop.

### Check 4: Force push
- **Never** force push unless `$ARGUMENTS` explicitly contains "force push"
- If force push is requested AND the branch is `main` or `master`, refuse and explain the risk
- If force push is requested on a feature branch, warn about overwriting remote history and ask for confirmation

## Step 3: Push

### If no upstream (new branch):
```bash
git push -u origin {branch}
```
This sets up remote tracking for future pushes.

### If upstream exists:
```bash
git push
```

### If force push explicitly requested (non-main branch):
```bash
git push --force-with-lease
```
Use `--force-with-lease` instead of `--force` — it's safer because it refuses to push if the remote has commits you haven't fetched.

## Step 4: Report

After a successful push, report:

- **Branch**: `{branch name}`
- **Commits pushed**: N commits
- **Remote**: `origin/{branch}`
- **Status**: Successfully pushed

If the push fails:
- Report the error
- Common causes: remote has diverged (suggest `git pull --rebase`), authentication failure, branch protection rules
- Suggest specific resolution steps
