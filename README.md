# CV Builder

An interactive CV that renders as a web preview and exports to PDF (two-column and
single-column ATS-friendly layouts). Supports English and Russian. Fully client-side —
PDF generation runs in the browser.

**Live:** https://yogeshdass.github.io/cv/

Built with React, Vite, and [@react-pdf/renderer](https://react-pdf.org/).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Requires Node.js 20+.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (regenerates the translation first) |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run translate` | Regenerate the Russian translation only |

## Editing content

- Edit `src/cvData.js` — the English source of truth for all CV content.
- Russian is generated automatically. To correct a specific auto-translation, edit
  `src/cvData_ru_overrides.js`; those fixes are merged on top and survive
  regeneration. Do not edit `src/cvData_ru.js` directly — it is generated.
- Run `npm run translate` (or `dev` / `build`, which do it automatically) to apply.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages automatically via
`.github/workflows/deploy.yml`. It can also be run manually from the repo's Actions tab.

The build output (`dist/`) is a static bundle, so it can be hosted on any static
host (GitHub Pages, Cloudflare Pages, Netlify, etc.).

## License

Personal project. Content (CV data) is © Yogesh Kumar.
