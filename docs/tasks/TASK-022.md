# TASK-022: Audit reference UI and define adaptation rules

**Profile:** `data-content`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-004`, `TASK-011`, `TASK-021`

## Inputs

- `docs/blueprint/CONTENT-INTEGRITY.md`
- `content-input/`

## Skills
- `ui-reference-implementation`

## Allowed Files
- `docs/reference/**`
- `docs/blueprint/DESIGN-LANGUAGE.md`
- `docs/blueprint/UI-GUIDELINE.md`
- `.codex/project-state.json`

## Deliverable

- Audit reference UI and define adaptation rules.

## Task-Specific Acceptance
- The audit separates reusable interaction principles from copied visual assets or code.
- Adaptation rules are mapped to the UE5 portfolio goals and mobile behavior.
- No copyrighted source asset is added to the repository.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
