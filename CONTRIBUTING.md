# Contributing

This repository uses a task-driven Codex workflow.

## Branches

- `main`: release-ready state
- `develop`: integration branch
- `codex/*`: temporary task branches

## Required workflow

1. Recover repository state.
2. Generate the current task context.
3. Implement one task only.
4. Run the task validation commands.
5. Review the diff.
6. Create a draft Pull Request targeting `develop`.
7. Merge only after approval, preferably with Squash Merge.
8. Recover state and prepare—but do not execute—the next task.

## Commit format

Use concise Conventional Commits, for example:

- `feat(task-001): initialize Vite project`
- `fix(task-021): resolve mobile navigation overflow`
- `docs: update contribution policy`

Never force-push shared branches and never commit directly to `main`.
