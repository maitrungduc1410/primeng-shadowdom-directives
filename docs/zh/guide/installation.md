---
description: "安装与 Angular、PrimeNG major 对齐的 primeng-shadowdom-directives。"
---

# 安装

## 选择匹配的 major

| PSD | Angular | PrimeNG |
|-----|---------|---------|
| `^18` | 18 | 18 |
| `^19` | 19 | 19 |
| `^20` | 20 | 20 |
| `^21` | 21 | 21 |
| `^22` | 22 | 22 |

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

更旧的 major 在 GitHub 分支 `v18` … `v21` 以及对应的 npm 版本 / tag 上。

## Peer 依赖

以 v22 为例：

- `@angular/common`
- `@angular/core`
- `primeng`

请与上表保持同一 major。

## 导入模块

`PrimeNGShadowDOMDirective` 是一个 `NgModule`，声明/导出浮层指令，并在导入时应用滚动父级补丁。

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [
    PrimeNGShadowDOMDirective,
    // PrimeNG modules…
  ],
})
export class AppModule {}
```

Standalone 组件也可把它放进 `imports`：

```ts
@Component({
  standalone: true,
  imports: [PrimeNGShadowDOMDirective, MenuModule /* … */],
  // …
})
export class ShadowHostComponent {}
```

在使用浮层的地方 **导入一次**（app config / 功能模块 / 宿主组件）。仍需在需要显式覆盖的组件上添加 `psd*` — 见 [浮层](./overlays)。
