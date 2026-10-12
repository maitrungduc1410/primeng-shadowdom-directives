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

## MegaMenu / Menubar burger bấm không mở trên màn hẹp

Viewport hẹp thì PrimeNG thu gọn thành hamburger. Thiếu `psdMegaMenu` / `psdMenubar`
thì cùng một document click vừa mở vừa đóng menu, vì `event.target` bị retarget về
Shadow DOM host. Gắn đúng attribute.

## SlideMenu / OverlayPanel

- `SlideMenu` bị gỡ từ PrimeNG 18, không còn trong PSD v18+.
- `OverlayPanel` đổi tên thành `Popover` từ PrimeNG 20. Dùng `psdPopover`.
