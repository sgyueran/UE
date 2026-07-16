# TASK-032: Add category and technology filters

**Profile:** `ui-section`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-019`, `TASK-020`, `TASK-031`

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

- Add category and technology filters.

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
