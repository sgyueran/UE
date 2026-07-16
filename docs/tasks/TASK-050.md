# TASK-050: Create 1Panel and Nginx deployment configuration

**Profile:** `deployment-release`  
**Risk:** `High`  
**Validation Tier:** `full`

## Dependencies

`TASK-043`, `TASK-044`, `TASK-045`, `TASK-046`, `TASK-049`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `frontend-performance-audit`

## Allowed Files
- `deploy/**`
- `nginx/**`
- `docs/blueprint/DEPLOYMENT.md`
- `.env.example`
- `.codex/project-state.json`

## Deliverable

- Create 1Panel and Nginx deployment configuration.

## Task-Specific Acceptance
- SPA fallback, asset caching, HTML cache policy, compression, HTTPS, and rollback are documented.
- Deployment uses only public client configuration and contains no secrets.
- A post-deploy smoke check verifies primary routes and static assets.

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
