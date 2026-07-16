# Global Definition of Done

A Task is complete only when all applicable conditions are satisfied.

## Code Quality

- [ ] TypeScript strict mode passes
- [ ] No `any`
- [ ] No unused imports or dead code
- [ ] No unrelated file changes
- [ ] Public APIs are typed
- [ ] Naming follows project conventions
- [ ] Components remain focused and reviewable

## UI

- [ ] Mobile layout verified
- [ ] Tablet layout verified
- [ ] Desktop layout verified
- [ ] Loading, empty, and error states exist where applicable
- [ ] Focus state is visible
- [ ] Text contrast is acceptable

## Motion

- [ ] Reduced-motion behavior exists where applicable
- [ ] GSAP contexts are cleaned up
- [ ] ScrollTriggers are killed on unmount
- [ ] No animation blocks navigation
- [ ] Mobile motion is appropriately reduced

## Performance

- [ ] No unnecessary initial bundle growth
- [ ] Images use optimized formats
- [ ] Videos use posters and controlled preload
- [ ] Three.js remains lazy-loaded
- [ ] No per-frame React state updates

## Validation

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Relevant tests pass
- [ ] Codex self-review completed
