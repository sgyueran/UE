# OpenCode PR Automation

This repository uses OpenCode as an auxiliary GitHub assistant, not as the primary portfolio task runner.

## Responsibilities

- Respond to explicit `/opencode` or `/oc` comments on issues and pull requests.
- Help review pull requests, summarize requested changes, and implement focused review fixes when asked.
- Monitor open pull requests and maintain a status comment with checks, draft state, approvals, and requested changes.

## Safety Rules

- Never push directly to `main` or `develop`.
- Never merge pull requests.
- Prefer draft pull requests for generated code changes.
- Respect `AGENTS.md`, `.codex/policies/*.md`, task context, and task Allowed Files.
- Do not start the next portfolio task automatically.
- Do not claim validation passed unless the command actually ran.

## Required GitHub Setup

Install the OpenCode GitHub App on this repository and add the required model provider secret to repository Actions secrets.

The default workflow expects:

- `OPENCODE_API_KEY`

OpenCode runs inside GitHub Actions. The manual OpenCode workflow can also use the built-in `GITHUB_TOKEN`.

If an API key is ever written to a workflow file by an installer or manual edit, rotate that key before running the workflow and keep only the repository secret reference in Git.

## Workflows

- `.github/workflows/opencode.yml`: runs OpenCode when a comment contains `/opencode` or `/oc`, or when manually triggered from the Actions tab.
- `.github/workflows/pr-monitor.yml`: monitors open PRs on a schedule and updates a sticky status comment.

## Example Comments

```text
/opencode review this PR against AGENTS.md and the task context
```

```text
/oc fix the unresolved review comments, but only within the task Allowed Files
```
