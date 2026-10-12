---
description: "Theme CSS inside Shadow DOM: clone helper on PrimeNG 18-21 vs adoptedStyleSheets on 22."
---

# Styles in Shadow DOM

## PrimeNG 22+ (official)

PrimeNG shares non-variable theme stylesheets into the shadow root using
`adoptedStyleSheets` (`UseStyle` / `_shareStylesWithShadowRoot`).

On **PSD v22** we **removed** `attachPrimeNgStylesToShadowRoot`. Use upstream style
sharing for theming; keep PSD for [overlays](./overlays) only.

## PrimeNG 18-21 (CSS clone)

Styled-mode CSS typically lands in `document.head` and does **not** pierce into your
shadow tree. Older PSD majors export:

```ts
import { attachPrimeNgStylesToShadowRoot } from 'primeng-shadowdom-directives';

// On each ShadowDom host, after the view is ready:
const root = host.nativeElement.shadowRoot!;
const detach = attachPrimeNgStylesToShadowRoot(root);
// call detach() in ngOnDestroy
```

Install `primeng-shadowdom-directives@^18` ... `@^21` for that helper.

## CSS ≠ overlay

Fixing styles does **not** fix Menu dismiss / outside-click. Those remain overlay
issues. Use `psd*` directives regardless of major.
