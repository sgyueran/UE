# Model Handling

## Framing

- Build `Box3` from the rendered object.
- Compute size and center.
- Recenter through a parent group where possible.
- Determine camera distance from maximum dimension and field of view.
- Update near/far planes with safe margins.
- Set controls target to the framed center.

## Asset Guidance

Prefer:
- GLB
- Meshopt or Draco geometry compression
- KTX2 textures
- reduced material count
- bounded texture resolution
- fewer draw calls

## Mobile

- DPR maximum around 1.5
- no default shadows
- lower environment quality
- auto-rotate off
- explicit load button
