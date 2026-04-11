---
name: commit
description: Stage changes and create a git commit with a message following project conventions. Analyzes changes, drafts a message, and confirms with the user before committing.
---

# Commit

Create a git commit for the current changes, following project conventions.

**Arguments:** `$ARGUMENTS` (optional) — guidance for the commit message scope or focus (e.g., "lifesim docs update", "homepage redesign").

## Step 1: Read Conventions

Read `.claude/skills/git-conventions.md` for the project's commit message conventions.

## Step 2: Gather State

Run these git commands to understand the current state:

1. `git status` (never use `-uall` flag) — see all changed, staged, and untracked files
2. `git diff` — see unstaged changes
3. `git diff --cached` — see already-staged changes
4. `git log --oneline -10` — see recent commit messages for style reference

## Step 3: Analyze Changes

Review all changes (both staged and unstaged) and categorize them:

- **What changed**: Which files were modified, added, or deleted
- **Why it changed**: The purpose of the changes (bug fix, new feature, refactor, etc.)
- **Scope**: Is this one logical change or multiple? If multiple, suggest separate commits

### Safety checks:

- **Sensitive files**: Check for `.env`, credentials, or any file that might contain secrets. If found, warn the user and exclude them from staging.
- **Large binaries**: Check for large binary files (images, PDFs) that shouldn't be committed unless intentional. Warn if found.
- **Auto-generated files**: Check for `sidebars.js`, `src/reportIdMap.js`, `static/counters/`, `static/versions/`, `src/data/`, `node_modules/`, `.docusaurus/`, `build/` that shouldn't be committed. Warn if found.

## Step 4: Draft Commit Message

Draft a commit message following the conventions:

- **Start with an action verb**: Add, Update, Fix, Remove, Refine, Rework, Merge
- **Be concise**: One line preferred. Use a multi-line body only for complex changes.
- **Focus on "why"**: Describe the purpose, not just what files changed.
- **No AI attribution**: Do NOT include "Co-Authored-By" or any mention of Claude/AI.

If `$ARGUMENTS` was provided, use it as guidance for the message focus.

### Message format:

**Simple changes** (one line):
```
Fix broken figure references in LifeSim User's Guide v2.0
```

**Complex changes** (multi-line):
```
Overhaul homepage layout with product tile grid

Redesign product cards with gradient backgrounds and frosted
glass icon containers. Add responsive grid that collapses
from 3 columns to 1 at mobile breakpoints.
```

## Step 5: Present for Confirmation

Show the user:

1. **Proposed commit message**
2. **Files to be staged** (listed by name)
3. **Files excluded** (if any, with reason)

Ask the user to confirm, modify the message, or cancel.

## Step 6: Execute the Commit

After user confirmation:

1. **Stage files** by name — use `git add {file1} {file2} ...` for each file. Never use `git add -A` or `git add .`
2. **Create the commit** using a HEREDOC for the message:
   ```bash
   git commit -m "$(cat <<'EOF'
   {commit message here}
   EOF
   )"
   ```
3. **Verify** — run `git status` to confirm the commit succeeded and the working tree is clean (or shows expected remaining changes)

## Step 7: Handle Failures

If the commit fails (e.g., pre-commit hook failure):

1. Report the error clearly
2. Identify the cause (lint failure, test failure, etc.)
3. Suggest specific fixes
4. After fixing, create a **NEW** commit — never use `--amend` unless the user explicitly asks for it
5. Re-run `git status` to verify

## Important Rules

- **Never commit without user confirmation** of the message and file list
- **Never use `git add -A` or `git add .`** — always stage specific files
- **Never use `--amend`** unless explicitly requested
- **Never use `--no-verify`** unless explicitly requested
- **Never include AI attribution** in the commit message
