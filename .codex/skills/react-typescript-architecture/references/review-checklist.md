# Architecture Review Checklist

- Is each component responsible for one main concern?
- Are props minimal, named clearly, and fully typed?
- Is state located at the lowest useful owner?
- Can derived values remain derived rather than stored?
- Are effects necessary and cleaned up?
- Is static content outside components?
- Are page modules primarily composition?
- Is an existing primitive being duplicated?
- Did bundle size or coupling grow without benefit?
