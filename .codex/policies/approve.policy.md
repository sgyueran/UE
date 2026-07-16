# APPROVE Policy

When review returns `APPROVE` or `APPROVE WITH NOTES`:

1. Confirm required validation passed.
2. Confirm only Allowed Files changed.
3. Confirm no later task was implemented.
4. Prepare or create a **draft Pull Request** targeting `develop`, when the environment supports it.
5. Use a concise Conventional Commit / Pull Request title containing the task ID.
6. Stop and wait for the user to review and merge.

Codex must not merge the Pull Request by itself.

After the user confirms the merge:

1. Recover project state.
2. Confirm the merged task is completed.
3. Identify the next unblocked task.
4. Generate its context with `--write --inspect`.
5. Report the next task ID, goal, Allowed Files, validation tier, and blockers.
6. Stop.

Do not execute the next task automatically.
