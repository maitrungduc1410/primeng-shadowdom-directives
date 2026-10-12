---
description: "How primeng-shadowdom-directives fixes PrimeNG overlays under Shadow DOM on v22."
---

# How it works

This page is about the **current major (v22)**: Angular 22 + PrimeNG 22.

## The problem

When your UI uses `ViewEncapsulation.ShadowDom` (or a custom element with a shadow
root), PrimeNG overlays often misbehave:

- The floating panel is attached to `document.body`, **outside** the shadow tree.
- Outside-click listeners on `document` see a **retargeted** `event.target` at the
  shadow host, not the real node inside the shadow tree.
- Scroll-parent discovery can trip over `ShadowRoot` nodes.

So menus stay open, popovers ignore outside clicks, or positioning / scroll logic
breaks, even when the panel looks fine visually.

## Two separate concerns

| Concern | On v22 |
|---------|--------|
| **Theme CSS** inside the shadow host | Handled by PrimeNG (`adoptedStyleSheets` / `UseStyle`). This package does **not** clone CSS. |
| **Overlay behaviour** (dismiss, scroll parents) | Handled by this package. |

## What the library does

### 1. Module import → DomHandler patch

Importing `PrimeNGShadowDOMDirective` loads a module that **replaces**
`DomHandler.getScrollableParents` so ancestor walks skip `ShadowRoot` and still find
real scrollable parents.

That alone helps many overlays that do not need an attribute (Select, Tooltip,
AutoComplete, ...).

### 2. `psd*` directives → shadow-aware document clicks

For components that bind their own document click listeners, add an attribute:

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
```

The directive injects the PrimeNG component instance and overrides the binder
(e.g. `bindDocumentClickListener`) so the handler uses `event.composedPath()`
(or an equivalent shadow-aware target) when deciding “inside vs outside”.

## Flow (simplified)

```
User clicks inside Shadow DOM host
        │
        ▼
Browser retargets event.target at the host
        │
        ▼
Document listener (patched by psd*)
        │
        ├─ composedPath()[0] → real node
        ├─ panel.contains(real node)?
        └─ trigger.contains(real node)?
                │
                └─ if both outside → hide()
```

## What we do *not* do on v22

- Clone PrimeNG styles from `document.head` into the shadow root
- Replace PrimeNG's overlay append target (panels may still live on `body`)
- Fix every PrimeNG component automatically (some still need an explicit `psd*`)

## Dig deeper

- Source map: [ARCHITECTURE.md](https://github.com/maitrungduc1410/primeng-shadowdom-directives/blob/master/ARCHITECTURE.md) in the repo
- [Overlay directives](./overlays)
- [Styles in Shadow DOM](./styles)
- [Live demo](./demo)
