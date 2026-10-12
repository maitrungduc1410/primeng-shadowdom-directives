import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  NgZone,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { Popover } from 'primeng/popover';

@Directive({
  standalone: false,
  selector: '[psdPopover]',
})
export class psdPopoverDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Popover,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }
    hostEl.bindDocumentClickListener = () => {
      if (!isPlatformBrowser(this.platformId) || hostEl.documentClickListener) {
        return;
      }
      this.zone.runOutsideAngular(() => {
        const documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
        const documentTarget: any = hostEl.el
          ? hostEl.el.nativeElement.ownerDocument
          : 'document';
        hostEl.documentClickListener = hostEl.renderer.listen(
          documentTarget,
          documentEvent,
          (event: Event) => {
            if (!hostEl.dismissable) {
              return;
            }
            const path =
              (event as any).path ||
              (typeof event.composedPath === 'function'
                ? event.composedPath()
                : null);
            const target = (event.target as any)?.shadowRoot
              ? path?.[0]
              : event.target;
            if (
              !hostEl.container?.contains(target as Node) &&
              hostEl.target !== target &&
              !hostEl.target?.contains(target as Node) &&
              !hostEl.selfClick
            ) {
              this.zone.run(() => hostEl.hide());
            }
            hostEl.selfClick = false;
            hostEl.cd.markForCheck();
          }
        );
      });
    };
  }
}
