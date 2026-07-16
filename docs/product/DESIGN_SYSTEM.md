# Design System

## Design character

The visual system should be:

- cinematic;
- technical;
- controlled;
- premium;
- spatial;
- readable.

Avoid:

- generic cyberpunk neon;
- excessive glassmorphism;
- glowing dashboard cards;
- decorative HUD styling;
- visual noise.

## Core metaphor

Use the Unreal viewport as inspiration, not the full Unreal Editor.

The visitor should feel they are moving through authored scenes and evidence layers—not operating a fake tool.

## Color system

Use semantic roles:

```text
Canvas       near-black neutral
Surface      elevated charcoal
Text         neutral off-white
Muted text   cool gray
Primary      restrained Unreal-inspired blue
Signal       optional amber or cyan
Danger       reserved red
```

Rules:

- use one main accent color;
- let project imagery provide most visual color;
- keep text contrast readable;
- never use several competing neon colors;
- reserve status colors for real state.

## Typography

### Display

Use a modern geometric or grotesk sans.

Required qualities:

- strong silhouette;
- readable at large sizes;
- not overly futuristic;
- suitable for Chinese and English when bilingual.

### Body

Use a neutral sans-serif with:

- comfortable line height;
- moderate line length;
- clear hierarchy.

### Technical metadata

Use restrained monospace for:

- engine version;
- system category;
- profiling metrics;
- coordinates;
- implementation labels;
- status markers.

Do not use monospace for long paragraphs.

## Layout

### Desktop

- scene-based sections;
- generous breathing room;
- one dominant message per section;
- one dominant action per section;
- wide media, narrow narrative copy.

### Mobile

Mobile is not a scaled-down desktop.

Use:

- touch-first interactions;
- shorter text blocks;
- media-first project previews;
- fewer simultaneous visual layers;
- no hover dependency;
- simplified motion.

## Depth

Create depth through:

- scale;
- overlap;
- focus;
- media layering;
- lighting;
- soft parallax;
- foreground/background relationships.

Avoid relying only on blur and shadow.

## Components

### Buttons

Primary:

- obvious action;
- compact label;
- visible focus;
- restrained pointer-only magnetic effect.

Secondary:

- subtle outline or text;
- lower visual weight;
- no competition with primary CTA.

### Panels

Use panels only when information requires grouping.

Do not turn every section into a card.

### Project previews

Priority:

1. project media;
2. role or ownership;
3. problem or result;
4. Unreal Engine domains;
5. supporting metadata.

## UE visual translation

Appropriate:

- subtle world-grid fragments;
- Blueprint-like relationship lines;
- viewport markers;
- transform or camera labels;
- material-layer textures;
- profiling and debug evidence.

Inappropriate:

- fake editor windows everywhere;
- tiny unreadable Blueprint nodes;
- copied Unreal icons or proprietary assets;
- HUD styling for normal navigation;
- decorative profiler graphs with fake data.
