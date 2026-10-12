---
description: "Angular directives that make PrimeNG overlays work inside Shadow DOM: Menu, Popover, DatePicker, and more."
layout: home

hero:
  name: PrimeNG Shadow DOM Directives
  text: Overlays that behave inside ShadowRoot
  tagline: Fix outside-click, scroll parents, and related overlay bugs when PrimeNG runs under ViewEncapsulation.ShadowDom or custom elements. On PrimeNG 22, theme CSS is shared upstream, so this package focuses on overlay behavior.
  actions:
    - theme: brand
      text: Get started
      link: /guide/quick-start
    - theme: alt
      text: Live demo
      link: /guide/demo
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/primeng-shadowdom-directives

features:
  - icon: 🎯
    title: Overlay directives
    details: Explicit psd* attributes for Menu, Popover, DatePicker, SplitButton, TieredMenu, InputMask, MegaMenu, and Menubar, plus a DomHandler scroll-parent patch for many “no directive” overlays.
    link: /guide/overlays
    linkText: Overlay guide
  - icon: 🌑
    title: Built for Shadow DOM
    details: Events retarget at the shadow boundary. composedPath-based overrides restore dismiss / outside-click behavior that plain document listeners miss.
    link: /guide/
    linkText: Why it exists
  - icon: 🎨
    title: Styles vs overlays
    details: PrimeNG 18-21 need a CSS clone helper. PrimeNG 22 shares sheets via adoptedStyleSheets, so on v22 keep PSD only for overlays.
    link: /guide/styles
    linkText: Styles guide
  - icon: 📦
    title: Aligned majors
    details: Publish tracks PrimeNG majors (18-22). Install the matching major with your Angular + PrimeNG stack.
    link: /guide/versions
    linkText: Versions
---

<div class="home-section vp-doc">

## Install

::: code-group

```sh [npm]
npm install primeng-shadowdom-directives@^22.0.0
```

```sh [yarn]
yarn add primeng-shadowdom-directives@^22.0.0
```

:::

Peer dependencies: `@angular/core` / `@angular/common` and `primeng` at the same major. See [Installation](/guide/installation).

## Import once, decorate overlays

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [PrimeNGShadowDOMDirective],
})
export class AppModule {}
```

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
<p-datepicker psdDatePicker></p-datepicker>
```

</div>
