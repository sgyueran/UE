# TASK-003: Configure ESLint, Prettier and path aliases

**Profile:** `foundation`  
**Risk:** `Low`  
**Validation Tier:** `standard`

## Dependencies

`TASK-002`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `react-typescript-architecture`

## Allowed Files
- `package.json`
- `package-lock.json`
- `eslint.config.*`
- `.prettier*`
- `tsconfig*.json`
- `vite.config.*`
- `.codex/project-state.json`

## Deliverable

- Configure ESLint, Prettier and path aliases.

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
