# Three.js Guideline

## Requirements
- Lazy-load Three.js bundle
- Load GLB only after user action
- Display poster before loading
- Auto-center and auto-scale models
- Provide loading progress and error state
- Disable expensive shadows on mobile
- Use `dpr={[1, 1.5]}` on mobile-friendly scenes

## Asset Targets
- Prefer GLB
- Target under 50MB
- Max 100MB
- Use Draco, Meshopt, KTX2 where possible
