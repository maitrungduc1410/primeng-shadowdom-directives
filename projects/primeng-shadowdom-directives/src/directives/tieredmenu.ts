import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { TieredMenu } from 'primeng/tieredmenu';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[psdTieredMenu]',
})
export class psdTieredMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: TieredMenu,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    hostEl.bindOutsideClickListener = () => {
      if (isPlatformBrowser(platformId)) {
        if (!hostEl.outsideClickListener) {
          hostEl.outsideClickListener = hostEl.renderer.listen(
            document,
            'click',
            (event) => {
              const path =
                event.path || (event.composedPath && event.composedPath());
              const target = event.target.shadowRoot ? path[0] : event.target;

              const isOutsideContainer =
                hostEl.containerViewChild &&
                !hostEl.containerViewChild.nativeElement.contains(target);
              const isOutsideTarget = hostEl.popup
                ? !(
                    hostEl.target &&
                    (hostEl.target === target || hostEl.target.contains(target))
                  )
                : true;
              if (isOutsideContainer && isOutsideTarget) {
                hostEl.hide();
              }
            }
          );
        }
      }
    };
  }
}
