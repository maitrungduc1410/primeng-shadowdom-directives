import { Directive, Host, Optional, Self } from "@angular/core";
import { Menu } from "primeng/menu";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdMenu]',
})
export class psdMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostSel: Menu
  ) {
    hostSel.bindScrollListener = () => {
      if (!hostSel.scrollHandler) {
        hostSel.scrollHandler = new ConnectedOverlayScrollHandler(hostSel.containerViewChild.nativeElement, (event: any) => {
          if (hostSel.visible) {
            hostSel.hide();
          }
        });
      }

      hostSel.scrollHandler.bindScrollListener();
    }
  }
}