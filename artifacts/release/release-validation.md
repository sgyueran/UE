# Release Validation Report

- Validation timestamp (UTC): 2026-07-18T15:32:23Z
- Release candidate SHA: `807ff8fbf6a3bbb7d2181295a2b0dbdb357d4b24`
- Branch: `codex/SPRINT-08-quality-ci-deployment`
- Node.js: v24.18.0
- npm: 11.16.0
- Python: 3.11.9
- Playwright: 1.61.1 (chromium 149.0.7827.55)
- axe-core/playwright: 4.12.1

## Executed commands and results

| Command | Result |
| --- | --- |
| `python scripts/validate-blueprint.py` | PASS (51 tasks, 7 profiles, 10 skills) |
| `python scripts/validate-skills.py` | PASS (10 skills) |
| `python scripts/validate-sprints.py` | PASS (8 sprints, 51 tasks) |
| `npm ci` | PASS (342 packages, 0 vulnerabilities) |
| `npm run lint` | PASS (0 warnings, 0 errors) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS (93 modules, dist 631,609 B) |
| `npm run test -- --run` | PASS (78 tests, 13 files) |
| `npm run test:e2e` | PASS (20 tests: 5 smoke, 11 critical-path, 4 visual) |
| `npm run validate:publication` | PASS (0 TODO, 0 invalid URLs, 0 root /assets/, 0 /UE/UE/, 0 leaks, 0 secrets) |
| `node scripts/accessibility-audit.mjs` | PASS (20 scans, 0 critical/serious/moderate/minor, 0 structure issues) |
| `bash -n deploy/smoke-check.sh` | PASS (Git Bash syntax check) |
| `git diff --check` | PASS |

## Test counts

- Vitest: 78 passed / 78
- Playwright: 20 passed / 20
- Visual baselines: 4 passed / 4
- Accessibility scans: 20 (5 routes x 4 viewports), 0 violations

## Remote CI evidence

- Pre-validation run: `29648730192`
- headSha: `807ff8fbf6a3bbb7d2181295a2b0dbdb357d4b24` (exact match)
- Quality checks: success (validators, lint, typecheck, Vitest 78/78, build, publication safety)
- Browser and visual checks: success (Playwright 20/20, accessibility 20 scans 0 violations)
- Aggregate: playwright=success, accessibility=success
- URL: https://github.com/sgyueran/UE/actions/runs/29648730192

## Publication validator output

- scannedFiles: 15
- distSizeBytes: 631,609
- publicTodoUserInput: 0
- invalidPublicUrls: 0
- rootAssetsReferences: 0
- githubPagesAssetReferences: 9
- duplicateBasePathReferences: 0
- privateContentLeaks: 0
- secretsExposed: 0

## Placeholder and security scan (repository + dist)

- TODO(USER_INPUT): docs/template occurrences only (generated context and content-input templates; intentional content-gate marker). Zero in dist/public rendered output.
- example.com: test fixtures validating rejection. Test-only.
- localhost / 127.0.0.1: validator blocklists (expected implementation), local test evidence in audit JSONs, compiled blocklist regexes inside the bundle (implementation text).
- /UE/UE/: detection patterns in validators, smoke script, and tests. Zero actual occurrences.
- FIXME / CHANGEME / YOUR_DOMAIN / private key headers: zero occurrences.
- Secret-like patterns: one GitHub Actions secret reference (`${{ secrets.OPENCODE_API_KEY }}`) and its documentation mention. Reference only, no secret value.
- Local absolute paths (Windows or Unix): zero in publishable trees.
- Blocking occurrences in publishable content: NONE.

## Bundle evidence

No optimization change in this task; final measured release evidence only.

| Asset | Bytes | Gzip (reported by Vite) |
| --- | --- | --- |
| index-*.js (initial) | 346,662 | 118.00 kB |
| index-*.css | 35,662 | 7.61 kB |
| ProjectDetailPage-*.js (lazy) | 21,330 | 5.00 kB |
| ProjectsPage-*.js (lazy) | 4,790 | 1.66 kB |
| AboutPage-*.js (lazy) | 2,021 | 0.91 kB |
| NotFoundPage-*.js (lazy) | 724 | 0.41 kB |
| Inter Variable woff2 x7 | 219,532 total | n/a (binary) |
| dist total | 631,609 | — |

- Three.js / R3F / Drei in initial chunk: absent (lazy dynamic import only).
- Source maps: 0.
- External font URLs: 0.

## Deployment configuration audit

- nginx/ue-portfolio.conf: root `/var/www/ue-portfolio/current`; `/` redirect to `/UE/` with query preserved; SPA fallback via named location; HTML no-store/no-cache; `/UE/assets/` one-year immutable with 404 on miss; media 30-day cache with `Accept-Ranges: bytes`; gzip for text types only; no domains, no certificate paths, no secrets.
- Nginx syntax validation: NOT EXECUTED (nginx and docker unavailable on the validation machine). Static checks all passed. This is an OPERATOR GATE on the target 1Panel host.
- Live deployment smoke check: NOT EXECUTED (no production URL exists yet). OPERATOR GATE.
- deploy/smoke-check.sh: bash -n PASS; failure paths verified (missing argument, non-HTTP URL, wrong base suffix all exit 1 with clear messages).

## Final conclusion

All repository-level release gates and the remote CI gate pass. Remaining items are operator-only production gates (domain binding, TLS issuance, target-host `nginx -t`, production smoke check, optional media range check). Verdict: PASS for repository release validation.
