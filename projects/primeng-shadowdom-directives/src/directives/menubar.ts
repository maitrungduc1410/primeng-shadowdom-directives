import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { ZIndexUtils } from 'primeng/utils';
import { Menubar } from 'primeng/menubar';

function shadowAwareTarget(event: Event): EventTarget | null {
  const path =
    (event as any).path ||
    (typeof event.composedPath === 'function' ? event.composedPath() : null);
  if ((event.target as any)?.shadowRoot && path?.length) {
    return path[0];
  }
  return event.target;
}

function readSignal<T>(value: T | (() => T)): T {
  return typeof value === 'function' ? (value as () => T)() : value;
}

@Directive({
  standalone: false,
  selector: '[psdMenubar]',
})
export class psdMenubarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menubar,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }

    // Menubar.mobileActive is a plain field (OnPush). MegaMenu uses a signal, so
    // hide() alone is enough there; here we must clear mobileActive + markForCheck
    // or the burger panel never closes under Shadow DOM.
    hostEl.bindOutsideClickListener = () => {
      if (
        !isPlatformBrowser(this.platformId) ||
        (hostEl as any).outsideClickListener
      ) {
        return;
      }
      (hostEl as any).outsideClickListener = hostEl.renderer.listen(
        hostEl.document,
        'click',
        (event: Event) => {
          const target = shadowAwareTarget(event) as Node;
          const root = hostEl.el?.nativeElement as HTMLElement | undefined;
          if (!root || root === target || root.contains(target)) {
            return;
          }

          const rootmenu = readSignal((hostEl as any).rootmenu);
          const menuRoot = rootmenu?.el?.nativeElement as HTMLElement | undefined;
          if ((hostEl as any).mobileActive) {
            (hostEl as any).mobileActive = false;
            if (menuRoot) {
              ZIndexUtils.clear(menuRoot);
            }
          }
          hostEl.hide();
          hostEl.cd.markForCheck();
        }
      );
    };
  }
}
