---
description: "CSS theme trong Shadow DOM: clone trên 18-21, adoptedStyleSheets trên 22."
---

# CSS trong Shadow DOM

## PrimeNG 22+ (official)

PrimeNG share stylesheet vào shadow root bằng `adoptedStyleSheets`.

**PSD v22** đã **gỡ** `attachPrimeNgStylesToShadowRoot`. Theming nhờ upstream; PSD chỉ
lo [overlay](./overlays).

## PrimeNG 18-21 (clone CSS)

CSS styled-mode thường nằm ở `document.head` và **không** xuyên vào shadow tree. Major
PSD cũ export:

```ts
import { attachPrimeNgStylesToShadowRoot } from 'primeng-shadowdom-directives';

const detach = attachPrimeNgStylesToShadowRoot(host.nativeElement.shadowRoot!);
// gọi detach() trong ngOnDestroy
```

Dùng PSD `@^18` ... `@^21`.

## CSS ≠ overlay

Có style chưa đủ để Menu dismiss đúng. Vẫn cần `psd*`.
