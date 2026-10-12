---
description: "primeng-shadowdom-directives 解决什么：Angular Shadow DOM 宿主中的 PrimeNG 浮层。"
---

# 这是什么？

**primeng-shadowdom-directives**（PSD）是一组小型 Angular 指令，用来在
[Shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM)
里把 PrimeNG **浮层**跑顺，例如 `ViewEncapsulation.ShadowDom` 或 Angular Elements。

## 两个独立问题

| 问题 | 现象 | 谁来解决 |
|------|------|----------|
| **主题 CSS** | Shadow 宿主内 Button / Select 无样式 | PrimeNG **22+** 通过 `adoptedStyleSheets` 共享。**18-21** 需从 `document.head` clone（见 [样式](./styles)）。 |
| **浮层行为** | Menu / Popover 无法 outside-click 关闭；滚动父级错误 | PSD 的 `psd*` 指令 + `DomHandler.getScrollableParents` 补丁 |

PSD 一直专注 **浮层**。本包 v22 **不再**提供 CSS clone 助手，主题样式交给 PrimeNG。

## 浮层为何在 Shadow DOM 中失效

PrimeNG 浮层通常会：

1. 将面板 append 到 `document.body`（在 shadow 树之外）。
2. 在 `document` 上监听「外部」点击。
3. 使用会在 shadow 边界停下的 `event.target` / 树遍历。

来自 shadow 宿主内部的点击会被 **retarget**。若不使用 `composedPath()`，宿主会看起来像点击目标，关闭逻辑就会出错。

## 前缀

所有指令使用前缀 **`psd`** = **P**rimeNG **S**hadowDOM **D**irective（`psdMenu`、`psdPopover` 等）。

## 下一步

- [工作原理](./how-it-works)
- [安装](./installation)
- [快速开始](./quick-start)
- [在线 Demo](./demo)
- [浮层指令](./overlays)
