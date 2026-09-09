# Repository-wide review workflow overhaul

Status: expanded architecture and implementation roadmap following the repository audit; no workflow behavior has changed. Supersedes the Director-only design of the same date.

Category 12 controlling cutover decision: the user confirms there are no open PRs. Use a clean cutover with no active-PR migration, parallel legacy workflow or temporary branch-deployment exception. Earlier migration/coexistence proposals below are superseded for this rollout. Retire the legacy Director checkpoint and activate main-only production with the overhaul; do not build compatibility machinery for a hypothetical existing PR.

Policy is now being elicited category by category in [the requirements and gap-analysis record](./2026-09-08-review-workflow-decisions.md). That record distinguishes confirmed user decisions from the proposals below; unanswered defaults in this design are not approved requirements.

Controlling administrator exception: any administrator may act in any capacity at any time. Administrator authorship and participation in earlier stages do not disqualify them from review, AI-edit completion, merge or production approval. Any unqualified author-independence or cross-stage separation wording below applies only to non-administrators. Preserve explicit actions, a single authoritative reviewer per human stage and auditable administrator identity; no stage is automatically completed by this exception.

## Objective and scope

Overhaul the entire repository review system as one coordinated effort: all five documentation lanes, non-documentation and mixed PRs, authoring helpers, human and AI technical editing, independent Director review, final publication, notifications, CI, previews, production deployments, permissions, and migration. Director review is one component of this system, not the organizing scope of the project.

Allow a new document to complete content review, merge to main, and deploy with its draft watermark before Director review. Allow an administrator to initiate a full-document Director review independently for an already deployed draft. Preserve inline comments, suggested replacements, and review discussions in GitHub.

Make progression depend on verifiable review evidence and authorized actions. Reduce automation noise without claiming control over GitHub's user-generated email notifications.

Consistency means shared rules for assignment, review rounds, evidence, handoffs, administrator-initiated restarts, and recovery. It does not mean adding identical review requirements to every lane. Preserve legitimate differences between new documents, revisions, editorial fixes, developer documentation, and site code.

## Audit coverage and change inventory

| Surface | Observed responsibility | Planned treatment |
| --- | --- | --- |
| `.github/workflows/stage-progression.yml` | Five lanes, stage labels, assignments, overrides, status and comments | Replace duplicated transition branches with a common policy evaluator; remove Director from content-PR progression through every entry path. |
| `.github/workflows/ci-build.yml` | Site validation and independent no-docs review-status writer | Keep build validation; consolidate review eligibility ownership so config-only and mixed changes cannot bypass publication rules. |
| `.github/workflows/pr-preview.yml` | Build/deploy preview and update link comment | Record the built revision accurately, flag stale previews, deduplicate updates across long discussions, and explicitly handle Director review branches. |
| `.github/workflows/pr-preview-cleanup.yml` | Delete preview on PR closure | Coordinate with review/publication records and retention; prevent a closing review from losing evidence needed to validate publication. |
| `.github/workflows/deploy.yml` | Main deployment and arbitrary-ref manual checkpoint deployment | Make production reflect approved main revisions; retire the unmerged-branch Director checkpoint path and define a restricted recovery procedure. |
| `.github/CODEOWNERS` and live protections | Reviewer routing and merge/deploy authority | Inventory protected paths, teams, bypass actors, required checks and environments. Review ownership of `src/docConfig.js` and future approval records. CODEOWNERS alone does not enforce approvals. |
| `.github/pull_request_template.md` | Author instructions and technical-edit checkbox | Align content detection, lane-specific requirements, completion actions, and revision-round handoff instructions. |
| `.github/ai-review/technical-editor-prompt.md`, `qc/qc-prompt.md` | Formal editorial review versus optional QC | Keep roles distinct; record formal review scope/revision and completion evidence. Do not treat a local QC report as a formal approval. |
| `.claude/skills/new-doc`, `new-revision`, `pr`, `review-pr`, `technical-edit`, shared `git-conventions.md` | Local tools that create documents, branches and reviews | Align registry flags, branch/content routing, comment batching, approval semantics and new Director lifecycle. Inspect push/commit helpers for inherited conventions. |
| `docs/dev/documentation-guide/` | Lifecycle and role instructions, authoring/build guidance | Update chapters 00, 04, 09–15 and relevant build appendices together; review screenshots/tutorials for obsolete actions. |
| `docs/dev/github-workflows/` | Cross-project software SOP | Clarify general software policy versus this repository's documented exceptions; do not silently change policy in other projects. |
| `README.md`, `CLAUDE.md` | Entrypoint and agent-facing rules | Reference the same authoritative lane policy and production lifecycle. |
| `src/docConfig.js`, `src/draftDocs.js`, watermark/build consumers, version metadata | What readers can see and whether it is approved | Verify orthogonal active/draft flags, version behavior and approval provenance. Avoid unnecessary component changes. |
| Live PRs, labels, teams, rulesets, environments, Actions permissions | Actual deployed operation | Read-only inventory remains required before rollout. Local files do not establish current remote settings. |

All five repository Actions workflows have been inspected locally. Relevant local skills were inspected as workflow artifacts, not invoked to create documents or submit reviews. Product documentation describing software approval processes (for example levee-screening approval) is not this repository's contribution workflow and is outside this overhaul.

## Target lane matrix

Confirmed in category 01: retain all existing review requirements and their order. Only new documents require Director approval; execute that approval separately after draft deployment. The table's lane requirements are confirmed, while assignment, transition, publication and exception mechanics remain subject to subsequent category decisions.

| Change type | Content PR requirements | Production outcome | Director requirement |
| --- | --- | --- | --- |
| New document | Peer → Lead Civil → technical edit → eligible for draft merge | Main deploys active draft | Independent full-document review before first final publication |
| Major revision of an approved document | Peer → Lead Civil → technical edit → eligible for final merge | Previous version stays live during review; approved revision publishes after merge | No automatic Director requirement under existing policy |
| Minor revision of an approved document | Peer → technical edit → eligible for final merge | Previous version stays live during review; approved revision publishes after merge | No automatic Director requirement under existing policy |
| Editorial fix | Administrator action plus build and applicable integrity checks | Correct existing publication without changing approval status | No new Director requirement; cannot clear an outstanding first-publication requirement |
| Developer documentation | Administrator action plus build | Publish developer documentation | None |
| Site code/infrastructure | Build and administrator merge under repository policy | Deploy only when site-affecting | None, except actual protected publication changes invoke their separate gate |
| Mixed document/code PR | Specialized administrator handling; document review and applicable site checks | Preserve the selected document's lifecycle | Cannot bypass its pending Director requirement |
| Author PR with more than one document | Must be split; not eligible to advance or merge | No publication through this PR | No combined multi-document author review lane |
| Director review session | Assigned Director approval, current review content, successful preview | Review branch only | No author-response or thread-resolution gate |
| Publication PR | Linked completed Director review, explicit content scope, metadata, successful build, administrator merge | Removes draft watermark after deployment | Completion persists unless an administrator restarts the review |

Current local code embeds Director review only in Lane 1. Its references are nevertheless spread across automatic progression, checkbox handling, administrator override and its deprecated alias, reviewer-state rendering, final-merge instructions, deployment instructions, templates, and authoring conventions. Remove the coupling from all these surfaces. Do not remove legitimate standalone Director-review records or imply Lanes 2 and 3 currently require it.

Changes to an existing unapproved draft remain subject to its outstanding first-publication requirement regardless of their revision/editorial lane. An administrator may explicitly initiate a Director review for an eligible draft; lane inference must not manufacture or erase approval history.

## Shared architecture

Category 06 confirmed AI-assisted completion: any administrator may mark an AI-assisted technical edit complete without assigning a separate human editor; the completing administrator need not be the AI operator. They may also be the author or an earlier-stage reviewer under the confirmed administrator exception. Make this the normal authorized completion path and remove author-checkbox-only completion. AI findings do not themselves approve the stage. Assigned human editing remains a distinct approval path. This supersedes earlier passages deferring AI completion authority or requiring a separately assigned human editor.

Category 06 confirmed initiation: AI-assisted technical editing is manually initiated by an administrator. Do not run it automatically on stage entry or pushes. Initiation, production of findings and explicit administrator completion are separate steps. Existing manual tooling remains the starting point.

Category 06 confirmed scope: review the entire selected document for new documents; review changed sections with surrounding context for revisions. Administrators may request a full-document pass for a revision. Refine the current changed-file selection accordingly and record run scope. This does not introduce technical-edit requirements in the lightweight lanes.

Category 06 confirmed optional QC: keep QC tooling available to authors and administrators without a required stage, report or merge gate. QC output does not substitute for formal technical-edit completion. Preserve the distinction in tooling and instructions.

Category 05 confirmed handoffs, updated for the revised category 03 rule: the single authoritative reviewer's approval automatically completes the current review stage and activates/requests the next stage's selected reviewer. If assignment is missing, wait for administrator assignment. No additional author checkbox or administrator acknowledgement is required. Final content-review completion establishes administrator merge eligibility, not automatic merge or Director initiation. AI technical-edit completion authority remains a later decision.

Confirmed lane-correction behavior: only an administrator can reclassify a PR. Recompute its requirements, preserve completed stages, add newly required stages, and show the next action. The subsequent category 05 decision prohibits reopening completed stages because of changed content; only an explicit administrator restart does that.

Category 05 confirmed persistence: completed stages always remain complete unless an administrator explicitly re-fires the review. Pushes, content/asset changes, review dismissal, later comments and assignment events do not automatically erase completion. This includes Director review. Preserve reviewed revision history but do not impose a new-revision match as a condition for keeping completion. Partial approvals are inapplicable under the single authoritative reviewer policy. CI/build and actual publication integrity checks remain separate from review completion.

Category 02 working direction: every PR awaits administrator classification, including code/infrastructure and developer documentation. Changed-file inspection can suggest a classification but cannot assign it authoritatively; branch names have no routing effect. CI/previews run while classification is pending. References below to routing mean this administrator-confirmed policy, not the old automatic lane selection. Mixed document/application-code PRs are specialized administrator-handled cases; typical author PRs contain document content and supporting assets. Confirmed requirement: authors work on one document per PR, including its chapters and supporting assets. Multiple-document author PRs must be split; no administrator waiver of this rule has been approved. Scope validation identifies documents rather than counting files.

Separate three concepts in state and in the user interface: content-review completion, permission to merge a particular PR, and publication status of a document version. A merged content PR is complete even while its document awaits Director approval.

Keep a single machine-readable lane policy and one authority for the review eligibility status. Use a common evaluator for required assignments, review evidence, open discussions, revision validity and authorized actions. Event handlers re-evaluate current state; notification delivery consumes meaningful transitions independently. Show the current responsible person and next action in every active review.

Use the same review-round model for peer, Lead Civil, human technical editor and Director stages: assigned → reviewing → revisions needed → ready for re-review → approved. Comment events do not establish or revoke approval. AI-assisted technical editing supplies findings; its human completion authority remains a category 06 decision. Do not add automated checks for author replies or finding dispositions. Human-editor approval must have an implemented completion path.

Category 03 revised confirmed policy: exactly one authoritative reviewer per review stage, including Director review. Their approval alone satisfies the review. This replaces the earlier all-assigned policy. Additional GitHub requests or informal contributions cannot establish another authority; only an explicit administrator assignment/replacement can change it. Ambiguous existing multi-reviewer assignments require administrator selection during migration, without reopening completed stages.

Category 03 confirmed assignment authority: only administrators may assign, remove or replace formal reviewers. Author suggestions do not change the required-reviewer list. Validate request/removal actors before mutating authoritative assignments; unauthorized GitHub sidebar activity cannot satisfy or weaken the approval gate. Inspect actual GitHub permissions to distinguish preventing a UI action from rejecting its effect on workflow state.

Category 03 confirmed assignment identity: formal assignments are to named individuals. A team request cannot substitute for the administrator selecting actual reviewers.

Category 03 confirmed qualification authority: administrators determine who is qualified for each stage. Do not impose stage-specific team-membership eligibility checks, including for Director review. Enforce administrator authorization, necessary repository access, named assignments and agreed independence rules. Reconcile the Director guide's existing team-membership prerequisite with this policy; access arrangements must not be mistaken for qualification rules.

Category 03 independence, revised by the administrator exception: a non-administrator document author cannot satisfy a required review of their own document. Evaluate document authorship independently of PR creation identity, including bot-created review/publication PRs. Administrators may review their own documents. Verify how to represent explicit administrator completion when native GitHub self-approval is unavailable; do not assume the desired authority removes platform restrictions.

Category 03 stage separation, revised by the administrator exception: non-administrators must not act as authoritative reviewers in multiple stages of the same document review process, including the linked Director session. Administrators may fill multiple stages. Validate assignments and substitutions against completed history and administrator identity. This does not establish a lifetime restriction across future revisions.

Category 03 confirmed replacements: an administrator may replace an unavailable reviewer with a qualified individual satisfying independence and stage-separation rules. Require the replacement's own approval; preserve previous feedback and other valid approvals. The replacement considers earlier concerns; category 04 prohibits automated disposition or thread-resolution gates. Record replacement history and reconcile formal review decisions rather than transferring approval or silently dismissing a changes-requested review.

Category 03 confirmed assignment timing: administrators may select reviewers upfront or later. Keep planned assignments separate from native GitHub review requests; request review only when the assigned stage becomes active. Deduplicate activation requests and wait for administrator assignment if a stage has no reviewer. Director selection does not start the standalone review: explicit initiation after draft deployment is still required.

Category 03 confirmed merge/deployment authority: only administrators merge PRs and approve production deployments. Reviewer approval establishes eligibility and never automatically merges a PR or authorizes production publication. Verify actual branch/environment protections and credential capabilities during rollout; workflow preparation of publication PRs does not confer merge/deploy authority.

## Current findings

- `.github/workflows/stage-progression.yml` advances Lane 1 from technical editing to Director review, keeping the merge status pending. The current operating procedure deploys the unmerged branch to production.
- The same workflow posts additional comments for changes requested, dismissed reviews, and qualifying pushes. Push notifications mention reviewers who have already reviewed, even when the author has not finished revising.
- The review handler does not verify unresolved review threads before advancing a stage; category 04 confirms this should remain non-gating. Separately, dismissal does not automatically invalidate completed stages; some dismissal events are ignored once the PR reaches ready-to-merge.
- Labels described as administrator overrides do not themselves establish the actor's authorization. Authorization must be checked explicitly.
- `ci-build.yml` gives a successful review status to PRs that do not touch `docs/`, including a potential draft-flag-only change in `src/docConfig.js`.
- The reviewer guide prescribes batching and makes exact email-count claims. Those claims must be replaced with conditional guidance based on current GitHub behavior and recipient settings.
- Live repository protection settings and previous email delivery logs have not been inspected. These are code findings, not a complete audit of the deployed repository or the previous review.
- `.claude/skills/new-doc/SKILL.md` sets draft as the inverse of active, contrary to the registry's independent flags and the desired active draft state.
- `.claude/skills/new-revision/SKILL.md` directs edits to landing-page flags and describes a temporary post-merge watermark, while current guidance identifies `src/docConfig.js` as the registry and finalizes revisions before merge.
- `.claude/skills/pr/SKILL.md` selects the template by branch prefix and says non-docs prefixes skip review, but the workflow uses actual changed content.
- The technical-edit guide promises progression on human-editor approval; the current approval handler has no transition out of the technical-editor stage.
- Cross-project GitHub guidance requires an independent/owner approval while this repository's documentation describes administrator self-merges for certain lanes. Clarify scope and actual protections before resolving that policy discrepancy.
- The stage workflow advances on the first assigned approval. The new required/optional reviewer proposal changes that behavior and needs explicit policy treatment.
- Preview and no-docs CI comment discovery use a single comments page. Long review discussions can hide the existing marker and cause duplicate bot comments. Include pagination and identity checks in the shared notification implementation.

## Document lifecycle

Three-PR architecture retained after clarification: new-document work uses clearly titled/labeled Content, Director Review and Publication PRs, each naming the document and cross-linking related PRs. All Director comments, replies and corrections stay in the Director-review PR and its updating preview. Publication is an administrator delivery step, not another review round. Its description identifies approval versus waiver and the remaining administrator action. Routine revisions keep their single-PR process.

Category 11 confirmed Director-waiver handoff: an explicit administrator waiver automatically prepares the linked publication PR just as approval does. Display waived distinctly, preserve its audit record and optional reason, and do not populate document attribution. Repeated events reuse the publication PR. Administrator verification, merge and production approval remain required.

Category 08 confirmed manual attribution: retain existing reviewedBy/approvedBy roles, but administrators manually fill those lines in document version histories. Automation must not populate or rewrite them. Publication-PR preparation includes corrections and the selected draft-flag change; preserve administrator-authored attribution edits and allow them before merge. References to approval metadata elsewhere in this design mean workflow audit/linkage records or preserved manual entries, not automatically generated document attribution.

Category 08 confirmed draft visibility: retain existing navigation and search discoverability for active published drafts with the DRAFT watermark. Do not introduce direct-link-only visibility or change the independent active/draft flags for this purpose.

Category 08 confirmed major/minor revision behavior: keep the prior published version live and unwatermarked during preview review. Prepare the final revision flags before administrator merge/deployment so it becomes the latest published version without a watermark; retain access to older versions. No intermediate production-draft phase or Director review is added for revisions of approved documents. Correct the outdated local revision helper's contrary instructions.

Confirmed publication preparation: authoritative Director approval automatically creates the publication PR. At review initiation the administrator selects the document; persist its `doc_location`, version and review linkage. Use that identity to change exactly the matching `src/docConfig.js` entry from `draft: true` to `draft: false`, preserving `active: true`, alongside document corrections and approval metadata. Do not infer identity from branch names, titles or comments. The PR description and diff expose the target for administrator verification and correction before merge/deployment. If correcting identity reveals a different document, preserve the historical record and surface the discrepancy rather than silently transferring approval. Missing/ambiguous registry matches and version-target mismatches need administrator reconciliation, not guessed edits or automatic review resets. The production watermark changes only when the administrator-merged publication successfully deploys.

Category 07 confirmed initiation timing: a document may remain deployed as a draft indefinitely. An administrator explicitly selects Start Director Review to create the full-document review PR and request its selected authoritative reviewer. Deployment and advance assignment do not initiate review or contact the Director. Do not introduce an automatic initiation deadline.

1. The content PR completes its assigned peer, Lead Civil, and technical-edit requirements. For a new document, draft deployment eligibility also requires `active: true` and `draft: true` for the selected document.
2. The administrator merges to main and approves the existing production deployment. Director approval is not required for this draft merge.
3. An administrator starts Director review by selecting the document, version, and assigned Director. The workflow verifies a successful production deployment containing the selected draft and records its revision. Existing deployed drafts can enter here; record available prior-review evidence and any explicit administrator attestation rather than inventing historical approvals.
4. Automation creates a dedicated review baseline and review branch. The baseline omits only the selected document's source files; the review branch restores those files from the deployed revision. Their diff exposes the complete document for inline review. The baseline is immutable for that review session and is never deployed.
5. Director review uses this dedicated PR and its rendered preview URL from the beginning. Build the initial preview from the selected deployed draft and verify availability before requesting the Director. The author applies suggestions and corrections in the review PR; those changes update the same preview URL. The review branch retains a complete buildable site. Identify the preview revision accurately. The live site remains the previously deployed draft unless an administrator publishes an updated draft or the final document. Do not ask the Director to switch between production and preview during review.
6. When the authoritative Director reviewer approves, automation prepares a linked publication PR against main. No author reply or thread-resolution prerequisite applies. It includes the document corrections and draft removal, preserving any manually authored attribution. Administrators fill reviewedBy/approvedBy in the document themselves; automation records review linkage separately. The Director-review PR is an audit record, not a production merge vehicle.
7. The publication gate verifies the completion record, any explicit administrator restart, content scope and integration with current main before permitting an administrator to merge. Content differences require accurate reporting and safe integration, not automatic re-review. Deployment remains administrator-approved. Mark the review published only after a successful matching production deployment; a failed deployment leaves it awaiting publication.

One review session covers one document version. A retry reuses that session and its PRs. A second active session for the same document/version is rejected. Cancellation closes the session without clearing the production draft flag.

## Review surface and synchronization

Category 07 confirmed Director reading surface: one stable rendered review-preview URL for the entire review, initially containing the deployed draft and subsequently its corrections. The review PR prominently links that preview; the live URL is the eventual publication destination. Replace the existing Director guide's instruction to review production and avoid previews. Draft production deployment remains a prerequisite to starting the independent review, not the Director's reading surface.

Category 04 confirmed experience: peer, Lead Civil and human technical-editor reviewers read the rendered PR preview and leave inline feedback/suggested edits on GitHub's ordinary source diff. Retain this existing experience; synthetic full-document review branches are specific to the separate Director process. Reply/thread conventions remain guidance and cannot add prerequisites to approval.

GitHub comments and suggested replacements are attached to MDX source. This does not provide text selection and annotation on the rendered production webpage. Document this clearly in the Director instructions.

Record source files and referenced local assets in a manifest with content hashes. Validate asset paths; report dependencies that cannot be confidently mapped for administrator review. Shared rendering changes require build verification and an explicit assessment of whether the review view has changed.

Publication copies only the selected document scope and allowed approval metadata, not the review baseline or unrelated site files. If that scope has changed on main since the captured baseline, reconcile it without overwriting intervening work and show the administrator what differs. Do not automatically reopen Director or earlier completed stages: only an explicit administrator restart requires another review. Keep reviewed and published revisions separately identifiable; do not imply later edits were included in the historical approval.

Large documents may encounter GitHub diff display limits. Include representative multi-chapter documents in local scope/diff checks and handle reported truncation or unavailable content in the review workflow; do not claim local checks establish live GitHub rendering. No pilot is planned. The selected document must be accessible for review before the Director is requested.

## Enforced workflow policy

Category 11 confirmed waiver: administrators may explicitly waive a required review stage. Always record who acted, which stage was waived and the timestamp; the reason is optional. Display waived separately from approved and preserve review history. Waiver satisfies the stage without fabricating an approval. It does not bypass build validation, main-only production or administrator deployment approval, and does not populate document attribution. A recorded administrator waiver can satisfy the Director requirement without claiming approval and automatically prepares the publication PR.

- Use trusted review state and current GitHub evidence as the authority. Stage labels and a visible status summary are projections, not permissions to merge.
- Check administrator authorization for starting/cancelling a session, changing assignments, choosing lanes, and requesting overrides. Check the assigned reviewer's eligibility; prevent self-approval from satisfying an independent review.
- Require the single authoritative reviewer's approval for an active stage. An arbitrary approval or additional review request cannot replace that individual. Informal contributors can provide feedback without satisfying or adding a required review.
- Category 04 confirmed: the authoritative reviewer's approval stands without an automated author-response or thread-resolution gate. Do not require reply wording, acknowledgements, per-comment dispositions, severity classifications or resolved threads before accepting approval. Agreed identity/authority requirements still apply. Formal changes-requested decisions within active rounds are separate category 05 matters.
- Evaluate events for active review rounds while preserving durable completion records. Only an explicit authorized administrator restart makes a completed stage pending again. Thread comments, resolution/reopening, pushes and dismissal events cannot independently revoke completed stages. Reconcile live protections with this rule.
- Category 05 confirmed notification behavior: the author may use Ready for re-review after a batch of corrections to issue one deduplicated request within an active stage. Routine pushes do not repeatedly ping reviewers. This signal is optional and never required for an assigned reviewer's approval to count; it cannot change assignments or restart a completed stage. Only administrators can restart completed reviews.
- Technical-edit completion authority is deferred to category 06. Human-editor approval is not conditional on author replies or resolved findings. Build validation remains a separate requirement.
- Detect protected draft removal by actual document/configuration changes regardless of branch name or label. Preserve the documented no-Director behavior for ordinary major/minor revisions of already approved documents. Define and record first-publication approval requirements so a lane change cannot evade them.
- Missing evidence, API failures, malformed state, and incomplete pagination keep eligibility blocked. Surface the reason in the check summary.
- Serialize updates per PR/session, re-fetch authoritative state, and deduplicate repeated deliveries. Ensure delayed events cannot restore an outdated success status.
- Required checks and repository protections must cover actual publication merges and prevent direct production bypass under normal contributor permissions. Repository owners capable of changing protections remain a governance boundary.

## Notification policy: confirmed native GitHub mode

Category 10 confirmed: minimize email notifications using GitHub's existing mechanisms only. No separate notification infrastructure, email transport or digest service is in scope. Audit every bot comment/mention/request and prefer native handoffs and status/check summaries to duplicate messages. Do not promise control over GitHub's emails caused by user activity.

Category 10 confirmed administrator recipients: notify the whole administrator team for actionable administrator handoffs. Do not designate a single per-PR administrator recipient. Team targeting is intentional; deduplicate by meaningful transition and avoid repeated team mentions on routine activity. This supersedes any earlier blanket recommendation to avoid team mentions or notify only one administrator.

Category 10 confirmed reminder policy: omit automatic inactivity reminders and overdue-review nudges. Keep status visible and allow manual administrator follow-up and the agreed optional author-initiated re-review request. Do not add age-based notification schedules.

Category 10 confirmed failures: ordinary build/preview failures use failed checks and updated preview status with no additional administrator-team mention. Review/publication automation failures requiring intervention get one actionable administrator-team notice, deduplicated across retries of the same failure. Native GitHub workflow email settings remain outside this bot-action policy.

Category 10 confirmed status presentation: one persistent summary on each review PR shows classification, current stage, authoritative reviewer, completed stages, next action and preview link/revision. Update in place and skip unchanged writes rather than posting routine progress comments. Consolidate current fragmented status presentation, paginate marker discovery and verify bot identity. Preserve authoritative state/audit separately from the editable summary; no guarantee is made that summary edits are email-free.

This policy controls automation actions, not the number of emails GitHub delivers.

| Event | Automation behavior |
| --- | --- |
| A reviewer becomes responsible for a stage | Request the named reviewer once; do not add a duplicate mention comment. |
| A user posts a comment, reply, or thread resolution | No change to approval eligibility based on discussion state; no acknowledgement comment or additional mention. |
| Author pushes revisions | Update check/status summary; do not ping reviewers on each push. |
| Author signals Ready for re-review for the current revision | Request re-review once for that round; repeated commands for the same revision are no-ops. |
| Reviewer submits feedback | Rely on GitHub's native review notification; do not repeat it in a bot comment. |
| Review becomes ready for administrator action | Produce one actionable handoff, deduplicated by session and transition. |
| Build or preview fails | Show failed checks and update preview status; no additional administrator-team mention. |
| Review/publication automation fails and requires intervention | Show failed status and one actionable administrator-team notice, deduplicated across retries. |
| State remains unchanged | No new comments or mentions; no recurring reminders in the first release. |

Use check summaries and one persistent, unmentioned PR summary for routine status. Do not promise edits to that summary are universally notification-free. Use administrator-team mentions only for actionable administrator handoffs, and avoid duplicate notices across linked PRs. Named reviewer requests and team targeting do not prevent existing PR subscribers from receiving GitHub email about that activity.

Batching remains recommended but is not a correctness requirement. Do not add a bot warning to every individually submitted comment: that cannot retract the original notification and adds more activity. Correct the reviewer guide's absolute statements that every reply reaches everyone or that every batch guarantees exactly one email.

## Boundary: guaranteed email frequency

GitHub controls its own notifications and each user's subscriptions/delivery preferences. A repository Action runs after the triggering activity; it cannot intercept an individual comment and force it into a pending review or retract the associated email. Removing a review request does not ensure that the person is unsubscribed.

If a fixed cadence is mandatory, add a separately managed notification service with an explicit recipient directory, delivery deduplication, retries, and delivery logs. Native GitHub mail must also be suppressed or routed through user settings or organizational mail rules. This requires account/mail-system coordination; a digest bot alone would merely add messages. Exact receipt/read guarantees remain outside workflow enforcement.

User decision resolves this choice: use native GitHub notifications with reduced bot noise. The managed-channel alternative described above is outside the approved scope. Do not deploy separate digests or send test messages to participants without explicit authorization.

## Implementation boundaries

Category 09 confirmed automatic validation: run PR builds and preview updates automatically on opening/updating applicable PRs, including while administrator classification or review is pending. Retain site-affecting path handling and integrate standalone Director previews. These runs do not reopen completed reviews, initiate later-stage review requests or authorize production deployment.

Category 09 confirmed build enforcement: a failed build blocks merging. Require a successful CI build for the current PR revision independently of completed review stages. Passing CI after a fix restores build eligibility without repeating completed reviews. Verify the live required check during rollout.

Category 09 confirmed stale previews: retain the last successful preview if an update fails. Clearly mark the preview link/status in the PR as stale and identify the displayed revision. Preserve completed reviews and avoid repeated bot warning comments. Existing behavior is the starting point; no in-page warning is implied without implementing one.

Category 09 confirmed production source: restrict all production deployments and manual redeploys to main. Remove the arbitrary-ref input and unmerged-branch Director checkpoint, and enforce main-only deployment in workflow/environment configuration, including the manual workflow branch selector. Administrators' role flexibility does not waive this explicit source restriction. Recovery must respect main-only deployment.

Category 09 confirmed production preparation: qualifying site-affecting merges to main automatically build the production artifact. Retain administrator approval before publication; do not require another manual action to start normal production builds. Track prepared versus successfully deployed state separately.

Category 09 confirmed preview retention: ordinary content previews are removed on PR closure. Keep the standalone Director preview until its linked final publication successfully deploys or an administrator explicitly cancels the review; then clean up the preview while preserving GitHub comments and review history. Approval, publication-PR creation/merge or review-PR closure alone do not trigger Director-preview deletion. Failed final deployment leaves that preview available.

- Extract review policy and event handling from the embedded stage workflow into small testable scripts, separating eligibility evaluation from notifications.
- Add on-demand Director-session creation, review-session reconciliation, and publication preparation. Reuse deployment and preview infrastructure while explicitly excluding synthetic baselines from production and ordinary lane initialization.
- Use trusted workflow code for privileged writes. Do not execute review-branch code with privileged tokens. Verify token permissions, workflow-created PR event behavior, and branch protections before choosing the authenticated automation mechanism.
- Prevent the existing non-documentation CI status writer from overriding publication requirements. Plan a single authority for each required gate.
- Update workflow overview, lanes, author/reviewer/Director/admin instructions, PR template, and repository contributor guidance consistently.
- Migrate active PRs from current state and authentic review evidence; do not reset completed work or re-notify all participants on rollout. Provide an administrator-visible report of sessions needing reconciliation.

## Coordinated implementation roadmap

This is the architecture-level sequence. Detailed implementation tasks follow the consolidated policy decision; do not build the Director mechanism first and patch the other lanes afterward.

| Phase | Deliverable and affected surfaces | Exit evidence |
| --- | --- | --- |
| 1. Establish policy and deployed baseline | Complete remote read-only inventory; reconcile general SOP scope, required/optional reviewer policy, editorial completion authority, native versus managed notifications, and active PR inventory. Record actual current protection settings before changing them. | Current/target lane matrix, permissions matrix, event/notification matrix, and per-PR migration report with evidence gaps. |
| 2. Build the common review evaluator | Extract routing and transitions from `stage-progression.yml`; consolidate eligibility with `ci-build.yml`; implement authorized commands, durable completion and administrator-initiated review rounds without discussion-state gates. Include AI/human editor paths. | Tests for every lane and mixed PR, every supported event and rejected transition, and failure cases. Shadow evaluation reports differences without changing labels, gates, or notifications. |
| 3. Integrate document lifecycle and Director sessions | Implement draft merge eligibility, standalone review baseline/branch creation, reviewed-content manifest, publication preparation and gate. Adapt preview, cleanup and production deployment. Remove all old in-PR Director transition paths as a coordinated switch. | End-to-end draft → review → revisions → publication tests; no config-only or lane-label bypass; synthetic branches cannot reach production. |
| 4. Apply shared notification and authoring behavior | Route all workflow messages through transition-aware deduplication; update local authoring/review helpers, template and completion controls. Audit all comment/status writers. | Event-burst tests produce the prescribed bot actions; repeat deliveries and long comment histories do not duplicate handoffs. All helper-generated PRs match content-based routing and registry behavior. |
| 5. Reconcile and verify documentation | Update all affected role guides, overview tables, general-SOP scope notes, README, CLAUDE guidance, tutorials and screenshots. Retire obsolete aliases and checkpoint instructions with migration guidance. | No contradictory active instructions; site build succeeds; representative user walkthroughs match controls and visible states. Historical descriptions are clearly marked, not mechanically deleted. |
| 6. Validate and cut over | Complete automated/local checks, reconcile relevant live protection settings read-only, and activate the new workflow/protections coherently. No open-PR migration or controlled GitHub pilot. | Relevant automated/local checks pass; configuration requirements are documented and applied during authorized activation; no competing review-status writers. Report unverified live behavior explicitly. |

Phases 2–5 are implemented in reviewable increments but production activation is coordinated. Do not leave the old and new status writers competing or remove the existing gate before its replacement is active. GitHub branch protections/environment settings are separate rollout work, not an assumed consequence of committing YAML.

## Migration and recovery

Category 12 confirmed clean rollout: no PRs are open according to the user. The historical migration table below is not executable rollout policy. Replace old automation and guidance coherently, with one review-status authority and no temporary legacy production path. If an actual pre-activation PR appears later, report the concrete situation instead of silently migrating it; no additional compatibility design is needed now.

Category 11 confirmed cancellation: an administrator may cancel the Director session, close its review PR and any still-open publication PR, and remove its preview while preserving discussion/audit history and leaving production unchanged. Record cancellation so delayed events cannot recreate publication or reviewer requests. Do not treat cancellation as reversal of an already merged publication; reconcile any queued deployment explicitly without automatic rollback.

Category 11 confirmed production failure recovery: retain completed reviews and the Director preview; leave publication pending until successful deployment. Administrators fix issues through main where necessary and retry with production approval. Do not automatically roll back content, restart reviews or deploy another branch. Preserve the last working site where supported and verify actual production state after ambiguous deployment failures rather than assuming no partial change occurred.

Inventory open PRs with lane, stage, affected documents, head revision, assigned/required reviewers, review IDs and decisions, unresolved threads, and latest successful preview/deployment. Record the policy version applied to each.

| Existing state | Migration treatment |
| --- | --- |
| Peer/Lead Civil/technical edit in progress | Preserve authentic completed stages and current responsibility; report missing evidence for administrator reconciliation. Do not restart or mass-request reviews. |
| New-document PR awaiting Director | Validate completed content stages and draft flags, make the original PR eligible for draft merge, then start the standalone session only after successful draft deployment. |
| Original PR already merged as draft | Start a standalone review from verified deployed content; link available source PR/evidence. |
| Old Director review contains comments or approval | Preserve the original record and cross-link it. Distinguish historical reviewed content from later changes without automatically reopening a completed stage. Only an administrator can initiate a fresh round. |
| PR manually marked ready-to-merge | Recompute from evidence, rather than treating the old label as proof. |
| Published document with incomplete historic metadata | Record legacy provenance separately; do not suddenly watermark or unpublish existing documents, or retroactively invent Director approval. |

Migration is idempotent and produces a report before mutations. Deprecated commands must not route content PRs back into Director review. Cancellation, unavailable reviewers, rejected publications, changes on main, failed previews, failed production deploys and partial automation failures have explicit recovery states with one responsible administrator.

For rollback, preserve review records, publication manifests and old protection snapshots. Stop new session creation first. Never restore a weaker gate that permits unapproved draft removal; hold affected publication merges while reconciling instead. Do not roll back approved content or merge synthetic review baselines into main as a recovery shortcut.

## Acceptance evidence before rollout

The acceptance suite covers all five existing lanes, non-documentation and mixed PRs, plus standalone Director and publication PRs. For each applicable stage test assignment, comments, changes requested, fixes, explicit re-review handoff, approval, dismissal, reopen, unauthorized commands and subsequent pushes. Include human and AI editorial completion separately.

Automated tests must cover authorized and unauthorized transitions; persistence of completed stages after dismissal, later feedback and content pushes; administrator restart of only selected stages; approval accepted despite unanswered, unresolved or reopened threads; accurate reporting and safe integration of differences between reviewed/published content; unrelated main changes; missing deployment; duplicate and out-of-order events; partially failed session creation; config-only publication bypass; lane manipulation; and synthetic review branches attempting production publication. Inspect live conversation-resolution and stale-approval protections and reconcile them with categories 04–05 rather than claiming YAML alone implements this policy.

Notification tests must demonstrate zero additional bot comments for repeated individual replies and routine pushes, one review request per explicit handoff/revision round, and no duplicate handoff notices on retries. These measure automation output, not inbox delivery counts.

Category 12 confirmed: no controlled GitHub pilot. Validate review, waiver, corrections, restart, publication preparation and deployment-failure handling with automated/local tests. Inspect relevant live protection settings before activation without creating pilot PRs or sending test-reviewer requests. Report validation limits accurately: local tests do not establish actual notification delivery or live GitHub end-to-end behavior.

## Sources checked

- [GitHub notification settings](https://docs.github.com/en/subscriptions-and-notifications/get-started/configuring-notifications)
- [GitHub notification subscriptions](https://docs.github.com/en/subscriptions-and-notifications/concepts/about-notifications)
- [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub inline review guide](https://docs.github.com/en/pull-requests/get-started/reviewing-pull-requests-quickstart)
- [Comments on unchanged lines within changed files](https://github.blog/changelog/2025-09-25-pull-request-files-changed-public-preview-now-supports-commenting-on-unchanged-lines/)
