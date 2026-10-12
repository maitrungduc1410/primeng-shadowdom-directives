---
description: "How PSD majors map to Angular / PrimeNG and which branches to use."
---

# Versions & branches

## Versioning

PSD majors track **PrimeNG** majors so you can align stacks:

```text
app: Angular N + PrimeNG N  →  primeng-shadowdom-directives@^N
```

## Git branches

| Branch | Role |
|--------|------|
| `master` | Current major (v22) |
| `v18` ... `v21` | Frozen / maintained lines for older stacks |
| `v22` | Same line as current master when present |

## What changed on v22

- Theme CSS: rely on PrimeNG `adoptedStyleSheets` (no CSS clone export)
- Overlays: keep `psd*` + module patch
- `OverlayPanel` → `Popover` (from v20+)

## npm

```sh
npm view primeng-shadowdom-directives versions --json
npm view primeng-shadowdom-directives dist-tags
```
