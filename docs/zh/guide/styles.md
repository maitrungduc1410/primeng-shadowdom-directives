---
description: "Shadow DOM 中的主题 CSS：PrimeNG 18–21 的 clone 与 22 的 adoptedStyleSheets。"
---

# Shadow DOM 中的样式

## PrimeNG 22+（官方）

PrimeNG 使用 `adoptedStyleSheets`（`UseStyle` / `_shareStylesWithShadowRoot`）将非变量主题样式表共享进 shadow root。

在 **PSD v22** 上我们 **移除了** `attachPrimeNgStylesToShadowRoot`。主题交给上游；PSD 仅用于 [浮层](./overlays)。

## PrimeNG 18–21（CSS clone）

Styled-mode CSS 通常落在 `document.head`，**不会**穿透进 shadow 树。较旧的 PSD major 导出：

```ts
import { attachPrimeNgStylesToShadowRoot } from 'primeng-shadowdom-directives';

// 每个 ShadowDom 宿主，视图就绪后：
const root = host.nativeElement.shadowRoot!;
const detach = attachPrimeNgStylesToShadowRoot(root);
// 在 ngOnDestroy 中调用 detach()
```

请安装 `primeng-shadowdom-directives@^18` … `@^21` 以获取该助手。

## CSS ≠ 浮层

修好样式 **不会** 修好 Menu 关闭 / outside-click。那仍是浮层问题 — 无论 major，都请使用 `psd*`。
