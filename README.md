# RMC Software Documentation

This repository contains the official documentation site for the RMC suite of tools, developed and maintained by the U.S. Army Corps of Engineers Risk Management Center (RMC). The site is built using [Docusaurus](https://docusaurus.io/) and is styled with [Tailwind CSS](https://tailwindcss.com/), customized to align with USACE branding.

The project includes:

- User guides and technical manuals for RMC software tools
- Detailed component-level documentation (React-based)
- Tables, figures, citations, equations, and glossary support
- Versioned documentation management
- Built-in navigation, search, and dark mode

The project is organized to support easy contribution, internal consistency, and extensibility across future RMC documentation needs.

For development standards, file structure, custom components, and styling conventions, please refer to the internal [Documentation Guide](https://usace-rmc.github.io/RMC-Software-Documentation/docs/documentation-guide/introduction/).

The guide includes:

- How to write and structure MDX content
- How to use and customize React components
- Tailwind utility conventions and shared styles
- Table formatting and counter file integration
- Versioning strategy and linking guidelines
- The full review and approval workflow for all documentation changes

## Review and Approval Workflow

All changes to documentation go through a pull request against the protected `main` branch. The branch prefix determines which of five review lanes the PR is routed to:

| Branch prefix | Lane | Reviews required |
|---|---|---|
| `docs/new/` | New document | Peer → Lead Civil → Technical edit → Director |
| `docs/major/` | Major revision (new major version) | Peer → Lead Civil → Technical edit |
| `docs/minor/` | Minor revision (new minor version) | Peer → Technical edit |
| `docs/fix/` | Editorial fix | None (admin self-merge) |
| `docs/dev/` | Dev docs (anything under `docs/dev/`) | None (admin self-merge) |

Each PR receives an automatic preview build at an unadvertised URL where reviewers read the rendered document. Branch protection on `main` requires both the `CI Build` and `review-workflow` status checks to pass before merge, so the merge button reflects the workflow's judgment automatically.

For details on each lane, who reviews what, and step-by-step instructions for authors, reviewers, the Director, and site administrators, see chapters 9 through 15 of the [Documentation Guide](https://usace-rmc.github.io/RMC-Software-Documentation/docs/documentation-guide/introduction/).

## Contact

For questions or support, contact the RMC documentation team:

Adam Gohs
502-315-6484
Adam.C.Gohs@usace.army.mil
