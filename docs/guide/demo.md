---
description: "Interactive v22 demo: every Supported component inside Shadow DOM."
---

# Live demo

This page embeds the workspace demo app (`projects/demo`). Everything below runs
under `ViewEncapsulation.ShadowDom` on **Angular 22 + PrimeNG 22**.

You get both groups from the README checklist:

- Components that need an explicit `psd*` attribute
- Components marked **No directive required** (still need the module import so the
  DomHandler scroll-parent patch is on)

Theme CSS comes from PrimeNG `adoptedStyleSheets`. Overlay dismiss / outside-click
comes from PSD.

<DemoFrame />

Prefer running it locally?

```bash
npm install
npm run build
npm start
```

Then open [http://localhost:4200](http://localhost:4200).
