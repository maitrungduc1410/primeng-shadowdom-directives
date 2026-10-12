---
description: "Major PSD map với Angular / PrimeNG và nhánh Git."
---

# Phiên bản & nhánh

## Versioning

Major PSD theo **PrimeNG** để stack khớp nhau:

```text
app: Angular N + PrimeNG N  →  primeng-shadowdom-directives@^N
```

## Nhánh Git

| Nhánh | Vai trò |
|-------|---------|
| `master` | Major hiện tại (v22) |
| `v18` ... `v21` | Dòng cũ |
| `v22` | Khớp master khi còn |

## Thay đổi trên v22

- CSS: nhờ PrimeNG `adoptedStyleSheets` (không export clone)
- Overlay: giữ `psd*` + patch module
- `OverlayPanel` → `Popover` (từ v20+)

## npm

```sh
npm view primeng-shadowdom-directives versions --json
npm view primeng-shadowdom-directives dist-tags
```
