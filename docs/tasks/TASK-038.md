# TASK-038: Build technical challenge sections

**Profile:** `foundation`  
**Risk:** `Medium`  
**Validation Tier:** `standard`

## Dependencies

`TASK-035`, `TASK-037`

## Inputs

- `docs/blueprint/CODING-STANDARD.md`

## Skills
- `react-typescript-architecture`

## Allowed Files
- `src/pages/ProjectDetailPage.*`
- `src/features/project-detail/**`
- `src/assets/projects/**`
- `.codex/project-state.json`

## Deliverable

- Build technical challenge sections.

## Task-Specific Acceptance
- Unknown slugs fail safely and valid projects render all required verified sections.
- Media has poster/fallback behavior and does not block core text content.
- Sticky, lightbox, or scroll behavior has mobile and reduced-motion fallbacks.

## Validation Commands

```bash
npm run lint
npm run typecheck
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
