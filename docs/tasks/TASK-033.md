# TASK-033: Build hover media preview for project list

**Profile:** `ui-section`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-013`, `TASK-031`, `TASK-032`

## Inputs

- `docs/blueprint/DESIGN-TOKENS.md`
- `docs/contracts/`

## Skills
- `accessibility-audit`

## Allowed Files
- `src/pages/ProjectsPage.*`
- `src/features/projects/**`
- `src/data/projects.*`
- `.codex/project-state.json`

## Deliverable

- Build hover media preview for project list.

## Task-Specific Acceptance
- Filtering/navigation behavior is deterministic, keyboard-accessible, and touch-safe.
- Empty and unknown-category states are explicitly rendered.
- Project cards use verified data rather than component-local content.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
