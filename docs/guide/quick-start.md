---
description: "Minimal Shadow DOM host using PrimeNGShadowDOMDirective and psd* attributes."
---

# Quick start

## 1. Install

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

## 2. Shadow host component

```ts
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@Component({
  selector: 'app-shadow-demo',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [
    FormsModule,
    ButtonModule,
    MenuModule,
    PopoverModule,
    PrimeNGShadowDOMDirective,
  ],
  template: `
    <p-button label="Menu" (onClick)="menu.toggle($event)" />
    <p-menu #menu [model]="items" [popup]="true" psdMenu />

    <p-button label="Popover" (onClick)="op.toggle($event)" />
    <p-popover #op psdPopover>Outside click should dismiss.</p-popover>
  `,
})
export class ShadowDemoComponent {
  items = [
    { label: 'Profile' },
    { label: 'Settings' },
  ];
}
```

## 3. Theme CSS (v22)

On **PrimeNG 22**, styled-mode sheets are shared into the shadow root via
`adoptedStyleSheets`. You do **not** need a PSD CSS helper.

On **PrimeNG 18-21**, see [Styles in Shadow DOM](./styles) for
`attachPrimeNgStylesToShadowRoot`.

## 4. Try the demo

- In the docs: [Live demo](./demo)
- In this repository:

```bash
npm install
npm run build
npm start
```

Open [http://localhost:4200](http://localhost:4200).
