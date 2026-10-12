---
description: "Directive psd* và patch DomHandler scroll-parent."
---

# Directive overlay

## Thuộc tính `psd*`

```html
<p-menu [popup]="true" psdMenu></p-menu>
<p-popover psdPopover>...</p-popover>
<p-datepicker psdDatePicker></p-datepicker>
<p-splitButton psdSplitButton></p-splitButton>
<p-tieredMenu psdTieredMenu></p-tieredMenu>
<p-inputMask psdInputMask></p-inputMask>
```

### Đổi tên theo major

| Major | Ghi chú |
|-------|---------|
| ≤ 19 | Overlay panel: `psdOverlayPanel` trên nhánh cũ |
| ≥ 20 | Dùng `psdPopover` với `p-popover` |
| ≤ 19 | `psdCalendar` legacy; ưu tiên `psdDatePicker` |

## Patch cấp module

Import `PrimeNGShadowDOMDirective` còn patch `DomHandler.getScrollableParents` để nhiều overlay “No directive required” chạy được.

## Ý tưởng override

- Outside-click → ưu tiên `event.composedPath()`
- Scrollable parents → nhìn xuyên biên shadow khi cần

Hook cụ thể khác nhau theo major PrimeNG — cài đúng major PSD.
