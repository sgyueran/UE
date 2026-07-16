# TASK-045 Performance Evidence

## Test environment

- OS: Windows (win32)
- Node.js: v24.18.0
- npm: 11.16.0
- Vite: 6.4.3
- Build command: `npm run build` (`tsc --noEmit --pretty false && vite build`)
- Base path: `/UE/` (GitHub Pages sub-path)
- Analysis tool: rollup-plugin-visualizer@7.0.1 (devDependency, enabled via `ANALYZE=true`)
- Measurement type: local production build + static bundle analysis
- Real public deployment metrics: NOT RUN
- Real user / field metrics: NOT RUN
- Lighthouse: NOT RUN (no public deployment; local preview not equivalent to real user performance)

## Commands executed

```bash
npm run build           # before
npm run build           # after (optimization)
ANALYZE=true npm run build  # stats.html generation
```

## BEFORE (TASK-044 checkpoint, commit c5a807b)

### Build output

| File | Raw size | Gzip size |
|------|----------|-----------|
| dist/index.html | 0.42 kB | 0.28 kB |
| dist/assets/index-CV0qaGm2.css | 33.39 kB | 6.96 kB |
| dist/assets/index-ad-VyS5q.js | 374.60 kB | 123.24 kB |
| **dist total** | **409,858 B** | — |

### Initial bundle

- JS chunks: **1** (single chunk, no code splitting)
- Initial JS raw: 374,604 B
- Initial JS gzip: ~123,240 B
- React + react-dom: included in initial chunk
- GSAP: included in initial chunk (static import from HomeHero, HomeProjectRail)
- ScrollTrigger: included in initial chunk (static import from HomeProjectRail)
- Lenis: absent (not bundled)
- Three.js core: absent (dynamic import in ThreeDViewer.tsx)
- @react-three/fiber: absent (dynamic import)
- @react-three/drei: absent (dynamic import)
- WebGL context creation code: absent

### Routes

- All routes (Home, Projects, Project detail, About, 404) loaded in the single initial JS chunk.
- No route-level lazy loading.
- Route transition did not fetch additional JS.

### Public media

- public/images: 0
- public/videos: 0
- public/models (GLB): 0
- src/assets: directory does not exist
- Fonts: 0 @font-face declarations, 0 url() references in CSS, 0 preload links

### Build warnings

```
(!) gsap/index.js is dynamically imported by ProjectDetail.tsx but also
    statically imported by HomeHero.tsx, HomeProjectRail.tsx —
    dynamic import will not move module to another chunk.
(!) gsap/ScrollTrigger.js is dynamically imported by ProjectDetail.tsx but also
    statically imported by HomeProjectRail.tsx —
    dynamic import will not move module to another chunk.
```

### Path integrity

- Root `/assets/` references: 0
- Duplicate `/UE/UE/` references: 0
- `/UE/` base path references in index.html: 2 (script + stylesheet)

## AFTER (TASK-045 optimization)

### Build output

| File | Raw size | Gzip size |
|------|----------|-----------|
| dist/index.html | 0.42 kB | 0.28 kB |
| dist/assets/index-CV0qaGm2.css | 33.39 kB | 6.96 kB |
| dist/assets/index-BzWHrsvD.js | 345.90 kB | 117.72 kB |
| dist/assets/ProjectsPage-BkyGFYfb.js | 4.78 kB | 1.65 kB |
| dist/assets/ProjectDetailPage-BHALHlkw.js | 21.33 kB | 5.01 kB |
| dist/assets/AboutPage-ImMCg53o.js | 2.02 kB | 0.91 kB |
| dist/assets/NotFoundPage-CIccO0bt.js | 0.73 kB | 0.42 kB |
| **dist total** | **408,066 B** | — |

### Initial bundle (Home route)

- Initial JS chunk: `index-BzWHrsvD.js` = 345,900 B (gzip 117,720 B)
- React + react-dom: included in initial chunk
- GSAP + ScrollTrigger: included in initial chunk (Home Hero animation requires GSAP on first paint)
- Lenis: absent
- Three.js core: absent (dynamic import in ThreeDViewer.tsx)
- @react-three/fiber: absent (dynamic import)
- @react-three/drei: absent (dynamic import)
- WebGL context creation code: absent

### Route-level chunks (lazy, fetched on navigation)

| Route | Chunk | Raw | Gzip |
|-------|-------|-----|------|
| /projects | ProjectsPage-BkyGFYfb.js | 4,780 B | 1,650 B |
| /projects/:slug | ProjectDetailPage-BHALHlkw.js | 21,330 B | 5,010 B |
| /about | AboutPage-ImMCg53o.js | 2,020 B | 910 B |
| * (404) | NotFoundPage-CIccO0bt.js | 730 B | 420 B |

### Bundle composition checks

- Three.js core in initial index chunk: NO
- @react-three/fiber in initial index chunk: NO
- @react-three/drei in initial index chunk: NO
- OrbitControls / useGLTF in initial index chunk: NO
- Three.js in ProjectDetail chunk: NO
- R3F/Drei in ProjectDetail chunk: NO (remains in dynamic ThreeDViewerCanvas import)
- GSAP in ProjectDetail chunk: YES (static import, expected — chunk is lazy-loaded)
- ScrollTrigger in ProjectDetail chunk: YES (static import, expected)
- ThreeDViewerCanvas in ProjectDetail chunk: NO (remains dynamic import, loaded on user action)

### Build warnings

```
(none)
```

The previous GSAP dynamic/static import conflict warning is resolved.

### Path integrity

- Root `/assets/` references (not `/UE/assets/`): 0
- Duplicate `/UE/UE/` references: 0
- `/UE/` base path: present in script, stylesheet, and modulepreload links

## Delta

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| JS chunk count | 1 | 5 | +4 (route-level code splitting) |
| dist total (raw) | 409,858 B | 408,066 B | -1,792 B |
| Initial JS chunk raw | 374,604 B | 345,900 B | -28,704 B (-7.7%) |
| Initial JS chunk gzip | ~123,240 B | 117,720 B | -5,520 B (-4.5%) |
| Route /projects extra JS | 0 B (in initial) | 4,780 B | +4,780 B (lazy) |
| Route /projects/:slug extra JS | 0 B (in initial) | 21,330 B | +21,330 B (lazy) |
| Route /about extra JS | 0 B (in initial) | 2,020 B | +2,020 B (lazy) |
| Route 404 extra JS | 0 B (in initial) | 730 B | +730 B (lazy) |
| GSAP warning | 2 | 0 | resolved |

### Initial bundle reduction explanation

The initial `index` chunk dropped from 374.60 kB to 345.90 kB because:
1. ProjectsPage, ProjectDetailPage, AboutPage, NotFoundPage are now `React.lazy` and load only on navigation.
2. The removed route code (Projects listing, Project detail with GSAP scroll narrative, About, 404) no longer parses or executes on first paint.

GSAP remains in the initial chunk because HomeHero and HomeProjectRail statically import it for first-paint Hero animation. Moving GSAP out of the initial bundle would break the Home Hero animation and is out of scope for a performance optimization task that must not change visual behavior.

Route transitions now fetch only 0.73–21.33 kB instead of re-parsing the full 374.60 kB. This is the primary user-visible improvement: faster navigation, lower parse cost per route, and smaller JavaScript execution for users who only visit one page.

## Media loading strategy

### Current state (public media = 0)

- No real images, videos, or GLB files exist in `public/` or `src/assets/`.
- No media dimensions, formats, poster use, or preload policy could be measured against real assets.
- Real media performance: NOT RUN.

### Verified safeguards

- `<img>` elements use `loading="lazy"` (verified in ProjectDetail and ThreeDViewer poster fallback).
- ThreeDViewer does not create a Canvas or WebGL context when no usable model is present (`isUsableModel` guard).
- ThreeDViewer loads `ThreeDViewerCanvas` (R3F/Drei/Three.js) only after explicit "Load model" button click.
- ThreeDViewer poster `<img>` uses `loading="lazy"`.
- Videos: no video elements are rendered when no verified media exists.
- GLB: no model fetch occurs until user action.
- No preload/prefetch hints for non-existent media.

## Optimizations applied

1. **Route-level code splitting** — ProjectsPage, ProjectDetailPage, AboutPage, NotFoundPage converted to `React.lazy` with `Suspense` fallback in `src/app/router.tsx`. HomePage remains static (critical first paint). This is the primary optimization: route transitions now fetch only 0.73–21.33 kB instead of the full 374.60 kB initial chunk.
2. **GSAP import consistency** — `ProjectDetail.tsx` changed from dynamic `import("gsap")` to static import, eliminating the Vite warning where the same module was both statically and dynamically imported. ProjectDetail is now a lazy route chunk, so GSAP no longer leaks into the initial bundle through this path, and the warning is resolved without changing visual behavior.
3. **Bundle analysis script** — `scripts/analyze-bundle.mjs` added to generate reproducible chunk analysis via `rollup-plugin-visualizer`. Run with `node scripts/analyze-bundle.mjs` (writes `dist/stats.html`). Does not affect production builds.

## Items not changed

- `vite.config.ts` was not modified (outside TASK-045 Allowed Files). Vendor chunk isolation (manualChunks) was considered but rejected to stay within Allowed Files.
- HomePage remains in the initial bundle (critical first paint; GSAP Hero animation required).
- Three.js/R3F/Drei remain dynamically imported via `ThreeDViewerCanvas` (lazy on user action).
- Lenis/SmoothScroll: no change (already absent from initial bundle).
- CSS: no change (33.39 kB, single stylesheet).
- Font loading: no change (no fonts loaded).
- SEO metadata, 404 page, sitemap, robots.txt: no change.
- Publication safety validator: no change (TASK-044 asset, continues to pass).

## Known warnings

- None after optimization.

## Real media limitation

No verified public images, videos, or GLB models exist in the repository yet. All portfolio content data remains `TODO(USER_INPUT)` or empty arrays per AGENTS.md rule 4 (no fabricated portfolio facts). Media performance optimization against real assets is NOT RUN and must be revisited after verified media is added in a future content task.

## Real public deployment status

NOT RUN. No public deployment was performed. All measurements are local production builds and static bundle analysis. Real user Core Web Vitals, Lighthouse field data, and CDN cache behavior must be measured after deployment.

## Reproducibility

```bash
# Standard build (production)
npm run build

# Generate visualizer report (does not affect production build)
node scripts/analyze-bundle.mjs
# open dist/stats.html
```
