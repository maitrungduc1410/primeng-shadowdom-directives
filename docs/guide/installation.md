---
description: "Install primeng-shadowdom-directives matching your Angular and PrimeNG major."
---

# Installation

## Pick the matching major

Install the PSD major that matches your **PrimeNG** (and Angular) major:

| PSD | Angular | PrimeNG |
|-----|---------|---------|
| `^18` | 18 | 18 |
| `^19` | 19 | 19 |
| `^20` | 20 | 20 |
| `^21` | 21 | 21 |
| `^22` | 22 | 22 |

```sh
npm install primeng-shadowdom-directives@^22.0.0
```

Older majors live on GitHub branches `v18` ... `v21` and matching npm versions / tags.

## Peer dependencies

Declared peers (example for v22):

- `@angular/common`
- `@angular/core`
- `primeng`

Keep them on the same major as the table above.

## Import the module

`PrimeNGShadowDOMDirective` is an `NgModule` that declares/exports the overlay
directives and applies the scroll-parent patch when imported.

```ts
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  imports: [
    PrimeNGShadowDOMDirective,
    // PrimeNG modules...
  ],
})
export class AppModule {}
```

Standalone components can put the same module in their `imports` array:

```ts
@Component({
  standalone: true,
  imports: [PrimeNGShadowDOMDirective, MenuModule /* ... */],
  // ...
})
export class ShadowHostComponent {}
```

Import it **once** near where you use overlays (app config / feature module / host
component). You still add `psd*` attributes on the components that need explicit
overrides. See [Overlays](./overlays).
