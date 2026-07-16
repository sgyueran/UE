# JieJoe Reference Audit

## Scope

Reference: `https://www.jiejoe.com/home`

This audit records reusable interaction principles only. It does not authorize copying the reference site's layout, visual identity, typography, colors, copy, assets, animation choreography, or component structure.

## Structure

### Keep

- Strong first-viewport orientation.
- A route from homepage overview to deeper project detail.
- Full-screen navigation as a deliberate scene rather than a small drawer.
- Fixed contact access that remains easy to find.
- Scroll narrative with alternating dense and quiet moments.

### Simplify

- Translate high contrast, large type rhythm, and visual pauses into a restrained UE5 engineering language.
- Keep project entry points clearer than the reference so recruiters and engineers can immediately identify what is clickable.
- Use fewer simultaneous visual layers on mobile.

### Reject

- External logo, copy, illustration, brand marks, custom graphics, and proprietary assets.
- The reference site's exact page composition, specific project layout, color proportions, typography, and animation timing.
- Any visual treatment that makes this portfolio feel like a visual-design portfolio instead of a UE5 engineering portfolio.

## Interaction

### Navigation

- Observed principle: the menu behaves as a full-screen overlay and changes the user's mode.
- UE5 adaptation: treat navigation as a viewport-state change with route hierarchy, current-location feedback, contact/resume access, Escape support, and focus restoration.
- Guardrail: navigation must work instantly without animation and must never hide contact.

### Project Entry

- Observed principle: strong visual rhythm invites exploration.
- UE5 adaptation: use verified project media, system labels, and concise role/problem metadata to make each entry's value clear.
- Guardrail: project cards and list items need obvious active, hover, focus, and selected states.

### Scroll Rhythm

- Observed principle: high-impact sections are separated by visual pauses.
- UE5 adaptation: alternate scene statement, project evidence, quiet technical explanation, and rest.
- Guardrail: motion must not obscure responsibilities, technical depth, or evidence.

### Route Continuity

- Observed principle: independent routes can feel like related scenes.
- UE5 adaptation: maintain continuity through route labels, viewport-grid fragments, project media, and consistent motion timing.
- Guardrail: page transitions remain under 900 ms and must not hide loading or errors.

## Adaptation Decision

### Keep

- Strong orientation before spectacle.
- Scene-like navigation.
- A clear overview-to-detail path.
- Fixed contact availability.
- Intentional pacing with exploration and rest.

### Simplify

- Contrast becomes near-black canvas, off-white text, restrained Unreal-inspired blue, and project-media color.
- Large typography becomes role clarity and readable hierarchy, not decorative shouting.
- Visual pauses become space for verified technical explanation.

### Reject

- Copying the reference site's layout, colors, typography, animations, assets, illustrations, and wording.
- Using a similar fluorescent color ratio.
- Making categories or project filters visually ambiguous.
- Allowing contact or menu layers to compete in z-order.

## Mobile Behavior

- Mobile must be independently authored, not a compressed desktop.
- The first viewport may keep strong impact, but it must not create real horizontal overflow at 375 px.
- Touch targets must be large enough for navigation, project entry, filter selection, contact, and resume access.
- Hover-only project metadata must have tap or scroll alternatives.
- Project filters must have a clear selected state.
- Motion should be reduced to the few transitions that preserve orientation.

## Accessibility And Performance Guardrails

- Menu opens with focus moved inside and closes with Escape.
- Current route, active category, selected filter, and clickable project states must be perceivable without color alone.
- Reduced-motion mode must preserve content, navigation, and project evidence.
- ScrollTrigger or smooth scrolling cannot hijack native navigation, anchors, or keyboard scroll.
- Homepage initial bundle must not include Three.js.
- Media must be verified, lazy-loaded where appropriate, and paired with alt text or captions before public release.

## UE5 Portfolio Translation

- Use real project media as the primary visual evidence.
- Use Blueprint relationship expression only when it explains architecture.
- Use viewport and scene language for orientation, not as a fake Unreal Editor shell.
- Use profiling captures, constraints, and system diagrams as proof when available.
- Preserve `TODO(USER_INPUT)` for missing evidence instead of replacing it with vague claims.
