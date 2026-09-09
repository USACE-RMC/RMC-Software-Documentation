# RMC Software Documentation

[![License: 0BSD](https://img.shields.io/badge/License-0BSD-blue.svg)](LICENSE)

This repository contains the official documentation site for the U.S. Army Corps of Engineers Risk Management Center software suite. It is built with Docusaurus and Tailwind CSS and includes user guides, technical manuals, developer documentation, versioned content, figures, equations, citations, search, and accessible navigation.

See the published [Documentation Guide](https://usace-rmc.github.io/RMC-Software-Documentation/docs/documentation-guide/introduction/) for authoring and component guidance.

## Pull requests and review

Every change uses a pull request to the protected `main` branch. Branch prefixes describe intent and provide an initial classification; the trusted review controller records the authoritative classification and review state.

| Prefix | Classification | Required document review |
| --- | --- | --- |
| `docs/new/` | New document | Peer → Lead Civil → technical edit; separate Director review after draft publication |
| `docs/major/` | Major revision | Peer → Lead Civil → technical edit |
| `docs/minor/` | Minor revision | Peer → technical edit |
| `docs/fix/` | Editorial correction | Administrator handling; no formal document stages |
| `docs/dev/` | Developer documentation | Administrator handling; no formal document stages |
| `feature/`, `fix/`, `chore/`, `ci/` | Site code or infrastructure | Administrator handling and required CI |

An author PR may cover one document. It may also include directly related source, asset, registry, and site changes. An administrator classifies every PR with `/review classify`, assigns one named reviewer to each required human stage, and may correct the classification at any time. For non-administrators, authors cannot review their own work and the named reviewers must differ between stages. Administrators may act in any role.

Completed stages remain complete after new commits until an administrator explicitly restarts a stage. GitHub replies and resolved conversations are useful collaboration tools but are not automated gates. Authors may use `/review ready` to request a new look after revisions.

New documents use three clearly labeled PRs:

1. The Content PR completes peer, Lead Civil, and technical editing, then merges to `main` and publishes as a draft.
2. An administrator starts a separate Director Review PR against a stable full-document baseline and assigns one Director.
3. Director approval or an administrator waiver creates a Publication PR that applies the reviewed document changes and removes draft status. An administrator verifies and merges it.

Only administrators merge to `main` and approve production deployment. Successful merges build automatically; contributors do not deploy from feature branches.

See chapters 9–15 of the Documentation Guide for commands and role-specific instructions.

## Contact

For questions or support, contact Adam Gohs at Adam.C.Gohs@usace.army.mil or 502-315-6484.
