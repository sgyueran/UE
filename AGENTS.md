# Codex Repository Instructions

1. Run `python scripts/task-context.py TASK-XXX --write --inspect` and read the generated context before editing.
2. Complete one task only unless an authorized batch passes `scripts/task-batch.py`.
3. Modify only Allowed Files and preserve unknown user changes.
4. Never invent portfolio facts; use verified `content-input/` values or `TODO(USER_INPUT)`.
5. Use npm, Node.js Active LTS, GSAP/ScrollTrigger/Lenis, and no Framer Motion.
6. Keep Three.js out of the homepage initial bundle and provide documented fallbacks.
7. Use `scripts/project-state.py`; never claim an unexecuted validation passed.
8. Reports must be compact and factual.
9. Never force-push or commit directly to `main`.
10. Recover from repository evidence, not chat history.
11. Sprint Workflow is planning-only; read `.codex/policies/sprint.policy.md` before Sprint work.
12. Product documents guide interpretation only; they do not override Task Allowed Files or authorize implementing future Tasks early.

## Workflow authority

Read `.codex/policies/workflow.policy.md` for every task.

Route by outcome:

- Execution: `.codex/policies/execute.policy.md`
- Review: `.codex/policies/review.policy.md`
- REQUEST CHANGES: `.codex/policies/request-changes.policy.md`
- APPROVE: `.codex/policies/approve.policy.md`
- Recovery: `.codex/policies/recovery.policy.md`
- Merge: `.codex/policies/merge.policy.md`
- Visual milestone: `.codex/policies/visual-review.policy.md`
- Sprint planning: `.codex/policies/sprint.policy.md`

## Context routing

- Every task: generated context + assigned Task Profile.
- UI: design tokens and relevant page contract only.
- Data/content: content integrity and input templates only.
- Motion: motion contract only.
- 3D/media: media fallback and viewer contract only.
- Release: deployment/security documents only.
- Read the Master Blueprint only for first entry, recovery, architecture conflicts, or final release.
- Sprint context may summarize multiple tasks, but it does not authorize multi-task execution by itself.

## Product authority routing

- UI Tasks must read `docs/product/PRODUCT_VISION.md`, `docs/product/DESIGN_SYSTEM.md`, `docs/product/UX_PRINCIPLES.md`, and `docs/product/DO_NOT_BREAK.md`.
- Content Tasks must read `docs/product/CONTENT_STRATEGY.md` and `docs/product/DO_NOT_BREAK.md`.
- Motion and navigation Tasks must read `docs/product/MOTION_GUIDELINES.md`, `docs/product/REFERENCE_TRANSLATION.md`, `docs/product/UX_PRINCIPLES.md`, and `docs/product/DO_NOT_BREAK.md`.
- Product documents cannot override Task Allowed Files and cannot authorize early implementation of future Tasks.
