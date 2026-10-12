---
description: "Shadow DOM + PrimeNG 常见问题，以及如何用 PSD 修复。"
---

# 故障排查

## 浮层无法在 outside-click 时关闭

1. 确认宿主 / 模块已导入 `PrimeNGShadowDOMDirective`。
2. 为该组件添加显式 `psd*` 属性。
3. 避免以会清空 `composedPath()` 的方式 `stopPropagation`。

## ShadowDom 内组件看起来没有样式

- **PrimeNG 22：** 先确认 PrimeNG 主题配置；样式应自动 adopt。若否，先查 PrimeNG 主题，不是 PSD。
- **PrimeNG 18-21：** 在匹配的旧 PSD major 中使用 `attachPrimeNgStylesToShadowRoot`（见 [样式](./styles)）。

## PSD major 不匹配

Peer 警告或缺少导出通常意味着 Angular / PrimeNG / PSD major 不一致。三者安装同一 major（见 [安装](./installation)）。

## 窄屏下 MegaMenu / Menubar 汉堡按钮点了没反应

窄视口时 PrimeNG 会收成汉堡按钮。若未加 `psdMegaMenu` / `psdMenubar`，打开菜单的
那次 document click 也会立刻关掉它，因为 `event.target` 被 retarget 到 Shadow DOM
宿主。请加上对应属性。

## 找不到 SlideMenu / OverlayPanel

- `SlideMenu` 已在 PrimeNG 18 被上游移除，不在 PSD v18+ 中。
- `OverlayPanel` 在 PrimeNG 20 重命名为 `Popover`，使用 `psdPopover`。
