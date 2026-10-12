---
description: "v22 交互 Demo：Supported 列表中的全部组件，运行在 Shadow DOM 中。"
---

# 在线 Demo

本页嵌入仓库里的 demo 应用（`projects/demo`）。下方 UI 全部跑在
`ViewEncapsulation.ShadowDom` 下，栈为 **Angular 22 + PrimeNG 22**。

覆盖 README checklist 里的两类组件：

- 需要显式 `psd*` 的组件
- 标注 **No directive required** 的组件（仍需导入 module，才能启用 DomHandler
  scroll-parent patch）

主题 CSS 来自 PrimeNG 的 `adoptedStyleSheets`；overlay 的 dismiss / outside-click
由 PSD 处理。

<DemoFrame open-label="在新标签页打开 Demo" />

想在本地跑？

```bash
npm install
npm run build
npm start
```

然后打开 [http://localhost:4200](http://localhost:4200)。
