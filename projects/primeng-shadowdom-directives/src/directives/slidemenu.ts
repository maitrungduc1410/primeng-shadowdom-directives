import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { SlideMenu } from 'primeng/slidemenu';

@Directive({
  selector: '[psdSlideMenu]',
})
export class psdSlideMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SlideMenu,
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

              if (hostEl.popup) {
                if (isOutsideContainer && isOutsideTarget) {
                  hostEl.onMenuBlur();
                  hostEl.hide();
                }
              } else {
                if (isOutsideContainer && isOutsideTarget && hostEl.focused) {
                  hostEl.onMenuBlur();
                }
              }
            }
          );
        }
      }
    };
  }
}
