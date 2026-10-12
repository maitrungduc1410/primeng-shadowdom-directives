---
description: "Cách primeng-shadowdom-directives sửa overlay PrimeNG trong Shadow DOM trên v22."
---

# Cách hoạt động

Trang này nói về **major hiện tại (v22)**: Angular 22 + PrimeNG 22.

## Vấn đề

Khi UI dùng `ViewEncapsulation.ShadowDom` (hoặc custom element có shadow root),
overlay PrimeNG hay lỗi kiểu:

- Panel nổi gắn vào `document.body`, **ngoài** shadow tree.
- Listener outside-click trên `document` thấy `event.target` bị **retarget** về host,
  không phải node thật trong shadow.
- Tìm scroll parent có thể vướng `ShadowRoot`.

Hệ quả: menu không đóng, popover bỏ qua click ngoài, logic scroll / vị trí sai, dù
panel vẫn nhìn thấy được.

## Hai việc tách biệt

| Việc | Trên v22 |
|------|----------|
| **Theme CSS** trong shadow host | PrimeNG (`adoptedStyleSheets` / `UseStyle`). Package **không** clone CSS. |
| **Hành vi overlay** (dismiss, scroll parent) | Package này. |

## Thư viện làm gì

### 1. Import module → patch DomHandler

Import `PrimeNGShadowDOMDirective` sẽ **thay** `DomHandler.getScrollableParents` để
bỏ qua `ShadowRoot` và vẫn tìm đúng scroll container.

Nhiều overlay “không cần directive” chỉ cần bước này (Select, Tooltip, AutoComplete, ...).

### 2. Directive `psd*` → click document nhận biết shadow

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
```

Directive inject instance PrimeNG và override binder (ví dụ
`bindDocumentClickListener`) để dùng `event.composedPath()` khi quyết định trong /
ngoài.

## Luồng (rút gọn)

```
Click trong Shadow DOM host
        │
        ▼
Browser retarget event.target về host
        │
        ▼
Listener trên document (đã patch bởi psd*)
        │
        ├─ composedPath()[0] → node thật
        ├─ panel chứa(node)?
        └─ trigger.contains(node)?
                │
                └─ cả hai đều ngoài → hide()
```

## Việc v22 *không* làm

- Clone CSS PrimeNG từ `document.head` vào shadow root
- Đổi chỗ append overlay của PrimeNG (panel vẫn có thể nằm trên `body`)
- Tự sửa mọi component (một số vẫn cần `psd*` tường minh)

## Đọc thêm

- [ARCHITECTURE.md](https://github.com/maitrungduc1410/primeng-shadowdom-directives/blob/master/ARCHITECTURE.md) trên repo
- [Directive overlay](./overlays)
- [CSS trong Shadow DOM](./styles)
- [Demo trực tiếp](./demo)
