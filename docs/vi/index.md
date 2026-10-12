---
description: "Directive Angular giúp overlay PrimeNG chạy được trong Shadow DOM: Menu, Popover, DatePicker, và các overlay khác."
layout: home

hero:
  name: PrimeNG Shadow DOM Directives
  text: Overlay hoạt động đúng trong ShadowRoot
  tagline: Sửa outside-click, scroll parent và các lỗi overlay khi PrimeNG chạy dưới ViewEncapsulation.ShadowDom hoặc custom element. Với PrimeNG 22, CSS theme đã được share phía upstream, nên package này tập trung vào hành vi overlay.
  actions:
    - theme: brand
      text: Bắt đầu
      link: /vi/guide/quick-start
    - theme: alt
      text: Demo
      link: /vi/guide/demo
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/primeng-shadowdom-directives

features:
  - icon: 🎯
    title: Directive overlay
    details: Thuộc tính psd* cho Menu, Popover, DatePicker, SplitButton, TieredMenu, InputMask, MegaMenu, Menubar, kèm patch DomHandler scroll-parent cho nhiều overlay “không cần directive”.
    link: /vi/guide/overlays
    linkText: Xem overlay
  - icon: 🌑
    title: Dành cho Shadow DOM
    details: Event bị retarget ở biên shadow. Override dùng composedPath() để outside-click / dismiss hoạt động lại.
    link: /vi/guide/
    linkText: Vì sao cần PSD
  - icon: 🎨
    title: CSS và overlay là hai việc
    details: PrimeNG 18-21 cần clone CSS. PrimeNG 22 share sheet qua adoptedStyleSheets, nên trên v22 chỉ giữ PSD cho overlay.
    link: /vi/guide/styles
    linkText: CSS trong Shadow DOM
  - icon: 📦
    title: Major theo PrimeNG
    details: Publish theo major 18-22. Cài đúng major khớp Angular + PrimeNG của bạn.
    link: /vi/guide/versions
    linkText: Phiên bản
---

<div class="home-section vp-doc">

## Cài đặt

::: code-group

```sh [npm]
npm install primeng-shadowdom-directives@^22.0.0
```

```sh [yarn]
yarn add primeng-shadowdom-directives@^22.0.0
```

:::

Peer: `@angular/core` / `@angular/common` và `primeng` cùng major. Xem [Cài đặt](/vi/guide/installation).

## Import một lần, gắn `psd*`

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
