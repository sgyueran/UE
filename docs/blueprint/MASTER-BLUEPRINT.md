# UE Portfolio AI Blueprint v4.3

## Purpose

This repository is an AI-first development system for a static UE5 personal portfolio website.

The blueprint is designed to reduce prompt repetition, avoid architectural drift, minimize rework, and keep Codex tasks small, deterministic, and reviewable.

## Product Scope

Public pages only:

- `/`
- `/projects`
- `/projects/:slug`
- `/about`
- `*`

No authentication, database, admin panel, CMS, job tracker, interview tracker, or server-side business API.

## Required Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- GSAP
- GSAP ScrollTrigger
- Lenis
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- React Helmet Async
- Yet Another React Lightbox
- Lucide React
- clsx
- tailwind-merge

## Product Goals

1. Explain the developer's professional direction within five seconds.
2. Present UE5 work through strong visual storytelling.
3. Make personal responsibilities explicit.
4. Show technical depth through problems, solutions, and measured outcomes.
5. Keep navigation, resume download, and contact information obvious.
6. Maintain high visual quality without sacrificing performance or accessibility.

## Global Engineering Rules

1. TypeScript strict mode is mandatory.
2. `any` is forbidden.
3. Static content belongs in `src/data`.
4. Pages compose features; they do not contain large business logic blocks.
5. No component may silently introduce a new design pattern.
6. No Task may modify unrelated files.
7. No future Task may be implemented early.
8. All animation cleanup must be explicit.
9. Reduced-motion behavior is mandatory for motion-heavy features.
10. Three.js must never be included in the homepage initial bundle.
11. GLB assets load only after explicit user action.
12. Mobile behavior must be designed, not merely tolerated.
13. Every task must satisfy the global Definition of Done.
14. Every task must finish with a self-review.
15. Every task must report files changed and validation results.
16. Portfolio facts must follow `CONTENT-INTEGRITY.md`; missing facts use `TODO(USER_INPUT)`.
17. Task progress must be recoverable from `.codex/project-state.json` and Git history.
18. Codex must recommend but never create commits unless explicitly authorized.

## Mandatory Reading Order for Codex

Before implementing a task, read `AGENTS.md` and `.codex/project-state.json`, then:

1. `docs/blueprint/MASTER-BLUEPRINT.md`
2. `docs/blueprint/CODING-STANDARD.md`
3. `docs/architecture/DEPENDENCY-GRAPH.md`
4. `docs/architecture/DEFINITION-OF-DONE.md`
5. Relevant files under `docs/contracts/`
6. The assigned Task file

## Workflow

```text
Blueprint
  ↓
Task Contract
  ↓
Implementation
  ↓
Self Review
  ↓
Validation
  ↓
Human Review
  ↓
Merge
```

## Branch and Commit Convention

Recommended branch:

```text
codex/task-001-project-init
```

Recommended commit:

```text
feat(task-001): initialize Vite React TypeScript project
```

## Task Completion Output

Codex must return:

1. Implementation summary
2. Files created
3. Files modified
4. Tests and validation commands
5. Validation results
6. Self-review findings
7. Remaining limitations
8. Confirmation that no future task was implemented


## v4.3 execution safeguards

- Verified content originates from `content-input/`.
- Publication classification follows `PUBLICATION-SAFETY.md`.
- Browser degradation follows `docs/architecture/BROWSER-SUPPORT.md`.
- Blueprint consistency is mandatory through `scripts/validate-blueprint.py`.
- CI, unit tests, Playwright tests, deployment, and final release validation are separate tasks.
- The site has no backend by default and must not display a fake contact form.
