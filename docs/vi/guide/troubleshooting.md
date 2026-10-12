---
description: "Lỗi thường gặp khi dùng PrimeNG trong Shadow DOM với PSD."
---

# Khắc phục sự cố

## Overlay không đóng khi click ngoài

1. Đã import `PrimeNGShadowDOMDirective` chưa?
2. Đã gắn đúng `psd*` chưa?
3. Tránh `stopPropagation` làm rỗng `composedPath()`.

## Component không có style trong ShadowDom

- **PrimeNG 22:** kiểm tra cấu hình theme PrimeNG trước, đừng đổ lỗi cho PSD.
- **PrimeNG 18-21:** dùng `attachPrimeNgStylesToShadowRoot` trên major PSD cũ
  ([CSS](./styles)).

## Sai major PSD

Peer warning / thiếu export thường là lệch major Angular / PrimeNG / PSD. Cài cùng
major cả ba ([Cài đặt](./installation)).

## SlideMenu / OverlayPanel

- `SlideMenu` bị gỡ từ PrimeNG 18, không còn trong PSD v18+.
- `OverlayPanel` đổi tên thành `Popover` từ PrimeNG 20. Dùng `psdPopover`.
