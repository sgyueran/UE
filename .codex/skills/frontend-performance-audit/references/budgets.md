# Performance Budgets

Targets:
- Lighthouse Performance >= 85
- Accessibility >= 90
- Best Practices >= 90
- SEO >= 90

Route rules:
- Homepage initial load: no GLB, no Three.js viewer code.
- Project cards: poster first; preview video metadata only.
- Project detail: viewer chunk after explicit interaction.
- Images: WebP or AVIF, explicit dimensions, lazy outside first viewport.
- Animation: transforms/opacity, bounded ScrollTrigger count.
