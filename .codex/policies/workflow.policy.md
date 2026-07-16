# Codex Task Workflow Policy

For every task:

1. Recover state with `scripts/project-state.py recover`.
2. Generate minimal context with `scripts/task-context.py TASK-XXX --write --inspect`.
3. Read `AGENTS.md`, this policy, and the generated task context.
4. Execute one task only.
5. Validate using the task's declared tier and commands.
6. Review the implementation using `review.policy.md`.
7. Follow either the APPROVE or REQUEST CHANGES branch.
8. Never start the next task automatically.

The repository state, dependency JSON, Git history, and executed validation results are authoritative. Chat history is not.
