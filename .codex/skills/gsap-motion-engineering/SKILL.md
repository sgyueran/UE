---
name: gsap-motion-engineering
description: Build, debug, or review GSAP, ScrollTrigger, Lenis, page-transition, parallax, reveal, sticky, and horizontal-scroll interactions for this portfolio. Use when motion depends on timelines or scroll position.
metadata:
  short-description: Create safe, performant scroll motion
---

# GSAP Motion Engineering

Use for complex timelines and scroll-linked motion.

## Workflow

1. Confirm motion serves information hierarchy.
2. Read reduced-motion state before creating animations.
3. Scope setup with `gsap.context`.
4. Initialize after relevant layout and media dimensions stabilize.
5. Connect Lenis and ScrollTrigger through one integration point.
6. Kill triggers, timelines, observers, and listeners on cleanup.
7. Test route changes, browser back, resize, touch, and reduced motion.

## Guardrails

- No duplicate plugin registration.
- No forced horizontal scroll on touch devices.
- No per-frame React state.
- No broad selectors that can animate unrelated pages.
- No transition longer than the blueprint budget.
- Avoid pinning that traps keyboard or touch users.
- Use transforms and opacity over layout properties.

Read `references/recipes.md` for approved implementation shapes.

