# Project memory

## Product intent & audience

- 3D-themed project ("mahin-haven3D") intended for public GitHub Pages deployment; likely a personal/portfolio or showcase site with 3D content.

## Brand personality & voice

- Not yet inferred from content; project is in infrastructure/setup phase.

## Visual design & UX direction

- Tech stack: Vite + React + Tailwind CSS + Lucide React icons; JSX syntax.
- Uses `@/` path alias mapping to `src/` for imports.
- Design goal: beautiful, non-cookie-cutter, production-worthy webpages (per `.bolt/prompt`).

## Decisions, constraints & rationale

- GitHub Pages deployment via GitHub Actions, project-site style with sub-path `/mahin-haven3D/`.
- `vite.config.ts` `base` set to `/mahin-haven3D/` so built asset URLs work under the Pages sub-path.
- Workflow (`.github/workflows/deploy.yml`) triggers on push to `main`: checkout → `npm ci` → build → upload `dist` artifact → deploy to Pages.
- Repo name must match `mahin-haven3D` for the base path to align; Pages source setting must be set to "GitHub Actions" in repo settings.
- Avoid adding UI/theme/icon packages beyond the template defaults unless explicitly requested.

## Open questions & assumptions

- Assumes package manager is npm (`npm ci` in workflow); if project uses pnpm/yarn, workflow needs adjustment.
- No SPA routing fallback configured yet; if client-side routing is added, may need a 404.html or HashRouter for Pages compatibility.
- Actual UI/brand direction not yet established; to be inferred from future design requests.