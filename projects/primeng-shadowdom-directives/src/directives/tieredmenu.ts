import { Directive, Host, Optional, Self } from "@angular/core";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";
import { TieredMenu } from 'primeng/tieredmenu';

@Directive({
  selector: '[psdTieredMenu]',
})
export class psdTieredMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: TieredMenu
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