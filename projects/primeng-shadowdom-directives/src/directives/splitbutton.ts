import { Directive, Host, Optional, Self } from "@angular/core";
import { SplitButton } from "primeng/splitbutton";
import { ConnectedOverlayScrollHandler } from "../connectedoverlayscrollhandler";

@Directive({
  selector: '[psdSplitButton]',
})
export class psdSplitButtonDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SplitButton
  ) {}

  ngAfterViewInit() {
    this.hostEl.menu.bindScrollListener = () => {
      if (!this.hostEl.menu.scrollHandler) {
        this.hostEl.menu.scrollHandler = new ConnectedOverlayScrollHandler(this.hostEl.containerViewChild.nativeElement, (event: any) => {
          if (this.hostEl.menu.visible) {
            this.hostEl.menu.hide();
          }
        });
      }

      this.hostEl.menu.scrollHandler.bindScrollListener();
    }
  }
}