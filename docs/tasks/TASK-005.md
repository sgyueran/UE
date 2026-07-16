# TASK-005: Build reusable Button and Badge components

**Profile:** `foundation`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-004`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `react-typescript-architecture`

## Allowed Files
- `package.json`
- `package-lock.json`
- `vite.config.*`
- `tsconfig*.json`
- `src/**`
- `.codex/project-state.json`

## Deliverable

- Build reusable Button and Badge components.

## Task-Specific Acceptance
- The selected npm workflow is reproducible from a clean checkout.
- Strict TypeScript and the configured quality commands complete without errors.
- No unrelated feature UI is introduced.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
