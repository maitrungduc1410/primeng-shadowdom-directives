---
description: "Lỗi thường gặp khi dùng PrimeNG trong Shadow DOM với PSD."
---

# Khắc phục sự cố

## Overlay không đóng khi click ngoài

1. Đã import `PrimeNGShadowDOMDirective`?
2. Đã gắn đúng `psd*`?
3. Tránh `stopPropagation` làm rỗng `composedPath()`.

## Component không có style trong ShadowDom

- **PrimeNG 22:** kiểm tra cấu hình theme PrimeNG trước.
- **PrimeNG 18–21:** dùng `attachPrimeNgStylesToShadowRoot` trên major PSD cũ ([CSS](./styles)).

## Sai major PSD

Peer warning / thiếu export → lệch major Angular / PrimeNG / PSD ([Cài đặt](./installation)).

## SlideMenu / OverlayPanel

- `SlideMenu` bị gỡ từ PrimeNG 18.
- `OverlayPanel` → `Popover` từ PrimeNG 20 (`psdPopover`).
