import { Directive, Host, Optional, Self } from "@angular/core";
import { CascadeSelect } from "primeng/cascadeselect";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdCascadeSelect]',
})
export class psdCascadeSelectDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: CascadeSelect
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