# Component Contract: ThreeDViewer

## Responsibility
Load and display one GLB asset after explicit user interaction.

## States
- poster
- loading
- ready
- error
- unsupported

## Required Features
- progress feedback
- orbit controls
- reset camera
- fullscreen
- auto-center
- auto-scale

## Rules
- Three.js bundle must be lazy-loaded.
- GLB must not load before user action.
- Mobile DPR must be constrained.
- Cleanup resources on unmount where appropriate.
- Viewer failure must not break the page.
