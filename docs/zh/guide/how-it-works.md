---
description: "primeng-shadowdom-directives 在 v22 下如何修复 Shadow DOM 中的 PrimeNG 浮层。"
---

# 工作原理

本页描述 **当前 major（v22）** — Angular 22 + PrimeNG 22。

## 问题

当 UI 使用 `ViewEncapsulation.ShadowDom`（或带 shadow root 的自定义元素）时，
PrimeNG 浮层经常异常：

- 浮层面板挂到 `document.body`，位于 shadow 树 **之外**。
- `document` 上的 outside-click 监听到的是被 **retarget** 到宿主的
  `event.target`，而不是 shadow 内的真实节点。
- 查找滚动父级时可能卡在 `ShadowRoot` 上。

结果是菜单关不掉、Popover 忽略外部点击、滚动/定位逻辑出错 — 即使面板看起来
还在。

## 两件独立的事

| 问题 | 在 v22 上 |
|------|-----------|
| Shadow 宿主内的 **主题 CSS** | 由 PrimeNG 处理（`adoptedStyleSheets` / `UseStyle`）。本包 **不** clone CSS。 |
| **浮层行为**（关闭、滚动父级） | 由本包处理。 |

## 本库做什么

### 1. 导入模块 → DomHandler 补丁

导入 `PrimeNGShadowDOMDirective` 会 **替换**
`DomHandler.getScrollableParents`，跳过 `ShadowRoot` 并仍找到真正的滚动容器。

许多「无需指令」的浮层只依赖这一步。

### 2. `psd*` 指令 → 感知 Shadow 的 document 点击

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
```

指令注入 PrimeNG 组件实例，并覆盖绑定方法（如
`bindDocumentClickListener`），用 `event.composedPath()` 判断内/外。

## 流程（简化）

```
在 Shadow DOM 宿主内点击
        │
        ▼
浏览器将 event.target retarget 到宿主
        │
        ▼
document 监听器（已被 psd* 修补）
        │
        ├─ composedPath()[0] → 真实节点
        ├─ panel.contains(节点)?
        └─ trigger.contains(节点)?
                │
                └─ 两者都在外部 → hide()
```

## v22 *不会* 做的事

- 从 `document.head` clone PrimeNG 样式进 shadow root
- 改变 PrimeNG 浮层的挂载目标（面板仍可能在 `body` 上）
- 自动修复所有组件 — 有些仍需显式 `psd*`

## 深入阅读

- 仓库中的 [ARCHITECTURE.md](https://github.com/maitrungduc1410/primeng-shadowdom-directives/blob/master/ARCHITECTURE.md)
- [浮层指令](./overlays)
- [Shadow DOM 中的样式](./styles)
