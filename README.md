# Primeng Shadowdom Directives
Set of directives to fix PrimeNg "overlay" components got-chas when rendered inside ShadowDOM

Below are list of components that currently supported (all directives start with prefix `psd = PrimeNg ShadowDOM Directive`):
- [x] Calendar (`psdCalendar`)
- [x] Dropdown (`psdDropdown`)
- [x] Menu (`psdMenu`)
- [x] Multi Select (`psdMultiSelect`)
- [x] Tooltip (`psdTooltip`)
- [x] Auto Complete (`psdAutoComplete`)
- [x] Cascade Select (`psdCascadeSelect`)
- [x] Color Picker (`psdColorPicker`)
- [x] Mega Menu (`psdMegaMenu`)
- [x] Menu Bar (`psdMenuBar`)

To request for new component, please submit issue or PR
# Installation
This package is available on npm registry. Install it with command:
```
npm install primeng-shadowdom-directives
```
# Usage
Import this package into your module where you want to apply these directives (normally will be `app.module.ts`)
```js

import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [
    PrimeNGShadowDOMDirective, // import here
    ...
  ],
})
export class AppModule { }
```
Then in your component file, apply the directives:
```html
<!-- dropdown -->
<p-dropdown psdDropdown ...></p-dropdown>

<!-- calendar -->
<p-calendar psdCalendar ...></p-calendar>


<!-- tooltip -->
<button psdTooltip pTooltip="Hello World"></button>

<!-- menu -->
<p-menu psdMenu ...></p-menu>


<!-- multi select -->
<p-multiSelect psdMultiSelect ...></p-multiSelect>

<!-- and others -->
```
You can apply multiple directives in the same component. For example:
```html
<p-calendar psdTooltip pTooltip="Hello World" psdCalendar></p-calendar>
```

# Demo
Check `projects/demo-app` to see samples on how to use this package.

To run the demo, first run
```
npm install
```
Then build the directives:
```
npm run build
```
Finally start the demo-app:
```
npm start
```
Now you can access from browser at: http://localhost:4200