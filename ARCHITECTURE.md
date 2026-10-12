# Architecture (v22)

How **primeng-shadowdom-directives** works on the current major:
**Angular 22 + PrimeNG 22**.

This is the doc to read before fixing an overlay bug or adding a `psd*` directive.

## Mental model in 30 seconds

PrimeNG overlays often:

1. Render the panel on `document.body` (outside your component tree).
2. Listen for “outside” clicks on `document`.
3. Walk ancestors for scrollable parents.

Under `ViewEncapsulation.ShadowDom`, clicks from inside the host are
**retargeted** at the shadow boundary. Listeners that only look at
`event.target` think the host (or wrong node) was clicked, so dismiss /
blur logic fails.

This library does **two** things on import / attribute bind:

| Layer | What | Why |
|-------|------|-----|
| Module side effect | Patch `DomHandler.getScrollableParents` | Skip `ShadowRoot` nodes and keep finding real scroll containers |
| Per-component directives | Replace document click (and similar) binders | Use `composedPath()` / shadow-aware targets so outside-click works |

Theme CSS is **out of scope** on v22: PrimeNG shares stylesheets into the
shadow root via `adoptedStyleSheets`. We do not clone `document.head`.

```
┌──────────────────────────────────────────────────────────────┐
│  App / micro-frontend                                        │
│                                                              │
│   Host component  ViewEncapsulation.ShadowDom                │
│       imports: [ PrimeNGShadowDOMDirective, … ]              │
│                                                              │
│   <p-menu psdMenu>     <p-popover psdPopover>  …             │
│         │                      │                             │
└─────────┼──────────────────────┼─────────────────────────────┘
          │ ShadowRoot           │
          ▼                      ▼
   ┌─────────────┐        document.body  (overlay panel)
   │ trigger UI  │  ──open──►  .p-menu / .p-popover
   └─────────────┘               │
                                 │ click listener (patched)
                                 ▼
                        composedPath()[0] = real target
                        → hide if outside panel + trigger
```

## Package surface

Public API (`src/public-api.ts`):

- `PrimeNGShadowDOMDirective`: `NgModule` that declares/exports all directives
  and applies the DomHandler patch when the module file is evaluated.
- Directive classes from `src/directives/` (also exported for typing).

There is **no** styles helper export on v22.

## DomHandler patch

Located at the top of
`projects/primeng-shadowdom-directives/src/primeng-shadowdom-directives.module.ts`.

PrimeNG’s default `getParents` / scroll-parent walk can include or choke on
`ShadowRoot`. We replace `DomHandler.getScrollableParents` once so that:

- Parents are filtered with `!(item instanceof ShadowRoot)`
- Overflow scrolling ancestors are still collected as usual

Many overlays marked “no directive required” (Select, Tooltip, …) rely on this
patch alone after you import the module.

## Directive pattern

Each file under `src/directives/` is an attribute directive
(`selector: '[psdMenu]'`, etc.) that `@Host() @Self()` injects the PrimeNG
component instance and replaces the method that binds the document click
listener.

Typical helper (conceptual):

```ts
function shadowAwareTarget(event: Event): EventTarget | null {
  const path =
    (event as any).path ||
    (typeof event.composedPath === 'function' ? event.composedPath() : null);
  if ((event.target as any)?.shadowRoot && path?.length) {
    return path[0];
  }
  return event.target;
}
```

Then outside-container checks use that target instead of raw `event.target`.

PrimeNG 22 APIs may expose `ViewChild` as signals. Helpers like
`containerElement()` / `readFlag()` unwrap both signal and classic fields so
directives keep working across small PrimeNG patch differences.

### Directives shipped on v22

| Attribute | PrimeNG component |
|-----------|-------------------|
| `psdMenu` | `Menu` |
| `psdPopover` | `Popover` |
| `psdDatePicker` | `DatePicker` |
| `psdSplitButton` | `SplitButton` |
| `psdTieredMenu` | `TieredMenu` |
| `psdInputMask` | `InputMask` |
| `psdMegaMenu` | `MegaMenu` (mobile hamburger outside-click) |
| `psdMenubar` | `Menubar` (mobile hamburger outside-click) |

## CSS vs overlay (v22)

| Concern | Owner on v22 |
|---------|----------------|
| Button / Select look themed inside shadow | PrimeNG `UseStyle` / `adoptedStyleSheets` |
| Menu dismiss, popover outside-click, scroll parents | This library |

Do not re-add a CSS clone path unless PrimeNG regresses and product explicitly
asks for a fallback.

## Build & publish layout

```
projects/primeng-shadowdom-directives/package.json  → version + peers
        └─ ng-packagr → dist/primeng-shadowdom-directives/  → npm publish
```

Releases: changesets bump the lib package + CHANGELOG; GitHub Actions publishes
from `dist/` with OIDC provenance (`release.yml`).

## Demo app

`projects/demo` is a ShadowDom host that imports the workspace library and
showcases every Supported component. Docs Pages ships it under `/demo/` and the
VitePress [Live demo](./docs/guide/demo.md) page embeds it in an iframe.
