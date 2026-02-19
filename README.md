# RMC Software Documentation

This repository contains the official documentation site for the RMC suite of tools, developed and maintained by the U.S. Army Corps of Engineers Risk Management Center (RMC). The site is built using [Docusaurus](https://docusaurus.io/) and is styled with [Tailwind CSS](https://tailwindcss.com/), customized to align with USACE branding.

The project includes:

- User guides and technical manuals for RMC software tools
- Detailed component-level documentation (React-based)
- Tables, figures, citations, equations, and glossary support
- Versioned documentation management
- Built-in navigation, search, and dark mode

The project is organized to support easy contribution, internal consistency, and extensibility across future RMC documentation needs.

For development standards, file structure, custom components, and styling conventions, please refer to the internal [Documentation Guide](https://usace-rmc.github.io/RMC-Software-Documentation/docs/documentation-guide/introduction/)

The guide includes:

- How to write and structure MDX content
- How to use and customize React components
- Tailwind utility conventions and shared styles
- Table formatting and counter file integration
- Versioning strategy and linking guidelines

## Claude Code Skills

This repository includes Claude Code skills (slash commands) in `.claude/skills/` for common development workflows. Skills are invoked with `/{name}` in a Claude Code session.

### Git & Repository

| Skill | Description |
|-------|-------------|
| `/commit` | Stage changes and create a git commit following project conventions |
| `/push` | Push current branch to remote with safety checks |
| `/commit-push` | Commit and push in a single operation |
| `/pr` | Create a GitHub pull request with auto-generated title and description |
| `/review-pr` | Review a pull request for code quality, MDX patterns, and documentation standards |

### Page Verification & Quality

| Skill | Description |
|-------|-------------|
| `/smoke-test` | Quick health check — page loads, no console errors, no broken images |
| `/review-responsive` | Screenshot and analyze a page at 7 device viewports (desktop through phone) |
| `/review-page` | Full page audit combining Lighthouse scores with responsive design review |
| `/check-accessibility` | Section 508 / WCAG AA compliance audit using Lighthouse + Playwright |
| `/check-performance` | Lighthouse performance audit with Core Web Vitals and resource analysis |
| `/lint-fix` | Run ESLint, auto-fix issues, and provide guidance for remaining problems |

### Documentation & QC

| Skill | Description |
|-------|-------------|
| `/qc-review` | Run a QC review at Level 1, 2, or 3 on an MDX document (wraps `qc/qc-prompt.md`) |
| `/build` | Run the Docusaurus production build and analyze errors/warnings |
| `/check-links` | Scan MDX files for broken references, missing images, and orphaned keys |
| `/check-components` | Validate custom component usage (props, imports, key uniqueness) in MDX files |

### MCP Servers

The following MCP servers enhance skill capabilities:

- **Playwright** — Browser automation for screenshots, responsive testing, and smoke tests
- **Lighthouse** — Performance, accessibility, SEO, and best practices auditing
- **ESLint** — JavaScript linting via MCP
- **Context7** — Library documentation lookup
- **Sequential Thinking** — Multi-step reasoning for complex analysis
- **GitHub** — GitHub API integration for PR and issue workflows

For questions or support, contact the RMC documentation team:

Adam Gohs
502-315-6484
Adam.C.Gohs@usace.army.mil
