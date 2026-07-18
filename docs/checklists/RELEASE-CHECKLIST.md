# Release Checklist

- Release candidate commit: `807ff8fbf6a3bbb7d2181295a2b0dbdb357d4b24`
- Branch: `codex/SPRINT-08-quality-ci-deployment`
- Validation date (UTC): 2026-07-18

## Status summary

- TASK completion: 51 / 51 — PASS
- Sprint completion: 8 / 8 — PASS
- inProgress: null — PASS
- releaseReady: true — PASS

## Gates

| Gate | Status | Evidence |
| --- | --- | --- |
| Product/content safety | PASS | Publication validator: 0 TODO(USER_INPUT), 0 private leaks in dist/public |
| Publication status | PASS | All public surfaces verified; unavailable states render safe copy only |
| Build reproducibility | PASS | `npm ci` + `npm run build` from clean dependencies, dist 631,609 B |
| Unit/component tests | PASS | Vitest 78/78 across 13 files |
| E2E | PASS | Playwright 20/20 (5 smoke, 11 critical-path, 4 visual) |
| Visual tests | PASS | 4/4 committed baselines, deterministic self-hosted font |
| Accessibility | PASS | 20 scans (5 routes x 4 viewports), 0 violations, 0 structure issues |
| SEO metadata | PASS | Per-route title/description/canonical/OG/Twitter; intentional noindex preview |
| Asset path audit | PASS | All resources under `/UE/`; 0 root `/assets/`; 0 `/UE/UE/` |
| Font self-hosting | PASS | 7 bundled Inter Variable woff2 via `/UE/assets/`, 0 external font requests |
| Deployment config | PASS | Static audit of nginx fragment, smoke script, release/rollback docs |
| Rollback | PASS | Atomic symlink swap documented, no rebuild required |
| Secret scan | PASS | No private keys, tokens, passwords, or credentials in publishable trees |
| Remote CI | PASS | Run 29648730192 at headSha 807ff8fb, all jobs success |
| Production domain binding | OPERATOR GATE | Required before production traffic |
| 1Panel TLS issuance | OPERATOR GATE | Required before production traffic |
| Target server `nginx -t` | OPERATOR GATE | Local nginx/docker unavailable; run on 1Panel before reload |
| Production smoke check | OPERATOR GATE | Run `deploy/smoke-check.sh "$DEPLOY_BASE_URL"` after first release |
| Media byte-range check | OPERATOR GATE | Optional until verified public media exists |

Status values used in this checklist: PASS, FAIL, NOT APPLICABLE, OPERATOR GATE. No gate is marked PASS without executed evidence.
