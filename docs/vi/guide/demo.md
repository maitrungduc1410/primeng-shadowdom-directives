---
description: "Demo v22 tương tác: mọi component trong Supported list, chạy trong Shadow DOM."
---

# Demo trực tiếp

Trang này nhúng app demo trong repo (`projects/demo`). Toàn bộ UI bên dưới chạy với
`ViewEncapsulation.ShadowDom` trên **Angular 22 + PrimeNG 22**.

Có đủ hai nhóm trong checklist README:

- Component cần gắn `psd*` tường minh
- Component ghi **No directive required** (vẫn phải import module để bật patch
  DomHandler scroll-parent)

Theme CSS lấy từ `adoptedStyleSheets` của PrimeNG. Việc dismiss / outside-click của
overlay thì do PSD lo.

<DemoFrame open-label="Mở demo ở tab mới" />

Muốn chạy local?

```bash
npm install
npm run build
npm start
```

Rồi mở [http://localhost:4200](http://localhost:4200).
