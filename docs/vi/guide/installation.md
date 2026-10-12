---
description: "Cài primeng-shadowdom-directives khớp major Angular và PrimeNG."
---

# Cài đặt

## Chọn đúng major

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

Major cũ nằm trên nhánh GitHub `v18` … `v21` và bản npm tương ứng.

## Peer dependencies

Ví dụ v22: `@angular/common`, `@angular/core`, `primeng` — cùng major với bảng trên.

## Import module

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [PrimeNGShadowDOMDirective],
})
export class AppModule {}
```

Standalone: thêm module vào `imports` của component host. Vẫn gắn `psd*` trên từng overlay cần override — xem [Overlay](./overlays).
