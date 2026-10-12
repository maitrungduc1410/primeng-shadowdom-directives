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

## SlideMenu / OverlayPanel missing

- `SlideMenu` was removed upstream in PrimeNG 18, so it is not part of PSD v18+.
- `OverlayPanel` was renamed to `Popover` in PrimeNG 20. Use `psdPopover`.
