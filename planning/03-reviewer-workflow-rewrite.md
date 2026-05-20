# Reviewer Workflow Chapter — Rewrite Plan

Expand `docs/dev/documentation-guide/12-reviewer-workflow.mdx` from a reference into a guided, screenshot-driven tutorial aimed at reviewers with **zero prior GitHub experience**, while preserving a concise reference section for repeat users.

## Goals

- A first-time reviewer can perform a full review by following the chapter linearly, without external help.
- A repeat reviewer can look up a specific mechanic (e.g., "how do I suggest a change?") in seconds.
- Every interactive step has a visual: a still figure or, for hover/drag/click mechanics, a GIF.
- Screenshots reference a single, stable example PR so the narrative stays consistent.

## Audience floor

Zero GitHub knowledge in Part 1. Terms like "pull request," "branch," and "commit" are introduced in plain English on first use. No assumed familiarity with developer tooling.

## Structural changes

### Two-part chapter

**Part 1 — Your first review, step by step**
Linear walkthrough. Screenshots and GIFs at every interaction. Written in second person ("you'll see," "click here").

**Part 2 — Reference**
Slimmed-down version of the current chapter content. For users who already know the flow and need a fast lookup.

### New companion chapter (separate file)

A new chapter, **First-time GitHub setup**, placed before chapter 11 (Author Workflow), covers material that applies to *all* contributors (reviewers, authors, devs):

- Creating a GitHub account
- Enabling two-factor authentication
- Accepting an organization invitation
- Adjusting email notification preferences
- Finding the GitHub UI on mobile (peer reviewers sometimes review from phones)

The Reviewer Workflow chapter links to specific sub-sections of this chapter rather than duplicating the content. The Author Workflow and (future) Dev contributor chapters can also link to it.

Renumbering note: this inserts a new chapter; all subsequent chapter numbers and the `mainIds` array in `scripts/generateSidebars.js` shift by one. See [02-documentation-guide-implementation.md](02-documentation-guide-implementation.md) for the established renumbering pattern.

## Part 1 — Section outline

Each section ends with a "Checkpoint" callout summarizing what the reviewer should have done by that point.

1. **Before you start — why we work this way**

   A patient, plain-English orientation that earns the reader's trust before any clicking happens. Subsections:

   - **The site you're reviewing is built from text files in a repository.** One paragraph framing GitHub as a versioned filing cabinet for the documentation source files. Annotated screenshot of the repo's `docs/` folder so the reviewer sees what an author is actually editing.
   - **What a branch is.** A working copy of the entire repository where an author can make edits without affecting the live site. Diagram: `main` (the published site) plus a feature branch with a few new commits hanging off it. No code in the diagram — just labelled boxes.
   - **What a commit is.** A saved snapshot of one batch of edits, with a short message describing what changed. Authors typically push several commits per document — one for scaffolding, one for content, one for fixes after review, etc.
   - **What a pull request is.** A formal proposal to merge a branch back into `main`. Two things matter: (1) PRs are the *only* way changes reach the live site — direct edits to `main` are blocked, (2) PRs hold the review conversation in one place so the team can comment, suggest changes, and approve before publication.
   - **Where you fit in.** A reviewer is the person who reads the proposed changes (on the preview site) and either approves them or leaves feedback. You will not be editing files — your entire job happens in the GitHub web interface and the preview site.
   - **Glossary callout.** A small boxed table with the five terms above so the reader has a quick lookup as they encounter the words later in the chapter.

2. **Getting the review request**
   - The email subject and what it looks like in an inbox (annotated screenshot of the email)
   - Clicking the **View it on GitHub** button
   - Fallback: finding the PR via github.com when the email is lost (annotated screenshot of the org's PR list filtered to `review-requested:@me`)

3. **The PR page — a guided tour**

   Annotated screenshot of the Conversation tab with labeled callouts for:
   - PR title and number
   - Reviewers sidebar
   - The "Preview deployed" bot comment (the link the reviewer will click)
   - The Conversation / Commits / Files changed / Checks tabs
   - The "Assigned reviewers for this PR" bot block

   **Sub-section: Navigating commits within a PR.** A PR usually contains several commits, and not all of them are worth a reviewer's attention. The classic example is a new-document PR with two commits: one that *scaffolds* the version folder (boilerplate-only — no real content to review) and one with the actual document. The reviewer should know how to focus on the content commit and skip the scaffolding.

   - Annotated screenshot of the **Commits** tab listing each commit's message and SHA. Explain how to read a commit message and recognize the scaffolding vs. content commits.
   - Annotated screenshot of the **Files changed** tab with the commit-range dropdown (top-left of the diff area) expanded. Callouts for "Show changes since your last review," "Compare with selected commit," and the per-commit list. This is the key UI for narrowing the review scope.
   - Worked example using the user's recent PR: "Commit 1 was scaffolding — boilerplate copy of v1.0 into v1.1. Commit 2 contained the edits you should review. Here's how to skip Commit 1." Followed by a GIF showing the dropdown selection that hides the scaffolding diff.
   - Note on what the author should do to make this easy: write descriptive commit messages so a reviewer can tell which commit holds the content. (Cross-link to Author Workflow.)

4. **Reading the document on the preview site**
   - What "DRAFT" means (annotated screenshot showing the watermark)
   - That the preview URL is *where you review from*, not the Files changed tab
   - Reading on mobile vs. desktop

5. **Leaving your first comment** — *the rock-solid section*

   This section gets the most assets in the chapter. The goal is that a first-time reviewer who has never left a comment on a PR can do so confidently after reading it. Subsections:

   **a. Switching to the Files changed tab.** Annotated screenshot. Note that this is the only place comments can be left — comments cannot be left on the Conversation tab or on the preview site.

   **b. Understanding what you're looking at — the diff.** Beginners are often thrown by the red/green diff format. A short subsection explains:
   - Red lines (removed), green lines (added), white lines (unchanged context)
   - For brand-new files (typical for a new-document PR), the entire file is green
   - For minor revisions, only the changed paragraphs are colored

   **c. Unified vs. split view.** The gear icon top-right of the diff lets you toggle between unified (single column) and split (side-by-side) views. For prose documents, split view is usually easier — recommend it. Annotated screenshot showing the toggle and the difference.

   **d. Reading MDX without panic.** The Files changed tab shows raw MDX source, not the rendered output. Explain that the reviewer's job is to verify the rendered preview matches what they expect — the MDX itself is the author's problem. Show a small example of an MDX block side-by-side with its rendered output.

   **e. Leaving a comment on a single line.**
   - GIF: hovering the line number gutter → blue "+" appears → click → comment composer opens
   - Annotated screenshot of the open composer with callouts for: textarea, Markdown toolbar, emoji picker, attachment button, the ± suggestion-block icon, "Cancel" vs. "Start a review" vs. "Add single comment" buttons
   - Plain-English explanation of Markdown basics every reviewer will use: `**bold**`, `*italic*`, backticks for code, blank lines for paragraph breaks, `>` for quoting

   **f. Commenting on multiple lines (the hidden feature).** Most newcomers don't discover this — you can drag the blue "+" down the gutter to span multiple lines. Useful for "this entire paragraph needs to be reworded." GIF demonstrating the click-and-drag.

   **g. Start a review vs. Add single comment — the fork that confuses everyone.** Side-by-side comparison:
   - **Start a review** (recommended default): batches all your comments into one notification when you submit. The author gets pinged once at the end, not on every comment.
   - **Add single comment**: posts immediately and emails the author. Use only when you're leaving one short note and stopping (e.g., "the preview URL appears broken — pinging you before continuing").
   - Annotated screenshot of both buttons with a third "Add review comment" button (which appears after the first comment in a review batch).

   **h. Making a suggested change.** The most powerful and least-discovered feature in GitHub review.
   - What it is: a pre-filled code block the author can apply with one click, no manual edit needed.
   - GIF: clicking the ± icon in the toolbar → the composer pre-fills with the line being commented on → reviewer edits the block to the proposed wording → submits.
   - When to use: short wording fixes, typo corrections, term replacements. Anything where the reviewer can just *write* the right answer instead of describing it.
   - When NOT to use: structural feedback, "this entire section needs to be reorganized," anything multi-paragraph.
   - Annotated screenshot of a suggestion comment from the author's view, with the "Commit suggestion" button highlighted.

   **i. Replying to comments and follow-up discussion.** Reviews are conversations — the author will reply asking for clarification, and the reviewer should respond. Annotated screenshot of a comment thread with the reply box. Note that replies use **Add single comment** by design, since they're conversational.

   **j. Resolving threads.** Threads are resolved when the author has addressed the feedback. By convention, the *author* resolves threads after pushing their fix; the *reviewer* re-opens if the fix wasn't sufficient. Annotated screenshot of the "Resolve conversation" button. Note: all threads must be resolved before merge.

   **k. Editing or deleting your own comment.** Sometimes you'll post and immediately notice a typo. The "..." menu on each comment has Edit and Delete options. Annotated screenshot.

   **l. Checkpoint.** "By the end of this section you have left at least one comment, possibly several, and you understand the difference between Start a review, Add single comment, and a suggested change."

6. **Submitting your review**
   - Annotated screenshot of the **Finish your review** dialog with the three options
   - Why we never use **Request changes** in this workflow
   - What happens immediately after submission (the bot comment that appears)

7. **The backcheck round**
   - What the bot ping looks like (email + GitHub notification)
   - Returning to the PR and finding the reviewer's view of "what's new since I last reviewed"
   - GIF: viewing changes since your last review (the "Changes since your last review" filter)
   - Approving via **Finish your review → Approve**

8. **You're done**
   - What happens automatically after approval (no further action needed unless re-pinged)
   - What "stage advanced" looks like in the bot comment

## Part 2 — Reference

Compact restatement of the current chapter content. Tables and bullets, no narrative:

- Prerequisites
- Where to read (preview URL)
- Reviewer focus by role
- Comment vs. Approve vs. Request changes
- Per-individual gating and how the stage advances
- Behavior when new commits arrive after approval

## Asset plan

### Folder layout

```
static/figures/dev/reviewer-workflow/
  fig-01-email.png
  fig-02-pr-overview.png
  fig-03-preview-watermark.png
  ...
  gif-01-hover-blue-plus.gif
  gif-02-suggested-change.gif
  gif-03-changes-since-last-review.gif
```

### Example PR

We'll designate a single throwaway PR ("Sample Document for Reviewer Training") for screenshots. Either:
- (Preferred) A real PR opened on a sandbox branch that we leave open indefinitely
- Or a recently merged PR we re-render via the preview URL

### Annotation style — **approved**

- USACE blue (`#4a7c9b`) 4 px outline boxes for "look here" elements (matches site branding)
- Numbered circles in the same blue with white numerals when a screenshot has multiple sequential elements
- Sans-serif labels (Segoe UI Bold) in soft-yellow callout boxes positioned beside the element, not overlapping it
- Captions handled by the `<Figure>` component's `caption` prop — annotations themselves are wordless except for short element names

### Tooling

- Stills: Playwright (capture) + Python/Pillow (annotation), scripted so they can be regenerated when GitHub's UI changes
- GIFs (**approved: hybrid model**):
  - Stepped frame GIFs (sequence walkthroughs, state transitions) — produced end-to-end with Pillow from Playwright stills
  - Fluid live-action GIFs (hover/drag/typing) — user records with ScreenToGif on their own machine, hands the raw GIF to the AI for annotation, palette optimization, and looping normalization

### Capturing the logged-in GitHub UI

The sample figure in this task was a logged-out view, which is fine for the page-tour figure but inadequate for most of the chapter. Logged-in-only UI surfaces include: the **Files changed → blue + on hover**, **Finish your review** dialog, **Changes since your last review** filter, the **Reviewers** sidebar populated with assigned reviewers, notifications, and the email-driven entry points. The chapter cannot work without these.

**Approach: persistent Playwright auth state.**

1. **One-time interactive login.** Write `scripts/auth/login-github.js` (Node) or `.py` (Playwright Python). When run, it opens a non-headless Chromium window, navigates to `github.com/login`, and pauses while the user types their username, password, and 2FA code interactively. Once logged in, the script saves browser cookies + localStorage to a `storage-state.json` file in a gitignored location (`.playwright-auth/github.json`).

2. **All capture scripts load that state.** Subsequent Playwright runs do not re-auth — they pass `storageState: ".playwright-auth/github.json"` to `browser.newContext(...)` and inherit the logged-in session. The user only re-runs the interactive login script if the session expires (~weeks).

3. **Account choice.** The user's own GitHub account is the chosen identity (no dedicated screenshot account). The user's username and avatar will appear in every screenshot.

4. **`.gitignore` additions.** `.playwright-auth/` must be gitignored — committing session cookies would let anyone with repo read access impersonate the screenshot account.

5. **Email screenshots.** GitHub's review-request emails arrive in a real inbox. The cleanest approach is for the user to forward one such email to a screenshot inbox (e.g., the dedicated screenshot account's email), open it in a logged-in browser, and capture the rendered email. The AI can annotate it. Doing this from a real Gmail UI is more authentic than mocking up an email layout.

6. **Sensitive content hygiene (mandatory because we're using the user's personal account).** Every capture script must, before screenshotting:
   - Clear the GitHub notifications badge (navigate to `/notifications` and mark-all-as-read once at the start of a capture session — or hide the badge via injected CSS for the duration of the capture run).
   - Hide the right-rail "Your work" / recommended repositories panel on dashboard-style pages via injected CSS (`document.querySelector('[data-target="dashboard.feed-list"]')` and similar).
   - Hide notification toasts that pop up mid-capture by setting `localStorage` flags GitHub respects, or by adding CSS rules that hide `.toast` containers.
   - Confirm the user is logged in (avatar present) before capturing — if not, fail loudly so we don't accidentally publish a logged-out shot that looks like it could be logged-in.
   - Never capture the user's email address, which can appear in the dashboard header dropdown, settings pages, or commit author lines. Crop or blur if necessary.

### Maintenance

- Add `<!-- Screenshots captured against GitHub UI as of YYYY-MM-DD -->` at the top of the chapter
- Keep the annotation Python script in `scripts/annotate-screenshots/` so re-captures are reproducible
- Document the example PR's URL in a comment block in the chapter file

## Build order

1. ~~Capability check: produce one sample annotated still and one sample GIF to confirm tooling and style~~ ✅ done
2. ~~Get user sign-off on annotation style and GIF approach~~ ✅ done
3. **User: set up the sandbox PR and auth state.** See "Prerequisites before captures can begin" below.
4. Capture all stills + GIFs in one session (mix of Playwright-driven stills and user-recorded ScreenToGif clips)
5. Write Part 1 prose against the captured assets
6. Rewrite existing chapter content into Part 2 reference form
7. Write the new "First-time GitHub setup" chapter
8. Update `scripts/generateSidebars.js` and renumber subsequent chapters
9. Cross-link from Author Workflow and Site Admin Workflow chapters

## Prerequisites before captures can begin

Two tasks for the user. Both are one-time setup.

### A. Open the sandbox PR

Create a branch off `main` named `docs/new/sample-document-for-reviewer-training` and add a small placeholder document under, for example, `docs/dev/sample-reviewer-doc/`. Open the PR with a title like "Sample Document for Reviewer Training (do not merge — used for documentation screenshots)" and a body that explains its purpose so future maintainers don't close it.

Leave the PR in `stage:peer-review` indefinitely — do not merge. Assign a reviewer (yourself is fine, since we're using your account) so the Reviewers sidebar populates for screenshots.

Add a few realistic-looking commits to the branch so the **Commits** tab has something to demonstrate the commit-navigation flow with (e.g., commit 1 scaffolds, commit 2 adds content). The actual content can be lorem-ipsum-style filler.

### B. Run the interactive login once

```
npm exec --yes playwright install chromium   # one-time Chromium install
node scripts/capture/login.mjs                # opens a real Chromium window
```

Sign in to GitHub, complete 2FA, wait until the dashboard renders, then press Enter in the terminal. The script saves `.playwright-auth/github.json`. Future capture scripts load this file and run logged-in without re-authenticating, for as long as the GitHub session is valid (typically weeks).

If the session ever expires (capture scripts will fail with a redirect-to-login error), just re-run the login script.

### C. Confirm with the AI when both are done

Reply with the sandbox PR URL and confirmation that the login script succeeded. The AI will then:

1. Verify the saved session works by loading it in a Playwright context and capturing a sanity-check screenshot
2. Capture the first batch of logged-in stills against the sandbox PR
3. Run the annotation pipeline and produce the Part 1 figures in `static/figures/dev/reviewer-workflow/`
4. Coordinate the few user-recorded GIF clips (will provide a list of exactly which interactions to record)

## Resolved decisions (from user feedback)

- Annotation style: USACE blue (`#4a7c9b`) outline boxes + numbered circles, soft-yellow label boxes, Segoe UI Bold
- GIF approach: hybrid (Pillow-stitched stills for stepped sequences, user-recorded ScreenToGif for live action)
- GIF length cap: 5 seconds max, looping
- Logged-in capture account: **user's own account, with pre-capture hygiene checks** — no dedicated screenshot account. The scripts must zero the notifications badge, confirm the avatar is the user's, and avoid capturing email addresses, personal repos in the sidebar, or unrelated notification toasts. The user's username and avatar *will* appear in every screenshot; accept that.
- Example PR designation: open a permanent **"Sample Document for Reviewer Training"** sandbox PR on a throwaway branch, leave it in `stage:peer-review` indefinitely, and capture all logged-in screenshots against it.
- Outline scope: approved as of this revision.
