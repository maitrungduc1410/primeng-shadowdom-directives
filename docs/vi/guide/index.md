---
description: "PSD giải quyết gì: overlay PrimeNG trong host Shadow DOM của Angular."
---

# PSD là gì?

**primeng-shadowdom-directives** (PSD) là thư viện Angular nhỏ gồm các directive giúp overlay PrimeNG hoạt động khi UI nằm trong [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) — ví dụ `ViewEncapsulation.ShadowDom` hoặc Angular Elements.

## Hai vấn đề tách biệt

| Vấn đề | Hiện tượng | Ai xử lý |
|--------|------------|----------|
| **Theme CSS** | Button / Select trong shadow không có style | PrimeNG **22+** share bằng `adoptedStyleSheets`. **18–21** cần clone từ `document.head` (xem [CSS](./styles)). |
| **Hành vi overlay** | Menu / Popover không dismiss; scroll parent sai | Directive `psd*` + patch `DomHandler.getScrollableParents` |

PSD vốn tập trung **overlay**. Bản v22 **không** export helper clone CSS — theming nhờ PrimeNG.

## Overlay hỏng vì sao?

Overlay PrimeNG thường:

1. Append panel ra `document.body` (ngoài shadow tree).
2. Lắng nghe click “bên ngoài” trên `document`.
3. Dùng `event.target` / duyệt cây dừng ở biên shadow.

Click trong shadow bị **retarget**. Không dùng `composedPath()` thì host trông như target → logic dismiss sai.

## Tiền tố

**`psd`** = **P**rimeNG **S**hadowDOM **D**irective.

## Tiếp theo

- [Cách hoạt động](./how-it-works)
- [Cài đặt](./installation)
- [Bắt đầu nhanh](./quick-start)
- [Directive overlay](./overlays)
