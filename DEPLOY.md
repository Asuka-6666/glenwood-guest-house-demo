# Deploy — Cloudflare Pages

Static Vite demo site for Glenwood Guest House.

## Cloudflare Pages settings

| Setting | Value |
| --- | --- |
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (repository root) |

## Node.js version

- Required by this project: **Node.js ≥ 20.19.0** (see `package.json` → `engines`)
- Recommended on Cloudflare Pages: **20** or **22** LTS

Set the version in the Pages project under **Settings → Environment variables**:

```text
NODE_VERSION=20
```

Or add a root `.nvmrc` / `.node-version` containing `20` if you prefer file-based detection.

## Local build & preview

```bash
npm install
npm run build
npm run preview
```

- `npm run build` runs `prepare:public` (copies referenced images into `public/`) then `vite build`
- Output is written to `dist/`
- `npm run preview` serves the production build locally (default: http://127.0.0.1:4173)

## Notes

- Asset `base` defaults to `/` (site root). Only set `VITE_BASE_PATH` if you deploy under a subdirectory.
- `public/_redirects` provides SPA-style fallback (`/* → /index.html`). Keep it for deep-link safety on a single-page site.
- `vercel.json` is kept for optional Vercel deploys; Cloudflare Pages ignores it.
- Do not commit secrets. This demo has no backend or API keys.
