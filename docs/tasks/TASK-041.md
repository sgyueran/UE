# TASK-041: Build sticky project information and scroll narrative

**Profile:** `threejs-media`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-011`, `TASK-012`, `TASK-013`, `TASK-035`, `TASK-040`

## Inputs

- `docs/architecture/MEDIA-FALLBACK-MATRIX.md`
- `docs/contracts/`

## Skills
- `react-three-fiber-viewer`
- `media-asset-pipeline`

## Allowed Files
- `src/pages/ProjectDetailPage.*`
- `src/features/project-detail/**`
- `src/assets/projects/**`
- `.codex/project-state.json`

## Deliverable

- Build sticky project information and scroll narrative.

## Task-Specific Acceptance
- Unknown slugs fail safely and valid projects render all required verified sections.
- Media has poster/fallback behavior and does not block core text content.
- Sticky, lightbox, or scroll behavior has mobile and reduced-motion fallbacks.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
