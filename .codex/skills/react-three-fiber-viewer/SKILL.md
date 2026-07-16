---
name: react-three-fiber-viewer
description: Implement, optimize, debug, or review the lazy-loaded Three.js and React Three Fiber GLB viewer for this portfolio. Use for GLB loading, camera framing, controls, cleanup, mobile degradation, model compression, and WebGL error states.
metadata:
  short-description: Build a robust lazy GLB viewer
---

# React Three Fiber Viewer

Use this skill only for the optional project-detail GLB viewer.

## Workflow

1. Preserve poster-first behavior.
2. Load the viewer module and GLB only after explicit user action.
3. Detect unsupported WebGL and show a stable fallback.
4. Compute a bounding box, recenter the model, and frame the camera.
5. Constrain DPR and expensive effects by device capability.
6. Provide progress, ready, error, reset, and fullscreen states.
7. Dispose custom resources and release references on unmount.
8. Verify route exit while loading.

## Guardrails

- Never import Three.js into homepage modules.
- Do not enable real-time shadows by default.
- Do not assume model units, origin, scale, or orientation are correct.
- Avoid scene cloning unless required by reuse.
- Do not mutate a cached GLTF scene in ways that affect another viewer.
- Keep controls accessible through labeled buttons.
- Viewer failure must not break project content.

Read `references/model-handling.md` when implementing framing or optimization.

