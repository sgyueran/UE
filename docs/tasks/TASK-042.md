# TASK-042: Build lazy-loaded GLB viewer

**Profile:** `threejs-media`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-003`, `TASK-013`, `TASK-041`

## Inputs

- `docs/architecture/MEDIA-FALLBACK-MATRIX.md`
- `docs/contracts/`

## Skills
- `react-three-fiber-viewer`
- `media-asset-pipeline`

## Allowed Files
- `src/features/viewer/**`
- `src/assets/models/**`
- `vite.config.*`
- `.codex/project-state.json`

## Deliverable

- Build lazy-loaded GLB viewer.

## Task-Specific Acceptance
- Three.js/R3F is loaded only after explicit navigation or user intent.
- Unsupported WebGL, load failure, and reduced-motion states show a useful poster fallback.
- The viewer cleans up GPU resources and does not leak render loops.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
