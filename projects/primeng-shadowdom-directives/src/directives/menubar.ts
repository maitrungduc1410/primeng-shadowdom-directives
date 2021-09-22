import { Directive, Host, Optional, Self } from "@angular/core";
import { Menubar } from "primeng/menubar";

@Directive({
  selector: '[psdMenuBar]',
})
export class psdMenuBarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menubar
  ) {

    setTimeout(() => { // wait for next event loop (after content rendered)
      hostEl.rootmenu.bindDocumentClickListener = () => {
        if (!hostEl.rootmenu.documentClickListener) {
          hostEl.rootmenu.documentClickListener = (event) => {
            if (hostEl.rootmenu.el && !hostEl.rootmenu.el.nativeElement.contains(event.target.shadowRoot ? event.target.shadowRoot.activeElement : event.target)) {
              hostEl.rootmenu.activeItem = null;
              (hostEl.rootmenu as any).cd.markForCheck();
              hostEl.rootmenu.unbindDocumentClickListener();
            }
          };
  
          document.addEventListener('click', hostEl.rootmenu.documentClickListener);
        }
      }
    }, 0)
  }
}