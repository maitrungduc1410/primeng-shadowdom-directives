import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
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

    // Same Shadow DOM retarget issue as MegaMenu on the mobile menu button.
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
          const rootmenu = readSignal((hostEl as any).rootmenu);
          const menuRoot = rootmenu?.el?.nativeElement as HTMLElement | undefined;
          const buttonRef = readSignal(
            (hostEl as any).menubutton
          ) as ElementRef<HTMLElement> | undefined;
          const buttonEl = buttonRef?.nativeElement;
          const mobileActive = !!(hostEl as any).mobileActive;

          const isOutsideContainer =
            menuRoot !== target && !menuRoot?.contains(target);
          const isOutsideMenuButton =
            mobileActive && buttonEl !== target && !buttonEl?.contains(target);

          if (isOutsideContainer) {
            if (isOutsideMenuButton) {
              (hostEl as any).mobileActive = false;
            } else {
              hostEl.hide();
            }
          }
        }
      );
    };
  }
}
