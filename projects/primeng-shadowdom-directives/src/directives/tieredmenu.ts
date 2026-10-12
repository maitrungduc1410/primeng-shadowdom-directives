import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { TieredMenu } from 'primeng/tieredmenu';

@Directive({
  standalone: false,
  selector: '[psdTieredMenu]',
})
export class psdTieredMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: TieredMenu,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }
    hostEl.bindOutsideClickListener = () => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      if (!hostEl.outsideClickListener) {
        hostEl.outsideClickListener = hostEl.renderer.listen(
          document,
          'click',
          (event: any) => {
            const path =
              event.path || (event.composedPath && event.composedPath());
            const target = event.target?.shadowRoot ? path?.[0] : event.target;
            const containerEl =
              typeof (hostEl as any).containerViewChild === 'function'
                ? (hostEl as any).containerViewChild()?.nativeElement
                : (hostEl as any).containerViewChild?.nativeElement;
            const isOutsideContainer =
              containerEl && !containerEl.contains(target);
            const isOutsideTarget = hostEl.popup
              ? !(
                  hostEl.target &&
                  (hostEl.target === target ||
                    hostEl.target.contains(target))
                )
              : true;
            if (isOutsideContainer && isOutsideTarget) {
              hostEl.hide();
            }
          }
        );
      }
    };
  }
}