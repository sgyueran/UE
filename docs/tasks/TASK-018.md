# TASK-018: Create profile and navigation data models

**Profile:** `data-content`  
**Risk:** `Low`  
**Validation Tier:** `standard`

## Dependencies

`TASK-003`

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

- Create profile and navigation data models.

## Task-Specific Acceptance
- Data is typed, deterministic, and free of duplicate identifiers or slugs.
- Unknown or unverified claims remain `TODO(USER_INPUT)` and cannot pass release validation.
- Consumers receive explicit empty/error behavior instead of implicit undefined values.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
