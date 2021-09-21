import { Directive, Host, Optional, Self } from "@angular/core";
import { Tooltip } from "primeng/tooltip";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdTooltip]',
})
export class psdTooltipDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostSel: Tooltip
  ) {
    hostSel.bindScrollListener = () => {
      if (!hostSel.scrollHandler) {
        hostSel.scrollHandler = new ConnectedOverlayScrollHandler(hostSel.el.nativeElement, () => {
          if (hostSel.container) {
            hostSel.hide();
          }
        });
      }

      hostSel.scrollHandler.bindScrollListener();
    }
  }
}