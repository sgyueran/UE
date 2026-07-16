---
name: frontend-performance-audit
description: Measure, diagnose, and improve frontend performance for this Vite portfolio. Use for bundle analysis, route splitting, image/video loading, Core Web Vitals, rendering cost, GSAP overhead, and preventing Three.js from entering the initial bundle.
metadata:
  short-description: Protect load speed and runtime performance
---

# Frontend Performance Audit

Use this skill before release and whenever adding media, animation, or 3D.

## Workflow

1. Establish the affected route and user journey.
2. Inspect the production build and chunk graph.
3. Identify the largest transferred and executed assets.
4. Check media dimensions, formats, poster use, and preload policy.
5. Check render frequency and pointer/scroll handlers.
6. Verify route-level lazy loading.
7. Measure again after each meaningful change.
8. Report evidence, not vague claims.

## Guardrails

- Do not trade accessibility or content clarity for a score.
- Do not preload non-critical videos or GLBs.
- Do not optimize by deleting intentional visual behavior without approval.
- Avoid memoization without measured need.
- Prefer fewer dependencies and native APIs.
- Keep Three.js and viewer code out of initial chunks.

Read `references/budgets.md` for project budgets.

