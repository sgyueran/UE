# Codex Repository Instructions

1. Run `python scripts/task-context.py TASK-XXX --write` and read the generated context before editing.
2. Complete one task only unless an authorized batch passes `scripts/task-batch.py` checks.
3. Edit only the task allowlist; preserve unknown pre-existing changes.
4. Never invent portfolio facts. Use verified `content-input/` values or `TODO(USER_INPUT)`.
5. Use npm, Node.js Active LTS, GSAP/ScrollTrigger/Lenis, and no Framer Motion.
6. Keep Three.js out of the homepage initial bundle and provide documented fallbacks.
7. Use `scripts/project-state.py`; never claim an unexecuted validation passed.
8. Completion reports must be compact and factual. Do not restate the task or explain code visible in the diff.
9. Do not commit or push unless explicitly authorized.
10. Recover from project state, generated task context, dependency JSON, and Git—not chat history.

## Read Routing

- Every task: generated context + assigned Task Profile.
- UI: design tokens and relevant page contract only.
- Data/content: content integrity and input templates only.
- Motion: motion contract only.
- 3D/media: media fallback and viewer contract only.
- Release: deployment/security documents only.
- Read the Master Blueprint only for first entry, recovery, architecture conflicts, or final release.
