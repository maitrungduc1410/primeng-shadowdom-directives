import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { MegaMenu } from 'primeng/megamenu';

function shadowAwareTarget(event: Event): EventTarget | null {
  const path =
    (event as any).path ||
    (typeof event.composedPath === 'function' ? event.composedPath() : null);
  if ((event.target as any)?.shadowRoot && path?.length) {
    return path[0];
  }
  return event.target;
}

@Directive({
  standalone: false,
  selector: '[psdMegaMenu]',
})
export class psdMegaMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: MegaMenu,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }

    // Mobile hamburger opens then the same document click closes it, because
    // event.target is retargeted to the Shadow DOM host.
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
          if (root && root !== target && !root.contains(target)) {
            hostEl.hide();
          }
        }
      );
    };
  }
}
