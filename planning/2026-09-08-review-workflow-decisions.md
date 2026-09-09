# Review workflow requirements and gap analysis

Status: category-by-category requirements discussion. No implementation changes authorized by an unanswered question or a proposed default.

Latest controlling revision: exactly one authoritative reviewer per review stage. This supersedes the earlier all-assigned/multiple-reviewer policy and all dependent historical references below. An administrator names that individual; their approval alone completes the review. The partial-approval question is withdrawn as inapplicable. Historical answers remain for traceability, not as competing current requirements.

Administrator exception: the user subsequently specified that any administrator can act in any capacity at any time. Earlier author-independence and different-people-per-stage restrictions therefore apply to non-administrators, not administrators. Administrators may author, review multiple stages, complete AI editing, merge and approve production. This does not automatically complete stages, create a second authoritative reviewer or grant authority to non-administrators.

## Discussion method

Ask about one category at a time. Record the user's desired behavior before deciding the implementation. Compare each answer with both current repository evidence and the proposed overhaul design. Report what stays, what changes, and effects on other categories. Ask focused follow-ups where needed, then continue to the next category. Do not treat the existing design's proposed defaults as accepted requirements.

This decision record governs revisions to `2026-09-08-review-workflow-overhaul-design.md`. Current behavior means observed local code or explicitly identified documentation; live GitHub settings remain unverified until inspected.

## Confirmed direction from the conversation

- This effort encompasses the full review system and supporting infrastructure.
- A document must be able to complete its content PR and deploy from main as a draft before Director review.
- Director review must be independently initiable for an already deployed draft.
- The user accepted trying a full-document Director review PR with inline comments and suggestions, followed by a linked publication PR.
- Reduce notification noise and enforce workflow requirements without depending on perfect user behavior.
- Elicit desired behavior by category and compare it against current and planned behavior before finalizing the overhaul.

## Category inventory

| ID | Category | Decisions to cover | Status |
| --- | --- | --- | --- |
| 01 | Change types and required reviews | New/major/minor/editorial/dev/code; stages and order; when Director approval is required | Confirmed |
| 02 | Starting and classifying work | Authoring helpers, branch conventions, templates, lane detection/correction, mixed and multiple-document PRs | Core behavior settled; implementation details follow these decisions |
| 03 | Roles, assignments and authority | Who assigns/reviews/merges, teams versus individuals, required versus optional reviewers, self-review and substitutions | Confirmed |
| 04 | Review experience and feedback | Source versus rendered view, inline suggestions, comment severity, dispositions, resolving/reopening discussions | Core behavior confirmed; feedback conventions remain guidance, not gates |
| 05 | Progression and revision rounds | Completion controls, handoffs, changes requested, re-review readiness, changed content and stale/dismissed approvals | Core behavior confirmed; rare overlapping restarts left to administrator judgment |
| 06 | Technical editing and QC | AI versus human paths, trigger and scope, prompt version, completion authority, relation to optional QC | Core behavior confirmed; tooling details follow these decisions |
| 07 | Standalone Director review | Initiation, review baseline, corrections, approvals, cancellation and linkage to publication | Core behavior confirmed; exceptional cancellation/recovery deferred to category 11 |
| 08 | Drafts, versions and publication | Active/draft flags, first publication, revised versions, approval metadata and exact approved content | Core behavior confirmed; document attribution remains manual |
| 09 | Builds, previews, merge and deployment | Required checks, freshness, production approval, cleanup/retention, merge conflicts and deployment failures | Core behavior confirmed; recovery details deferred to category 11 |
| 10 | Notifications and status visibility | Recipients, meaningful events, cadence, reminders/escalation, native-email limits and user-facing status | Confirmed |
| 11 | Exceptions, recovery and audit | Authorized overrides, emergency changes, missing evidence, concurrent edits, retry behavior and history | Core behavior confirmed |
| 12 | Migration, guidance and rollout | Existing PRs/approvals, legacy labels, helpers/guides/tutorials, validation, cutover and rollback | Confirmed: clean cutover, no GitHub pilot |

## Category 01: Change types and required reviews

### Current baseline

Local `stage-progression.yml` and documentation chapters 09–10 define:

| Change | Current review chain |
| --- | --- |
| New document | Peer → Lead Civil → technical edit → Director |
| Major revision | Peer → Lead Civil → technical edit |
| Minor revision | Peer → technical edit |
| Editorial fix | No formal review stages; administrator merge |
| Developer documentation | No formal review stages; administrator merge |
| Site code/infrastructure without documentation | No documentation review stages; CI and administrator merge according to repository guidance |

The exact live merge protections are not yet verified. General cross-project software guidance describes independent/owner approval; its applicability to this repository must be resolved explicitly.

### Existing proposal, not a settled policy

Preserve the existing content-review chains, move Director approval out of the new-document content PR, and require it separately before first final publication. Major/minor revisions of an already approved document would not automatically require another Director review. Other policy choices remain open.

### Question

For each change type, which reviews should be required and in what order? In particular, should separate Director approval apply only to new documents, or also to major revisions, minor revisions, or administrator-selected cases?

### Confirmed desired behavior

User decision: "These should remain the same, only a new document requires a director review, but the process for executing the director review will change as we've been discussing. All others are ok."

- New document: peer → Lead Civil → technical edit in the content PR; separate Director approval before final publication, after draft merge/deployment.
- Major revision: peer → Lead Civil → technical edit; no Director requirement.
- Minor revision: peer → technical edit; no Director requirement.
- Editorial fix and developer documentation: no formal review stages; administrator handles merge.
- Site code/infrastructure without documentation: CI and administrator merge; no documentation review stages.

### Gap analysis

Current local review chains match the decision except for Director review being embedded in the new-document content PR. Remove that dependency from the automatic and manual technical-edit completion paths, stage displays/state, original-PR approval handling, and associated instructions. Introduce the already-discussed independent Director process and linked publication gate.

The proposed design's lane matrix matches this decision. Do not add Director review requirements to major/minor revisions or add formal review stages to editorial/dev/code changes. The general software SOP's independent/owner-review wording must be clearly scoped so it does not override the confirmed repository behavior.

Primary affected surfaces: `stage-progression.yml`, PR template, documentation-guide chapters 09–15, README, CLAUDE guidance, local authoring/PR conventions, and the proposed Director/publication workflows. CI and production integration remain subjects of later categories.

### Acceptance examples and remaining boundaries

- A new document completes technical editing and can merge/deploy as draft while Director approval is outstanding.
- That new document cannot complete final publication without its separate Director approval.
- Major/minor revision PRs finish their existing content-review chains without being assigned a Director stage.
- Editorial/dev/code changes do not acquire additional formal review stages.
- Assignment counts, completion evidence, mixed-PR classification, and how changes to an unapproved draft preserve its outstanding first-publication requirement are covered in later categories; this decision does not settle those mechanics.

## Category 02: Starting and classifying work

### Current baseline

The local stage workflow first inspects changed files. With no `docs/` changes, it assigns no documentation lane. If all changed documentation is under `docs/dev/`, it automatically selects the developer-documentation lane. Otherwise, it infers the lane from `docs/new/`, `docs/major/`, `docs/minor/`, `docs/fix/`, or `docs/dev/` branch prefixes. Unknown prefixes cause a needs-lane state for manual assignment. Existing lane labels take precedence in some paths.

The local PR helper still chooses its template by branch prefix, which can disagree with the workflow's content-based routing. Mixed changes, multiple documents, and lane changes mid-review require explicit policy beyond the current single-lane model.

### First question

How should the review lane be selected when a PR is opened: retain automatic selection from changed files and branch names with administrator correction, have the author explicitly select a lane that automation validates, or require administrator selection?

### Remaining questions within this category

After the classification decision, settle branch naming, authoring/template controls, mixed and multiple-document PRs, and how lane corrections affect reviews already completed. Ask focused questions rather than assuming these follow from the initial choice.

### Classification direction from discussion

The user supports administrator classification, expressed reservations about automatic code/dev routing, and explicitly said always requiring administrator assignment would also be acceptable. The working direction selected in discussion is therefore administrator confirmation for every PR, including code/infrastructure and developer documentation. Automation may suggest a classification; it does not assign an authoritative lane. Branch names do not route reviews. Builds/previews can run while classification is pending; formal progression and merge eligibility wait for administrator classification. Code/dev/editorial classifications retain their confirmed lightweight review requirements.

### Mixed document and code changes

User clarification: "Typical authors shouldn't be mixing MDX document edits with other repo code changes, so this would be a specialized edge case."

Treat mixed document-and-code changes as an administrator-handled exception, not the normal authoring flow. Proposed handling: identify the mixture for administrator attention without guessing a weaker lane. Normal document authoring includes supporting figures, references and other document assets; implementation must distinguish those from unrelated application code. Exact exception permissions and safeguards belong to category 11.

### Changes required versus current and planned behavior

- Remove automatic authoritative lane assignment based on both branch prefixes and docs/dev content. Require an authorized administrator classification for all PRs.
- Remove automatic no-docs review-gate success before classification from `ci-build.yml`; classification as code/infrastructure restores the existing lightweight merge path after CI passes.
- Align PR templates and authoring helpers with descriptive branch names and a pending-classification state.
- Replace the proposed automatic routing assumptions with advisory suggestions only.
- Flag mixed source-document/application-code changes for administrator assessment. Avoid building a general multi-lane workflow solely for this edge case.
- Do not introduce broader author permission restrictions or reject necessary document assets on the basis of this clarification alone.

### Next question

Should the normal authoring unit be one document per PR (which may include multiple chapters and supporting assets), with multiple unrelated documents handled as an administrator exception? Multiple-document policy is distinct from the confirmed clarification about mixing MDX and application code.

### Confirmed document scope

User decision: "Authors should not work on more than one document in a single PR."

One document per author PR is required. Multiple chapters and supporting assets of that document are within scope. Do not interpret this as permission for administrator waivers of multiple-document author PRs; no such waiver was authorized. The separate mixed document/application-code edge case does not waive this rule.

Gap: current routing detects docs versus dev content but does not count distinct documents. Add document-identity validation based on the registry and document roots (including newly introduced documents), rather than counting MDX files. A detected multiple-document author PR must be split before review progression or merging. Ambiguous/shared-file ownership needs explicit assessment rather than a guessed pass. Update authoring helpers, PR guidance, and validation messages to explain the one-document boundary.

Design impact: remove proposed composable multi-document lanes for author PRs. Review status, assignment and approval evidence can be scoped to one document in that flow. The handling of specialized administrator maintenance PRs remains separate and undecided.

Acceptance examples: chapters and figures of one manual pass document-scope validation; edits to two different manuals in one author PR fail it; a mixed document/code exception still cannot contain a second document.

### Next discussion: lane corrections after review starts

Proposed behavior: only administrators can correct classification; re-evaluate requirements under the corrected lane, preserve completed reviews that remain applicable to unchanged content, and require newly needed reviews. No blanket reset and no automatic waiver of publication approval. Ask whether this matches the user's desired behavior before treating it as settled.

### Confirmed lane corrections

User response: "Yes, that's how lane corrections should work."

Only administrators can change a lane. Recompute the required review chain, preserve completed reviews that remain applicable, require any newly necessary reviews, and display the resulting next action. A lane correction does not automatically restart the review process. Retention of an approval remains subject to its content/revision validity; approval invalidation rules will be discussed in category 05.

Gap: the current lane-label handler initializes a lane only when there is no stage or the PR needs a lane. It does not implement evidence-preserving correction during an active review. Implement authorized reclassification and reconciliation of stage requirements, evidence, outstanding assignments and merge eligibility. Keep labels synchronized with authoritative state. Do not re-notify reviewers whose retained approvals still satisfy the corrected requirements.

Acceptance example: correcting minor revision to major revision preserves applicable peer approval and adds the missing Lead Civil review. Removing a requirement does not invent approval or remove a separately applicable publication gate.

## Category 03: Roles, assignments and authority

### Current baseline

The local stage workflow records individually assigned reviewers. At each active stage, the first approval from an assigned reviewer advances it; approval from an unassigned reviewer does not count. A team request alone does not supply the individual assignment required by the gate. Administrator assignment is the documented operating procedure, but the revised workflow must explicitly validate authority.

### First question: how many approvals count

When several people are assigned to a review stage, should all assigned required reviewers approve, or should one approval suffice? Recommended proposal: one named required reviewer by default; if an administrator adds more required reviewers, all must approve. Optional contributors can comment without holding up the stage. This is a proposal until answered and changes current first-assigned-approval behavior.

### Remaining role decisions

Confirm assignment authority and individual/team behavior, eligibility and self-review restrictions, optional reviewers, substitutions/unavailable reviewers, and responsibility for merging and deployment. Avoid treating the approval-count answer as resolving all these questions.

### Earlier approval-count decision — superseded by single authoritative reviewer

User response: "If multiple reviewers are assigned, all much approve, I think."

All reviewers assigned to a stage must approve before it completes. A single assigned reviewer therefore supplies the single required approval; with multiple assigned reviewers, one approval is insufficient. This applies to review stages with human reviewer assignments, not a new requirement to assign formal reviewers to the lightweight lanes.

Gap: replace the current first-assigned-approval transition with evaluation of valid approvals from every assigned reviewer. Show outstanding reviewers and retain the pending gate until all required approvals and other stage conditions are satisfied. Test partial approval, all approvals, and changes to assignment/approval evidence. The prior design's all-required proposal now matches the confirmed approval-count requirement.

Do not treat an assigned reviewer as optional without a separately agreed policy. Informal comments from unassigned contributors do not satisfy an assigned review. Assignment/removal authority and approval validity remain separate decisions.

### Next question: assignment authority

Recommended proposal: administrators alone make or change formal reviewer assignments; authors can suggest names. This allows the required-reviewer list to determine the gate without authors removing an outstanding reviewer to bypass approval. Ask whether authors should also be able to make formal assignments.

### Confirmed assignment authority

User response: "Admin-only".

Only administrators may make, remove, or replace formal reviewer assignments. Authors may suggest names, but cannot change the authoritative reviewer list. All assigned reviewers remain required under the prior decision.

Gap: the existing event handler records review requests/removals without explicitly verifying administrator authority. Validate the actor before changing authoritative assignments; unauthorized sidebar actions must not change merge eligibility. Reconcile the visible assignment list and show the reason without repetitive notification comments. Inspect live repository permissions when implementing, because workflow enforcement cannot by itself remove GitHub UI capabilities granted by repository access.

Acceptance examples: an administrator adds a reviewer and the stage now requires that approval; an author requests or removes a reviewer and the required-reviewer list does not change. Administrator replacement/removal and retained approval evidence must be auditable.

### Next question: individual versus team assignments

Recommended proposal: formally assign named individuals, not a team as the required reviewer. Teams can define eligibility, but an administrator selects the actual people; all selected people must approve. This preserves a definite approval set instead of depending on team membership changes. Ask whether this fits the desired workflow.

### Confirmed individual assignments

User response: "Yes".

Formal reviewer assignments must identify named individuals. An administrator selects each person, and all selected reviewers must approve. A team review request does not substitute for those assignments. Teams may define eligibility; the particular eligibility rules are not yet decided.

Current behavior already requires individual assignments for approvals to count, so retain that rule. Integrate it with the newly required administrator authorization and all-assigned approval checks. Replace repeated/team-wide guidance mentions with clear assignment validation and status information under the notification policy.

### Next question: reviewer independence

Recommended proposal for formal review stages: the document author cannot satisfy a required review of their own work. This does not change the already-confirmed administrator self-merge behavior of editorial fixes, developer documentation, or code/infrastructure PRs. Ask whether to require this independence; eligibility for each stage and whether one reviewer can cover multiple stages remain separate questions.

### Confirmed reviewer independence

User response: "Yes".

A document's author cannot satisfy a required review of their own document. Preserve administrator self-merges for the confirmed lightweight lanes, which do not require formal document reviews.

Gap: the local approval handler checks assignment but does not independently establish document authorship. Enforce independence against recorded document authors, not just the PR creator: a bot-created Director or publication PR must not allow the document author to supply independent approval. Validate authorship/assignment information and report conflicts before requesting review. How authorship is recorded and validated is an implementation detail still to be specified.

Acceptance example: creating a review PR through automation does not make its document author eligible to approve their own document. An administrator's permitted self-merge in a lightweight lane remains unaffected.

### Next question: the same individual across stages

Should one eligible individual be allowed to serve in more than one review stage for the same document, such as peer reviewer and Lead Civil? Proposed default: allow administrator assignment across stages when appropriate, but require a separate approval at each stage; an earlier approval cannot automatically satisfy a later stage. This decision is distinct from author/reviewer independence and stage eligibility.

### Confirmed separation between stages

User decision: "Different people for each stage."

The same individual cannot serve as a required reviewer in multiple stages for the same document's review process. Required reviewer sets must be disjoint across peer, Lead Civil, human technical-editor and Director stages. Director separation must hold across the linked content and standalone review PRs, not just within one PR. This is in addition to the author/reviewer independence rule.

Gap: current assignments are stored separately by stage without enforcing cross-stage separation. Validate new assignments and replacements against reviewers in the other stages, preserving completed-review history so removal from an active assignment cannot hide prior participation. Show the conflicting stage and ask the administrator to choose a different eligible person. Test multiple reviewers per stage and cross-PR Director assignments.

Design change: reject the earlier suggestion allowing one individual to serve in multiple stages with separate approvals. The same restriction applies when reclassifying a lane adds a review stage. The identity and independence of the human accepting AI-assisted technical editing will be settled in category 06; do not confuse the AI execution account with a human reviewer. Whether separation spans separate future document revisions is not established by this decision.

### Next question: eligibility for each role

Should role eligibility be enforced through named GitHub teams for Lead Civil, human technical editor and Director, or should administrators be trusted to select qualified individuals without team-membership checks? Peer reviewers may be selected for document-specific subject expertise. The local workflow currently counts assigned individuals without explicit stage-specific membership validation, although the Director guide describes a docs-director team prerequisite.

### Confirmed qualification authority

User decision: "Administrators determine who is qualified."

Administrators decide whether an individual is qualified for each review stage. Do not require stage-specific GitHub team membership as evidence of qualification, including for Director review. Continue enforcing named individual assignments, administrator-only assignment authority, all-assigned approvals, author independence and separation between stages. Necessary GitHub access is an operational prerequisite, not a qualification policy.

Current assignment-based qualification behavior aligns with this choice. The Director guide's team-membership prerequisite must be clarified or revised so it does not impose an unapproved eligibility restriction. Remove any planned stage-team eligibility checks while preserving administrator authorization checks and repository-access requirements.

### Next question: unavailable reviewers

Recommended proposal: an administrator may replace an unavailable reviewer with another qualified, independent individual. The replacement must provide their own approval; approval is not transferred. Keep the previous review and replacement reason in the audit history, preserve other applicable approvals, and do not silently discard unresolved findings or changes-requested decisions. Ask whether this is the desired substitution process; exceptional dismissal of blocking feedback belongs to category 11.

### Confirmed reviewer replacement

User response: "Yes".

Administrators may replace an unavailable reviewer with a qualified individual who satisfies author independence and cross-stage separation. The replacement must submit their own approval. Preserve earlier feedback, require disposition of unresolved concerns, and retain other reviewers' valid approvals. Replacing a reviewer does not silently dismiss blocking feedback or transfer approval.

Gap: current request/removal handlers maintain assignment lists without an explicit replacement operation or the required authorization/evidence reconciliation. Implement an auditable replacement transition and re-evaluate required approvals. Keep the existing review history linked to the stage, and notify the replacement once under the shared handoff policy. Exceptional dismissal of blocking feedback remains a category 11 decision.

### Next question: assignment timing

Should administrators be able to select all stage reviewers when classifying the PR, while automation requests each person's review only when their stage becomes active? Recommended behavior: allow advance selection and later edits by administrators, but keep future assignments separate from GitHub review requests until their stage is ready. This avoids inviting premature reviews and additional notifications. Director-review initiation remains an explicit separate step under the agreed lifecycle.

### Confirmed assignment timing

User response: "Yes".

Administrators may select reviewers for all stages upfront or fill assignments later. Request each individual's review only when their stage becomes active. Advance selection is not a GitHub review request and must not initiate a later review early. Director review still requires separate initiation after draft deployment.

Gap: the current assign:<stage> mechanism records future assignments through GitHub review-request events, so selecting a future reviewer already requests their review. Store planned assignments separately and issue the native review request only on stage activation, with deduplication. If an active stage lacks an assignment, show that it awaits administrator assignment rather than proceeding. Record advance Director selection without treating it as authorization to start the Director session.

Acceptance examples: selecting a Lead Civil during peer review sends no Lead Civil review request; completing peer review activates and requests the assigned Lead Civil once; selecting a Director does not start their review before draft deployment and explicit initiation.

### Next question: who may merge and authorize production deployment

The user has retained administrator merges for lightweight lanes. The existing documentation also assigns content-PR merges and production-deployment approval to administrators. Confirm the proposed consistent rule: administrators alone merge PRs and approve production deployments; reviewer approval only satisfies review requirements and does not automatically merge or deploy. Actual live repository/environment permissions require inspection before claiming enforcement.

### Confirmed merge and deployment authority

User response: "Yes".

Only administrators merge PRs and approve production deployments. Reviewer approval establishes eligibility for the next step; it does not automatically merge or authorize production publication. Automated build execution and preview behavior are separate category 09 decisions.

The documented administrator responsibilities and production approval step match this policy. Verify live branch protections, bypass permissions, environment reviewers and automation credentials before claiming it is enforced. The standalone review/publication automation may prepare eligible PRs but must not merge or approve production on behalf of a reviewer.

## Category 04: Review experience and feedback

### Current baseline

The reviewer guide supports reading rendered previews and submitting GitHub inline comments/suggestions. It describes authors resolving threads and reviewers reopening them. The technical-edit guide distinguishes required fixes from suggestions, with a documented rationale sufficient to decline a suggestion. The current stage approval handler does not check thread resolution before advancing. The standalone Director full-document source-review approach is already accepted.

### First question: feedback disposition

Recommended proposal: distinguish required corrections from optional suggestions. Every review thread needs a recorded disposition before the stage completes, but optional suggestions may be declined with an explanation. A disputed required correction must be accepted as resolved by its reviewer or follow the agreed escalation procedure; marking it resolved alone does not establish acceptance. Ask whether this distinction and treatment match the user's preference. Resolution ownership and automated classification are subsequent decisions, not implied by this proposal.

### Confirmed approval autonomy; prior disposition proposal rejected

User decision: "I don't want any automated gates that require a certain specific response or reply from an author to a reviewer before a review can be completed and approved. The approval gate from the reviewer should be able to stand on its own."

Reviewer approval stands without automated discussion-completion conditions. Do not require particular author wording, replies, acknowledgements, per-comment dispositions or thread resolution before accepting approval. Reviewers judge whether feedback has been adequately addressed and approve on that basis. All assigned reviewers must still approve; established assignment authority and independence requirements remain. Build/merge permissions and approval validity after later changes are separate categories.

The existing handler's lack of thread-resolution checking aligns with this decision and is no longer a gap to fix. Remove the earlier design's proposed unresolved-thread and required-disposition gates from content, human-editor, Director and publication flows. Inspect actual GitHub conversation-resolution requirements before rollout; reconcile guides that say every thread must be resolved before merge. Do not infer user acceptance of required comment severity labels.

Clarification of earlier replacement language: preserve feedback for the replacement reviewer to consider, but do not require automated author replies or dispositions. Formal changes-requested reviews and exceptional dismissal are separate from an unresolved comment thread.

Acceptance examples: all assigned reviewers approve while some comments have no reply or remain unresolved, and review completion is not blocked by those comments; reopening a thread alone does not revoke approval; missing an assigned reviewer's approval still blocks stage completion.

### Next question: rendered reading and inline source feedback

Recommend the existing combination for ordinary content reviews: read the rendered PR preview and leave inline comments/suggested edits on GitHub's source diff. Director review uses its already-agreed full-document review PR. Ask whether this should be the standard experience for peer, Lead Civil and human technical-editor reviews; do not assume every stage needs a synthetic full-document diff.

### Confirmed review experience

User response: "Yes".

Peer, Lead Civil and human technical-editor reviewers read the rendered PR preview and leave inline comments/suggested edits in GitHub. Retain ordinary source-diff review for these stages; do not extend synthetic full-document review branches to them. Director review retains the separately agreed full-document review PR.

Current guides and preview infrastructure largely match this experience. Preserve it while aligning stage-specific links and instructions, distinguishing the deployed revision from a stale preview, and removing mandatory reply/thread-disposition claims. Detailed preview freshness requirements belong to category 09. Feedback severity and thread tidiness may be guidance, but cannot become automated prerequisites to reviewer approval.

## Category 05: Progression and revision rounds

### Current baseline and confirmed constraints

Current stage progression advances automatically on an assigned approval; the confirmed all-assigned policy will change its threshold. Advance reviewer selection is allowed, but native review requests wait for stage activation. Administrators alone merge and approve production deployments. Director initiation is separate. No author-response or thread-resolution gate may prevent reviewer approval from completing a review.

### First question: handoff to the next content-review stage

Recommended proposal: when all assigned reviewers have valid approvals, automatically complete the current content-review stage and activate/request the next stage if its reviewers are selected. Otherwise, show that administrator assignment is needed. No additional author checkbox or administrator acknowledgement is needed for this handoff. Completion of the last content-review stage makes the PR eligible for administrator merge under the agreed lane, not automatic merge or Director initiation. AI technical-edit completion authority remains category 06.

### Confirmed automatic stage handoffs

User response: "Yes".

Automatically advance after all assigned reviewers approve and request the next stage's selected reviewers. If the next stage has no selected reviewers, wait for administrator assignment. No extra author checkbox or administrator confirmation is required for a handoff. Completing the last content-review stage establishes eligibility for administrator merge; it does not auto-merge or initiate Director review.

Gap: existing automatic advancement uses the first assigned approval and generally posts instructions asking administrators to assign the next stage. Replace its approval threshold and connect it to deferred review requests for preselected reviewers. Implement the missing human-editor approval transition. Keep AI completion authority open for category 06 and build eligibility separate for category 09.

### Next question: inviting re-review after revisions

Recommended proposal: routine pushes do not repeatedly request re-review. An author can explicitly signal Ready for re-review when a batch of corrections is ready, resulting in one request for that revision round. This is a notification convenience, not a mandatory approval gate: assigned reviewers can review and approve without the signal. Discuss this distinction before deciding how later pushes invalidate existing approvals.

### Confirmed re-review request behavior

User response: "Yes".

Provide an optional author-controlled Ready for re-review action that requests re-review once after a batch of corrections. Do not repeatedly ping reviewers on routine pushes. The action is a notification convenience only: assigned reviewers may review and approve without it. It does not change administrator-only assignment authority.

Gap: the current synchronize handler posts a backcheck mention on qualifying pushes. Replace that automatic per-push notification with the explicit, deduplicated re-review request. Repeated activation for the same revision round must not send repeated requests. Review evidence validity remains independent from notification readiness.

### Next question: changes after approval

Determine whether document changes after approval invalidate approvals automatically, require administrator assessment of which completed stages need re-review, or follow another rule. Proposed starting point: pause merge/publication eligibility on post-approval document changes and let an administrator determine affected completed stages; preserve unaffected reviews. Explain separately that any new content still requiring Director approval cannot silently inherit approval of different text. Do not treat this proposal as confirmed or conflate it with optional Ready for re-review.

### Confirmed persistent stage completion; invalidation proposal rejected

User decision: "No, completed stages should stay completed, always, unless an admin manually re-fires a review."

Once completed, a review stage stays completed unless an administrator explicitly restarts it. Later pushes, changed text/assets, review dismissal, assignment events or later feedback must not automatically reopen that stage or erase its recorded completion. This applies to the review process as a whole, including Director review; do not invent a Director exception. Preserve the historical reviewed revision for traceability without requiring it to equal every later revision as a condition of retaining completion.

This supersedes earlier proposed content-validity exceptions in lane correction, automatic approval invalidation and mandatory fresh Director approval for changed content. Lane correction retains completed stages and may add previously unrequired stages. Administrator restart reopens only the explicitly selected stage(s); it cannot silently reset other completed stages. Detailed restart controls remain to be specified.

Current gap: synchronize at ready-to-merge sets review-workflow pending until admin:approve-merge-after-push. Remove that automatic review reset. CI can still run on changed code and block on build failure independently of completed review status. Compare and record publication content to avoid unintended overwrites, but do not turn a content difference into an automatic review restart or claim changed text was specifically reviewed.

Inspect live stale-approval and latest-push protections so they do not contradict this policy. Do not promise that local workflow changes alone can override native GitHub protections.

Acceptance examples: edits during technical editing leave completed peer/Lead Civil stages complete; a push after ready-to-merge does not revoke completed reviews; Director completion persists through later edits unless an administrator restarts it; an explicit administrator restart opens a new round for the selected stage and preserves all other completed stages.

### Withdrawn question: partial approval within an active stage

When multiple reviewers are assigned and only some have approved, should those individual approvals also persist through subsequent edits, or must those reviewers approve again before the still-active stage completes? Recommend retaining them unless the administrator explicitly requests a fresh review. The user's completed-stage rule does not by itself settle partial approvals within an unfinished stage.

### Revised authoritative reviewer policy

User decision: "I want to revisit an earlier point - only one authoritative reviewer per review, not multiple."

Exactly one administrator-selected individual is authoritative for each review stage. Only that person's approval satisfies the stage. Do not require approval aggregation, optional formal-reviewer assignments, or a quorum. Other people's comments do not confer approval authority; informal participation is not an additional required review.

Preserve administrator-only assignment/replacement, administrator judgment of qualifications, named individuals, author independence, different people across stages, delayed review requests, optional Ready for re-review, automatic handoff on authoritative approval, and completion persistence until administrator restart. Apply the single-reviewer policy to standalone Director review too.

Implementation gap: existing stage assignment arrays permit several authoritative reviewers. Replace them with one authoritative assignment per stage/round and an auditable replacement operation. Do not silently interpret a second assignment as an additional required reviewer or an authorized replacement. During migration, administrators select the authoritative person for any ambiguous existing multi-reviewer stage; do not choose arbitrarily or reopen completed stages.

Acceptance examples: authoritative approval completes the stage; another person's approval cannot complete it; duplicate/extra review requests cannot create a second authority; authorized replacement requires the replacement's own approval in an active round. The partial-approval scenario no longer exists.

### Next question: active downstream review during administrator restart

When an administrator explicitly restarts an earlier stage, should a later review already in progress continue concurrently, or pause until the restarted stage is complete? Other completed stages remain complete under the confirmed persistence rule. Final merge eligibility must wait for the explicitly restarted review to complete.

### Rare overlapping restarts

User response: "I don't know that this will ever happen."

Leave coordination of this rare case to administrator judgment; do not add specialized pause/concurrency behavior solely for it. Preserve the established rule that restarting one stage does not reset other completed stages.

## Category 06: Technical editing and QC

### Current baseline

AI-assisted technical-edit completion currently uses an author checkbox or administrator override. The human-editor guide describes approval-based completion, but the stage approval handler lacks that transition. The previous proposal required a separately assigned human to own AI-assisted completion; that proposal was not accepted.

### Confirmed AI-assisted completion authority

User decision: "I typically am the one running the AI assisted technical edit. I think any administrator should be able to mark an AI-assisted edit complete without assigning a separate human editor."

Any administrator may mark an AI-assisted technical edit complete; no separate human editor assignment or approval is required. The administrator who completes the stage need not be the person who ran the AI edit. Record the completing administrator and completed stage, then use the agreed automatic handoff/merge-eligibility behavior. Do not require specific author replies or thread resolution. AI output itself does not complete the stage.

Gap: promote the existing administrator-completion action from an override to the normal AI-assisted completion path and verify administrator authority. Remove the author checkbox as an independently sufficient completion mechanism. Keep an assigned human-editor review as a separate path with its own authoritative approval; do not introduce a mandatory extra reviewer for AI-assisted edits. Running AI and completing its stage are separate actions.

Comparison with plan: replace the proposed mandatory human acceptance/assignment for AI-assisted editing with administrator completion. Human-editor author/stage independence is unchanged. The user's "any administrator" direction leaves a specific interaction to clarify: whether an administrator who authored the document or reviewed an earlier stage may also mark the AI-assisted edit complete. Do not silently override the earlier separation rules or impose them on this new administrator action without asking.

### Next question: independence of the administrator completion action

May any administrator mark the AI-assisted edit complete even if they authored the document or served as peer/Lead Civil reviewer, or should those earlier separation rules restrict the completing administrator? This determines whether AI completion is a distinct administrative attestation rather than a formal human-review assignment.

### Confirmed administrator flexibility

User decision: "Any admin can act in any capacity at any time."

Administrators are exempt from author/reviewer independence and cross-stage separation restrictions. An administrator may author a document, act as its authoritative reviewer at any stage, handle more than one stage, complete AI-assisted editing, merge and approve production. Non-administrator reviewers retain the agreed independence and stage-separation rules.

Retain one authoritative reviewer per human-review stage, explicit administrator assignment/replacement and explicit completion actions. Administrator flexibility is not automatic approval and is not a requirement to let arbitrary additional approvals compete with the named reviewer. Record the administrator acting and the capacity/action performed. Completed stages remain complete unless explicitly restarted by an administrator.

Gap: planned eligibility checks must permit the administrator exception instead of rejecting role overlap. Verify administrator identity consistently. Because GitHub's native review interface may restrict approval of one's own PR, plan an explicit audited administrator completion action for cases native review approval cannot represent; verify actual GitHub capabilities before implementation. Do not confuse intended workflow authority with existing UI permissions. Preserve build validation and document-scope rules unless the user separately changes them.

AI-assisted technical editing now has a fully settled completion-authority rule: any administrator may mark it complete, including its author or an earlier reviewer, without a separate human editor.

### Next question: launching the AI technical edit

Current AI editing is run manually through local tooling and posts findings to GitHub. Recommend retaining manual administrator initiation when the technical-edit stage becomes active, with administrator completion as a separate action. Ask whether the user instead wants an automatic AI run on stage entry. This launch decision is separate from the settled completion authority.

### Confirmed AI initiation

User response: "Manually initiated."

An administrator manually initiates AI-assisted technical editing. Entering the technical-edit stage does not automatically run AI. Running the edit and marking it complete are separate administrator actions; producing findings does not complete the stage.

Current manual tooling largely matches this decision. Retain its manual trigger, align stage instructions and status with that trigger, and implement the already-confirmed administrator completion path. Do not add automatic runs on stage entry or on subsequent pushes. Tool choice and review scope are separate decisions.

### Next question: AI review scope

Current technical-edit tooling reviews changed MDX files. Recommend reviewing the full document for a new document, and changed sections with surrounding context for revisions/editorial follow-up; allow an administrator to request a whole-document pass when appropriate. Ask whether this scope is preferred or every technical edit should cover the whole document. This determines review workload and findings volume without adding an approval gate.

### Confirmed AI technical-edit scope

User response: "I like that approach."

Review the entire document for new documents. For revisions, review changed sections with surrounding context; administrators may request a full-document pass. This does not add a technical-edit stage to editorial fixes, developer documentation or code/infrastructure lanes.

Gap: current tooling selects changed MDX files, which is neither guaranteed to cover an entire new document nor restricted to changed sections for a revision. Resolve the selected document scope and compare against the appropriate PR baseline; include surrounding text needed to interpret revision changes. Expose the administrator's full-pass choice and record the scope used with the run. Review findings do not automatically complete the stage.

### Next question: optional QC versus formal technical editing

The repository also has a separate QC tool supporting syntax/grammar checks and comparison with a source document. Recommend retaining QC as optional author/administrator tooling, not a new required review stage or merge gate and not a substitute for formal technical-edit completion. Ask whether this distinction matches the desired workflow.

### Confirmed optional QC

User response: "Yes".

QC remains optional supporting tooling for authors and administrators. Do not add a required QC stage, require a QC report for merge, or treat QC output as formal technical-edit completion. Existing separation of QC reports and formal review largely matches this policy; align helper instructions and guides without introducing new gates.

## Category 07: Standalone Director review

### Confirmed starting constraints

Only new documents require Director review. Content review finishes and the content PR can merge/deploy as a draft before Director review. The accepted approach uses a standalone full-document review PR and a linked publication PR. One administrator-selected authoritative individual reviews; administrator flexibility applies. Comments and replies are not approval prerequisites. Completed review stages persist until explicitly restarted by an administrator. Administrators alone merge and approve production deployments.

### Next question: when to initiate the separate review

An administrator explicitly starts Director review after draft deployment; advance reviewer selection does not initiate it. Recommend allowing the deployed draft to remain available for as long as needed, without automatically creating the review session or requesting the Director on deployment. The start action would create the full-document review PR and request the selected Director. Ask whether this on-demand timing matches the intended behavior.

### Confirmed Director initiation timing

User response: "Yes".

The draft may remain deployed without a deadline for starting Director review. An administrator explicitly invokes Start Director Review, which creates the full-document review PR and requests its selected authoritative reviewer. Draft deployment does not create or initiate Director review, and advance reviewer selection does not send the request. No automatic initiation deadline is introduced.

Gap: replace the current in-PR Director stage/checkpoint instructions with an independent administrator start action for an already deployed draft. This matches the planned separation but now explicitly establishes administrator-controlled timing and indefinite draft availability.

### Next question: corrections during Director review

Recommend keeping Director-requested corrections on the standalone review branch, updating its rendered preview while leaving the production draft unchanged until administrator publication. This keeps feedback and edits together and avoids a separate production merge/deploy for each correction. An administrator could explicitly publish an updated draft when needed; detailed deployment mechanics remain category 09. Ask whether the user prefers this or expects corrections to appear on the live draft throughout review.

### Confirmed consistent Director review URL

The user identified the confusion of starting on the live draft and switching to a preview for corrections. After a revised proposal to use one preview from the beginning, the user confirmed: "Yes, let's do it that way."

The Director reads the rendered document at the standalone review's preview URL from the first review through corrections and re-review, leaving inline feedback in GitHub. Initialize review content from the deployed draft. Corrections on the review branch update the same preview URL. Keep the live production draft unchanged unless an administrator explicitly publishes an updated draft or the final document.

The review PR prominently identifies the preview as the document to review. The production URL is the publication destination, not an alternate review link. Do not instruct the Director to switch from production to preview mid-review. Draft deployment still precedes independent review initiation.

Gap: the current Director guide explicitly directs the Director to production and warns against the preview. Reverse those instructions for the new standalone process and adapt review-request messaging, administrator guidance and preview linkage. The earlier design's deployed-draft-first reading path is superseded. Verify the initial preview is available before requesting the Director; failed or stale preview handling will be settled under category 09.

Acceptance examples: the first request points to the review preview; later corrections retain the same preview URL; the original production draft remains unaffected by review-branch pushes; review content initially matches the selected deployed draft.

### Next question: preparation after Director approval

The accepted architecture uses a linked publication PR. Recommend creating that PR automatically once the authoritative Director approves, containing the document corrections, draft removal and publication metadata for administrator review/merge. It does not merge or deploy automatically. Ask whether preparation should be automatic or require an additional administrator action.

### Confirmed automatic publication preparation and draft targeting

User decisions: "When director approval arrives, the PR can be automatically created" and, after discussing document identification and administrator correction, "Ok. Plan for that and let's proceed."

On authoritative Director approval, automatically create the linked publication PR against main. Include document corrections, approval metadata and the selected document's `draft: true` → `draft: false` change in `src/docConfig.js`. Preserve `active: true`. Creating the PR does not change production; administrator merge and production-deployment approval remain required.

At Director-review initiation, the administrator explicitly selects the document. Record its registry `doc_location`, reviewed version and linked review session/PR. Use that identity for publication targeting rather than branch names, PR titles or comment text. Match exactly one registry entry and validate document scope. Missing, duplicated or moved entries require administrator reconciliation rather than guessing.

The publication PR description identifies the document and version; its diff exposes the exact flag change. Administrators can inspect and correct both the flag edit and tracked identity before merge. Reconciliation must preserve the historical review record and avoid silently applying one document's approval to a different document. If identity correction reveals that another document was actually reviewed, surface the discrepancy for explicit administrator action under the agreed authority policy.

The flag is per document, not per version. Check whether the reviewed version is still the version the flag would affect. Report mismatches for administrator reconciliation, without automatically reopening a completed Director stage. Keep reviewed and published revisions identifiable.

Gap: implement durable document/session identity, targeted registry editing, automatic publication PR preparation and clear administrator-visible validation. Existing deployment waits for administrator approval; verify live settings later. No runtime workflow changes have been made during this requirements discussion.

## Category 08: Drafts, versions and publication

### Confirmed starting behavior

New documents merge/deploy as active drafts before independent Director review. Director approval automatically prepares a publication PR that removes the selected document's draft flag; administrators inspect/correct it, merge and approve deployment. Drafts can remain deployed without an initiation deadline. The registry's active and draft flags are independent, and draft rendering affects the latest version only.

### Next question: visibility of published drafts

Current `active: true, draft: true` behavior includes the document in the production build, navigation/landing-page availability and search eligibility, with a DRAFT watermark. Ask whether drafts should remain normally discoverable, or be accessible only by direct link until final publication. Direct-link-only behavior would require explicit discovery controls beyond the existing two flags; hiding links is not access control.

### Confirmed draft visibility

User response: "Yes, same behavior."

Retain normal navigation and search discoverability for active published drafts, with the existing DRAFT watermark. Do not introduce direct-link-only visibility or additional discovery controls. Current active/draft behavior matches this decision; verify it remains intact during lifecycle changes.

### Next question: production behavior during major/minor revision review

Current documented policy keeps the previously published version live and unwatermarked while the revision is reviewed on its PR preview. After required reviews, administrator merge/deployment publishes the revision as the latest version without a draft watermark; older versions remain accessible. Recommend retaining this behavior, distinct from a new document's pre-Director draft deployment. Ask whether this should remain unchanged.

### Confirmed revision publication behavior

User response: "Yes".

Major/minor revisions retain the documented lifecycle: the existing published version stays live and unwatermarked during preview review; after required reviews and administrator merge/deployment, the revision becomes latest without a draft watermark, while older versions remain accessible. Do not add an intermediate production-draft phase or Director review for revisions of already approved documents.

Current documented policy matches. Reconcile the outdated revision helper that describes briefly publishing a watermarked revision and later clearing the flag. Prepare the revision's final flag state before administrator merge so the deployment publishes it without a watermark.

### Next question: version-history attribution

Current documentation assigns reviewedBy to peer and Lead Civil for new documents/major revisions, peer for minor revisions; approvedBy identifies the Director for new documents and is '-' for major/minor revisions. Editorial/dev fixes do not require new version entries. Recommend retaining these attribution rules while pre-filling names from recorded review completion where possible, for administrator verification/editing before merge. Human-readable names must be resolved reliably rather than guessed from GitHub handles. Ask whether to retain these rules and automate their preparation.

### Confirmed manual version-history attribution

User decision: "Retain the roles but do not automate their preparation in the documents. I will manually fill in the reviewed by and approved by lines."

Retain the documented attribution roles: peer and Lead Civil in reviewedBy for new documents/major revisions, peer for minor revisions, and Director in approvedBy for new documents (no Director attribution for major/minor revisions). The administrator manually fills these document fields. Automation must not populate or rewrite reviewedBy/approvedBy entries.

This rejects proposed automatic document-attribution preparation and supersedes earlier publication-PR wording that implied automated reviewer-name/approval-metadata edits. Automation may retain its own review/session audit records, but these are distinct from document content. Automatic publication preparation includes selected document corrections and draft-flag removal; administrator-authored attribution edits are preserved and can be added before merge.

Current manual administrator guidance largely matches this decision. Keep it, and remove automatic attribution preparation from the design. Do not add a name-matching or required-response gate. This answer does not request any change to other version-history fields.

### Next category: builds, previews, merge and deployment

Recommend preserving automatic PR builds and preview updates on opening/updating a PR, even while administrator classification or review is pending. These runs do not initiate later reviewers, reopen completed reviews or authorize production deployment. Ask whether this automatic build/preview behavior should remain.

## Category 09: Builds, previews, merge and deployment

### Confirmed automatic builds and previews

User response: "yes".

Keep PR builds and preview updates automatic when a PR opens or receives changes, including while classification or review is pending. These runs do not restart completed reviews, request later-stage reviewers or authorize production deployment.

Current CI/preview triggers largely match this behavior. Preserve appropriate site-affecting path handling, integrate the standalone Director preview, and separate build status from persistent review completion. An automatic build is not an automatic review restart or production approval.

### Next question: failed build and merge eligibility

Current CI Build is documented as a required merge check. Recommend retaining successful build validation on the current PR revision as a merge requirement, independently of completed review stages. A failed build blocks merge; fixing it and passing CI restores build eligibility without repeating completed reviews. Ask whether to retain this requirement.

### Confirmed build merge requirement

User response: "yes".

A failed build blocks merging. Require successful build validation for the current PR revision independently of persistent review completion. Fixing the build and passing CI restores build eligibility without restarting completed reviews.

The documented CI Build gate matches this decision. Preserve it, verify the live required check, and ensure the consolidated review policy does not overwrite or confuse build failure with incomplete review.

### Next question: stale or unavailable review preview

Current preview automation leaves the last successful preview available and updates its PR comment with a stale warning when the latest build fails. Recommend retaining the last successful preview with a prominent warning in the PR status/preview link identifying the displayed revision and failed update. Do not automatically revoke completed reviews or send repeated bot notices; build failure already blocks merge. Ask whether to keep the last working preview or make it unavailable until a fresh build succeeds. The initial Director review request still waits for its first working preview.

### Confirmed stale-preview behavior

User response: "Yes", accepting the recommended retention behavior.

Keep the last working preview available when an update fails. Clearly mark the preview link/status in the PR as stale and identify the revision actually displayed. Do not revoke completed reviews. Current preview behavior largely matches; verify revision accuracy and avoid repeated warning comments. This is not a claim that the existing deployed preview page itself displays a warning.

### Next question: production deployment source

Current deploy.yml supports deployment on qualifying main pushes and manual deployment of an arbitrary ref, originally used for the unmerged Director checkpoint. Recommend using main for normal production deployments and manual redeploys, now that Director review uses its own preview. Ask whether production should be restricted to main or administrators should retain an explicit non-main deployment option. Rollback/recovery details remain category 11.

### Confirmed production source restriction

User decision: "Restrict to main".

Production deployments, including manual redeploys, must use main. Remove arbitrary-ref production deployment and the old unmerged-branch Director checkpoint. This explicit restriction applies to administrators too; the general role-flexibility decision does not authorize non-main production deployment.

Gap: remove deploy.yml's free-form ref input, ensure both automatic and manual production builds select an eligible main revision, and enforce the allowed deployment branch in workflow/environment configuration. Account for the manual workflow branch selector so changing it cannot bypass the restriction. Keep review branches confined to previews. Rollback must follow the main-only rule rather than deploying an arbitrary older branch/ref.

### Next question: production deployment preparation after merge

Current qualifying main pushes automatically build a production artifact and wait for administrator environment approval. Recommend retaining that behavior: a site-affecting merge prepares deployment automatically, but nothing publishes until an administrator approves it. Ask whether to retain automatic preparation or require an administrator to manually initiate the production build as well.

### Confirmed automatic production preparation

User response: "Automatic".

Retain automatic production-build preparation after a qualifying site-affecting merge to main. Administrator approval remains required before publishing. No additional manual start action is required for the normal production build.

Current deploy.yml largely matches this trigger/approval split. Preserve it while applying the confirmed main-only restriction. Clearly distinguish a prepared build from a successfully approved/deployed publication in status reporting.

### Next question: preview cleanup and Director preview retention

Current preview cleanup removes previews when their PR closes. Recommend retaining normal cleanup for content PRs, but keeping the standalone Director preview available until the linked publication deploys successfully or an administrator cancels the review. Then remove that preview while preserving GitHub comments and review history. Ask whether to use this lifecycle or retain Director previews longer.

### Confirmed preview cleanup lifecycle

User response: "That lifecycle is good."

Keep ordinary content-PR preview cleanup on closure. Retain the standalone Director preview until successful linked final-publication deployment or explicit administrator cancellation, then remove it. Preserve GitHub comments and review history. A closed review PR, Director approval, publication-PR creation or merge alone must not prematurely remove the Director preview. A failed final deployment leaves it available.

Gap: current cleanup is triggered by PR closure for all previews. Make cleanup aware of the linked Director review/publication lifecycle and successful deployment identity. Cleanup retries must not remove another active preview or erase review history.

## Category 10: Notifications and status visibility

### Confirmed constraints and platform boundary

Notify a reviewer only when their stage activates; advance selection does not request review. Authors can optionally request re-review after a revision batch. Routine pushes do not repeatedly ping reviewers. Reduce bot-generated comment/mention duplication, and do not add warnings about individual reply behavior. GitHub's native notifications for user activity depend on subscriptions and recipient settings; repository automation cannot guarantee their email frequency.

### First question: notification approach

Recommend keeping GitHub as the notification channel while limiting automation to actionable handoffs and failures. Do not add a separate digest/email service. If guaranteed cadence is required, native mail must also be suppressed/routed through user settings or organizational mail rules and a managed channel designed separately. Ask whether the quieter native-GitHub approach is acceptable given that remaining limitation. This resolves the earlier unanswered notification-channel question.

### Confirmed GitHub-only notification approach

User decision: "Let's plan to limit email notifications as much as possible within GitHub's existing notification actions, no separate notification infrastructure."

Use GitHub's existing notification mechanisms only and minimize automation-generated notification activity. Do not build or configure a separate email/digest service, recipient directory or notification transport. Retain useful stage handoffs and actionable failure reporting while removing duplicate comments/mentions and routine per-push pings. Exact native email counts remain outside workflow control and must not be promised.

This confirms the design's recommended native-GitHub path and closes the earlier channel question. Audit each existing comment, mention, review request and workflow notification source; prefer existing native events and status/check summaries over duplicative messages. User notification-setting guidance may help, but does not become an approval requirement.

### Next question: administrator action recipient

Recommend one designated administrator contact per PR/review process for workflow-generated assignment-needed, technical-edit-ready and merge/publication-ready handoffs, rather than tagging the whole administrator team. Any administrator retains authority to act; the contact determines notification targeting only. Ask whether to use one contact or the full administrator team. GitHub subscribers may still receive native notifications regardless of the named recipient.

### Confirmed administrator notification recipients

User decision: "The whole admin team."

Target the whole administrator team for administrator-action handoffs, including assignment needed, technical-edit readiness and merge/publication readiness. Do not introduce a designated per-PR administrator notification owner. Any administrator can act. Send one actionable handoff per meaningful transition and deduplicate retries; do not repeat the team mention for routine pushes, replies or unchanged state.

Existing team-directed handoffs match recipient preference, but current extra mentions and comments still need reduction. This supersedes earlier proposals to avoid all team mentions or escalate only to a designated administrator. Native GitHub subscriptions still determine actual email delivery.

### Next question: reminders for inactivity

Recommend no automatic recurring reminders in the initial workflow. Send the initial actionable handoff, keep current status visible, and let administrators manually follow up or re-request review. Ask whether to use that approach or add reminders after a defined period of inactivity.

### Confirmed no automatic reminders

User decision: "Omit automatic reminders."

Do not schedule inactivity reminders or automatic overdue-review nudges. Send the agreed initial actionable handoff, keep status visible, and leave follow-up to administrators. Optional author-requested re-review remains available; an explicitly requested handoff is not a recurring reminder.

This matches the proposed no-reminder policy. Do not add reminder schedules, age-based escalation messages, or separate notification infrastructure during implementation.

### Next question: failure notifications

Recommend using existing failed-check/status reporting for ordinary build/preview failures, without an additional bot comment tagging the administrator team. For review automation failures requiring intervention (for example, unable to prepare publication), send one deduplicated actionable notice to the administrator team. Ask whether to distinguish routine validation failures from workflow failures this way.

### Confirmed failure notifications

User response: "Yes".

Ordinary build/preview failures use failed checks and updated preview status without an extra administrator-team mention. Review/publication automation failures requiring intervention generate one actionable administrator-team notice, deduplicated across retries. Existing GitHub-native workflow emails may still depend on recipients' settings; do not promise one total email.

Gap: separate status updates from escalation, classify failures by required action, and retain a stable failure identity so retries do not repeat notices for the same problem. Successful recovery should update status rather than create a duplicate failure handoff. Production-deployment recovery is addressed in category 11.

### Next question: persistent status summary

Recommend one bot-maintained summary on each review PR showing administrator classification, current stage, authoritative reviewer, completed stages, the next action and the current preview link/revision. Update it in place instead of posting routine progress comments. Keep actionable handoffs separate under the agreed recipient policy. Ask whether this is the preferred status presentation; summary edits cannot be promised universally email-free.

### Confirmed persistent status summary

User response: "Yes".

Use one persistent summary on each review PR displaying classification, current stage, authoritative reviewer, completed stages, next action and preview link/revision. Update it in place instead of posting routine progress comments. Actionable handoffs remain separate under the agreed notification rules. Do not promise that GitHub never emails subscribers about a summary edit.

Gap: consolidate the existing reviewer-state and preview/status presentation so users have one clear workflow summary. Paginate comment discovery, verify bot identity, use a stable marker and skip unchanged writes to avoid duplicate summaries. Keep authoritative state and audit history independent of an editable display comment.

## Category 11: Exceptions, recovery and audit

### Confirmed boundaries

Administrators can act in any capacity, assign/replace reviewers, correct lanes and explicitly restart completed reviews. Completed stages otherwise persist. One document per author PR, successful build before merge, main-only production and administrator deployment approval are established requirements. Do not infer that general administrator flexibility automatically waives these requirements.

### First question: explicit review-stage override

Existing automation has administrator technical-edit and post-push merge labels, but not a coherent general exception model. Ask whether administrators should have an explicit action to waive a required review stage, or should instead complete it by acting as the authoritative reviewer. Proposed option if waiver is desired: record who waived which stage and a reason, visibly distinguish waived from approved, and do not bypass build/main-only requirements. This is a question, not permission to implement a waiver.

### Confirmed administrator waiver

User response: "Waive".

Provide an explicit administrator-only action to waive a required review stage. Record the stage and acting administrator and display the outcome as waived, not approved. A waiver satisfies that stage's requirement without fabricating reviewer approval. The existing build merge requirement, main-only production restriction and administrator deployment approval remain in force.

Gap: add an authorized, auditable waiver transition to the shared review policy and status summary instead of requiring an administrator to impersonate reviewer approval or manipulate stage labels. Preserve prior review history and mark the exceptional outcome distinctly in workflow records; document attribution remains manual. A general waiver applies to review stages, including Director, unless the user specifies a narrower scope. Do not automatically populate approvedBy from a waiver.

The previous suggestion included recording a reason, but the final question accepted by the user did not explicitly settle a mandatory reason requirement. Ask that next rather than introducing a new required field silently. Director waiver's publication-preparation behavior must be reconciled with automatic publication on approval during implementation planning.

### Next question: waiver reason

Recommend requiring a short administrator-entered reason for a waiver, stored with who acted, when and which stage was waived. This is an audit record for an exceptional administrator action, not a required author response to review comments. Ask whether a reason should be required or optional.

### Confirmed optional waiver reason

User response: "Optional".

A waiver reason is optional. Always record the acting administrator, waived stage and timestamp; record a reason when provided. An empty reason does not block the waiver. This replaces the suggested mandatory-reason requirement while preserving the distinct waived outcome.

### Next question: Director waiver publication preparation

Director approval automatically prepares a publication PR under the confirmed lifecycle. Recommend treating an explicit administrator waiver of Director review as sufficient to prepare the same publication PR, identifying the outcome as waived in workflow/PR records, without inventing approval or filling document attribution. Administrator merge and deployment approval remain required. Ask whether a Director waiver should also trigger automatic publication-PR preparation.

### Three-PR architecture clarified and retained

The user raised confusion about a third PR, then accepted retaining the approach provided titles and labels clearly identify each purpose. New-document publication uses: a content PR merged for draft deployment; a standalone full-document Director-review PR containing comments, author replies, corrections and its updating preview; and a publication PR delivering the resulting changes and draft removal to main. The publication PR is an administrator delivery step, not another Director review round. Routine revisions retain their single-PR process.

Use clear Content, Director Review and Publication title prefixes/purpose labels with document names and prominent cross-links. The publication PR links the approval or waiver and says administrator publication action remains. Director discussion remains in the review PR. Close that review after successful publication and preserve its history under the accepted preview-cleanup lifecycle. The synthetic review baseline explains why the separate publication PR is needed; do not describe moving conversations to publication.

### Confirmed Director-waiver publication handoff

User response: "Yes".

An explicit administrator waiver of Director review automatically prepares the linked publication PR, just as Director approval does. Record and display waived, not approved; include the administrator, stage, timestamp and optional reason in workflow records. Do not populate document attribution. The administrator still verifies/corrects the publication changes, merges and approves production deployment. Repeated waiver/approval events reuse the linked publication PR instead of creating duplicates.

### Next question: recovery after failed production deployment

Recommend keeping the current live site and completed review state, fixing the problem through main if necessary, and letting an administrator retry the deployment. A failed deployment does not reopen reviews or delete the Director preview. Do not automatically revert document changes or approvals. Ask whether this should be the normal recovery policy; it preserves the main-only production restriction.

### Confirmed production failure recovery

User response: "Yes".

On production deployment failure, preserve completed review state and retain the Director preview until successful publication or explicit cancellation. Administrators resolve the issue through main when code/content changes are needed, then retry production deployment with the required administrator approval. Do not automatically restart reviews or roll back content. Keep publication status pending rather than claiming deployment succeeded. Preserve the last working production site where the deployment mechanism permits; verify the actual deployed state if a failure occurs after publication may have begun.

The existing manual rerun/main deployment approach is the starting point. Coordinate failure status and preview cleanup with the publication record and confirmed notification policy. Do not introduce non-main recovery deploys.

### Next question: cancelling a Director review

Recommend an explicit administrator cancellation action that closes the Director-review PR and any still-open linked publication PR, removes the Director preview, retains discussion/audit history, and leaves the production document as it currently stands (normally draft). Cancellation cannot undo an already merged publication or a completed production deployment; those require a separate administrator change through main. Ask whether this should be the normal cancellation behavior.

### Confirmed Director cancellation

User response: "yes".

Provide administrator cancellation that closes the Director-review PR and any still-open linked publication PR, removes its preview, retains discussion/audit history and leaves the live document unchanged. Do not erase approval/waiver history or treat closing a PR as reverting a merged change. An already merged publication or queued deployment requires explicit reconciliation; cancellation must not silently roll back main or claim it undid production changes.

Implement cancellation as an auditable session state so delayed approval/waiver events cannot recreate publication PRs or request reviewers for a cancelled session. Repeated cancellation is safe and does not create duplicate notifications or affect another session.

### Category 11 scope closure

Core exception/recovery behavior is settled. Rare overlapping administrator restarts remain administrator-coordinated. Other implementation edge cases must preserve the confirmed policies and be reported if they require a new policy choice rather than manufacturing additional requirements.

## Category 12: Migration, guidance and rollout

### First question: existing open PRs

Recommend an administrator-reviewed inventory and migration of current open PRs: preserve completed stages and existing discussion, map remaining work into the new process, and surface ambiguous assignments/state for administrator resolution. New-document PRs currently awaiting Director review would become eligible for draft merge once content review/build requirements are satisfied, then use the independent review process after deployment. Do not reset all reviews or mass-request reviewers. Ask whether to migrate current PRs or let them finish under the old process while applying the new workflow only to new PRs.

### Confirmed new-PR-only cutover; migration proposal rejected

User decision: "finish under the old workflow. Only new PRs use the overhaul."

PRs already open at activation finish under the old review workflow; do not migrate them. Only PRs opened after activation use the overhaul. Persist each PR's workflow version so later pushes, label changes and close/reopen events do not switch its process. Existing PRs retain their old stage logic and review requirements; the overhaul's policy changes apply only to new-process PRs.

Gap: replace the proposed active-PR migration with versioned routing and a legacy compatibility path. Both paths must coexist without competing status writers, duplicate review requests or cross-version stage handling. Use the activation boundary/recorded creation identity, not event arrival time, to distinguish old PRs from new ones. Inventory existing PRs read-only to verify routing, not to reset their stages or assignments. Clearly identify which workflow each PR follows and retain legacy instructions until those PRs finish.

Repository-wide protections/deployment configuration are shared, so coexistence needs explicit reconciliation. In particular, the legacy new-document process expects an unmerged-branch production checkpoint, while the user separately requires production restricted to main. Do not silently waive either decision or promise old-process compatibility without resolving this conflict. Non-conflicting tests/docs/planning can proceed.

### Next question: legacy checkpoint deployment conflict

Existing Lane 1 PRs may still need the old unmerged-branch production deploy for Director review. Ask whether to temporarily retain that capability only for legacy PRs until they finish, or wait to activate the overhaul/main-only deployment restriction until such PRs have finished. Verify whether any such PR exists before implementing an exception; this is a policy choice, not presumed authorization.

### Confirmed clean cutover

User clarification: "There are no open PRs, don't worry about this."

Use a clean cutover based on the user's confirmation that no PRs are open. No active-PR migration, temporary non-main deployment exception or parallel legacy workflow is needed for the current rollout. Retire the old Director checkpoint path and activate main-only production with the overhaul. Do not build legacy compatibility machinery solely for the hypothetical conflict raised above.

The preceding versioned coexistence proposal is superseded for this rollout. If a newly opened pre-activation PR actually creates a conflict later, report that concrete change rather than silently migrating it; do not prolong the present discussion over that hypothetical.

### Next question: rollout validation

Recommend automated tests covering each lane and the agreed approval/waiver, restart, notification and publication rules, followed by a short controlled GitHub pilot before production activation. The pilot verifies real event handling, review requests and previews that local tests cannot establish. Ask whether to include that pilot; no test PRs, reviewer requests or deployment actions are authorized merely by recording the proposal.

### Confirmed no pilot

User response: "No".

Omit the proposed controlled GitHub pilot. Use automated tests and local validation for implementation verification, and plan a clean cutover without a separate live trial, test-reviewer requests or pilot PRs. Read-only inspection of relevant live settings remains implementation evidence, not a pilot. Report what was actually tested without claiming local tests verified live email delivery or GitHub end-to-end behavior.

This rejects the earlier pilot proposal and removes pilot-dependent rollout milestones. The twelve-category requirements discussion is complete at the agreed policy level. Detailed implementation must follow these decisions and supersede rejected historical proposals, without treating the completion of this discussion as permission to send messages or publish changes independently of the agreed administrator actions.
