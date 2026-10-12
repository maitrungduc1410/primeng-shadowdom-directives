# primeng-shadowdom-directives

1. **Overlay directives** — outside-click / scroll-parent fixes for Shadow DOM.
2. **`attachPrimeNgStylesToShadowRoot`** — CSS clone for PrimeNG **18–21** styled
   mode (`document.head` → shadow root). Prefer official sharing on PrimeNG 22+.

## Install

```bash
npm install primeng-shadowdom-directives
```

## Use

```ts
import {
  PrimeNGShadowDOMDirective,
  attachPrimeNgStylesToShadowRoot,
} from 'primeng-shadowdom-directives';

@NgModule({
  imports: [PrimeNGShadowDOMDirective],
})
export class AppModule {}

// On each ShadowDom host:
// attachPrimeNgStylesToShadowRoot(host.nativeElement.shadowRoot!)
```

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-overlayPanel psdOverlayPanel></p-overlayPanel>
<p-datepicker psdDatePicker></p-datepicker>
```

## Build / publish (from workspace root)

```bash
npm run build
# publishes dist/primeng-shadowdom-directives
cd dist/primeng-shadowdom-directives && npm publish
```

## PrimeNG 18 notes

- `SlideMenu` was removed upstream — no `psdSlideMenu` in this major.
- Prefer `psdDatePicker` with `p-datepicker`; `psdCalendar` remains for legacy `p-calendar`.
