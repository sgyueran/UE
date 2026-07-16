# Motion Guidelines

## Direction

Borrow the reference site's confidence, pacing, and scene continuity—not its exact animations.

Motion should feel:

- authored;
- smooth;
- spatial;
- responsive;
- restrained.

## Purpose

Every animation must serve at least one purpose:

- orientation;
- hierarchy;
- continuity;
- feedback;
- focus;
- spatial relationship.

If none apply, remove it.

## Experience rhythm

```text
Pause
→ Prompt
→ Explore
→ Reward
→ Rest
```

Do not animate every item at once.

## Timing

### Micro feedback

- 100–220 ms

### UI reveal

- 220–420 ms

### Menu or section transition

- 400–700 ms

### Major scene transition

- generally under 900 ms

Longer sequences must never block navigation.

## Easing

Prefer natural acceleration and deceleration.

Avoid:

- constant-speed movement;
- repeated elastic bounce;
- excessive overshoot;
- different easing styles for every component.

## Full-screen menu

Suggested sequence:

1. background or spatial layer establishes context;
2. destinations appear in readable order;
3. secondary information follows;
4. focus moves into the menu.

Closing should be faster than opening.

## Scroll

Smooth scrolling is allowed only when it preserves:

- native navigation expectations;
- anchor behavior;
- keyboard operation;
- reduced-motion mode;
- scroll restoration.

Never hijack scrolling.

## Project interaction

### Desktop

- responsive project media;
- concise metadata reveal;
- controlled scale or depth;
- no cursor effect that reduces readability.

### Mobile

- tap or natural-scroll reveals;
- no hover-only content;
- no multiple heavy autoplay videos;
- clear play/pause controls where needed.

## Page transitions

Requirements:

- route changes remain reliable;
- loading and transition states are distinct;
- errors are not hidden;
- focus is managed;
- back navigation avoids replaying full intro sequences.

## Reduced motion

When `prefers-reduced-motion: reduce`:

- remove parallax;
- remove cursor-following;
- shorten or remove spatial transitions;
- preserve opacity or instant state changes;
- keep all content and controls available.

## Performance

- prefer transform and opacity;
- avoid layout-heavy continuous animation;
- pause effects outside viewport;
- clean up GSAP contexts and listeners;
- avoid Three.js for decorative motion;
- reduce concurrent effects on mobile.

## Prohibited patterns

- mandatory intro sequence;
- scroll lock without escape;
- autoplay audio;
- repeated glitch effects;
- excessive neon pulses;
- multiple magnetic elements in one viewport;
- motion used to conceal loading latency.
