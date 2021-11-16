import { Directive, Host, Optional, Self } from "@angular/core";
import { ConfirmPopup } from "primeng/confirmpopup";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";
import { DomHandler } from "../domhandler";

@Directive({
  selector: '[psdConfirmPopup]',
})
export class psdConfirmPopupDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: ConfirmPopup
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.confirmation.target, () => {
          if (hostEl.visible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.bindDocumentClickListener = () => {
      if (!hostEl.documentClickListener) {
          let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
          const documentTarget: any = hostEl.el ? hostEl.el.nativeElement.ownerDocument : document;

          hostEl.documentClickListener = hostEl.renderer.listen(documentTarget, documentEvent, (event) => {
              let targetElement = <HTMLElement> hostEl.confirmation.target;
              const path = event.path || (event.composedPath && event.composedPath());
              const target = event.target.shadowRoot ? path[0] : event.target
              if (hostEl.container !== target && !hostEl.container.contains(target) &&
                  targetElement !== target && !targetElement.contains(target)) {
                  hostEl.hide();
              }
          });
      }
  }
  }
}