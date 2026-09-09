# Review workflow activation checklist

This checklist records manual GitHub configuration required after the implementation is reviewed. It does not apply settings, merge changes, create a pilot, migrate work, or deploy the site. Local tests cannot verify live repository permissions, rulesets, environments, credentials, notifications, or workflow identity.

## 1. Review and merge the implementation

- [ ] Review the implementation diff, workflow permissions, durable-state format, generated-PR behavior, and test results.
- [ ] Confirm the check names are exactly **CI Build** and **review-workflow**.
- [ ] Confirm generated Director Review and Publication PRs have clear titles, purpose labels, and links.
- [ ] Confirm no open PR requires migration. The accepted rollout is a clean cutover with no pilot and no migration.
- [ ] Merge the implementation through protected **main**. The user or another repository administrator performs the merge.

Do not activate credentials before the reviewed workflow implementation is on **main**.

Keep new PR intake paused during this one-time configuration. Prepare the App, environment, branch rulesets, required-status sources, and production restrictions first; add the environment credentials last. Then manually run **Review Control** from **main** to initialize protected state and confirm configuration before accepting the first real PR. This initialization is not a test PR or pilot.

## 2. Create the dedicated review-controller GitHub App

Register a dedicated GitHub App for the review controller. This App is the protected writer identity; the ordinary **GITHUB_TOKEN** and generic GitHub Actions identity must not bypass controller-state or Director-baseline protections.

- [ ] Give the App a unique name and record its app slug.
- [ ] Grant these repository permissions:
  - **Contents:** Read and write
  - **Issues:** Read and write
  - **Pull requests:** Read and write
  - **Commit statuses:** Read and write
  - **Actions:** Read and write
  - **Deployments:** Read-only
- [ ] Grant **Organization members: Read-only**.
- [ ] Install the App only on this repository, not every organization repository.
- [ ] Generate and securely download one private key.
- [ ] Do not create or store an installation access token. The workflow mints a short-lived token for each run with [actions/create-github-app-token@v3](https://github.com/actions/create-github-app-token); installation tokens expire after one hour.
- [ ] Confirm the controller derives its bot login from the action's **app-slug** output, in the form **APP-SLUG[bot]**. Do not hard-code an unrelated bot login.

There is no **REVIEW_TOKEN** fallback. The App identity is mandatory because a token issued to the generic Actions actor cannot distinguish trusted controller writes from untrusted PR-workflow writes.

## 3. Create the protected review-control environment

- [ ] Create an environment named exactly **review-control**.
- [ ] Set its deployment branch policy to the exact **main** branch only.
- [ ] Add no required reviewers to this environment. It protects controller credentials by branch and workflow design; it is separate from production approval.
- [ ] Add environment variable **REVIEW_APP_CLIENT_ID** with the App client ID.
- [ ] Add environment secret **REVIEW_APP_PRIVATE_KEY** with the complete App private key.
- [ ] Move the existing preview repository deploy key secret into **review-control**.
- [ ] After the new controller and preview publisher work from the environment, remove the repository-level copy of the preview key.
- [ ] Confirm PR build jobs cannot reference **review-control** or receive its App key or preview key.
- [ ] Never paste either private key into a PR, issue, workflow log, or activation record.

The controller uses **actions/create-github-app-token@v3** to mint a fresh installation token during each trusted run. The workflow must not persist the minted token as an Actions secret, variable, artifact, cache entry, or durable controller state.

Current known state: **Allow GitHub Actions to create and approve pull requests** is disabled. Leave it disabled. The dedicated App creates generated PRs with its own permission, so activation does not require enabling that repository-wide Actions setting.

## 4. Protect controller-owned branches with rulesets

Use GitHub [repository rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) so restrictions and bypass identities are explicit.

### review-state

- [ ] Create a ruleset targeting the exact branch **review-state**.
- [ ] Restrict branch creation, updates, force pushes, and deletion.
- [ ] Allow bypass only for the dedicated review-controller GitHub App and repository administrators.
- [ ] Do not grant bypass to generic GitHub Actions.
- [ ] Confirm a token minted for the dedicated App can create and update the branch.
- [ ] Confirm a normal contributor token and ordinary **GITHUB_TOKEN** cannot create or modify it.

### director-base/*

- [ ] Create a ruleset targeting **director-base/** followed by any branch suffix.
- [ ] Restrict branch creation, updates, force pushes, and deletion.
- [ ] Allow bypass only for the dedicated review-controller GitHub App and repository administrators.
- [ ] Do not grant bypass to generic GitHub Actions.
- [ ] Confirm the App can create the synthetic baseline and that contributors cannot alter it.
- [ ] Confirm Director Review PRs cannot merge a synthetic baseline into **main**.
- [ ] Retain each baseline and stable preview until confirmed publication deployment or explicit cancellation.

## 5. Protect main

- [ ] Require the **CI Build** status check.
- [ ] Require the **review-workflow** status check.
- [ ] Bind each required status check to its expected source App so another actor cannot satisfy it with the same context name.
- [ ] Require the PR branch to be up to date with **main** before merging.
- [ ] Restrict updates and merges to repository administrators.
- [ ] Do not allow the review-controller App to merge or push updates to **main**.
- [ ] Prevent direct contributor pushes and force pushes.
- [ ] Leave **Require conversation resolution before merging** disabled; replies and resolved threads are collaboration aids, not workflow gates.
- [ ] Configure native review settings so new commits do not dismiss approvals as a substitute for controller state. Completed and waived stages persist until an administrator uses **/review restart STAGE**.

After configuration, verify the required checks show the expected App as their source and that only an administrator can perform the final merge.

## 6. Configure the production environment

- [ ] Configure the production environment to accept deployments only from the exact **main** branch.
- [ ] Require approval from **@usace-rmc/docs-admin**.
- [ ] Confirm contributor branches, Director Review branches, Publication PR branches, and tags cannot deploy production.
- [ ] Confirm the deployment builds the exact merged **main** revision and waits for approval.
- [ ] The user or another authorized administrator manually approves production deployment.

Do not deploy a feature branch as a workaround. If deployment fails, preserve completed review state and the Director preview, correct the issue through **main**, and retry the production workflow.

## 7. Validate credential isolation

- [ ] Inspect every workflow trigger that can reach **review-control**; it must execute trusted workflow code from **main**.
- [ ] Confirm pull-request code runs without the App private key, preview deploy key, or any minted App token.
- [ ] Confirm the preview build only uploads an artifact and the trusted consumer publishes it with the protected preview key.
- [ ] Confirm generated PR operations, controller-state writes, status writes, workflow dispatches, and membership lookup use the minted App token.
- [ ] Confirm audit entries and Git commits made by the controller resolve to **APP-SLUG[bot]**.
- [ ] Confirm no stored installation token exists.

## 8. Notifications

- [ ] Confirm the controller updates one persistent status summary and skips unchanged writes.
- [ ] Confirm actionable handoffs go to the assigned person or administrator team.
- [ ] Confirm automation failures requiring intervention produce one deduplicated administrator-team notice.
- [ ] Confirm ordinary CI and preview failures rely on checks and status without an extra team mention.
- [ ] Confirm there are no scheduled inactivity reminders or overdue-review nudges.

This credential change adds no notification infrastructure. GitHub's native notification and email frequency remains controlled by each user's settings and subscriptions; repository automation cannot centrally cap an exact email count or cadence.

## 9. Post-activation observation

- [ ] Inspect the first real PRs opened after activation for the correct App actor, classification prompt, assignments, summary state, required-check sources, and preview.
- [ ] Treat this as normal production observation, not a pilot.
- [ ] Do not create test PRs, request test reviewers, or migrate historical review state.
- [ ] Record any live-setting discrepancy and correct it through the normal administrator process.

Mark this checklist complete only after direct inspection of live settings and real workflow runs. Do not claim that implementation-branch tests verified the live rollout.
