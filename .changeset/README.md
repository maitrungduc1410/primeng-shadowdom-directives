# Changesets

Every pull request that changes published behaviour of
`primeng-shadowdom-directives` adds a changeset:

```sh
npm run changeset
```

Pick the bump (patch / minor / major) and write one or two sentences for the
changelog. The [Release](../.github/workflows/release.yml) workflow turns pending
changesets into a `chore: release vX.Y.Z` pull request (branch `release/vX.Y.Z`);
merging that pull request publishes to npm with **trusted publishing** (OIDC,
no npm token in the repo) and creates the GitHub release.

You can also write the file by hand:

```md
---
'primeng-shadowdom-directives': patch
---

Fix Popover outside-click under nested shadow roots.
```

## npm trusted publisher (one-time)

On https://www.npmjs.com/package/primeng-shadowdom-directives → **Settings →
Trusted Publisher**:

- Provider: GitHub Actions
- Repository: `maitrungduc1410/primeng-shadowdom-directives`
- Workflow: `release.yml`
- Environment: (leave empty unless you add one)

Requires npm CLI ≥ 11.5.1 on the runner (`npm install -g npm@latest` in the
workflow).
