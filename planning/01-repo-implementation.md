# RMC Software Documentation — Review Process Implementation

This document describes every structural change to the `usace-rmc/rmc-software-docs` repository for the new review and publishing workflow. Intended for a Claude Code agent or human developer with write access.

## Review flow overview

**Lane 1 — New document (two-phase, six-stage review):**

1. Author opens PR with branch prefix `docs/new/`. Preview workflow publishes to unadvertised preview URL.
2. Peer reviewer reviews on **preview URL**, approves.
3. RMC Lead Civil reviews on **preview URL**, approves.
4. Site admin triggers checkpoint deploy of PR branch to **production URL** (watermarked).
5. AI technical edit: someone with Claude Code runs `/technical-edit`, which posts inline review comments on the PR. Author addresses comments, checks a checkbox in the PR description to confirm completion.
6. Director reviews on **live URL**, approves with one click.
7. Site admin flips draft flag to `false`, merges PR to `main`, approves final deploy (watermark removed).

**Lane 2 — Major revision:**

1. Author opens PR with `docs/major/`. Preview workflow publishes to preview URL.
2. Peer reviewer reviews on preview URL, approves.
3. RMC Lead Civil reviews on preview URL, approves.
4. Site admin flips draft flag, merges to `main`, approves final deploy.

**Lane 3 — Minor revision:** Peer review only on preview URL, then site admin merges and deploys.

**Lane 4 — Editorial fix:** Site admin reviews on preview URL, merges and deploys. No formal review.

**Key architectural notes:**
- The deploy workflow supports deploying from arbitrary branches (not just `main`) for Lane 1 checkpoint deploys.
- `main` does not always equal what's on the live site during Lane 1 reviews.
- The AI technical edit stage advances when the author checks a task list checkbox in the PR description, not when a reviewer clicks approve.

## Scope

This implementation adds:
1. Version-aware draft watermark logic
2. `.github/` directory: workflows, templates, CODEOWNERS
3. `docusaurus.config.js` env-var update for preview builds
4. Claude Code skills: `/new-revision` and `/technical-edit`

Does **not** include: GitHub team creation, preview repo creation, branch protection, environment rules, or user-facing MDX documentation.

---

## Task 1: Update the draft watermark logic

**File:** `src/theme/DocItem/index.js`

Replace the entire file with:

```js
import React from "react";
import DocItem from "@theme-original/DocItem";
import { useLocation } from "@docusaurus/router";
import { draftDocs } from "../../draftDocs";
import latestVersions from "@site/static/versions/latestVersions.json";

function getDocInfo(pathname) {
  const stripped = pathname
    .replace(/^\/RMC-Software-Documentation\/docs\//, "")
    .replace(/^\/docs\//, "")
    .replace(/^docs\//, "");
  const match = stripped.match(/^(.+?)\/(v\d+\.\d+(?:\.\d+)?)(?:\/|$)/);
  if (!match) return null;
  return { docBasePath: match[1], version: match[2] };
}

function isDraftDoc(pathname) {
  const info = getDocInfo(pathname);
  if (!info) return false;
  const isFlagged = draftDocs.some(
    (base) => info.docBasePath === base || info.docBasePath.startsWith(base + "/")
  );
  if (!isFlagged) return false;
  const latest = latestVersions[info.docBasePath];
  if (!latest) return true;
  return info.version === latest;
}

export default function DocItemWrapper(props) {
  const location = useLocation();
  const showWatermark = isDraftDoc(location.pathname);
  return (
    <>
      {showWatermark && (
        <div className="pointer-events-none fixed left-1/2 top-[40%] z-[9999] -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] select-none text-[10rem] font-bold uppercase text-[rgba(200,0,0,0.15)]">
          DRAFT
        </div>
      )}
      <DocItem {...props} />
    </>
  );
}
```

---

## Task 2: Update `docusaurus.config.js`

Replace the `url` and `baseUrl` lines:

```js
  url: process.env.DOCUSAURUS_URL || 'https://USACE-RMC.github.io',
  baseUrl: process.env.DOCUSAURUS_BASE_URL || '/RMC-Software-Documentation/',
```

---

## Task 3: Create `.github/` directory

### 3.1 `.github/CODEOWNERS`

```
/.github/                        @usace-rmc/docs-maintainers
/docusaurus.config.js            @usace-rmc/docs-maintainers
/tailwind.config.js              @usace-rmc/docs-maintainers
/package.json                    @usace-rmc/docs-maintainers
/package-lock.json               @usace-rmc/docs-maintainers
/scripts/                        @usace-rmc/docs-maintainers
/src/theme/                      @usace-rmc/docs-maintainers
/src/pages/                      @usace-rmc/docs-maintainers
/src/components/                 @usace-rmc/docs-maintainers
/src/contexts/                   @usace-rmc/docs-maintainers
/src/clientModules/              @usace-rmc/docs-maintainers
/src/css/                        @usace-rmc/docs-maintainers
/src/draftDocs.js                @usace-rmc/docs-maintainers
```

### 3.2 `.github/pull_request_template.md`

```markdown
## Description

<!-- Briefly describe what this PR does and why. -->

## Affected documents

- 

## Related issue(s)

<!-- Link related issues. Use "Closes #N" to auto-close on merge. -->

## Pre-submission checklist

- [ ] I have previewed these changes locally or via the PR preview URL
- [ ] My branch name uses one of the expected prefixes: `docs/new/`, `docs/major/`, `docs/minor/`, or `docs/fix/`
- [ ] I have updated `00-version-history.mdx` if this change warrants a version entry
- [ ] I have assigned a specific peer reviewer via the Reviewers sidebar (if known)

## Technical edit (Lane 1 only)

- [ ] Technical edit comments addressed — ready for Director review

## Notes for reviewers

<!-- Anything reviewers should know. -->
```

### 3.3 `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      ref:
        description: 'Branch or ref to deploy (leave blank for main)'
        required: false
        type: string

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build site
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ inputs.ref || github.ref }}
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    name: Deploy to production
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: production
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3.4 `.github/workflows/pr-preview.yml`

```yaml
name: PR Preview Build

on:
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - 'docs/**'
      - 'src/**'
      - 'static/**'
      - 'docusaurus.config.js'
      - 'tailwind.config.js'
      - 'package.json'
      - 'package-lock.json'
      - 'scripts/**'

permissions:
  contents: read
  pull-requests: write

jobs:
  build-and-deploy:
    name: Build and deploy preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Build site with PR-specific baseUrl
        env:
          DOCUSAURUS_URL: https://usace-rmc.github.io
          DOCUSAURUS_BASE_URL: /rmc-software-doc-previews/pr-${{ github.event.pull_request.number }}/
        run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          deploy_key: ${{ secrets.PREVIEW_DEPLOY_KEY }}
          external_repository: usace-rmc/rmc-software-doc-previews
          publish_branch: gh-pages
          publish_dir: ./build
          destination_dir: pr-${{ github.event.pull_request.number }}
          keep_files: true
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
          commit_message: 'Deploy preview for PR #${{ github.event.pull_request.number }}'
      - name: Post or update preview URL comment
        uses: actions/github-script@v7
        with:
          script: |
            const prNumber = context.issue.number;
            const url = `https://usace-rmc.github.io/rmc-software-doc-previews/pr-${prNumber}/`;
            const marker = '<!-- pr-preview-bot-comment -->';
            const body = `${marker}\n\n📄 **Preview deployed**\n\n${url}\n\n_This preview updates automatically when new commits are pushed. Deleted when the PR closes._`;
            const comments = await github.rest.issues.listComments({ owner: context.repo.owner, repo: context.repo.repo, issue_number: prNumber });
            const existing = comments.data.find(c => c.user.type === 'Bot' && c.body.includes(marker));
            if (existing) {
              await github.rest.issues.updateComment({ owner: context.repo.owner, repo: context.repo.repo, comment_id: existing.id, body });
            } else {
              await github.rest.issues.createComment({ owner: context.repo.owner, repo: context.repo.repo, issue_number: prNumber, body });
            }
```

### 3.5 `.github/workflows/pr-preview-cleanup.yml`

```yaml
name: PR Preview Cleanup

on:
  pull_request:
    types: [closed]

permissions:
  contents: read

jobs:
  cleanup:
    name: Delete preview directory
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          repository: usace-rmc/rmc-software-doc-previews
          ref: gh-pages
          ssh-key: ${{ secrets.PREVIEW_DEPLOY_KEY }}
      - name: Remove PR preview directory
        env:
          PR_NUMBER: ${{ github.event.pull_request.number }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          if [ -d "pr-${PR_NUMBER}" ]; then
            rm -rf "pr-${PR_NUMBER}"
            git add -A
            git commit -m "Clean up preview for PR #${PR_NUMBER}"
            git push
          fi
```

### 3.6 `.github/workflows/stage-progression.yml`

```yaml
name: Stage Progression

on:
  pull_request:
    types: [opened, reopened, labeled, edited]
  pull_request_review:
    types: [submitted]

permissions:
  pull-requests: write
  issues: write
  contents: read

jobs:
  progress:
    name: Manage review stage
    runs-on: ubuntu-latest
    steps:
      - name: Run stage progression logic
        uses: actions/github-script@v7
        with:
          script: |
            const pr = context.payload.pull_request;
            if (!pr) return;

            const prNumber = pr.number;
            const branch = pr.head.ref;
            const labels = pr.labels.map(l => l.name);

            const LANE_LABELS = ['lane:new-doc', 'lane:major-revision', 'lane:minor-revision', 'lane:editorial-fix'];
            const STAGE_LABELS = ['stage:needs-lane', 'stage:peer-review', 'stage:lead-civil-review', 'stage:ai-editor-review', 'stage:director-review', 'stage:ready-to-merge'];

            function detectLane(b) {
              if (b.startsWith('docs/new/')) return 'lane:new-doc';
              if (b.startsWith('docs/major/')) return 'lane:major-revision';
              if (b.startsWith('docs/minor/')) return 'lane:minor-revision';
              if (b.startsWith('docs/fix/')) return 'lane:editorial-fix';
              return null;
            }

            async function addLabels(ls) { if (ls.length) await github.rest.issues.addLabels({ owner: context.repo.owner, repo: context.repo.repo, issue_number: prNumber, labels: ls }); }
            async function removeLabel(l) { try { await github.rest.issues.removeLabel({ owner: context.repo.owner, repo: context.repo.repo, issue_number: prNumber, name: l }); } catch(e) {} }
            async function postComment(body) { await github.rest.issues.createComment({ owner: context.repo.owner, repo: context.repo.repo, issue_number: prNumber, body }); }

            const existingLane = labels.find(l => LANE_LABELS.includes(l));
            const existingStage = labels.find(l => STAGE_LABELS.includes(l));

            // ── PR opened/reopened ──
            if (context.eventName === 'pull_request' && ['opened', 'reopened'].includes(context.payload.action)) {
              const lane = existingLane || detectLane(branch);
              if (!lane) {
                await addLabels(['stage:needs-lane']);
                await postComment(`⚠️ **Could not determine review lane**\n\nBranch \`${branch}\` does not match expected prefixes (\`docs/new/\`, \`docs/major/\`, \`docs/minor/\`, \`docs/fix/\`).\n\n@usace-rmc/docs-maintainers please apply the correct \`lane:*\` label.`);
                return;
              }
              const toAdd = [lane];
              let comment;
              if (lane === 'lane:editorial-fix') {
                toAdd.push('stage:ready-to-merge');
                comment = `📋 **Lane: Editorial Fix**\n\nNo formal review required.\n\n@usace-rmc/docs-maintainers please review, merge, and approve the deploy.`;
              } else {
                toAdd.push('stage:peer-review');
                const laneName = lane.replace('lane:', '').replace(/-/g, ' ');
                const scope = lane === 'lane:new-doc' ? 'Peer → Lead Civil → Technical Edit → Director' : lane === 'lane:major-revision' ? 'Peer → Lead Civil' : 'Peer review only';
                comment = `📋 **Lane: ${laneName}**\n\nReview scope: ${scope}.\n\nCurrently in **peer review**. If no peer reviewer has been assigned, @usace-rmc/docs-maintainers please assign one via the Reviewers sidebar.`;
              }
              await addLabels(toAdd);
              await postComment(comment);
              return;
            }

            // ── Label manually applied ──
            if (context.eventName === 'pull_request' && context.payload.action === 'labeled') {
              const added = context.payload.label.name;
              if (LANE_LABELS.includes(added) && (!existingStage || existingStage === 'stage:needs-lane')) {
                await removeLabel('stage:needs-lane');
                if (added === 'lane:editorial-fix') {
                  await addLabels(['stage:ready-to-merge']);
                  await postComment(`📋 Lane set to **editorial fix**.\n\n@usace-rmc/docs-maintainers please review and merge.`);
                } else {
                  await addLabels(['stage:peer-review']);
                  await postComment(`📋 Lane set to **${added.replace('lane:', '').replace(/-/g, ' ')}**. Moving to peer review.\n\n@usace-rmc/docs-maintainers please assign the peer reviewer.`);
                }
              }
              return;
            }

            // ── PR description edited (check for technical edit checkbox) ──
            if (context.eventName === 'pull_request' && context.payload.action === 'edited') {
              if (existingStage === 'stage:ai-editor-review' && existingLane === 'lane:new-doc') {
                const body = pr.body || '';
                const checkboxChecked = body.includes('[x] Technical edit comments addressed');
                if (checkboxChecked) {
                  await removeLabel('stage:ai-editor-review');
                  await addLabels(['stage:director-review']);
                  await postComment(`✅ **Technical edit marked complete** by the author.\n\nAdvancing to **Director review**.\n\n@usace-rmc/docs-maintainers please:\n1. If revisions were pushed during the technical edit, trigger a fresh checkpoint deploy of this branch\n2. Assign a member of @usace-rmc/docs-director via the Reviewers sidebar\n\nThe Director will review at the live URL.`);
                }
              }
              return;
            }

            // ── Review approved ──
            if (context.eventName === 'pull_request_review' && context.payload.review.state === 'approved') {
              if (!existingLane || !existingStage) return;
              const reviewer = context.payload.review.user.login;
              let nextStage = null, comment = null;

              if (existingLane === 'lane:new-doc') {
                if (existingStage === 'stage:peer-review') {
                  nextStage = 'stage:lead-civil-review';
                  comment = `✅ **Peer review approved** by @${reviewer}.\n\nAdvancing to **RMC Lead Civil review**.\n\n@usace-rmc/docs-maintainers please assign the appropriate Lead Civil via the Reviewers sidebar. The Lead Civil reviews on the preview URL.`;
                } else if (existingStage === 'stage:lead-civil-review') {
                  nextStage = 'stage:ai-editor-review';
                  comment = `✅ **Lead Civil review approved** by @${reviewer}.\n\nThe document is ready to be **deployed to the live site** (watermarked) for the technical edit and Director review phases.\n\n@usace-rmc/docs-maintainers next steps:\n1. Trigger a checkpoint deploy of branch \`${branch}\` via Actions → Deploy to GitHub Pages → Run workflow\n2. Approve the deploy at the production environment gate\n3. Post the live URL in a comment on this PR\n4. Run the \`/technical-edit\` Claude Code skill against this PR (or assign a human technical editor)\n\nAfter the author addresses the technical edit comments and checks the completion checkbox, the document will advance to Director review.`;
                } else if (existingStage === 'stage:director-review') {
                  nextStage = 'stage:ready-to-merge';
                  comment = `✅ **Director review approved** by @${reviewer}.\n\nThis PR is **ready for final merge and publication**.\n\n@usace-rmc/docs-maintainers next steps:\n1. Check out this branch (locally or via github.dev)\n2. Flip the document's \`draft\` flag to \`false\`\n3. Update \`00-version-history.mdx\` with reviewer and approver names\n4. Commit and push\n5. Merge this PR to \`main\`\n6. Approve the final production deploy in the Actions tab`;
                }
              } else if (existingLane === 'lane:major-revision') {
                if (existingStage === 'stage:peer-review') {
                  nextStage = 'stage:lead-civil-review';
                  comment = `✅ **Peer review approved** by @${reviewer}.\n\nAdvancing to **RMC Lead Civil review**.\n\n@usace-rmc/docs-maintainers please assign the appropriate Lead Civil via the Reviewers sidebar.`;
                } else if (existingStage === 'stage:lead-civil-review') {
                  nextStage = 'stage:ready-to-merge';
                  comment = `✅ **Lead Civil review approved** by @${reviewer}.\n\nThis PR is **ready for final merge**.\n\n@usace-rmc/docs-maintainers next steps:\n1. Check out this branch\n2. Flip the document's \`draft\` flag to \`false\`\n3. Update \`00-version-history.mdx\`\n4. Commit and push\n5. Merge to \`main\`\n6. Approve the production deploy`;
                }
              } else if (existingLane === 'lane:minor-revision') {
                if (existingStage === 'stage:peer-review') {
                  nextStage = 'stage:ready-to-merge';
                  comment = `✅ **Peer review approved** by @${reviewer}.\n\nThis PR is **ready for final merge**.\n\n@usace-rmc/docs-maintainers next steps:\n1. Check out this branch\n2. Flip the document's \`draft\` flag to \`false\`\n3. Update \`00-version-history.mdx\`\n4. Commit and push\n5. Merge to \`main\`\n6. Approve the production deploy`;
                }
              }

              if (nextStage) {
                await removeLabel(existingStage);
                await addLabels([nextStage]);
                await postComment(comment);
              }
            }
```

---

## Task 4: Create labels

| Label | Color | Description |
|---|---|---|
| `lane:new-doc` | `#0E8A16` | New document requiring full review |
| `lane:major-revision` | `#1D76DB` | Major revision |
| `lane:minor-revision` | `#5319E7` | Minor revision |
| `lane:editorial-fix` | `#C5DEF5` | Editorial or grammatical fix |
| `stage:needs-lane` | `#B60205` | Lane could not be determined |
| `stage:peer-review` | `#FBCA04` | Awaiting peer review |
| `stage:lead-civil-review` | `#FBCA04` | Awaiting RMC Lead Civil review |
| `stage:ai-editor-review` | `#FBCA04` | Awaiting technical edit |
| `stage:director-review` | `#FBCA04` | Awaiting Director review |
| `stage:ready-to-merge` | `#0E8A16` | All reviews complete |

---

## Task 5: Create Claude Code skills

### 5.1 `.claude/skills/new-revision/SKILL.md`

Create the `/new-revision` skill. (Same content as previously specified — scaffolds a new version folder, sets draft flag, creates appropriately-prefixed branch.)

### 5.2 `.claude/skills/technical-edit/SKILL.md`

```markdown
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
```

### 5.3 `.github/ai-review/technical-editor-prompt.md`

Create the standardized review prompt:

```markdown
# RMC Technical Editor Review Prompt

You are a technical editor reviewing documentation for the U.S. Army Corps of Engineers Risk Management Center (USACE RMC). The documentation is written in MDX (Markdown with JSX) and covers dam safety, levee safety, and related risk analysis topics.

## Audience

Practicing dam and levee safety engineers within USACE. These are technical professionals who understand the domain — do not flag correct use of technical terminology as jargon.

## Review criteria

### Grammar and mechanics
- Spelling, punctuation, and sentence structure
- Subject-verb agreement
- Correct use of hyphens, em dashes, and en dashes
- Consistent serial comma usage

### Tense and voice
- Prefer third-person active voice for procedures and descriptions
- Flag passive voice when active would be clearer
- Flag inconsistent tense within a section

### Clarity and concision
- Flag wordy passages that could be shortened without losing meaning
- Flag ambiguous pronouns or unclear referents
- Flag sentences over 40 words that could be split
- Flag buried leads — key information at the end of a long sentence

### Terminology consistency
- Flag inconsistent use of terms within the document (e.g., alternating between "embankment" and "dam" when referring to the same structure)
- Do NOT flag correct domain terminology as errors

### Section 508 accessibility compliance
- Every image must have alt text (check for `alt=` attribute)
- Heading hierarchy must not skip levels (e.g., h2 followed by h4 without h3)
- Link text must be descriptive (flag "click here" or "link" as link text)
- Tables must have header rows
- Lists must use proper markdown list syntax, not manual numbering with plain text
- Color must not be the sole means of conveying information

### Style consistency
- Figure and table captions must follow a consistent format
- Citations must use the site's citation key format
- Units should be consistent within each document (metric or imperial, not mixed)
- Acronyms must be defined on first use within each chapter

## Output format

For each finding, produce:
- The file path and line number(s)
- A severity level: 🔴 Must fix (errors, accessibility violations), 🟡 Should fix (clarity, consistency issues), 🔵 Suggestion (stylistic improvements)
- A clear description of the issue
- A suggested fix where possible (use GitHub suggestion block format)

## What NOT to flag
- Correct use of technical terminology, even if uncommon
- MDX component syntax (imports, JSX elements)
- Frontmatter fields
- Matters of technical judgment or domain accuracy (that is the peer reviewer's job)
- Alternative phrasings that are equally acceptable
```

---

## Task 6: Verify and open PR

1. Run `npm run build` — must succeed.
2. Validate all YAML files.
3. Commit on branch `feature/review-workflow-infrastructure`.
4. Open PR titled: `Add review workflow infrastructure`.

## Summary checklist

- [ ] `src/theme/DocItem/index.js` — version-aware watermark
- [ ] `docusaurus.config.js` — env-driven URL/baseUrl
- [ ] `.github/CODEOWNERS`
- [ ] `.github/pull_request_template.md` — includes technical edit checkbox
- [ ] `.github/workflows/deploy.yml` — with `workflow_dispatch` + `ref` input
- [ ] `.github/workflows/pr-preview.yml`
- [ ] `.github/workflows/pr-preview-cleanup.yml`
- [ ] `.github/workflows/stage-progression.yml` — Lead Civil + AI editor + checkbox detection
- [ ] `.github/ai-review/technical-editor-prompt.md`
- [ ] `.claude/skills/new-revision/SKILL.md`
- [ ] `.claude/skills/technical-edit/SKILL.md`
- [ ] All 10 labels created
- [ ] Build passes
