---
name: react-typescript-architecture
description: Design, implement, review, or refactor React and TypeScript architecture for this UE5 portfolio. Use for component boundaries, props, hooks, routing, local data models, strict typing, and removal of duplication or any.
metadata:
  short-description: Build strict, maintainable React architecture
---

# React TypeScript Architecture

Use this skill for React structure, TypeScript contracts, hooks, routing, and refactors.

## Workflow

1. Read the assigned Task and relevant contracts.
2. Inspect existing types and primitives before adding anything.
3. Define the smallest stable public API.
4. Keep static content in `src/data`.
5. Keep pages compositional; move reusable behavior into focused components or hooks.
6. Run lint, typecheck, build, and relevant tests.

## Guardrails

- TypeScript strict mode; never use `any`.
- Prefer discriminated unions for variant states.
- Do not duplicate an existing abstraction.
- Avoid generic utility layers without a concrete second use.
- Keep effects narrowly scoped and fully cleaned up.
- Do not place animation-frame data in React state.
- Do not redesign unrelated modules.

Read `references/review-checklist.md` for architecture reviews.

