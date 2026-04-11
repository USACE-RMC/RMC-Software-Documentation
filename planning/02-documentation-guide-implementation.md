# Documentation Guide Content Implementation — Review and Approval Process

Seven new chapters for `docs/dev/documentation-guide/` covering the complete review and approval process. Execute after `01-repo-implementation.md` is merged.

## Task 1: Rename appendix files

```bash
cd docs/dev/documentation-guide
git mv 09-appendix-a-source-code-structure.mdx 16-appendix-a-source-code-structure.mdx
git mv 10-appendix-b-build-process-overview.mdx 17-appendix-b-build-process-overview.mdx
git mv 11-appendix-c-search-configuration.mdx 18-appendix-c-search-configuration.mdx
```

URLs are unchanged because Docusaurus strips numeric prefixes.

## Task 2: Update `scripts/generateSidebars.js`

Replace `mainIds` and `appendixIds`:

```js
  const mainIds = [
    '00-introduction',
    '01-getting-started',
    '02-versioning-system',
    '03-project-structure',
    '04-creating-new-document-walkthrough',
    '05-docx-converter',
    '06-creating-editing-pages',
    '07-react-components',
    '08-troubleshooting-faq',
    '09-review-and-approval-overview',
    '10-review-lanes',
    '11-author-workflow',
    '12-reviewer-workflow',
    '13-technical-edit',
    '14-director-workflow',
    '15-site-admin-workflow',
  ];
  const appendixIds = [
    '16-appendix-a-source-code-structure',
    '17-appendix-b-build-process-overview',
    '18-appendix-c-search-configuration',
  ];
```

## Task 3: Create the seven chapter files

All chapters follow existing conventions: `title:` frontmatter only, `NavContainer` import, standard markdown.

---

### 3.1 `09-review-and-approval-overview.mdx`

```mdx
---
title: Review and Approval Process Overview
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Review and Approval Process Overview

This chapter and the six that follow describe the review and approval process for all documentation published on the RMC Software Documentation website.

## Who participates

**Author.** Writes or revises the document. The only role assumed to have local development tooling.

**Peer reviewer.** Subject-matter expert assigned ad-hoc to review technical accuracy. Works entirely in the GitHub web interface.

**RMC Lead Civil.** Provides technical oversight and quality assurance. Assigned ad-hoc per document. Works in the GitHub web interface.

**Technical edit (AI-assisted).** An AI-powered editorial review that checks grammar, clarity, tense, terminology, and Section 508 accessibility compliance. A team member triggers the review using a Claude Code skill; the AI posts comments directly on the pull request. A human technical editor can be substituted at the site admin's discretion.

**Director.** The RMC Director provides final approval for new documents only. Reviews the document on the live site and clicks approve — no file editing required.

**Site administrator.** Manages reviewer assignments, checkpoint deploys, merge preparation, and final deploys. The only role with access to protected parts of the repository.

## The five review lanes

Every change falls into one of five lanes based on its scope:

**Lane 1: New document.** Peer review → Lead Civil review → Technical edit → Director approval. The peer review, Lead Civil review, and technical edit all happen against the preview URL or the source files. Only after the technical edit completes does the site admin deploy the document to the live site (watermarked) for Director review at the document's final URL.

**Lane 2: Major revision.** Peer review → Lead Civil review. Entire review happens on the preview site. Site admin deploys the final version after Lead Civil approval.

**Lane 3: Minor revision.** Peer review only on the preview site.

**Lane 4: Editorial fix.** Site admin reviews and deploys directly. No formal review.

**Lane 5: Dev docs.** Any change to documents under `docs/dev/` (developer documentation, guides for contributors, internal references). Treated like Lane 4 — site admin reviews and merges directly, no formal review required.

## The merge gate

Every documentation PR has a GitHub commit status called `review-workflow` that functions as the merge gate. Branch protection on `main` requires this status to be `success` before the PR can merge, so nobody — not even a site admin — can merge a PR whose review is incomplete. The stage progression workflow sets this status automatically:

- **Pending** during any active review stage (`stage:peer-review`, `stage:lead-civil-review`, `stage:ai-editor-review`, `stage:director-review`, or `stage:needs-lane`)
- **Success** when the PR reaches `stage:ready-to-merge`, or immediately on lane assignment for `lane:editorial-fix` and `lane:dev`
- **Success** for non-docs PRs (infrastructure, tooling, dependency updates) as soon as CI Build passes, posted by `ci-build.yml`

The status is re-evaluated on every push to a PR. The goal is that the merge button reflects the workflow's judgment, not the admin's discretion.

## The draft watermark

Documents flagged as drafts display a large diagonal "DRAFT" watermark. For Lane 1, the watermark appears on the live site during the Director review phase only — the document is not deployed to the live site until the technical edit is complete. The watermark signals to any reader who happens to find the live URL that the content is not yet authoritative. The watermark is removed when the site admin flips the draft flag after Director approval.

For Lanes 2 and 3, the document under revision only exists on the preview site during review. The currently-published version on the live site is never watermarked.

## Where to go next

- Authoring a document: read **Review Lanes**, then **Author Workflow**
- Asked to review: read **Reviewer Workflow**
- Running a technical edit: read **Technical Edit**
- Director reviewing a new document: read **Director Workflow**
- Site administrator: read **Site Admin Workflow**
```

---

### 3.2 `10-review-lanes.mdx`

```mdx
---
title: Review Lanes
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Review Lanes

Every change follows one of five review lanes. The workflow assigns a lane automatically using two signals, in order:

1. **Content-based detection.** If every documentation file changed in the PR is under `docs/dev/`, the PR is assigned `lane:dev` regardless of branch name.
2. **Branch-name detection.** Otherwise, the branch prefix determines the lane:

| Branch prefix | Lane |
|---|---|
| `docs/new/` | New document |
| `docs/major/` | Major revision |
| `docs/minor/` | Minor revision |
| `docs/fix/` | Editorial fix |
| `docs/dev/` | Dev docs |

**Any PR that touches files under `docs/` is processed by the review workflow**, even if its branch name doesn't start with `docs/`. This means a collaborator can accidentally push a documentation change on a branch named `feature/typo-fix` and the workflow will still intercept it at PR open time and ask a site admin to assign a lane. Non-documentation PRs (branches that don't touch anything under `docs/`) are silently ignored by the lane workflow, receive an "admin may merge" comment from `ci-build.yml` once their build passes, and go straight to the merge button.

If a branch starts with `docs/` but doesn't match one of the five sub-prefixes above (for example, a typo like `docs/newfoo/` or an old-style name like `docs/update`), the workflow applies `stage:needs-lane` and tags a site admin to assign the correct lane manually. The same happens for a PR that touches documentation from a non-`docs/` branch when content-based dev detection doesn't apply.

A site admin can always override the automatically-detected lane by swapping the `lane:*` label on the PR. The workflow treats a manually-applied lane label the same as an auto-detected one and proceeds normally from there.

## Lane 1: New document

**When to use.** Any completely new document being added to the site.

**Required reviews.** Peer review → RMC Lead Civil review → Technical edit (AI-assisted) → Director approval.

**What happens.** The document is first visible only on the unadvertised PR preview URL, where peer review, Lead Civil review, and the technical edit all happen (the technical edit reads the source MDX directly via `/technical-edit` and posts inline comments — it does not need a deployed version). Only after the author marks the technical edit complete does the site admin deploy the PR branch to the live production site with the DRAFT watermark. The Director then reviews on the live URL. After Director approval, the site admin flips the draft flag, merges the PR, and deploys the final version — removing the watermark.

**Example branches:** `docs/new/totalrisk-applications-guide`, `docs/new/lifesim-validation-oroville`

## Lane 2: Major revision

**When to use.** Substantial changes to an existing document warranting a new major version (e.g., v1.0 → v2.0).

**Required reviews.** Peer review → RMC Lead Civil review.

**What happens.** The entire review happens on the preview URL. The old version stays live and unwatermarked. After Lead Civil approval, the site admin flips the flag, merges, and deploys. The new version becomes the default; the old version is accessible via the version selector.

**Example branches:** `docs/major/bep-progression-v2.0`

## Lane 3: Minor revision

**When to use.** Smaller updates warranting a minor version bump (e.g., v1.0 → v1.1).

**Required reviews.** Peer review only.

**What happens.** Same as Lane 2 but without Lead Civil review.

**Example branches:** `docs/minor/bep-progression-v1.1`

## Lane 4: Editorial fix

**When to use.** Typos, broken links, grammatical corrections that don't change technical meaning.

**Required reviews.** None. Site admin reviews and merges directly.

**No version change, no watermark.**

**Example branches:** `docs/fix/bep-progression-typos`

## Lane 5: Dev docs

**When to use.** Any new or revised document under `docs/dev/` — developer documentation, contributor guides, internal references, planning documents, and similar materials.

**Required reviews.** None. Site admin reviews and merges directly, same as Lane 4.

**Automatic assignment.** The workflow uses content-based detection: if every documentation file changed in the PR is under `docs/dev/`, the PR is assigned `lane:dev` regardless of what the branch is called. This means dev docs can be authored on any branch prefix (including non-`docs/` branches) and still end up in the correct lane.

**No version change, no watermark.**

**Example branches:** `docs/dev/ai-development-guide`, `feature/update-contributor-guide` (content detected under `docs/dev/`)

## Choosing the right lane

When in doubt, choose the more conservative lane. A site admin can reassign lanes by swapping `lane:*` labels.
```

---

### 3.3 `11-author-workflow.mdx`

```mdx
---
title: Author Workflow
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Author Workflow

What the author does from start to publication, across all five lanes.

## Starting work

### With Claude Code skills

- **New document (Lane 1):** Run `/new-doc`. Creates branch, scaffolds files, sets draft flag.
- **Revision (Lanes 2/3):** Run `/new-revision`. Copies the latest version to a new version folder, sets draft flag, creates branch.
- **Editorial fix (Lane 4):** Create a `docs/fix/` branch manually and edit files directly.
- **Dev doc (Lane 5):** Create a branch (`docs/dev/` prefix recommended but not required), edit files under `docs/dev/`. The workflow auto-detects the dev lane based on file paths.

### Without Claude Code

All steps can be done manually in any IDE, via `git` on the command line, or entirely in the browser using github.dev (press `.` on any GitHub repo page to open a browser-based VS Code).

**For a new document:** Create a `docs/new/<slug>` branch, create the directory structure under `docs/` with a `v1.0/` folder, add boilerplate MDX files, add a landing page JS entry with `draft: true`.

**For a revision:** Create a `docs/major/<slug>-<version>` or `docs/minor/<slug>-<version>` branch, copy the current version folder to the new version, set `draft: true` on the landing page entry, add a placeholder version history row.

## Opening the pull request

Open a PR via Claude Code (`/pr`) or the GitHub web interface. The PR template prefills a description structure — fill in the sections. Assign your peer reviewer in the Reviewers sidebar if you know who it should be.

Within minutes, two bot comments appear: a preview URL and a stage progression comment identifying your lane. A third hidden bot comment tracks which individuals the site admin has assigned to each review stage — it renders as an "Assigned reviewers for this PR" block at the top of the PR comment thread.

## Responding to review comments

Reviewers post comments on specific lines in the Files changed tab. For each comment: make the fix, push a commit, reply explaining what you did. The reviewer resolves the thread when satisfied.

For suggested changes (pre-filled code blocks), you can click "Commit suggestion" to apply the fix in one click.

**All comment threads must be resolved before the PR can merge.**

## The technical edit (Lane 1)

After Lead Civil approval, the technical edit stage begins. A team member runs the `/technical-edit` Claude Code skill, which reads the source MDX files directly and posts inline review comments on the PR. These comments cover grammar, tense, clarity, terminology, and Section 508 compliance. **The document is not yet deployed to the live site at this stage** — the technical edit works on source files, so the live deploy is deferred until the technical edit is complete.

Address each comment the same way you address human reviewer comments — push fixes, reply, and the site admin or you can resolve threads as they're addressed.

**When you've addressed all technical edit comments,** check the checkbox in the PR description:

`- [x] Technical edit comments addressed — ready for Director review`

Checking this box is what advances the document to Director review. Don't check it until you've addressed all comments.

## Where reviewers read your document

For Lane 1: peer review and Lead Civil review happen on the **preview URL**. The technical edit reads the source MDX directly via `/technical-edit` and posts inline comments on the PR — no deploy is involved. Only after you mark the technical edit complete does the site admin deploy the document to the **live production site** (watermarked) for **Director review**. If you push revisions during Director review, the site admin re-deploys so the live URL stays current.

For Lanes 2 and 3: all review happens on the preview URL only.

For Lanes 4 and 5: the site admin reviews on the preview URL (if generated) or directly in the Files changed tab, then merges.

## When reviewers ask for changes

Reviewers typically submit their feedback as a **Comment** review (not "Request changes"), leaving inline notes on specific lines. Address each comment, push a new commit, and reply to the thread explaining what you did. You don't need to do anything else — the stage progression bot automatically pings the assigned reviewer(s) on your PR to come back and backcheck.

**The stage does not reset when you push new commits.** A revision during peer review is for the peer reviewer to backcheck; it does not send the document back to start. Same for Lead Civil review and Director review. This is intentional — you're building on the review that already happened, not starting over.

## When the review is complete

The site admin prepares the merge: flips the draft flag, updates version history, merges the PR, and approves the final deploy. You'll see email notifications as this happens. Once the deploy completes, your document is live.
```

---

### 3.4 `12-reviewer-workflow.mdx`

```mdx
---
title: Reviewer Workflow
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Reviewer Workflow

What peer reviewers and RMC Lead Civils do when assigned to review a documentation pull request. Written for someone with little GitHub experience. Everything can be done from a web browser.

## Prerequisites

You need a GitHub account and membership in the `usace-rmc` organization. A site administrator will send you an invitation — click the link to accept.

## Receiving a review request

GitHub emails you with subject "You were requested to review [title]." Click the link to open the PR.

## Where to read the document

**Both peer reviewers and Lead Civils review on the preview URL.** In the PR's comment thread, look for a bot comment that says "Preview deployed" with a URL. Click it. This opens the rendered document on an unadvertised preview site with a DRAFT watermark.

Read the document as you would any web page. This is where your review happens — you are reading, not editing.

**Peer reviewers:** Focus on technical accuracy. Are claims correct? Equations right? Procedures complete?

**Lead Civils:** Focus on technical quality and oversight. Does the document meet RMC standards? Is the scope appropriate? Are conclusions defensible?

## Leaving feedback

Click the **Files changed** tab on the PR. Hover over a line to see the blue "+" icon. Click it to open a comment box.

**Plain comment:** Type your feedback and click "Start a review" (first comment) or "Add review comment" (subsequent).

**Suggested change:** Click the "±" icon in the comment toolbar. Edit the pre-filled code block to your proposed wording. The author can accept your suggestion with one click.

## Submitting your review

Click **Finish your review** (upper right of Files changed). Choose:

- **Comment** — you've left notes for the author to address. Use this for every review round where you have feedback. The stage does not advance.
- **Approve** — you're satisfied with the document, typically on a backcheck round after the author has addressed your prior comments. **This is what advances the stage.**
- **Request changes** — _not used in this workflow._ Use **Comment** for routine revision cycles.

Click **Submit review.**

The typical cycle: you leave notes via **Comment**, the author addresses them and pushes revisions, the stage progression bot pings you to backcheck, and you return to submit **Approve** if satisfied (or another **Comment** review if more feedback is needed).

## After you approve

The stage progression workflow advances the PR automatically **if you were the reviewer the site admin assigned for the current stage**. The workflow uses per-individual gating: it compares the approver's username to the list of reviewers the admin assigned via the Reviewers sidebar, and only advances the stage when one of those assigned reviewers approves. If you approve a PR you weren't explicitly assigned to, the bot posts a note acknowledging your approval but doesn't advance the stage.

If the site admin assigned multiple people at the same stage, the first approval from any of them advances the stage — you don't all need to approve.

You don't need to do anything further unless someone tags you with a follow-up question.

## New commits after you approve

If the author pushes new commits after you approve, GitHub dismisses your approval in the UI so the green checkmark disappears. The stage progression bot, however, does **not** reset the stage label — the document stays at its current review stage (e.g., `stage:peer-review`) and the bot pings you to backcheck the revisions. Take another look at the changes and submit another review: **Approve** if you're satisfied, or another **Comment** review with additional feedback.
```

---

### 3.5 `13-technical-edit.mdx`

```mdx
---
title: Technical Edit
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Technical Edit

The technical edit is an AI-assisted editorial review that checks the document for grammar, clarity, tense consistency, terminology, and Section 508 accessibility compliance. It is the default editorial review method for new documents (Lane 1). A human technical editor can be substituted at the site admin's discretion.

## When it happens

The technical edit occurs after the RMC Lead Civil approves a Lane 1 PR. At this point, the document has already been reviewed for technical accuracy by the peer reviewer and for technical quality by the Lead Civil. The technical edit focuses exclusively on editorial quality and accessibility compliance, and reads the source MDX files directly — **no live deploy is needed at this stage**. The document is only deployed to the live site after the technical edit is complete, and that deploy is for the Director review phase.

## How it works

1. A team member with Claude Code access checks out the PR branch and runs `/technical-edit`.
2. Claude reads all changed MDX files and applies a standardized review prompt committed to the repository at `.github/ai-review/technical-editor-prompt.md`.
3. Claude posts inline review comments directly on the PR — on specific lines, with severity levels and suggested fixes — exactly like a human reviewer would.
4. The author addresses each comment: pushes fixes, replies to threads, and resolves conversations as they're addressed.
5. When all comments are addressed, the author checks the checkbox in the PR description: `Technical edit comments addressed — ready for Director review`.
6. The stage progression workflow detects the checkbox and advances the PR to Director review.

If the technical edit was done by a human or the author isn't available to check the box, a site admin can apply the `admin:advance-to-director` label to the PR as a manual override. The workflow removes the label and advances the stage the same as a checkbox event.

## What it reviews

**Grammar and mechanics.** Spelling, punctuation, sentence structure, subject-verb agreement, hyphenation, serial comma usage.

**Tense and voice.** Third-person active voice consistency. Flags passive voice when active would be clearer. Flags inconsistent tense within sections.

**Clarity and concision.** Wordy passages, ambiguous pronouns, sentences over 40 words, buried leads.

**Terminology.** Inconsistent use of terms within the document (e.g., alternating "embankment" and "dam" for the same structure). Does not flag correct domain terminology.

**Section 508 accessibility.** Image alt text, heading hierarchy (no skipped levels), descriptive link text, table header rows, proper list syntax, color not as sole information channel.

**Style consistency.** Figure/table caption format, citation key format, unit consistency, acronym definitions on first use.

## What it does NOT review

Technical accuracy — that is the peer reviewer's job. Domain conclusions. MDX syntax. Frontmatter fields.

## The review prompt

The review prompt is a versioned file in the repository at `.github/ai-review/technical-editor-prompt.md`. It can be updated over time as the team learns what the AI catches well and what it misses. Each AI review comment includes the prompt version used, so comments can be traced back to the exact instructions that generated them.

## Fallback to a human editor

A site admin can route any document to a human technical editor instead of (or in addition to) the AI review. The human editor follows the same workflow as peer reviewers and Lead Civils: they're assigned to the PR, review the document on the **preview URL** (the technical edit happens before any live deploy), post comments, and submit their review. The author addresses comments the same way. The only difference is that advancement to Director review requires the human editor to click Approve rather than the author checking the checkbox.

## Who can run the skill

Anyone with Claude Code access (a personal Claude subscription) can run `/technical-edit`. The output — the PR review comments — is visible to everyone on GitHub regardless of their subscription status. Only the trigger requires Claude access.

If nobody with Claude access is available, use the human editor fallback.
```

---

### 3.6 `14-director-workflow.mdx`

```mdx
---
title: Director Workflow
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Director Workflow

What the RMC Director does when reviewing a new document. The Director's role is intentionally simple: read the document, approve it, move on. The Director only reviews **new documents** (Lane 1).

## Prerequisites

1. A GitHub account (sign up at `github.com` if needed).
2. Membership in `@usace-rmc/docs-director` (a site admin adds you; accept the email invitation).

One-time setup.

## What you will be asked to do

When a new document has passed peer review, Lead Civil review, and the technical edit, a site administrator assigns you as a reviewer. GitHub emails you.

Click the link in the email. On the pull request page, scroll through comments to find one from a **site administrator** containing a URL starting with `https://usace-rmc.github.io/RMC-Software-Documentation/`. This is the **live production site** — the same URL readers will use.

Click it. The document displays with a DRAFT watermark that will be removed after your approval.

> **Important:** Use the live URL posted by the site administrator, not the automatic "Preview deployed" bot comment from earlier in the thread.

Read the document. It has already been reviewed for technical accuracy (peer reviewer), technical quality (Lead Civil), and editorial quality (technical edit). Your review is a final verification that the document meets RMC standards.

## Approving

1. Back on the PR, click the **Files changed** tab
2. Click **Review changes** (upper right)
3. Select **Approve**
4. Optionally type a note
5. Click **Submit review**

Done. The site administrator handles everything from here.

## If something needs fixing

Select **Comment** (not Approve or Request changes) and describe the issue. The author will fix it, and the site admin will ask you to re-review.

For minor suggestions you don't want to block on, select **Approve** and include a note — the site admin will coordinate the follow-up.
```

---

### 3.7 `15-site-admin-workflow.mdx`

```mdx
---
title: Site Admin Workflow
---

import NavContainer from '@site/src/components/NavContainer';

<NavContainer link="/dev" linkTitle="Developer Resources" />

# Site Admin Workflow

Responsibilities and procedures for site administrators.

## Responsibilities

1. Assigning reviewers (peer, Lead Civil, Director) at each stage transition
2. Running checkpoint deploys for Lane 1 PRs
3. Running or coordinating the technical edit
4. Preparing final merge commits (flipping draft flag, updating version history)
5. Merging PRs and approving production deploys
6. Handling Lane 4 editorial fix and Lane 5 dev doc PRs as sole reviewer
7. Resolving edge cases

## Daily routine

Check for PRs needing your attention. The stage progression workflow tags `@usace-rmc/docs-admin` at every transition. Filter: `is:open label:"stage:ready-to-merge"` or `is:open review-requested:@me`.

## Assigning reviewers

Reviewers are assigned ad-hoc per PR via the Reviewers sidebar (gear icon → type username → select). There are no standing review teams for peer reviewers or Lead Civils. The workflow's transition comment tells you which role to assign next.

For Lane 1, you assign up to three people across the lifecycle: the peer reviewer (if the author didn't), the Lead Civil after peer approval, and the Director after the technical edit.

**Per-individual gating.** When you assign someone via the Reviewers sidebar, the stage progression workflow records that person in a hidden state comment on the PR, keyed by the current review stage. Only approvals from those assigned reviewers advance the stage — drive-by approvals from other team members are logged but ignored by the workflow. You can assign multiple people at the same stage; the first approval from any of them advances the PR.

If you assigned the wrong person or need to replace someone, remove them from the Reviewers sidebar and add the correct person. The state comment updates automatically.

## Running a checkpoint deploy (Lane 1)

After the author marks the technical edit complete (the PR advances to `stage:director-review`), deploy the PR branch to the live site (watermarked) for the Director's review:

1. Repo → **Actions** tab → click **Deploy to GitHub Pages** in the sidebar
2. Click **Run workflow** dropdown (upper right)
3. Enter the PR branch name in the **ref** field
4. Click **Run workflow**
5. When the build completes, click **Review deployments** → check `production` → **Approve and deploy**
6. Verify the document on the live URL with the watermark
7. Post a comment on the PR with the live URL so the Director knows where to read

This is the **first** time the document appears on the live site. The peer review, Lead Civil review, and technical edit all happened earlier on the preview URL or against source files; the live deploy is deferred until the document has passed editorial review.

Re-deploy whenever the author pushes revisions during Director review. Post a comment noting the update.

## Running the technical edit

After Lead Civil approval (the PR advances to `stage:ai-editor-review`), run `/technical-edit` from Claude Code while on the PR branch. If you don't have Claude Code access, coordinate with a team member who does. **No deploy is required at this stage** — the technical edit reads the source MDX directly.

The AI posts inline review comments. The author addresses them and checks the PR description checkbox to advance the PR to Director review, at which point you'll run the checkpoint deploy.

**Manual override.** If a human technical editor did the review instead, or the author isn't available to check the checkbox, apply the `admin:advance-to-director` label to the PR. The workflow removes the label and advances the stage the same as a checkbox event, then posts the Director-review next-steps comment with instructions for the checkpoint deploy.

## Preparing the final merge

When a PR reaches `stage:ready-to-merge`:

1. Check out the PR branch (locally or via github.dev)
2. In the landing page JS file, change `draft: true` to `draft: false`
3. Update `00-version-history.mdx` with reviewer/approver names
4. Commit and push
5. Merge the PR
6. Approve the final production deploy in Actions

For Lane 1: `reviewedBy` includes the peer reviewer and Lead Civil; `approvedBy` is the Director.
For Lanes 2/3: `reviewedBy` is the peer reviewer (and Lead Civil for Lane 2); `approvedBy` is `-`.
Lanes 4 and 5: no version history update needed.

## The `review-workflow` commit status

Every documentation PR has a `review-workflow` commit status that branch protection on `main` requires to be `success` before the PR can merge. This is the hard merge gate — nobody, including you, can click the merge button until the bot flips this status to success. The bot manages it automatically:

| Situation | Status |
|---|---|
| `stage:peer-review` / `stage:lead-civil-review` / `stage:ai-editor-review` / `stage:director-review` | pending |
| `stage:needs-lane` (workflow couldn't detect the lane) | pending |
| `stage:ready-to-merge` (all reviews complete) | success |
| `lane:editorial-fix` or `lane:dev` assigned | success (immediately) |
| Non-docs PR, CI Build passed | success (set by `ci-build.yml`) |

If a PR is stuck because `review-workflow` is pending, check the stage label to figure out what review is outstanding. If a PR is stuck because `review-workflow` is missing entirely (never got set), the lane-detection step probably failed — apply a `lane:*` label manually to re-trigger the workflow.

## Approving deploys

Every deploy pauses at the production environment gate. You receive an email. Navigate to Actions → the workflow run → Review deployments → check `production` → Approve and deploy.

A Lane 1 document may involve multiple deploys: one checkpoint after the technical edit completes (for Director review), optional re-deploys during Director review if the author pushes fixes, and one final deploy after merge.

## Handling Lane 4 and Lane 5 PRs

Lane 4 (editorial fix) and Lane 5 (dev doc) PRs skip formal review. You are the reviewer, approver, and merger:

1. Click the preview URL to see the change
2. Review the Files changed tab
3. Approve, merge, approve the deploy

The `review-workflow` commit status is flipped to success immediately on lane assignment, so the merge button is enabled as soon as CI finishes.

## Edge cases

**Wrong lane:** Remove the current `lane:*` label, apply the correct one. The workflow re-initializes.

**Branch starts with `docs/` but doesn't match a sub-prefix:** The workflow applies `stage:needs-lane` and tags you. Apply the correct `lane:*` label.

**Documentation change pushed to a non-`docs/` branch:** The workflow intercepts this at PR open time regardless of branch name, because it detects changes to files under `docs/`. If the content is entirely under `docs/dev/`, it auto-assigns `lane:dev`. Otherwise it applies `stage:needs-lane` and tags you to assign the correct lane manually. Optionally ask the author to rename the branch next time for clarity.

**Non-documentation PR with no lane comments:** Expected behavior. PRs that don't touch `docs/` are silently skipped by the lane workflow and receive an "admin may merge" comment from `ci-build.yml` when CI passes. This is normal for infrastructure, tooling, and dependency PRs.

**Unresponsive reviewer:** Ping them on the PR, or remove them from the Reviewers sidebar and assign someone else. The state comment updates automatically.

**Drive-by approval from an unassigned reviewer:** The workflow posts a note logging the approval but does not advance the stage. If the unassigned approver should actually be advancing the PR, add them as a reviewer via the Reviewers sidebar and ask them to re-approve — the new approval will then match the assigned list and advance the stage.

**Author pushes new commits during an active review:** Normal and expected. The workflow does not reset the stage. The bot re-sets the `review-workflow` commit status on the new head SHA and pings the assigned reviewer(s) to backcheck.

**Stale checkpoint deploy:** If the live URL shows outdated content, re-run the checkpoint deploy and post a comment.

**Build fails on checkpoint deploy:** Coordinate with the author to fix the branch.

**Build fails after merge to main:** Push a hotfix to `main` or revert the merge. Re-run the deploy. Note that `deploy.yml` filters by paths — a merge that doesn't touch any site-affecting files (`docs/`, `src/`, `static/`, `scripts/`, `docusaurus.config.js`, `tailwind.config.js`, `package.json`, `package-lock.json`) does not trigger a redeploy, so a broken workflow or documentation change to the planning folder won't break the live site.

**Need to force a production redeploy:** Go to Actions → Deploy to GitHub Pages → Run workflow, specify the ref (usually `main`), and approve at the production gate. This is the escape hatch when the path filter would otherwise skip a merge that actually needs to ship.

## Onboarding new site admins

1. Clone the repo, confirm local build works
2. Read these Documentation Guide chapters
3. Shadow an existing admin through one full PR lifecycle
4. Practice on a Lane 4 editorial fix PR
```

---

## Infrastructure notes (for reference — not part of any chapter)

The following are in place in the repository and support the workflow described above. Recording them here so future planning documents and Claude Code sessions have a reference.

### Repository labels

Created on `USACE-RMC/RMC-Software-Documentation`:

- `lane:new-doc`, `lane:major-revision`, `lane:minor-revision`, `lane:editorial-fix`, `lane:dev`
- `stage:needs-lane`, `stage:peer-review`, `stage:lead-civil-review`, `stage:ai-editor-review`, `stage:director-review`, `stage:ready-to-merge`
- `admin:advance-to-director`

### Branch protection on `main`

Required status checks: `CI Build`, `review-workflow`. Stale approvals dismissed on new pushes. Conversation resolution required. Force pushes and branch deletion disallowed.

### Workflow files

- `.github/workflows/ci-build.yml` — runs `npm run build` on every PR; flips `review-workflow` commit status to success for non-docs PRs
- `.github/workflows/pr-preview.yml` — builds and deploys preview to the `usace-rmc/RMC-Software-Documentation-Previews` repo; filters by paths (only affects PRs that touch site-affecting files); sets `DOCUSAURUS_IS_PREVIEW=true` so Google Analytics is disabled for preview builds; has a per-PR concurrency block that cancels superseded builds
- `.github/workflows/pr-preview-cleanup.yml` — deletes the PR's preview directory when the PR closes
- `.github/workflows/deploy.yml` — production deploy on merge to `main`; filters by the same paths allowlist as `pr-preview.yml` so merges that don't affect site output skip the redeploy; uses `actions/deploy-pages@v4` artifact flow (no `gh-pages` branch); gated by a `production` GitHub environment that requires admin approval
- `.github/workflows/stage-progression.yml` — the core review-workflow logic: lane detection, state-comment management, stage transitions, commit status management, admin override handling; has a per-PR concurrency block

### Lane detection logic

1. **Content-based first:** if every docs file in the PR is under `docs/dev/`, assign `lane:dev`
2. **Branch-name fallback:** match branch prefix against `docs/new/`, `docs/major/`, `docs/minor/`, `docs/fix/`, `docs/dev/`
3. **Manual:** if neither matches and the PR touches `docs/`, apply `stage:needs-lane` and ping admin

### State comment format

Hidden bot comment on each PR with marker `<!-- review-state -->`. Contains a JSON data line (`<!-- state-data:{...} -->`) that maps each active review stage to an array of assigned reviewer usernames. Updated on `review_requested` and `review_request_removed` webhook events. Read on `pull_request_review` approval events to check whether the approver is in the assigned list for the current stage.

### Google Analytics exclusion for previews

`pr-preview.yml` sets `DOCUSAURUS_IS_PREVIEW=true` in the build environment. `docusaurus.config.js` checks this and excludes the `@docusaurus/plugin-google-gtag` plugin when set, so preview page views don't pollute the production GA property. Production builds (`deploy.yml`, local `npm run build`) don't set this variable, so they behave normally.

---

## Task 4: Verify

1. Run `npm run sidebars` to regenerate sidebar
2. Run `npm run build` — must succeed
3. Run `npm start` and verify all seven new chapters appear in order
4. Confirm renamed appendices still appear at the bottom

## Task 5: Open the PR

Branch: `docs/new/documentation-guide-review-chapters`

PR title: `Add review and approval process chapters to Documentation Guide`

## Checklist

- [ ] Three appendix files renamed
- [ ] `scripts/generateSidebars.js` updated
- [ ] Seven new chapter MDX files created
- [ ] `npm run sidebars` run
- [ ] Build passes
- [ ] Visual check passes
- [ ] PR opened
