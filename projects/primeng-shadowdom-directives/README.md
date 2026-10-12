# primeng-shadowdom-directives

**Overlay directives** for Shadow DOM — outside-click / scroll-parent fixes (`psd*`).

On PrimeNG **22**, theme CSS inside Shadow DOM is handled upstream via
`adoptedStyleSheets`. This package does **not** export a CSS clone helper.

## Install

```bash
npm install primeng-shadowdom-directives
```

## Use

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [PrimeNGShadowDOMDirective],
})
export class AppModule {}
```

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover></p-popover>
<p-datepicker psdDatePicker></p-datepicker>
```

## Build / publish (from workspace root)

```bash
npm run build
# publishes dist/primeng-shadowdom-directives
cd dist/primeng-shadowdom-directives && npm publish
```

## PrimeNG 22 notes

- Prefer official style sharing for theming; keep `psd*` only for overlay behavior.
- For CSS clone on older majors, use branches `v18`–`v21`.