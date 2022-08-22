import { Directive, Host, Optional, Self } from "@angular/core";
import { MultiSelect } from "primeng/multiselect";

@Directive({
  selector: '[psdMultiSelect]',
})
export class psdMultiSelectDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: MultiSelect
  ) {
    hostEl.isOutsideClicked = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());
      const target = event.target.shadowRoot ? path[0] : event.target
      return !(this.hostEl.el.nativeElement.isSameNode(target) || this.hostEl.el.nativeElement.contains(target) || (this.hostEl.overlay && this.hostEl.overlay.contains(<Node>target)));
    }
  }
}