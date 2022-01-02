import { Directive, Host, NgZone, Optional, Self } from "@angular/core";
import { OverlayPanel } from "primeng/overlaypanel";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";
import { DomHandler } from "../domhandler";

@Directive({
  selector: '[psdOverlayPanel]',
})
export class psdOverlayPanelDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: OverlayPanel,
    private zone: NgZone
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.target, () => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.bindDocumentClickListener = () => {
      if (!hostEl.documentClickListener && hostEl.dismissable) {
        this.zone.runOutsideAngular(() => {
          let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
          const documentTarget: any = hostEl.el ? hostEl.el.nativeElement.ownerDocument : 'document';

          hostEl.documentClickListener = hostEl.renderer.listen(documentTarget, documentEvent, (event) => {
            const path = event.path || (event.composedPath && event.composedPath());
            const target = event.target.shadowRoot ? path[0] : event.target
            if (!hostEl.container.contains(target) && hostEl.target !== target && !hostEl.target.contains(target) && !hostEl.selfClick) {
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