import { Directive, Host, Optional, Self } from "@angular/core";
import { MultiSelect } from "primeng/multiselect";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdMultiSelect]',
})
export class psdMultiSelectDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: MultiSelect
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerViewChild.nativeElement, () => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.isOutsideClicked = (event: any) => {
      const target = event.target.shadowRoot ? event.path[0] : event.target
      return !(this.hostEl.el.nativeElement.isSameNode(target) || this.hostEl.el.nativeElement.contains(target) || (this.hostEl.overlay && this.hostEl.overlay.contains(<Node>target)));
    }
  }
}