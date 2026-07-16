# OpenCode PR Review

Use this command when a pull request needs an auxiliary review.

Instructions:

- Read `AGENTS.md`, `.codex/policies/workflow.policy.md`, and `.codex/policies/review.policy.md`.
- Treat `develop` as the target branch unless the PR says otherwise.
- Check task Allowed Files when the PR is associated with a `TASK-XXX`.
- Verify that validation results were actually executed and are not inferred.
- Focus on bugs, scope violations, missing validation, unsafe automation, and content integrity.
- Do not merge the PR.

Output:

- `APPROVE` when there are no blocking findings.
- `REQUEST CHANGES` when a High finding violates scope, validation, security, content integrity, or repository policy.
- Include concise findings with file paths when changes are requested.
