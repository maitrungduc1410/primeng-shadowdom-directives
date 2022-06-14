import { Directive, Host, Optional, Self } from "@angular/core";
import { Menubar } from "primeng/menubar";

@Directive({
  selector: '[psdMenuBar]',
})
export class psdMenuBarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menubar
  ) {}

  ngAfterViewInit() {
    this.hostEl.rootmenu.bindDocumentClickListener = () => {
      if (!this.hostEl.rootmenu.documentClickListener) {
        this.hostEl.rootmenu.documentClickListener = (event) => {
          if (this.hostEl.rootmenu.el && !this.hostEl.rootmenu.el.nativeElement.contains(event.target.shadowRoot ? event.target.shadowRoot.activeElement : event.target)) {
            this.hostEl.rootmenu.activeItem = null;
            (this.hostEl.rootmenu as any).cd.markForCheck();
            this.hostEl.rootmenu.unbindDocumentClickListener();
          }
        };

        document.addEventListener('click', this.hostEl.rootmenu.documentClickListener);
      }
    }
  }
}