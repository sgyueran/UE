# TASK-021: Integrate verified portfolio content

**Profile:** `data-content`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-018`, `TASK-019`, `TASK-020`

## Inputs

- `docs/blueprint/CONTENT-INTEGRITY.md`
- `content-input/`

## Skills
- `portfolio-content-engineering`

## Allowed Files
- `src/data/**`
- `src/types/**`
- `src/lib/content/**`
- `content-input/**`
- `.codex/project-state.json`

## Deliverable

- Integrate verified portfolio content.

## Task-Specific Acceptance
- Data is typed, deterministic, and free of duplicate identifiers or slugs.
- Unknown or unverified claims remain `TODO(USER_INPUT)` and cannot pass release validation.
- Consumers receive explicit empty/error behavior instead of implicit undefined values.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
npm run test -- --run
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
