import { Directive, Host, NgZone, Optional, Self } from "@angular/core";
import { OverlayPanel } from "primeng/overlaypanel";
import { DomHandler } from "primeng/dom";

@Directive({
  selector: '[psdOverlayPanel]',
})
export class psdOverlayPanelDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: OverlayPanel,
    private zone: NgZone
  ) {
    hostEl.bindDocumentClickListener = () => {
      if (!hostEl.documentClickListener && hostEl.dismissable) {
        this.zone.runOutsideAngular(() => {
          let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
          const documentTarget: any = hostEl.el ? hostEl.el.nativeElement.ownerDocument : 'document';

          hostEl.documentClickListener = hostEl.renderer.listen(documentTarget, documentEvent, (event) => {
            const path = event.path || (event.composedPath && event.composedPath());
            const target = event.target.shadowRoot ? path[0] : event.target
            if (!hostEl.container?.contains(target) && hostEl.target !== target && !hostEl.target.contains(target) && !hostEl.selfClick) {
              this.zone.run(() => {
                hostEl.hide();
              });
            }

            hostEl.selfClick = false;
            hostEl.cd.markForCheck();
          });
        });
      }
    }
  }
}