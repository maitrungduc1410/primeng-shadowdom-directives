---
description: "What primeng-shadowdom-directives solves: PrimeNG overlays inside Angular Shadow DOM hosts."
---

# What is it?

**primeng-shadowdom-directives** (PSD) is a small Angular library of directives that make PrimeNG **overlay** components work when your UI lives inside a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) — for example `ViewEncapsulation.ShadowDom` or Angular Elements.

## Two separate problems

People often mix two issues:

| Problem | Symptom | Who fixes it |
|---------|---------|----------------|
| **Theme CSS** | Buttons / Select look unstyled inside the shadow host | PrimeNG **22+** shares styles with `adoptedStyleSheets`. On **18–21**, clone sheets from `document.head` (see [Styles](./styles)). |
| **Overlay behavior** | Menu / Popover does not dismiss on outside click; scroll parents wrong | PSD `psd*` directives + `DomHandler.getScrollableParents` patch |

PSD historically focused on **overlays**. On v22 of this package we **do not** ship a CSS clone helper — use PrimeNG’s official style sharing for theming.

## How overlays break under Shadow DOM

PrimeNG overlays often:

1. Append panels to `document.body` (outside your shadow tree).
2. Listen for “outside” clicks on `document`.
3. Use `event.target` / tree walks that stop at the shadow boundary.

Clicks originating inside the shadow host are **retargeted**. Without `composedPath()`, the host can look like the click target, so dismiss logic misfires.

PSD directives override the relevant handlers to use path-aware checks.

## Prefix

All directives use the prefix **`psd`** = **P**rimeNG **S**hadowDOM **D**irective (`psdMenu`, `psdPopover`, …).

## Next

- [How it works](./how-it-works)
- [Installation](./installation)
- [Quick start](./quick-start)
- [Overlay directives](./overlays)
