import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { Menu } from 'primeng/menu';

@Directive({
  selector: '[psdMenu]',
})
export class psdMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menu,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    hostEl.bindDocumentClickListener = () => {
      if (!hostEl.documentClickListener && isPlatformBrowser(platformId)) {
        const documentTarget: any = hostEl.el
          ? hostEl.el.nativeElement.ownerDocument
          : 'document';

        hostEl.documentClickListener = hostEl.renderer.listen(
          documentTarget,
          'click',
          (event) => {
            const isOutsideContainer =
              hostEl.containerViewChild?.nativeElement &&
              !hostEl.containerViewChild.nativeElement.contains(
                event.target.shadowRoot
                  ? event.target.shadowRoot.activeElement
                  : event.target
              );
            const isOutsideTarget = !(
              hostEl.target &&
              (hostEl.target === event.target ||
                hostEl.target.contains(event.target))
            );
            if (!hostEl.popup && isOutsideContainer && isOutsideTarget) {
              hostEl.onListBlur(event);
            }
            if (
              hostEl.preventDocumentDefault &&
              hostEl.overlayVisible &&
              isOutsideContainer &&
              isOutsideTarget
            ) {
              hostEl.hide();
              hostEl.preventDocumentDefault = false;
            }
          }
        );
      }
    };
  }
}
