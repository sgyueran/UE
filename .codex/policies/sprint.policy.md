# Sprint Policy

Sprint Workflow is for planning and coordination only.

1. Run `scripts/project-state.py recover` before generating Sprint context.
2. Generate Sprint context with `scripts/sprint-context.py SPRINT-XXX --write --inspect`.
3. Validate Sprint metadata with `scripts/validate-sprints.py` after editing Sprint files.
4. Preserve the 51 task contracts in `docs/architecture/task-dependencies.json`.
5. Do not use Sprint context to bypass task dependencies, Allowed Files, or validation commands.
6. Do not mark Sprint completion in `.codex/project-state.json`; it tracks task state only.
7. Execute one task at a time unless the user explicitly authorizes a Sprint batch and batch validation allows it.
8. Never start the next task automatically after generating or reviewing Sprint context.

Sprint changes may update Sprint configuration, Sprint documentation, Sprint scripts, and policies. They must not reimplement website functionality.
