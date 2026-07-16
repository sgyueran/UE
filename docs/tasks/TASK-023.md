# TASK-023: Build homepage Hero layout

**Profile:** `ui-section`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-008`, `TASK-021`, `TASK-022`

## Inputs

- `docs/blueprint/DESIGN-TOKENS.md`
- `docs/contracts/`

## Skills
- `accessibility-audit`

## Allowed Files
- `src/pages/HomePage.*`
- `src/features/home/**`
- `src/assets/home/**`
- `.codex/project-state.json`

## Deliverable

- Build homepage Hero layout.

## Task-Specific Acceptance
- The section renders at 375px, 768px, 1440px, and 1920px without horizontal overflow.
- Primary content and CTA remain accessible by keyboard and without motion.
- The homepage initial bundle does not include Three.js.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
