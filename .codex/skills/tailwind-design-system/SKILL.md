---
name: tailwind-design-system
description: Implement or review Tailwind CSS styling and the shared design system for this portfolio. Use for tokens, responsive layout, component variants, typography, spacing, glass panels, focus states, and preventing one-off visual patterns.
metadata:
  short-description: Apply consistent tokens and responsive UI
---

# Tailwind Design System

Use this skill for styling, shared primitives, layout, and visual consistency.

## Workflow

1. Read `docs/blueprint/DESIGN-TOKENS.md`.
2. Reuse existing UI primitives and semantic tokens.
3. Implement mobile-first responsive behavior.
4. Verify hover, focus-visible, active, disabled, and loading states.
5. Remove unnecessary one-off values where a token exists.

## Guardrails

- Do not invent a second color, spacing, radius, or shadow system.
- Avoid long repeated class strings; extract a primitive only when reuse is real.
- Keep blue and purple accents restrained.
- Never rely on hover as the only interaction.
- Preserve readable contrast over media.
- Use `cn()` for conditional class composition.
- Do not hide semantic HTML behind decorative wrappers.

Read `references/patterns.md` only when creating or reviewing shared variants.

