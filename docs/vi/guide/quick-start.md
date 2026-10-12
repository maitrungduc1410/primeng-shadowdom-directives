---
description: "Host Shadow DOM tối giản với PrimeNGShadowDOMDirective và psd*."
---

# Bắt đầu nhanh

## 1. Cài

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

## 2. Component host

```ts
import { Component, ViewEncapsulation } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@Component({
  selector: 'app-shadow-demo',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [ButtonModule, MenuModule, PopoverModule, PrimeNGShadowDOMDirective],
  template: `
    <p-button label="Menu" (onClick)="menu.toggle($event)" />
    <p-menu #menu [model]="items" [popup]="true" psdMenu />

    <p-button label="Popover" (onClick)="op.toggle($event)" />
    <p-popover #op psdPopover>Outside click should dismiss.</p-popover>
  `,
})
export class ShadowDemoComponent {
  items = [{ label: 'Profile' }, { label: 'Settings' }];
}
```

## 3. CSS theme (v22)

PrimeNG **22** share style qua `adoptedStyleSheets`. **Không** cần helper CSS của PSD.

PrimeNG **18-21**: xem [CSS trong Shadow DOM](./styles).

## 4. Thử demo

- Trong docs: [Demo trực tiếp](./demo)
- Trong repo:

```bash
npm install && npm run build && npm start
```

Mở [http://localhost:4200](http://localhost:4200).
