# UX Principles

## 1. Orientation before spectacle

Before introducing complex motion, every scene must answer:

- where am I?
- what is this?
- what can I do next?

The first viewport must include:

- UE5 role;
- concise value statement;
- primary project action;
- visible navigation;
- contact or resume path.

## 2. Navigation is a destination

The full-screen menu may behave like a complete scene instead of a small drawer.

It must:

- show destinations clearly;
- indicate current location;
- expose contact and availability;
- close with Escape;
- restore focus;
- work without animation;
- never delay navigation.

## 3. Scene transitions, not waiting screens

Transitions may feel like changing a scene or camera state.

They must not:

- hide slow loading;
- block access to content;
- replay unnecessarily;
- trap keyboard users;
- replace error handling.

## 4. Interaction must reveal meaning

Interaction should reveal:

- project preview;
- implementation detail;
- optimization evidence;
- architecture relationships;
- before/after results.

Do not add interaction only to move objects.

## 5. Alternate density and rest

Use:

```text
Statement
→ Rich project evidence
→ Quiet transition
→ Technical detail
→ Rest
```

Avoid several dense animated sections in sequence.

## 6. Mobile is independently authored

Mobile should preserve identity with different mechanics:

- full-screen menu choreography;
- large touch targets;
- simple project entry;
- shorter text;
- reduced media;
- fewer concurrent effects;
- no critical hover-only information.

## 7. Evidence over claims

Replace generic claims with verified evidence:

- frame time;
- memory reduction;
- draw-call reduction;
- profiling capture;
- architecture diagram;
- technical constraint;
- ownership and outcome.

Use `TODO(USER_INPUT)` when evidence is missing.

## 8. Progressive disclosure

First layer:

- what the project is;
- why it matters;
- what the user owned.

Second layer:

- implementation;
- challenge;
- optimization;
- result.

Third layer:

- diagrams;
- profiling;
- code excerpts;
- extended media.

## 9. Accessibility is part of direction

Required:

- visible focus;
- keyboard navigation;
- semantic headings;
- readable contrast;
- reduced-motion behavior;
- captions or alternatives for important video;
- no information encoded only by motion or color.

## 10. Contact is frictionless

Contact must be reachable:

- from main navigation;
- after a project story;
- near the final section;
- without completing an animation sequence.
