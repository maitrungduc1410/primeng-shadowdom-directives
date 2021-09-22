import { Directive, Host, Optional, Self } from "@angular/core";
import { Dropdown } from "primeng/dropdown";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdDropdown]',
})
export class psdDropdownDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Dropdown
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerViewChild.nativeElement, (event: any) => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.isOutsideClicked = (event: any) => {
      const target = event.target.shadowRoot ? event.path[0] : event.target
      return !(this.hostEl.el.nativeElement.isSameNode(target) || this.hostEl.el.nativeElement.contains(target) || (this.hostEl.overlay && this.hostEl.overlay.contains(<Node> target)));
    }
  }
}