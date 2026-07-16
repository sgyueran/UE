# TASK-004: Create design tokens and global styles

**Profile:** `foundation`  
**Risk:** `Low`  
**Validation Tier:** `standard`

## Dependencies

`TASK-003`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `tailwind-design-system`

## Allowed Files
- `package.json`
- `package-lock.json`
- `vite.config.*`
- `tsconfig*.json`
- `src/**`
- `.codex/project-state.json`

## Deliverable

- Create design tokens and global styles.

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
