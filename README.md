# Primeng Shadowdom Directives
Set of directives to fix PrimeNg "overlay" components got-chas when rendered inside ShadowDOM

Below are list of components that currently supported (all directives start with prefix `psd = PrimeNg ShadowDOM Directive`):
- [x] Calendar (`psdCalendar`)
- [x] Dropdown (`psdDropdown`)
- [x] Dropdown inside Paginator (`psdPaginator`)
- [x] Menu (*No directive required*)
- [x] Multi Select (`psdMultiSelect`)
- [x] Tooltip (*No directive required*)
- [x] Auto Complete (`psdAutoComplete`)
- [x] Cascade Select (`psdCascadeSelect`)
- [x] Color Picker (*No directive required*)
- [x] Mega Menu (`psdMegaMenu`)
- [x] Menu Bar (`psdMenuBar`)
- [x] Confirm Popup (`psdConfirmPopup`)
- [x] Overlay Panel (`psdOverlayPanel`)
- [x] Slide Menu (*No directive required*)
- [x] Split Button (*No directive required*)
- [x] Tiered Menu (*No directive required*)
- [x] Tree Select (`psdTreeSelect`)
> Note that not all components need custom directive, since this library already contains some logics which reduce the effort of writing custom directive for those components. That means for components marked as *No directive required*, they just work.

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

<!-- multi select -->
<p-multiSelect psdMultiSelect ...></p-multiSelect>

<!-- and others -->
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

# watch mode
npm run watch
```
Finally start the demo-app:
```
npm start
```
Now you can access from browser at: http://localhost:4200