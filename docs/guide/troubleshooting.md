---
description: "Common Shadow DOM + PrimeNG issues and how to fix them with PSD."
---

# Troubleshooting

## Overlay does not close on outside click

1. Confirm `PrimeNGShadowDOMDirective` is imported on the host / module.
2. Add the explicit `psd*` attribute for that component.
3. Make sure you are not stopping propagation in a way that empties `composedPath()`.

## Components look unstyled inside ShadowDom

- **PrimeNG 22:** confirm PrimeNG theme is configured; styles should adopt
  automatically. If not, check PrimeNG theme setup first, not PSD.
- **PrimeNG 18-21:** use `attachPrimeNgStylesToShadowRoot` from the matching older
  PSD major ([Styles](./styles)).

## Wrong PSD major

Peer warnings or missing exports usually mean Angular / PrimeNG / PSD majors are
mismatched. Install the same major for all three ([Installation](./installation)).

## MegaMenu / Menubar burger does nothing on small screens

On narrow viewports PrimeNG collapses these to a hamburger. Without `psdMegaMenu` /
`psdMenubar`, the same document click that opens the menu also closes it, because
`event.target` is retargeted to the Shadow DOM host. Add the matching attribute.

If the open panel looks only as wide as the burger button, give the host
`display: block; width: 100%` (PrimeNG sizes the absolute list as `width: 100%` of
that host).

## SlideMenu / OverlayPanel missing

- `SlideMenu` was removed upstream in PrimeNG 18, so it is not part of PSD v18+.
- `OverlayPanel` was renamed to `Popover` in PrimeNG 20. Use `psdPopover`.
