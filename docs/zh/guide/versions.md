---
description: "PSD major 如何对应 Angular / PrimeNG，以及使用哪些分支。"
---

# 版本与分支

## 版本策略

PSD major 跟随 **PrimeNG** major，便于对齐技术栈：

```text
app: Angular N + PrimeNG N  →  primeng-shadowdom-directives@^N
```

## Git 分支

| 分支 | 作用 |
|------|------|
| `master` | 当前 major（v22） |
| `v18` ... `v21` | 较旧栈的冻结 / 维护线 |
| `v22` | 存在时与当前 master 同线 |

## v22 的变化

- 主题 CSS：依赖 PrimeNG `adoptedStyleSheets`（**无** CSS clone 导出）
- 浮层：保留 `psd*` + 模块补丁
- `OverlayPanel` → `Popover`（自 v20+）

## npm

```sh
npm view primeng-shadowdom-directives versions --json
npm view primeng-shadowdom-directives dist-tags
```
