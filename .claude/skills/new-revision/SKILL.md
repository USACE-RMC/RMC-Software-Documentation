---
name: new-revision
description: Scaffold a new revision of an existing document by copying the latest version folder to a new version, setting the draft flag, and creating an appropriately-prefixed git branch for the review process.
---

# New Revision

Scaffold a new revision of an existing document on the RMC documentation site. Copies the latest version folder to a new version directory, marks the document as draft, and creates a `docs/major/` or `docs/minor/` branch ready for the review workflow.

**Arguments:** `$ARGUMENTS` — optional. If provided, use as hints for the prompts below (e.g., a document path or version number). Still confirm each value with the user before proceeding.

## Step 1: Gather Information via Interactive Prompts

Prompt the user for each value, one at a time. Show sensible defaults where possible. Do NOT proceed until all values are confirmed.

### 1a — Document selection

Ask: "Which existing document are you revising?"

Read [static/versions/latestVersions.json](static/versions/latestVersions.json) and present the keys as a numbered list. The user picks one. The selected key is the `docBasePath` (e.g., `desktop-applications/lifesim/users-guide`).

The corresponding value in the JSON is the `currentVersion` (e.g., `v1.0`).

### 1b — Revision type

Ask: "Is this a major revision or a minor revision?"

- **Major revision** — substantial changes warranting a new major version. Branch prefix: `docs/major/`. Goes through Lane 2 (Peer → Lead Civil review).
- **Minor revision** — smaller updates warranting a minor version bump. Branch prefix: `docs/minor/`. Goes through Lane 3 (Peer review only).

### 1c — New version number

Compute the default based on revision type:
- Major: increment the major component, reset minor to 0 (e.g., `v1.0` → `v2.0`, `v1.5` → `v2.0`).
- Minor: increment the minor component (e.g., `v1.0` → `v1.1`, `v1.5` → `v1.6`).

Ask: "The new version will be `{newVersion}`. Is that correct, or would you like a different version number?"

### 1d — Branch name

Compute the default branch name as `docs/{major|minor}/{slug}-{newVersionWithoutV}` where `{slug}` is the last segment of the docBasePath (e.g., `users-guide`). Example: `docs/major/users-guide-v2.0`.

Ask: "I'll use branch name `{branchName}`. Is that correct, or would you like a different name?"

### 1e — Confirmation

Display a summary:

```
Document:         {docBasePath}
Current version:  {currentVersion}
New version:      {newVersion}
Revision type:    {major|minor}
Branch:           {branchName}
Source folder:    docs/{docBasePath}/{currentVersion}/
Target folder:    docs/{docBasePath}/{newVersion}/
Figures source:   static/figures/{docBasePath}/{currentVersion}/
Figures target:   static/figures/{docBasePath}/{newVersion}/
Bibliography:     static/bibliographies/{docBasePath}/{newVersion}/bib.json
```

Ask: "Does this look correct? (yes/no)"

If no, ask which value to change and loop back.

## Step 2: Create the git branch

Create and check out the branch from the current `main` (not from the user's current branch — start clean):

```bash
git fetch origin main
git checkout -b {branchName} origin/main
```

If the branch already exists, abort and report the conflict to the user.

## Step 3: Copy the version folder

Copy the entire current version directory to the new version directory:

```bash
cp -r docs/{docBasePath}/{currentVersion}/ docs/{docBasePath}/{newVersion}/
```

Then copy the figures folder:

```bash
cp -r static/figures/{docBasePath}/{currentVersion}/ static/figures/{docBasePath}/{newVersion}/
```

Then copy the bibliography folder:

```bash
cp -r static/bibliographies/{docBasePath}/{currentVersion}/ static/bibliographies/{docBasePath}/{newVersion}/
```

If any source folder doesn't exist, skip it and note in the final report.

## Step 4: Update the version history file

Read `docs/{docBasePath}/{newVersion}/00-version-history.mdx` and add a new placeholder row at the top of the `TableVersionHistory` props arrays:

- `versions`: prepend the new version number without the `v` prefix (e.g., `'2.0'`)
- `dates`: prepend the current month and year (e.g., `'April 2026'`)
- `descriptions`: prepend `'Placeholder — describe the changes in this revision.'`
- `modifiedBy`: prepend `'Enter author name'`
- `reviewedBy`: prepend `'-'`
- `approvedBy`: prepend `'-'`

The author will fill in the actual values during the PR. The site admin will fill in `reviewedBy`/`approvedBy` at merge time.

## Step 5: Set the draft flag

Find the document's entry in the appropriate landing page JS file (search `src/pages/` for the `doc_location` matching `{docBasePath}`). Common locations:

- Desktop apps: `src/pages/desktop-applications/{software}.js`
- Toolboxes: `src/pages/toolboxes/{suite}.js`
- Web apps: `src/pages/web-applications/{software}.js`
- Dev: `src/pages/dev.js`

In the matching entry, change `draft: false` to `draft: true`.

> Note: this flips the draft flag on the *currently published* version too, since the flag is per-document, not per-version. The version-aware watermark logic in [src/theme/DocItem/index.js](src/theme/DocItem/index.js) ensures the watermark only appears on the *latest* version of a flagged document. Until this PR is merged, the latest version on the live site is still the previous version, which will not be watermarked. Once merged, the new version becomes latest and (briefly, until the site admin flips the flag back to `false`) the watermark will appear on it.

## Step 6: Run generation scripts

Run the build generation scripts to pick up the new version:

```bash
npm run sidebars && npm run counters && npm run versions
```

Verify no errors. If errors occur, diagnose and fix.

## Step 7: Verify and report

1. Glob to confirm the new version folder exists at `docs/{docBasePath}/{newVersion}/`
2. Confirm the version history file has the new row
3. Confirm the landing page JS has `draft: true`
4. Confirm the branch is checked out (`git branch --show-current`)
5. Report a summary to the user:

```
New revision scaffolded successfully!

Document:    {docBasePath}
Old version: {currentVersion}
New version: {newVersion}
Branch:      {branchName}

Created:
  - docs/{docBasePath}/{newVersion}/ (copied from {currentVersion})
  - static/figures/{docBasePath}/{newVersion}/ (copied)
  - static/bibliographies/{docBasePath}/{newVersion}/ (copied)

Modified:
  - docs/{docBasePath}/{newVersion}/00-version-history.mdx (new placeholder row)
  - {landing page JS file} (draft: true)

Next steps:
  1. Edit the new version's MDX files to make your changes
  2. Update 00-version-history.mdx with a real description and your name
  3. Run `npm start` to preview locally
  4. When ready, commit and open a PR (the workflow will detect the branch prefix and start {Lane 2: Peer → Lead Civil | Lane 3: Peer review} automatically)
```
