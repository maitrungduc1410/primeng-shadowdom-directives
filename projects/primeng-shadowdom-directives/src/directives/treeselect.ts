import { Directive, Host, Optional, Self } from "@angular/core";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";
import { TreeSelect } from "primeng/treeselect";

@Directive({
  selector: '[psdTreeSelect]',
})
export class psdTreeSelectDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: TreeSelect
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerEl.nativeElement, () => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.bindOutsideClickListener = () => {
      if (!hostEl.outsideClickListener) {
        hostEl.outsideClickListener = (event) => {
          if (
            hostEl.overlayVisible &&
            hostEl.overlayEl &&
            !hostEl.containerEl.nativeElement.contains(event.target.shadowRoot ? event.target.shadowRoot.activeElement : event.target) &&
            !hostEl.overlayEl.contains(event.target)
          ) {
            hostEl.hide();
          }
        };
        document.addEventListener('click', hostEl.outsideClickListener);
      }
    }
  }
}