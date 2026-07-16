# Sprint Plan

Sprint Workflow is a planning layer over the existing 51 task contracts. It does not replace task execution, task dependencies, task Allowed Files, or `.codex/project-state.json`.

## Rules

- Keep all 51 tasks in `docs/architecture/task-dependencies.json`.
- A task appears in exactly one Sprint.
- A task dependency must appear earlier in Sprint order than the dependent task.
- Sprint context is informational; execution still happens one task at a time.
- A Sprint cannot mark tasks completed. Only `scripts/project-state.py` records task state.
- `scripts/validate-sprints.py` is the source of truth for Sprint consistency checks.

## Sprint Index

| Sprint | Goal | Tasks |
|---|---|---|
| SPRINT-01 Project Foundation | Initialize the Vite React TypeScript baseline and core styling toolchain. | TASK-001, TASK-002, TASK-003 |
| SPRINT-02 Design System and Routing Shell | Create shared visual primitives and the public application routing shell. | TASK-004, TASK-005, TASK-006, TASK-007, TASK-008, TASK-009, TASK-010 |
| SPRINT-03 Motion and Interaction Core | Build the approved animation, reduced-motion, cursor, and interaction foundations. | TASK-011, TASK-012, TASK-013, TASK-014, TASK-015, TASK-016, TASK-017 |
| SPRINT-04 Content Data and Reference Rules | Establish verified portfolio data, typed project content, and reference adaptation rules. | TASK-018, TASK-019, TASK-020, TASK-021, TASK-022 |
| SPRINT-05 Home, Projects, and About Pages | Implement the main public portfolio pages using verified data and accessible interactions. | TASK-023, TASK-024, TASK-025, TASK-026, TASK-027, TASK-028, TASK-029, TASK-030, TASK-031, TASK-032, TASK-033, TASK-034 |
| SPRINT-06 Project Detail and 3D Viewer | Build detailed project storytelling, media handling, scroll narrative, and the lazy 3D viewer. | TASK-035, TASK-036, TASK-037, TASK-038, TASK-039, TASK-040, TASK-041, TASK-042 |
| SPRINT-07 Release Readiness | Prepare SEO, content safety, performance, and accessibility for publication. | TASK-043, TASK-044, TASK-045, TASK-046 |
| SPRINT-08 Quality, CI, Deployment, and Final Validation | Add automated tests, CI, deployment configuration, and final release validation. | TASK-047, TASK-048, TASK-049, TASK-050, TASK-051 |

## Usage

Generate Sprint context before planning a batch:

```bash
python scripts/sprint-context.py SPRINT-01 --write --inspect
```

Validate Sprint metadata:

```bash
python scripts/validate-sprints.py
```

The generated Sprint context lists task completion status, unmet dependencies, validation tiers, and task-level Allowed Files. It is not authorization to edit multiple tasks unless the user explicitly authorizes a Sprint batch and the relevant batch checks pass.
