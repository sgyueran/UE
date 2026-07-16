---
name: accessibility-audit
description: Audit and fix accessibility for this portfolio. Use for semantic HTML, keyboard navigation, focus management, contrast, reduced motion, custom cursor behavior, media controls, menus, lightboxes, and automated accessibility checks.
metadata:
  short-description: Verify keyboard, semantics, focus, and motion
---

# Accessibility Audit

Use this skill for UI reviews and before release.

## Workflow

1. Navigate the affected flow using keyboard only.
2. Inspect semantic landmarks and heading order.
3. Verify visible focus and logical focus order.
4. Test mobile menu, lightbox, fullscreen, and transition focus behavior.
5. Check text contrast over every media state.
6. Verify reduced-motion behavior.
7. Test media labels, alt text, and control names.
8. Run available automated checks, then manually verify findings.

## Guardrails

- Do not add ARIA when native HTML already provides semantics.
- Do not remove outlines without an equal or better focus indicator.
- Custom cursor must never replace focus feedback.
- Hidden content must not remain focusable.
- Route changes must produce a sensible focus destination.
- Motion must not be required to understand content.

Read `references/manual-checks.md` for the release pass.

