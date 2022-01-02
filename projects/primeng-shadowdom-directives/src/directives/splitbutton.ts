import { Directive, Host, Optional, Self } from "@angular/core";
import { SplitButton } from "primeng/splitbutton";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdSplitButton]',
})
export class psdSplitButtonDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SplitButton
  ) {
    // wait for next event loop, after first render
    setTimeout(() => {
      hostEl.menu.bindScrollListener = () => {
        if (!hostEl.menu.scrollHandler) {
          hostEl.menu.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerViewChild.nativeElement, (event: any) => {
            if (hostEl.menu.visible) {
              hostEl.menu.hide();
            }
          });
        }
  
        hostEl.menu.scrollHandler.bindScrollListener();
      }
    })
  }
}