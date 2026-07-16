# Skill Routing Map

Use skill metadata for automatic discovery. This file provides explicit task guidance.

| Task range | Primary skill | Optional supporting skill |
|---|---|---|
| 001–010 | react-typescript-architecture | tailwind-design-system |
| 004–010 | tailwind-design-system | accessibility-audit |
| 011–017 | gsap-motion-engineering | accessibility-audit |
| 018–020 | react-typescript-architecture | tailwind-design-system |
| 021–028 | ui-reference-implementation | gsap-motion-engineering |
| 029–38 | react-typescript-architecture | accessibility-audit |
| 036–37 | ui-reference-implementation | playwright-portfolio-qa |
| 038 | gsap-motion-engineering | accessibility-audit |
| 039 | react-three-fiber-viewer | frontend-performance-audit |
| 040 | frontend-performance-audit | accessibility-audit, playwright-portfolio-qa |

## Invocation Guidance

Codex should activate only skills relevant to the current Task. Do not load every skill body for every task.

Examples:

- `TASK-028`: use `gsap-motion-engineering`.
- `TASK-039`: use `react-three-fiber-viewer` and then `frontend-performance-audit`.
- UI implementation from tomorrow's recording: use `ui-reference-implementation`, then the relevant motion or design skill.
