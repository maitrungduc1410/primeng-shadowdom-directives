# Primeng Shadowdom Directives

Helpers so PrimeNG **22** overlays work inside Shadow DOM:

**Overlay directives** (`psd*`) — override outside-click / scroll-parent logic (classic PSD).

Theme CSS is **not** cloned by this package on v22 — PrimeNG 22 shares non-variable sheets into Shadow DOM via `adoptedStyleSheets` (`UseStyle`).

All overlay directives use the prefix `psd` = **P**rimeNG **S**hadowDOM **D**irective.

> [!TIP]
> Once you import this module, it also patches `DomHandler.getScrollableParents` so most overlay-ish components marked *No directive required* work without an attribute. The rest need an explicit `psd*` directive.

## Supported components

- [x] DatePicker (`psdDatePicker`)
- [x] Select (*No directive required*)
- [x] Select inside Paginator (*No directive required*)
- [x] Menu (`psdMenu`)
- [x] Multi Select (*No directive required*)
- [x] Tooltip (*No directive required*)
- [x] Auto Complete (*No directive required*)
- [x] Cascade Select (*No directive required*)
- [x] Color Picker (*No directive required*)
- [x] Mega Menu (*No directive required*)
- [x] Menu Bar (*No directive required*)
- [x] Confirm Popup (*No directive required*)
- [x] Popover (`psdPopover`)
- [ ] Slide Menu — not available
- [x] Split Button (`psdSplitButton`)
- [x] Tiered Menu (`psdTieredMenu`)
- [x] Tree Select (*No directive required*)
- [x] Input Mask (`psdInputMask`)

To request a new component, open an issue or PR.

## Installation

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

> [!TIP]
> For older majors than **22**, check older branches such as `v18`, `v19`, `v20`, `v21`, or historical tags on [maitrungduc1410/primeng-shadowdom-directives](https://github.com/maitrungduc1410/primeng-shadowdom-directives).

Peer dependencies: `@angular/common@^22.0.0`, `@angular/core@^22.0.0`, and `primeng@^22.0.0`.

## Usage

Import the module where you use PrimeNG overlays (often `app.config.ts` / a feature `NgModule`):

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [
    PrimeNGShadowDOMDirective,
    // ...
  ],
})
export class AppModule {}
```

Standalone apps can import the same `NgModule` in the component `imports` array.

### Overlay directives

```html
<!-- Menu -->
<p-menu [popup]="true" psdMenu ...></p-menu>

<!-- Popover (replaces OverlayPanel) -->
<p-popover psdPopover ...></p-popover>

<!-- DatePicker -->
<p-datepicker psdDatePicker ...></p-datepicker>

<!-- SplitButton / TieredMenu / InputMask -->
<p-splitButton psdSplitButton ...></p-splitButton>
<p-tieredMenu psdTieredMenu ...></p-tieredMenu>
<p-inputMask psdInputMask ...></p-inputMask>
```

## Workspace layout

| Project | Type | Purpose |
|---------|------|---------|
| `primeng-shadowdom-directives` | library (`ng-packagr`) | Publishable npm package |
| `demo` | application | Shadow DOM host that consumes the library |

## Develop (this repo)

```bash
npm install

# build the library
npm run build
# watch mode
npm run watch:lib

# serve the demo app
npm start
```



## Demo

Local:

```bash
npm install
npm run build
npm start
```

Open [http://localhost:4200](http://localhost:4200).

GitHub Pages: push to this branch runs `.github/workflows/demo-page.yml`, which builds the demo with

`base-href /primeng-shadowdom-directives/` and deploys to Pages

(e.g. `https://<user>.github.io/primeng-shadowdom-directives/`).

```bash
npm run build:pages
```

## Publish to npm

```bash
npm run build:lib
cd dist/primeng-shadowdom-directives
npm publish --access public
```

Or from the workspace root: `npm run publish:lib`.

Package metadata / version: `projects/primeng-shadowdom-directives/package.json`.