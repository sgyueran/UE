# Environment Variables

All `VITE_` variables are public browser configuration and must never contain secrets.

Required template: `.env.example`. Local `.env*` files remain ignored except `.env.example`.

- `VITE_SITE_URL`: production origin without trailing slash.
- `VITE_CONTACT_EMAIL`: public contact address.
- `VITE_ANALYTICS_PROVIDER`: empty by default.
- `VITE_ANALYTICS_ID`: empty unless privacy review approves analytics.

Builds must fail clearly when release-required public configuration is absent.
