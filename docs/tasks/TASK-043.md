# TASK-043: Implement SEO and social metadata

**Profile:** `deployment-release`  
**Risk:** `Medium`  
**Validation Tier:** `full`

## Dependencies

`TASK-034`, `TASK-042`

## Inputs

- `docs/blueprint/DEPLOYMENT.md`

## Skills
- `frontend-performance-audit`

## Allowed Files
- `src/lib/seo/**`
- `src/app/**`
- `src/pages/**`
- `public/**`
- `content-input/SITE-CONFIG-TEMPLATE.md`
- `.env.example`
- `.codex/project-state.json`

## Deliverable

- Implement SEO and social metadata.

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
