import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { Menubar } from 'primeng/menubar';

@Directive({
  selector: '[psdMenuBar]',
})
export class psdMenuBarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menubar,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.hostEl.bindOutsideClickListener = () => {
      if (isPlatformBrowser(this.platformId)) {
        if (!this.hostEl.outsideClickListener) {
          this.hostEl.outsideClickListener = this.hostEl.renderer.listen(
            document,
            'click',
            (event) => {
              const path =
                event.path || (event.composedPath && event.composedPath());
              const target = event.target.shadowRoot ? path[0] : event.target;

              const isOutsideContainer =
                this.hostEl.rootmenu?.el.nativeElement !== target &&
                !this.hostEl.rootmenu?.el.nativeElement.contains(target);
              const isOutsideMenuButton =
                this.hostEl.mobileActive &&
                this.hostEl.menubutton?.nativeElement !== target &&
                !this.hostEl.menubutton?.nativeElement.contains(target);

              if (isOutsideContainer) {
                isOutsideMenuButton
                  ? (this.hostEl.mobileActive = false)
                  : this.hostEl.hide();
              }
            }
          );
        }
      }
    };
  }
}
