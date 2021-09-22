import { Directive, Host, Optional, Self } from "@angular/core";
import { MegaMenu } from "primeng/megamenu";

@Directive({
  selector: '[psdMegaMenu]',
})
export class psdMegaMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: MegaMenu
  ) {
    hostEl.bindDocumentClickListener = () => {
      if (!hostEl.documentClickListener) {
        hostEl.documentClickListener = (event) => {
          if (hostEl.el && !hostEl.el.nativeElement.contains(event.target.shadowRoot ? event.target.shadowRoot.activeElement : event.target)) {
            hostEl.activeItem = null;
            hostEl.unbindDocumentClickListener();
            hostEl.cd.markForCheck();
          }
        };

        document.addEventListener('click', hostEl.documentClickListener);
      }
    }
  }
}