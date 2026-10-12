---
description: "psd* 浮层指令与 DomHandler 滚动父级补丁。"
---

# 浮层指令

## 显式 `psd*` 属性

在对应的 PrimeNG 组件上添加属性：

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
<p-datepicker psdDatePicker></p-datepicker>
<p-splitbutton psdSplitButton></p-splitbutton>
<p-tieredmenu psdTieredMenu></p-tieredmenu>
<p-inputmask psdInputMask></p-inputmask>
<p-megamenu psdMegaMenu></p-megamenu>
<p-menubar psdMenubar></p-menubar>
```

### 重命名说明

| Major | 说明 |
|-------|------|
| ≤ 19 | 旧分支上的 OverlayPanel 使用 `psdOverlayPanel` / `p-overlayPanel` |
| ≥ 20 | 使用 `psdPopover` 与 `p-popover` |
| ≤ 19 | 旧分支可能仍有 `psdCalendar`；优先使用 `psdDatePicker` |

完整列表见 [支持的组件](./supported-components)。

## 模块级补丁

导入 `PrimeNGShadowDOMDirective` 还会修补 `DomHandler.getScrollableParents`，使许多标记为 **无需指令** 的浮层（Select、Tooltip、AutoComplete 等）无需属性即可工作。

对 outside-click / 目标逻辑必须使用 `composedPath()` 的组件，仍需显式 `psd*`。

## 覆盖思路（概念上）

- Outside-click / document 监听 → 优先 `event.composedPath()` 而非 `event.target`
- 可滚动父级发现 → 在需要时跨过 shadow 边界

具体 hook 随 PrimeNG major 略有不同；请安装与 PrimeNG 版本匹配的 PSD major。
