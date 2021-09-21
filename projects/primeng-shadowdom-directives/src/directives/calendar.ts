import { Directive, Host, Optional, Self } from "@angular/core";
import { Calendar } from "primeng/calendar";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdCalendar]', // psd = PRIMENG ShadowDOM Directive
})
export class psdCalendarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostSel: Calendar
  ) {
    hostSel.bindScrollListener = () => {
      if (!hostSel.scrollHandler) {
        hostSel.scrollHandler = new ConnectedOverlayScrollHandler(hostSel.containerViewChild.nativeElement, () => {
          if (hostSel.overlayVisible) {
            hostSel.hideOverlay();
          }
        });
      }

      hostSel.scrollHandler.bindScrollListener();
    }

    hostSel.isOutsideClicked = (event: any) => {
      const target = event.target.shadowRoot ? event.path[0] : event.target
      return !(this.hostSel.el.nativeElement.isSameNode(target) || this.hostSel.el.nativeElement.contains(target) || (this.hostSel.overlay && this.hostSel.overlay.contains(<Node>target)));
    }
  }
}