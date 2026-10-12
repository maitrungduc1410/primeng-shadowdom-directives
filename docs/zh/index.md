---
description: "让 PrimeNG 浮层在 Shadow DOM 中正常工作的 Angular 指令 — Menu、Popover、DatePicker 等。"
layout: home

hero:
  name: PrimeNG Shadow DOM Directives
  text: 让浮层在 ShadowRoot 中正常工作
  tagline: 修复在 ViewEncapsulation.ShadowDom 或自定义元素中使用 PrimeNG 时的 outside-click、滚动父级等相关浮层问题。PrimeNG 22 已由上游共享主题样式 — 本包在 v22 专注于浮层行为。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/quick-start
    - theme: alt
      text: 这是什么？
      link: /zh/guide/
    - theme: alt
      text: npm
      link: https://www.npmjs.com/package/primeng-shadowdom-directives

features:
  - icon: 🎯
    title: 浮层指令
    details: 为 Menu、Popover、DatePicker、SplitButton、TieredMenu、InputMask 提供显式 psd* 属性，并为许多「无需指令」的浮层打上 DomHandler 滚动父级补丁。
    link: /zh/guide/overlays
    linkText: 浮层指南
  - icon: 🌑
    title: 面向 Shadow DOM
    details: 事件会在 shadow 边界被 retarget。基于 composedPath() 的覆盖可恢复关闭 / outside-click 行为。
    link: /zh/guide/
    linkText: 存在的原因
  - icon: 🎨
    title: 样式与浮层是两件事
    details: PrimeNG 18–21 需要 CSS clone。PrimeNG 22 通过 adoptedStyleSheets 共享样式 — v22 只需保留 PSD 处理浮层。
    link: /zh/guide/styles
    linkText: 样式指南
  - icon: 📦
    title: 与 PrimeNG 对齐的 major
    details: 按 18–22 major 发布。请安装与 Angular + PrimeNG 相同 major 的版本。
    link: /zh/guide/versions
    linkText: 版本说明
---

<div class="home-section vp-doc">

## 安装

::: code-group

```sh [npm]
npm install primeng-shadowdom-directives@^22.0.0
```

```sh [yarn]
yarn add primeng-shadowdom-directives@^22.0.0
```

:::

Peer 依赖：同 major 的 `@angular/core` / `@angular/common` 与 `primeng`。详见 [安装](/zh/guide/installation)。

## 导入一次，为浮层加上 `psd*`

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
