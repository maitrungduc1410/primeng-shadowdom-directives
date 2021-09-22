# Primeng Shadowdom Directives
Set of directives to fix PrimeNg "overlay" components got-chas when rendered inside ShadowDOM

Below are list of components that currently supported:
- [x] Calendar
- [x] Dropdown
- [x] Menu
- [x] Multi Select
- [x] Tooltip
- [x] Auto Complete
- [x] Cascade Select
- [x] Color Picker
- [x] Mega Menu
- [x] Menu Bar

To request for new component, please submit issue or PR
# Installation
This package is available on npm registry. Install it with command:
```
npm install primeng-shadowdom-directives
```
# Usage
Import this package into your module where you want to apply these directives (normally will be `app.module.ts`)
```js

import { PrimeNgOverrideModule } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [
    PrimeNgOverrideModule, // import here
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