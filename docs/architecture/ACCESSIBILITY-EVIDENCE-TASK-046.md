# TASK-046 Accessibility Evidence

## Test environment

- OS: Windows (win32)
- Node.js: v24.18.0
- npm: 11.16.0
- Vite: 6.4.3
- Playwright: 1.61.1 (chromium, headless)
- @axe-core/playwright: 4.12.1
- axe-core rules: wcag2a, wcag2aa, wcag21a, wcag21aa
- Build command: `npm run build` (production)
- Preview: `npm run preview -- --host 127.0.0.1 --port 4173`
- Base path: `/UE/`
- Measurement type: local production preview + automated axe scan + static structure checks
- Real public deployment metrics: NOT RUN
- Real screen reader testing: NOT RUN
- Real user testing: NOT RUN

## Audit script

`scripts/accessibility-audit.mjs` — launches chromium via Playwright, navigates each route at each viewport with `reducedMotion: "reduce"`, runs AxeBuilder with WCAG 2.1 A/AA tags, and checks structural assertions.

### Run

```bash
npm run build
node scripts/accessibility-audit.mjs              # writes after JSON
AUDIT_PHASE=before node scripts/accessibility-audit.mjs  # writes before JSON
```

### Routes audited

- `/UE/` (home)
- `/UE/projects`
- `/UE/about`
- `/UE/projects/non-existent-project`
- `/UE/definitely-not-a-real-route` (404)

### Viewports

- Desktop 1440×900
- Tablet 768×1024
- Mobile 375×812
- Mobile 320×568

### Total scans

20 route × viewport combinations.

## BEFORE remediation

### Axe totals

| Impact | Count |
|--------|-------|
| Critical | 0 |
| Serious | 4 |
| Moderate | 0 |
| Minor | 0 |

### Violations

All 4 serious violations were `color-contrast` on the Home route across all 4 viewports:

- **Rule**: `color-contrast` (wcag2aa, wcag143)
- **Element**: `.border-primary` — CTA button with `bg-primary` (#3b82f6) + `text-white` (#ffffff)
- **Contrast**: 3.67:1 (expected ≥ 4.5:1 for normal text)
- **Affected routes**: home @ desktop-1440, home @ tablet-768, home @ mobile-375, home @ mobile-320

### Structure checks

All structure checks passed before remediation:
- h1 count: 1 per page ✅
- main landmark: present ✅
- nav landmark: present with aria-label ✅
- header/footer landmarks: present ✅
- No empty links ✅
- No buttons without accessible names ✅
- No images without alt ✅
- No duplicate IDs ✅
- No TODO(USER_INPUT) in rendered output ✅
- No horizontal overflow at any viewport ✅
- No page errors ✅

## Remediation applied

### 1. Color contrast fix

**Problem**: `--color-primary: #3b82f6` (blue-500) used as both text color and button background. White text on blue-500 button = 3.67:1 (FAIL).

**Fix**: Split the primary color into two tokens:
- `--color-primary: #3b82f6` — retained for text (`text-primary`) and decorative elements. Contrast on background #09090b = 5.37:1 ✅
- `--color-primary-strong: #1e40af` — new token for button backgrounds. White text on #1e40af = 8.1:1 ✅

**Files changed**:
- `src/styles/global.css` — added `--color-primary-strong: #1e40af`
- `src/components/ui/Button.tsx` — `bg-primary` → `bg-primary-strong`
- `src/components/interaction/MagneticButton.tsx` — `bg-primary` → `bg-primary-strong`
- `src/features/home/HomeHero.tsx` — CTA button `bg-primary` → `bg-primary-strong`
- `src/features/home/HomeContactResume.tsx` — contact/resume buttons `bg-primary` → `bg-primary-strong`
- `src/features/projects/ProjectsListing.tsx` — filter buttons `bg-primary` → `bg-primary-strong`

### 2. Landmark structure fix

**Problem**: `PublicLayout` had `<div id="main-content">` wrapping page `<main>` elements, creating nested main landmarks or missing main landmark on the skip-link target.

**Fix**: Changed `<div id="main-content">` to `<main id="main-content">` in `PublicLayout`. Removed `<main>` from all page components (HomePage, ProjectsPage, ProjectDetailPage, NotFoundPage, AboutNarrative, ErrorBoundary, Suspense fallback) and replaced with `<div>` to avoid nested main landmarks.

**Files changed**:
- `src/layouts/PublicLayout.tsx` — `<div id="main-content">` → `<main id="main-content" ref={mainRef}>`
- `src/pages/HomePage.tsx` — `<main>` → `<div>`
- `src/pages/ProjectsPage.tsx` — `<main>` → `<div>`
- `src/pages/ProjectDetailPage.tsx` — `<main>` → `<div>`
- `src/pages/NotFoundPage.tsx` — `<main>` → `<div>`
- `src/features/about/AboutNarrative.tsx` — `<main>` → `<div>`
- `src/app/ErrorBoundary.tsx` — `<main>` → `<div>`

### 3. Route focus management

**Problem**: Client-side route changes did not move focus, leaving keyboard users at the previous page's last focused element.

**Fix**: Added `useRef` for main element and `useEffect` on path change that finds the page's `h1`, sets `tabindex="-1"`, and focuses it with `preventScroll: true`. This moves focus to the page heading without scrolling jitter.

**Files changed**:
- `src/app/router.tsx` — added mainRef, focus management useEffect
- `src/layouts/PublicLayout.tsx` — added mainRef prop

### 4. Suspense fallback accessibility

**Problem**: Suspense fallback used `<main>` (creating duplicate main landmark during loading) and lacked ARIA live region semantics.

**Fix**: Changed `<main>` to `<div role="status" aria-live="polite">` so screen readers announce the loading state without creating a landmark conflict.

**Files changed**:
- `src/app/router.tsx` — Suspense fallback `<main>` → `<div role="status" aria-live="polite">`

### 5. MobileMenu focus management

**Problem**: MobileMenu opened without moving focus into the menu, and closing did not restore focus to the trigger button.

**Fix**: Added `triggerRef` and `menuRef`. On open, focus moves to the first menu link. On close (including Escape), focus restores to the trigger button.

**Files changed**:
- `src/components/navigation/MobileMenu.tsx` — added triggerRef, menuRef, focus management in useEffect

## AFTER remediation

### Axe totals

| Impact | Count |
|--------|-------|
| Critical | 0 |
| Serious | 0 |
| Moderate | 0 |
| Minor | 0 |

**Result: 0 violations across all 20 route × viewport combinations.**

### Structure checks

All structure checks passed after remediation:
- h1 count: 1 per page ✅
- main landmark: 1 per page (single, not nested) ✅
- nav landmark: present with aria-label ✅
- header/footer landmarks: present ✅
- No empty links ✅
- No buttons without accessible names ✅
- No images without alt ✅
- No duplicate IDs ✅
- No TODO(USER_INPUT) in rendered output ✅
- No horizontal overflow at 320px, 375px, 768px, 1440px ✅
- No page errors ✅

## Browser matrix

All checks via Playwright (chromium, headless, reducedMotion: "reduce"):

| Viewport | Home | Projects | About | Project 404 | Route 404 |
|----------|------|----------|-------|-------------|-----------|
| Desktop 1440 | PASS | PASS | PASS | PASS | PASS |
| Tablet 768 | PASS | PASS | PASS | PASS | PASS |
| Mobile 375 | PASS | PASS | PASS | PASS | PASS |
| Mobile 320 | PASS | PASS | PASS | PASS | PASS |

### Keyboard-only checks (code-level verification)

- Skip-to-content link: present, `sr-only focus:not-sr-only`, targets `#main-content` ✅
- All interactive elements use `<button>` or `<a>` with href ✅
- `:focus-visible` global outline (2px solid primary, offset 3px) ✅
- MobileMenu: Escape closes, focus moves to first link on open, restores to trigger on close ✅
- Lightbox: native `<dialog>` showModal(), focus to Close button on open, restore to trigger on close ✅
- Lightbox: ArrowLeft/ArrowRight navigation ✅
- Route change: focus moves to h1 with tabindex=-1 ✅
- No keyboard traps detected ✅

### Reduced-motion checks

- Playwright config: `reducedMotion: "reduce"` globally ✅
- CSS: `prefers-reduced-motion` media query (1ms duration) ✅
- HomeHero: `prefersReducedMotion` guard skips GSAP animation ✅
- HomeProjectRail: `prefersReducedMotion` guard skips scroll animation ✅
- ProjectDetail: `reducedMotion || mobileLayout` guard skips scroll narrative ✅
- ThreeDViewerCanvas: `reducedMotion` disables damping ✅
- All content visible without animation ✅

### 200% zoom

- NOT RUN as automated check (Playwright does not support browser zoom natively)
- Code-level: `body min-width: 320px`, all layout uses responsive units (rem, %, clamp), no fixed pixel widths that would break at 200%
- Manual verification required after deployment

### 320px viewport

- All 5 routes: `horizontalOverflow: false`, `docWidth: 320` ✅ (verified by audit)

## 3D Viewer accessibility

- ThreeDViewerCanvas: `role="img"` + `aria-label` + `tabIndex={0}` ✅
- Load/Reload/Reset/Fullscreen buttons: all have text labels ✅
- No-model state: static text fallback, no Canvas/WebGL created ✅
- `isUsableModel` guard prevents viewer activation when model is TODO or empty ✅
- WebGL support check before initialization ✅

## Media accessibility

- All `<img>` elements have `alt` attributes ✅
- `loading="lazy"` on gallery images and poster ✅
- No media files exist (public images/videos/GLB = 0)
- Real media accessibility: NOT RUN (no verified media assets)

## Items NOT RUN

- Real screen reader testing (NVDA, JAWS, VoiceOver): NOT RUN
- Real public deployment Lighthouse audit: NOT RUN
- Real user testing: NOT RUN
- 200% zoom automated check: NOT RUN (Playwright limitation)
- Real media caption/transcript verification: NOT RUN (no media assets)
- Cross-browser testing (Firefox, Safari): NOT RUN (only chromium available)

## Known limitations

- No verified public media assets exist; media-specific accessibility (captions, transcripts, video controls) cannot be tested against real content.
- Only chromium was tested; Firefox and Safari may have different focus/contrast behavior.
- Screen reader compatibility is inferred from semantic HTML and ARIA usage, not verified with actual AT.
- 200% zoom requires manual browser testing.

## Reproducibility

```bash
# Build production bundle
npm run build

# Run accessibility audit (writes JSON results)
node scripts/accessibility-audit.mjs

# Results file
# docs/architecture/accessibility-audit-after.json
```
