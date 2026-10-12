---
description: "使用 PrimeNGShadowDOMDirective 与 psd* 的最小 Shadow DOM 宿主。"
---

# 快速开始

## 1. 安装

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

## 2. Shadow 宿主组件

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

## 3. 主题 CSS（v22）

在 **PrimeNG 22** 上，styled-mode 样式表会通过 `adoptedStyleSheets` 共享进 shadow root。**不需要** PSD 的 CSS 助手。

在 **PrimeNG 18–21** 上，见 [Shadow DOM 中的样式](./styles) 了解 `attachPrimeNgStylesToShadowRoot`。

## 4. 运行仓库 demo

```bash
npm install
npm run build
npm start
```

打开 [http://localhost:4200](http://localhost:4200)。
