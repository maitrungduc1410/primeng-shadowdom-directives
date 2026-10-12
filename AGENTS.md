# AGENTS.md — primeng-shadowdom-directives

Short guide for AI coding agents (and humans) working in this repo.
If this disagrees with [ARCHITECTURE.md](./ARCHITECTURE.md), that file wins.

## What this project is

Angular library that makes **PrimeNG overlays** behave correctly inside
**Shadow DOM** (`ViewEncapsulation.ShadowDom`, Angular Elements, etc.).

Current line is **v22** (Angular 22 + PrimeNG 22):

- Overlay fixes via `psd*` directives + a `DomHandler.getScrollableParents` patch
- **No** CSS clone helper — PrimeNG 22 shares theme sheets with `adoptedStyleSheets`

Published package name: `primeng-shadowdom-directives`.

## Read these first

1. [ARCHITECTURE.md](./ARCHITECTURE.md) — how overlays break under Shadow DOM and how we patch them (v22).
2. Docs site in [`docs/`](./docs) — public guide (en / vi / zh). Start with
   [How it works](./docs/guide/how-it-works.md).
3. [`.changeset/README.md`](./.changeset/README.md) — how releases are cut.

## Repository layout

```
projects/
  primeng-shadowdom-directives/   # publishable ng-packagr library
    src/
      public-api.ts               # public exports
      primeng-shadowdom-directives.module.ts  # NgModule + DomHandler patch
      directives/                 # psdMenu, psdPopover, …
    package.json                  # npm version / peers (source of truth)
    CHANGELOG.md                  # written by changesets
  demo/                           # local ShadowDom host app (not published)

docs/                             # VitePress site (GitHub Pages)
  .vitepress/config.mts
  guide/, vi/guide/, zh/guide/

.changeset/                       # pending release notes
.github/workflows/
  docs.yml                        # build + deploy VitePress
  release.yml                     # changesets → npm (OIDC) + GitHub release
```

Root `package.json` is a **private** Angular workspace. The npm package lives
under `projects/primeng-shadowdom-directives` (npm workspace member).

## Commands

Node **22+** (see `.nvmrc`). npm, not yarn.

| Command | What it does |
|---|---|
| `npm install` | Install workspace + app deps; refresh lockfile after `package.json` changes |
| `npm run build` / `build:lib` | Build the library with ng-packagr → `dist/primeng-shadowdom-directives` |
| `npm start` | Serve the local demo (`projects/demo`) |
| `npm run docs:dev` | VitePress at `/primeng-shadowdom-directives/` |
| `npm run docs:build` | Build docs → `docs/.vitepress/dist` |
| `npm run changeset` | Add a changeset for a publishable behaviour change |
| `npm run version-packages` | Apply changesets (CI / release PR only) |

Do **not** hand-edit version in the lib `package.json` for releases — use changesets.

## When you change code

### Overlay / directive work

- Prefer fixing inside the matching file under `src/directives/`.
- Mirror patterns already used: override `bindDocumentClickListener` (or equivalent)
  with `composedPath()` / shadow-aware target helpers.
- Keep the `DomHandler.getScrollableParents` patch in the module file unless you
  have a better global hook — it must stay side-effect-on-import.
- After behaviour changes users care about: `npm run changeset` (patch/minor/major).

### Docs

- Guide pages are **triplicated**: `docs/guide/`, `docs/vi/guide/`, `docs/zh/guide/`.
  Update all three locales (or call out if you only did English).
- Register new pages in `docs/.vitepress/config.mts` (`slugs` + `pages` labels for en/vi/zh).
- Docs-only PRs do **not** need a changeset.

### Do not

- Reintroduce `attachPrimeNgStylesToShadowRoot` on v22 (CSS is PrimeNG’s job).
- Publish with a raw npm token in CI — use trusted publisher / `release.yml`.
- Put publishable code in `projects/demo` or `docs/`.

## PR checklist

- [ ] Library builds: `npm run build:lib`
- [ ] Demo still starts if you touched directives: `npm start`
- [ ] Docs build if you touched `docs/`: `npm run docs:build`
- [ ] Changeset added if publishable behaviour changed
- [ ] en + vi + zh docs updated together when adding guide pages
