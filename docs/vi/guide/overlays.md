---
description: "Directive psd* và patch DomHandler scroll-parent."
---

# Directive overlay

## Thuộc tính `psd*`

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
<p-datepicker psdDatePicker></p-datepicker>
<p-splitbutton psdSplitButton></p-splitbutton>
<p-tieredmenu psdTieredMenu></p-tieredmenu>
<p-inputmask psdInputMask></p-inputmask>
```

### Đổi tên theo major

| Major | Ghi chú |
|-------|---------|
| ≤ 19 | Overlay panel: `psdOverlayPanel` trên nhánh cũ |
| ≥ 20 | Dùng `psdPopover` với `p-popover` |
| ≤ 19 | `psdCalendar` legacy; ưu tiên `psdDatePicker` |

Danh sách đầy đủ trên major hiện tại: [Component hỗ trợ](./supported-components).

## Patch cấp module

Import `PrimeNGShadowDOMDirective` còn patch `DomHandler.getScrollableParents` để nhiều
overlay “No directive required” chạy được.

Component nào tự bind document click thì vẫn cần `psd*` tường minh để dùng
`composedPath()`.

## Ý tưởng override

- Outside-click → ưu tiên `event.composedPath()` thay vì `event.target`
- Scrollable parents → nhìn xuyên biên shadow khi cần

Hook cụ thể khác nhau theo major PrimeNG. Cài đúng major PSD.
