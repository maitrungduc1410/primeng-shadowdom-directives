import { Directive, Host, Optional, Self } from "@angular/core";
import { MultiSelect } from "primeng/multiselect";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdMultiSelect]',
})
export class psdMultiSelectDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostSel: MultiSelect
  ) {
    hostSel.bindScrollListener = () => {
      if (!hostSel.scrollHandler) {
        hostSel.scrollHandler = new ConnectedOverlayScrollHandler(hostSel.containerViewChild.nativeElement, () => {
          if (hostSel.overlayVisible) {
            hostSel.hide();
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