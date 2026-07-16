# TASK-010: Add error boundary and 404 page

**Profile:** `foundation`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-007`, `TASK-008`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `react-typescript-architecture`

## Allowed Files
- `src/app/**`
- `src/layouts/**`
- `src/pages/**`
- `src/components/navigation/**`
- `.codex/project-state.json`

## Deliverable

- Add error boundary and 404 page.

## Task-Specific Acceptance
- All affected routes render directly and after client-side navigation.
- Keyboard focus remains visible and mobile navigation has a non-hover interaction path.
- Unknown routes render the dedicated 404 experience without console errors.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
