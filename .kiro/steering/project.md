# CV Builder — Project Guide

A React + Vite app that renders a CV as an interactive web preview and generates
downloadable PDFs. Supports English and Russian. Fully client-side (PDF generation
runs in the browser via `@react-pdf/renderer`).

## Project structure

```
/
├── index.html
├── vite.config.js          # base: './' for GitHub Pages subpath
├── package.json
├── .github/workflows/deploy.yml   # auto-deploy to GitHub Pages on push to main
└── src/
    ├── main.jsx
    ├── App.jsx             # controls: language (EN/RU) + layout toggles, download button
    ├── cvData.js           # ENGLISH content — the source of truth
    ├── cvData_ru.js        # AUTO-GENERATED Russian data — never edit directly
    ├── cvData_ru_overrides.js  # manual Russian corrections, merged on top of auto-translation
    ├── translate.js        # translation script (Google Translate + overrides merge)
    ├── CVPreview.jsx        # web (HTML) preview — two-column & single-column
    ├── CVDocument.jsx       # PDF renderer — two-column layout
    └── CVDocumentSingle.jsx # PDF renderer — single-column (ATS-friendly) layout
```

Note: the project lives at the repo root (`/Users/yogesh.kumar/yp/cv`), NOT in a
`cv-react/` subfolder. Earlier in history it was under `cv-react/` but has since
been flattened.

## Commands

- `npm run dev` — translate, then start dev server
- `npm run build` — translate, then build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run translate` — regenerate Russian translation only

`dev` and `build` both run `node src/translate.js` first.

Use `export PATH="/opt/homebrew/bin:$PATH"` before npm commands (Node is via Homebrew).
Node version: v24.x (local). The GitHub Actions deploy workflow also uses Node 24.

## Editing rules

- Edit ENGLISH content only in `src/cvData.js`. It drives everything.
- Edit Russian corrections only in `src/cvData_ru_overrides.js`.
- NEVER edit `src/cvData_ru.js` directly — it is regenerated on every translate and
  overwritten.
- After content changes, run `npm run translate` (or dev/build) to regenerate Russian.

## Translation / override system

Flow: `cvData.js` → (Google Translate) → `cvData_ru.js` → (merge overrides) → final `cvData_ru.js`.

The overrides object in `cvData_ru_overrides.js` mirrors `cvData.js`. Only include
fields to fix; the rest stays auto-translated. Supported keys:
- `title`, `summary` (strings)
- `experience` — array of `{ index, position, highlights }` (highlights = object keyed by bullet index)
- `skills` — array of `{ index, category }`
- `languages` — array of `{ index, language, level }`
- `education` — array of `{ index, degree }`
- `certifications` — array of `{ index, title }`

`index` is 0-based position in the corresponding array.

Deliberate override conventions currently in use:
- Job `position` values are kept in English in the Russian version (overridden).
- Some positions append a Russian gloss in parentheses, e.g.
  `"Cloud Architect / Technical Manager (Технический менеджер)"`.
- Language level "Fluent" is overridden to "Свободно".
- German (`de`) support was removed. Only `en` and `ru` remain. Translate targets = `["ru"]`.

## Data model (cvData.js)

Top level: `name`, `title`, `summary`, `location`, `phone`, `email`, `linkedin`,
`experience[]`, `skills[]`, `certifications[]`, `languages[]`, `education[]`.

- `experience[]`: `{ position, company, startDate, endDate, location, highlights[] }`
- `skills[]`: `{ category, items }` where `items` is either a string OR an array of
  `{ label, value }` pairs (used for the "Security & DevSecOps Tools" grouped category).
- `certifications[]`: `{ title, detail }` — title is rendered bold, detail regular.
- `languages[]`: `{ language, level }`
- `education[]`: `{ degree, institution, startDate, endDate, location }`

## Rendering conventions

- Three renderers must stay in sync when the data model changes: `CVPreview.jsx`
  (web), `CVDocument.jsx` (two-column PDF), `CVDocumentSingle.jsx` (single-column PDF).
- The two PDF renderers + `@react-pdf/renderer` are wrapped by `PdfDownloadButton.jsx`,
  which is lazy-loaded from `App.jsx` via `React.lazy` + `Suspense`. This code-splits
  react-pdf into its own chunk (initial bundle ~245 kB; PDF chunk ~1.2 MB loads on
  demand). Keep react-pdf imports inside `PdfDownloadButton.jsx` (or other lazy
  modules) — do NOT import them directly in `App.jsx` or they rejoin the main bundle.
- `vite.config.js` sets `chunkSizeWarningLimit: 1400` because the react-pdf chunk is
  inherently large but non-blocking.
- Colors: ORANGE `#F99F3E`, BLACK `#000000`, WHITE `#FFFFFF`.
- PDF uses Roboto (Latin + Cyrillic) + Font Awesome for contact icons.
- Certification title is bold; the detail/ID part is regular weight.
- Language name is bold; level is regular. Institution and language level render in
  black (same as body text), not gray.

## Privacy

- `phone` and `email` appear ONLY in the downloaded PDF, NOT on the web preview
  (the web header shows location + LinkedIn only). Keep it this way unless asked.
- Note: contact details are still bundled into the JS, so they are technically
  discoverable in the built assets. User has accepted this tradeoff.

## Deployment

- GitHub repo: `yogeshdass/cv`. Live at https://yogeshdass.github.io/cv/
- Auto-deploys via `.github/workflows/deploy.yml` on push to `main` (Pages source =
  GitHub Actions).
- `vite.config.js` uses `base: './'` so assets resolve under the `/cv/` subpath.

## Supply-chain / security posture

- Dependencies upgraded to latest majors (React 19, Vite 8, plugin-react 6,
  @react-pdf/renderer 4.9, @iamtraction/google-translate 3). `npm audit` = 0 vulns.
- `package-lock.json` is committed; CI uses `npm ci` (integrity-checked install).
- GitHub Actions in `deploy.yml` are PINNED to full commit SHAs (with a version
  comment). When bumping an action, update BOTH the SHA and the comment. Do not
  revert to mutable `@vN` tags.
- CI has a `npm audit --audit-level=high` gate that fails the build on high-severity
  vulnerabilities. Keep deps clean or this blocks deploys.
- `.github/dependabot.yml` opens weekly PRs for npm + github-actions updates
  (minor/patch grouped).
- Workflow uses least-privilege `permissions:` (contents: read, pages: write,
  id-token: write).

## Style guidance for CV content

The user is positioning as a Cloud Security Architect (also holds a Technical Manager
role). Preferences observed:
- Security-forward bullet ordering in the current role.
- Consistent present tense for the current role; past tense for previous roles.
- Prefer strong, specific verbs and concrete tools/keywords (good for ATS).
- Avoid em dashes in bullet text (user dislikes them).
- Keep job titles accurate; use `/` to show dual roles (e.g. "Cloud Architect / Technical Manager").
