# CV Builder

A React app that renders a CV as an interactive web preview and generates downloadable PDFs (two-column and single-column ATS-friendly layouts). Supports English and Russian.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

## Setup

Install dependencies (first time only):

```bash
npm install
```

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Translates CV data, then starts the dev server with hot reload (usually at http://localhost:5173) |
| `npm run build` | Translates CV data, then builds the optimized production bundle into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally to test the production build |
| `npm run translate` | Regenerates the Russian translation only (no build) |

## Editing the CV

- **English content** — edit `src/cvData.js`. This is the source of truth for everything.
- **Russian corrections** — edit `src/cvData_ru_overrides.js` (see below).
- After editing, run `npm run translate` (or just `npm run dev` / `npm run build`, which translate automatically) to regenerate `src/cvData_ru.js`.

> Do not edit `src/cvData_ru.js` directly — it is auto-generated and will be overwritten.

## How translation works

The Russian version is generated automatically, then patched with your manual corrections:

```
src/cvData.js  (English — the source of truth)
      │  npm run translate  (Google Translate)
      ▼
src/cvData_ru.js  (raw auto-translation)
      │  + merge src/cvData_ru_overrides.js on top
      ▼
src/cvData_ru.js  (final — with your corrections applied)
```

### Why `src/cvData_ru_overrides.js` exists

Google Translate isn't perfect — it produces awkward grammar, mistranslates technical terms, and translates things that should stay in English (like job titles). If you fixed those directly in `cvData_ru.js`, your fixes would be wiped out on the next `npm run translate`.

The overrides file holds your corrections permanently. During translation the script auto-translates everything, then merges your overrides on top — replacing only the fields you specify and leaving the rest auto-translated.

### What you can override

The overrides object mirrors the structure of `cvData.js`. Only include the fields you want to fix; everything else stays auto-translated. Supported keys:

- `title`, `summary` — top-level strings
- `experience` — array of `{ index, position, highlights }` where `index` is the job's position in the list (0-based) and `highlights` is an object keyed by bullet index
- `skills` — array of `{ index, category }`
- `languages` — array of `{ index, language, level }`
- `education` — array of `{ index, degree }`
- `certifications` — array of `{ index, title }`

Example:

```js
export const overrides = {
  title: "Архитектор облачных решений (облачная безопасность)",
  languages: [
    { index: 0, level: "Свободно" }, // fix "English: Fluent"
  ],
  experience: [
    { index: 0, position: "Cloud Architect / Technical Manager" }, // keep title in English
  ],
};
```

After editing overrides, run `npm run translate` to apply them.

**Workflow summary:** you only ever edit `src/cvData.js` (English) and `src/cvData_ru_overrides.js` (Russian fixes). Never edit `src/cvData_ru.js` — it is regenerated every time.

## Layouts

The web UI has toggles for:

- **Language** — EN / RU
- **Layout** — Two-Column / One-Column (ATS-friendly)

Click **Download PDF** to export the current selection.

## Privacy note

Email and phone appear only in the downloaded PDF, not on the web preview.

## Deployment

The app is fully client-side (PDF generation runs in the browser), so it can be hosted on any static host such as GitHub Pages, Cloudflare Pages, or Netlify.

```bash
npm run build      # outputs to dist/
```

### GitHub Pages (automated)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys automatically on every push to `main`.

**One-time setup:**

1. Push the repo to GitHub (source repo: `yogeshdass/cv`):

   ```bash
   git add .
   git commit -m "Initial commit: CV builder"
   git branch -M main
   git remote add origin https://github.com/yogeshdass/cv.git
   git push -u origin main
   ```

2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions** (not "Deploy from a branch").

After that, every push to `main` rebuilds and redeploys the site. You can also trigger it manually from the **Actions** tab (the workflow supports `workflow_dispatch`).

**Live URL:** https://yogeshdass.github.io/cv/

Notes:
- `vite.config.js` uses `base: './'` so asset paths work correctly under the `/cv/` subpath.
- GitHub Pages requires a **public** repo on the free plan. To keep the source private, use a private source repo plus a separate public repo for the built `dist/`, or upgrade to GitHub Pro.
- Actions minutes are free and unlimited for public repos.

### Manual deployment

For any other static host, build locally and upload the `dist/` folder:

```bash
npm run build      # outputs to dist/
```
