# Deployment

Target:
- Static Vite build
- Nginx
- 1Panel
- HTTPS

Nginx must:
- Support SPA fallback
- Cache hashed JS/CSS for one year
- Cache media for 30 days
- Disable caching for index.html
- Support range requests for videos and GLB
