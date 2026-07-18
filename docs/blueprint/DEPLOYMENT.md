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

## Architecture

- The application is a static Vite production build with a fixed `/UE/` base path.
- 1Panel manages the website container, TLS certificates, and the Nginx or OpenResty instance.
- The repository ships `nginx/ue-portfolio.conf`, a fragment intended to be included inside the HTTPS server block that 1Panel generates. The fragment never contains domains, certificate paths, or secrets.
- Releases are stored per version and switched atomically:

```text
/var/www/ue-portfolio/
  releases/
    <release-id>/
      UE/
        index.html
        assets/
        404.html
        favicon.svg
        robots.txt
        sitemap.xml
  current -> releases/<release-id>
```

- The Nginx document root is `/var/www/ue-portfolio/current`. A request for `/UE/assets/...` therefore maps to `/var/www/ue-portfolio/current/UE/assets/...`. Do not point the document root directly at `dist/`; the fixed `/UE/` base path must match the directory layout.

## Prerequisites

- Node.js 22 and npm on the build machine.
- Dependencies installed with `npm ci` only.
- A verified production build from `npm run build`.
- A static website already created in 1Panel with its running directory set to `/var/www/ue-portfolio/current`.
- HTTPS issued and auto-renewed by 1Panel, with HTTP to HTTPS redirect enabled in the panel.
- A non-root deployment user that owns `/var/www/ue-portfolio` and can create releases and update the `current` symlink. The Nginx worker only needs read access.
- Never upload the build machine's `node_modules` to the server.

## Release procedure

Run from a clean checkout on the build machine:

```bash
npm ci
python scripts/validate-blueprint.py
npm run lint
npm run typecheck
npm run test -- --run
npm run test:e2e
npm run validate:publication
npm run build
```

Then publish the contents of `dist/`:

```bash
RELEASE_ID="$(date +%Y%m%d%H%M%S)"
RELEASE_ROOT="/var/www/ue-portfolio/releases/${RELEASE_ID}"
mkdir -p "${RELEASE_ROOT}/UE"
# Copy dist/* into ${RELEASE_ROOT}/UE/ with the deployment user's preferred transfer tool.
ln -sfn "${RELEASE_ROOT}" /var/www/ue-portfolio/current.tmp
mv -T /var/www/ue-portfolio/current.tmp /var/www/ue-portfolio/current
nginx -t
# Reload Nginx or OpenResty with the 1Panel control or the system service manager.
```

After reload, run the smoke check from any machine that can reach the site:

```bash
deploy/smoke-check.sh "$DEPLOY_BASE_URL"
```

`DEPLOY_BASE_URL` is the deployed site's `/UE/` address, supplied at run time as an environment variable or command argument; it is not recorded in the repository.

## 1Panel procedure

1. Create a static website in 1Panel and set its running directory to `/var/www/ue-portfolio/current`.
2. Open the site's Nginx configuration in 1Panel and include or paste `nginx/ue-portfolio.conf` inside the generated HTTPS server block.
3. Issue the HTTPS certificate through 1Panel and keep auto-renewal enabled.
4. Enable the HTTP to HTTPS redirect in the panel.
5. After every configuration change, run a configuration test before reloading; reload only when the test passes.
6. Certificates, panel API keys, and SSH keys never enter this repository.

If the 1Panel OpenResty build provides the Brotli module, it may be enabled additionally for the same text types covered by gzip in `nginx/ue-portfolio.conf`. The shipped configuration only relies on gzip, which stock Nginx always provides.

## Cache policy

- `index.html` and every SPA fallback response: `Cache-Control: no-store, no-cache, must-revalidate`.
- Hashed build assets under `/UE/assets/` (JS, CSS, woff2, build images): `Cache-Control: public, max-age=31536000, immutable`, `expires 1y`. Missing assets return 404 and never fall back to HTML.
- Media files (`mp4`, `webm`, `ogg`, `mov`, `m4v`, `glb`, `gltf`): `Cache-Control: public, max-age=2592000`, `expires 30d`, with Nginx static byte-range support and `Accept-Ranges: bytes`. Missing media returns 404 and never falls back to HTML.
- Requests outside `/UE/` receive a real 404; only `/` redirects into `/UE/` with the query string preserved.

## Rollback

Rollback never requires a rebuild because every release directory is immutable:

```bash
ls -1 /var/www/ue-portfolio/releases
ln -sfn /var/www/ue-portfolio/releases/<previous-release-id> /var/www/ue-portfolio/current.tmp
mv -T /var/www/ue-portfolio/current.tmp /var/www/ue-portfolio/current
nginx -t
# Reload Nginx or OpenResty.
deploy/smoke-check.sh "$DEPLOY_BASE_URL"
```

- The symlink swap uses a temporary link renamed over `current`, so there is no window where the document root is missing.
- Keep several recent releases. Delete older releases only after the new version has passed the smoke check and a stability window.

## Post-deploy verification

The smoke script covers the primary checks automatically. A full post-deploy review includes:

- `/UE/` loads the home page.
- `/UE/projects` and `/UE/about` load directly.
- A deep link such as `/UE/projects/non-existent-project` reloads through the SPA fallback and shows the safe unavailable state.
- An unknown route renders the application 404 state under `/UE/`.
- At least one hashed JS/CSS asset loads with the one-year immutable cache policy.
- At least one font asset under `/UE/assets/` loads with content type `font/woff2`.
- HTML responses carry `no-store` or `no-cache`.
- Optional: a published media URL answers a `Range: bytes=0-31` request with HTTP 206 and `Content-Range`.
- HTTP requests redirect to HTTPS.
- The browser console shows no page errors on the primary routes.

## Security

- Only public client configuration ships in this repository. Any `VITE_*` value is compiled into the public client bundle and must never carry secrets.
- TLS private keys, 1Panel credentials, tokens, and SSH keys are never stored here.
- Source maps are not published unless a separate explicit review approves them.
- Uploaded content is verified against the local `dist/` output before the symlink switch, and the publication safety validator must pass before release.
- Deployment runs with a least-privilege user; the Nginx worker has read-only access to release directories.
