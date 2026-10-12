---
description: "psd* overlay directives and the DomHandler scroll-parent patch."
---

# Overlay directives

## Explicit `psd*` attributes

Add the matching attribute on the PrimeNG component:

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
<p-datepicker psdDatePicker></p-datepicker>
<p-splitButton psdSplitButton></p-splitButton>
<p-tieredMenu psdTieredMenu></p-tieredMenu>
<p-inputMask psdInputMask></p-inputMask>
```

### Rename notes

| Major | Note |
|-------|------|
| ≤ 19 | Overlay panel uses `psdOverlayPanel` / `p-overlayPanel` on older branches |
| ≥ 20 | Use `psdPopover` with `p-popover` |
| ≤ 19 | Legacy `p-calendar` may still use `psdCalendar` on those branches; prefer `psdDatePicker` |

See [Supported components](./supported-components) for the full list on the current major.

## Module-level patch

Importing `PrimeNGShadowDOMDirective` also patches `DomHandler.getScrollableParents` so many overlays marked **No directive required** (Select, Tooltip, AutoComplete, …) work without an attribute.

You still need explicit `psd*` on components whose outside-click / target logic must use `composedPath()`.

## What we override (conceptually)

- Outside-click / document listeners → prefer `event.composedPath()` over `event.target`
- Scrollable parent discovery → see past the shadow boundary when needed

Exact hooks differ slightly by PrimeNG major; install the PSD major that matches your PrimeNG version.
