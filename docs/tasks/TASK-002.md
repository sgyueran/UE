# TASK-002: Configure Tailwind CSS using the selected major-version workflow

**Profile:** `foundation`  
**Risk:** `Low`  
**Validation Tier:** `standard`

## Dependencies

`TASK-001`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `tailwind-design-system`

## Allowed Files
- `package.json`
- `package-lock.json`
- `src/styles/**`
- `src/main.*`
- `postcss.config.*`
- `tailwind.config.*`
- `vite.config.*`
- `docs/architecture/TECH-STACK-VERSIONS.md`
- `.codex/project-state.json`

## Deliverable

- Configure Tailwind CSS using the selected major-version workflow.

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
