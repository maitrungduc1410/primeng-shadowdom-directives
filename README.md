# Primeng Shadowdom Directives
Set of directives to fix PrimeNg "overlay" components got-chas when rendered inside ShadowDOM

Below are list of components that currently supported (all directives start with prefix `psd = PrimeNg ShadowDOM Directive`):

> [!TIP]
> Once you import this module library, it'll automatically handle most of components (those marked as *No directive required*), the rest will need to pass directive explicitly

<details>
  <summary>Angular 17 & 18</summary>
  
  - [x] Calendar (*No directive required*)
  - [x] Dropdown (*No directive required*)
  - [x] Dropdown inside Paginator (*No directive required*)
  - [x] Menu (`psdMenu`)
  - [x] Multi Select (*No directive required*)
  - [x] Tooltip (*No directive required*)
  - [x] Auto Complete (*No directive required*)
  - [x] Cascade Select (*No directive required*)
  - [x] Color Picker (*No directive required*)
  - [x] Mega Menu (*No directive required*)
  - [x] Menu Bar (*No directive required*)
  - [x] Confirm Popup (*No directive required*)
  - [x] Overlay Panel (`psdOverlayPanel`)
  - [x] Slide Menu (`psdSlideMenu`)
  - [x] Split Button (`psdSplitButton`)
  - [x] Tiered Menu (`psdTieredMenu`)
  - [x] Tree Select (*No directive required*)
  - [x] Input Mask (`psdInputMask`)
</details>

<details>
  <summary>Angular 16</summary>
  
  - [x] Calendar (*No directive required*)
  - [x] Dropdown (*No directive required*)
  - [x] Dropdown inside Paginator (*No directive required*)
  - [x] Menu (`psdMenu`)
  - [x] Multi Select (*No directive required*)
  - [x] Tooltip (*No directive required*)
  - [x] Auto Complete (`psdAutoComplete`)
  - [x] Cascade Select (*No directive required*)
  - [x] Color Picker (*No directive required*)
  - [x] Mega Menu (`psdMegaMenu`)
  - [x] Menu Bar (`psdMenuBar`)
  - [x] Confirm Popup (*No directive required*)
  - [x] Overlay Panel (`psdOverlayPanel`)
  - [x] Slide Menu (`psdSlideMenu`)
  - [x] Split Button (`psdSplitButton`)
  - [x] Tiered Menu (`psdTieredMenu`)
  - [x] Tree Select (*No directive required*)
  - [x] Input Mask (`psdInputMask`)
</details>

<details>
  <summary>Angular < 16</summary>
  
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
  - [x] Input Mask (`psdInputMask`)
</details>

To request for new component, please submit issue or PR
# Installation
This package is available on npm registry. Install it with command:
```sh
# for Angular 18
npm install primeng-shadowdom-directives@^18.0.0

# for Angular 17
npm install primeng-shadowdom-directives@^17.0.0

# for Angular 16
npm install primeng-shadowdom-directives@^1.0.0

# for Angular < 16
npm install primeng-shadowdom-directives@^0.2.2
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