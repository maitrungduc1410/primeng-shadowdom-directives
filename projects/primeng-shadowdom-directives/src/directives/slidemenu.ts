import { Directive, Host, Optional, Self } from "@angular/core";
import { SlideMenu } from "primeng/slidemenu";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdSlideMenu]',
})
export class psdSlideMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SlideMenu
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.target, () => {
          if (hostEl.visible) {
            hostEl.hide();
          }
        });
      }
      hostEl.scrollHandler.bindScrollListener();
    }
  }
}