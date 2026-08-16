# C✦SMO deployment on Render

The repository includes **115 active C✦SMO media files** in `client/public/images/`: 57 managed-media recoveries, directly supplied studio and fit assets, and clean transparent product silhouettes. During `pnpm run build`, Vite copies that directory into `dist/public/images/`; the production server serves it from `/images/...`. No database, storage secret, Manus account, or `VITE_CXSMO_USE_PORTABLE_MEDIA` setting is required for images or sound effects on Render.

| Render setting | Value |
|---|---|
| Build command | `pnpm install --frozen-lockfile && pnpm run build` |
| Start command | `pnpm run start` |
| Media setting | None required; `/images/...` is automatic |
| Port | Render provides `PORT` automatically |

The earlier deployment rendered no media because client URLs still preferred `/manus-storage/...` unless a build flag was set. The current code makes `/images/...` the default and only falls back to managed storage if a public file fails.

The `OAUTH_SERVER_URL is not configured` log is unrelated to static media. It only affects Manus OAuth flows; portfolio pages, local bag state, saved fits, and sound/media playback do not need it. Do not place database or OAuth secrets in the repository. If real OAuth is needed later, configure it directly in Render’s environment-variable panel.
