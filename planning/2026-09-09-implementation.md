# Review overhaul implementation

Approved policy: `2026-09-08-review-workflow-decisions.md` (latest decisions override historical proposals).

## Architecture and concrete controls

- Trusted workflow controller on main handles PR metadata, review submissions and `/review` issue comments; it never executes PR code with write credentials. A serialized controller stores durable state as JSON in the protected `review-state` branch, not editable comments. One persistent PR summary projects state.
- Commands: `/review classify <new|major|minor|editorial|dev|code> <doc_location|->`; `/review assign <peer|lead|editor|director> <login>`; `/review author <login>`; `/review complete <stage>` (admin); `/review waive <stage> [reason]`; `/review restart <stage>`; `/review ready`; `/review start-director <doc_location> <version|unversioned> <login>`; `/review cancel`; `/review retarget <doc_location> <version|unversioned>` (admin reconciliation before publication merge).
- Trusted controller writes use a dedicated GitHub App installed only on this repository. The App reads docs-admin membership and writes controller state, PR metadata, statuses and workflow dispatches with a short-lived installation token minted per run; there is no personal-token or generic `GITHUB_TOKEN` fallback. No per-stage qualification teams. Administrators may fill any role. One authoritative human per stage; completed stages durable; waived distinct. Author aliases may be recorded by administrators to enforce non-admin independence beyond PR creator identity.
- Main-only publication; mandatory current CI; no reply/thread-resolution requirements. AI completion explicit admin action. Manual document attribution. Automatic publication PR on Director approval/waiver; targeted registry edits parsed as data, never evaluated from PR source.
- Director baseline removes only selected document source from a main snapshot; review head is that original full snapshot. Review compares full document additions against the synthetic baseline, never merges to main. Publication computes corrections against that original snapshot and applies only selected document/source/assets to current main, failing on conflicting intervening changes without resetting reviews. Stable preview; retire after confirmed successful publication deployment or cancellation.
- CI and preview builds run without credentials to publish artifacts. A trusted workflow_run consumer publishes preview artifacts with the preview repository key. Generated PR builds use explicit workflow_dispatch to avoid GITHUB_TOKEN event-suppression/approval surprises. Controller reads successful deployment runs for production lineage. No live pilot, merges or deployments in this task.

## Tasks and ownership

1. Policy model + Node tests (`scripts/review/policy.js`, `tests/review-policy.test.js`): admin classification, single assignment, identity restrictions with admin exception, lane correction, persistent completion, waiver/restart, one-doc scope. Root defines integration contract with policy implementer before API work.
2. Controller and GitHub storage (`scripts/review/{github,controller,documents}.js`): authenticated API boundary, durable journal, idempotent notifications, explicit commands, document identity, Director/publication operations. Test policy and real document transformations with local fixtures; stub only GitHub network.
3. Workflows (`.github/workflows/*`): trusted controller, credential-free build jobs, artifact preview publisher, main-only production, lifecycle cleanup. Keep required CI Build check name.
4. Documentation and helpers: replace current workflow guidance with approved behavior, align authoring helpers, include command reference and clear activation checklist. Separate agent owns docs/helpers only.
5. Verification: node --test tests/*.test.js; workflow YAML/schema inspection; npm run build; broad independent code review. Reconcile findings, report actual testing and unactivated settings. No GitHub pilot.

## Activation, not performed on the feature branch

Administrator merges only after inspecting changes. Keep the repository-wide Actions PR-creation setting disabled; generated PRs use the dedicated App. Store App credentials and the preview deploy key in the main-only `review-control` environment, with no required reviewers, and mint an installation token per run. Restrict `review-state` and `director-base/*` writes to the App and administrators, never generic GitHub Actions. Align main protections with expected-source durable review and CI checks; production remains main-only with docs-admin approval. Never paste secrets into chat. Follow the activation checklist after implementation is verified.

## Ledger

- Branch: ci/review-workflow-overhaul. User explicitly requested a branch in this checkout; no extra worktree was created.
- Latest requirements supersede earlier design discussions. No active PR migration or pilot.
- Interfaces/files overlap: policy consumed by controller (contract agreed before implementation); docs refer to commands above; workflow entrypoints will be owned by root. Independent edits avoid shared files.
- Completion: implemented and locally verified; live activation remains administrator work described in `2026-09-09-activation-checklist.md`. Verification is recorded in `2026-09-09-verification.md`.
