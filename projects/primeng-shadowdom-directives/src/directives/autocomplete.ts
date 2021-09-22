import { Directive, Host, Optional, Self } from "@angular/core";
import { AutoComplete } from "primeng/autocomplete";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdAutoComplete]',
})
export class psdAutoCompleteDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: AutoComplete
  ) {
    hostEl.bindScrollListener = () => {
      if (!hostEl.scrollHandler) {
        hostEl.scrollHandler = new ConnectedOverlayScrollHandler(hostEl.containerEL.nativeElement, () => {
          if (hostEl.overlayVisible) {
            hostEl.hide();
          }
        });
      }

      hostEl.scrollHandler.bindScrollListener();
    }

    hostEl.show = () => {
      if (hostEl.multiInputEL || hostEl.inputEL) {
        const activeMultiInputEL = hostEl.multiInputEL?.nativeElement.ownerDocument.activeElement.shadowRoot ? hostEl.multiInputEL?.nativeElement.ownerDocument.activeElement.shadowRoot.activeElement : hostEl.multiInputEL?.nativeElement.ownerDocument.activeElement
        const activeInputEl = hostEl.inputEL.nativeElement.ownerDocument.activeElement.shadowRoot ? hostEl.inputEL.nativeElement.ownerDocument.activeElement.shadowRoot.activeElement : hostEl.inputEL.nativeElement.ownerDocument.activeElement
        let hasFocus = hostEl.multiple ?
          activeMultiInputEL === hostEl.multiInputEL.nativeElement :
          activeInputEl === hostEl.inputEL.nativeElement;
        if (!hostEl.overlayVisible && hasFocus) {
          hostEl.overlayVisible = true;
        }
      }
    }
  }
}