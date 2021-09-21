# Primeng Shadowdom Directives
Set of directives to fix PrimeNg "overlay" components got-chas when rendered inside ShadowDOM

Below are list of components that currently supported:
- [x] Calendar
- [x] Dropdown
- [x] Menu
- [x] MultiSelect
- [x] Tooltip

To request for new component, please submit issue or PR
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