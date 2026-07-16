# Git Workflow

- `main` is release-only.
- Normal sequential tasks use `develop`, one validated task per commit.
- High-risk tasks may use `codex/task-XXX-short-name`.
- Start every task with `git status --short` and record pre-existing changes.
- Never overwrite unknown user changes.
- Only merge to `main` after TASK-051 and CI succeed.
- Deployment must use `main` or a signed release tag.
