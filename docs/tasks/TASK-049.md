# TASK-049: Configure GitHub Actions continuous integration

**Profile:** `deployment-release`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-047`, `TASK-048`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `frontend-performance-audit`

## Allowed Files
- `.github/workflows/**`
- `package.json`
- `package-lock.json`
- `scripts/**`
- `.codex/project-state.json`

## Deliverable

- Configure GitHub Actions continuous integration.

## Task-Specific Acceptance
- Release checks fail on placeholders, unsafe publication status, broken links, or missing required metadata.
- The change documents measurable before/after evidence where optimization is involved.
- The production build remains reproducible and does not expose secrets.

## Validation Commands

```bash
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run build
npm run test
npm run test:e2e
```

## Finish

Use the compact report in the selected Task Profile. Do not commit, push, or start another task unless explicitly authorized.
