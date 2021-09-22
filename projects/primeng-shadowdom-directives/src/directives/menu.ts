import { Directive, Host, Optional, Self } from "@angular/core";
import { Menu } from "primeng/menu";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdMenu]',
})
export class psdMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menu
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerViewChild.nativeElement, (event: any) => {
          if (hostEl.visible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }
  }
}