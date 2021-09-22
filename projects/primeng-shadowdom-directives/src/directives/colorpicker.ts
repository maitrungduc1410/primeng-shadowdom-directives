import { Directive, Host, Optional, Self } from "@angular/core";
import { ColorPicker } from "primeng/colorpicker";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdColorPicker]',
})
export class psdColorPickerDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: ColorPicker
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerViewChild.nativeElement, (event: any) => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }
  }
}