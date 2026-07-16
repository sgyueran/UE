# UI Guideline

## Core Components
- Button
- MagneticButton
- Badge
- GlassPanel
- SectionTitle
- ProjectCard
- ProjectListItem
- HeroMedia
- ProjectHero
- ProjectGallery
- ProjectVideo
- ThreeDViewer
- NextProjectPanel

## Responsive
- Mobile: single column
- Tablet: two columns where appropriate
- Desktop: editorial layouts
- Wide: max content width 1440px

## Accessibility
- Visible focus styles
- All images require alt text
- Buttons must support keyboard use
- No color-only status indicators

## Reference Translation

- Full-screen navigation may behave like a scene change, but it must expose destinations, current route, contact, and resume access without animation dependency.
- Project entries must have clear clickable, hover, focus, active, and selected states.
- Filters and categories must expose selected state through text, shape, or iconography, not color alone.
- Scroll sections should alternate statement, evidence, technical detail, and rest; do not stack dense motion sections back to back.
- Route transitions may use shared labels, media, or viewport-grid fragments for continuity, but must stay under 900 ms and preserve back navigation.
- Mobile layouts must be touch-first, avoid hover-only disclosure, and prevent horizontal overflow at 375 px.
