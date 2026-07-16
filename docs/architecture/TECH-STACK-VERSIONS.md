# Technology Version Policy

The project uses **Node.js Active LTS and npm only**. TASK-001/TASK-002 must resolve compatible exact versions, commit `package-lock.json`, and record them below.

| Tool | Required Policy | Resolved Version |
|---|---|---|
| Node.js | Active LTS supported by selected Vite | 24.14.0 |
| npm | Bundled with selected Node LTS; `package-lock.json` required | 11.6.2 |
| React / React DOM | Matching exact versions | 19.2.7 / 19.2.7 |
| Vite | Compatible with Node and React | 6.4.3 |
| TypeScript | Strict mode | 5.9.3 |
| Tailwind CSS | Use the workflow required by the installed major version; do not mix legacy and current setup | 4.3.2 with `@tailwindcss/vite` 4.3.2 |
| React Router | APIs must match installed major version | TODO |
| GSAP / ScrollTrigger / Lenis | Sole animation stack; verified integration versions | TODO |
| Three.js / R3F / Drei | Mutually compatible and lazy-loaded | TODO |
| Vitest / Testing Library | Compatible with Vite and React | TODO |
| Playwright | Browsers and package version locked | TODO |

## Rules

- Use `npm ci` in CI and clean verification.
- Do not add pnpm, yarn, or bun lockfiles.
- Do not add Framer Motion; GSAP/ScrollTrigger/Lenis are the approved motion stack.
- Do not use floating `latest` in documentation or CI.
- Dependency upgrades require a dedicated task or explicit approval.
- Update this table whenever versions change.
