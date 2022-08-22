import { Directive, Host, Optional, Self } from "@angular/core";
import { Dropdown } from "primeng/dropdown";

export const overrideDropdownFunctions = (hostEl: Dropdown) => {
  hostEl.isOutsideClicked = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());
    const target = event.target.shadowRoot ? path[0] : event.target
    return !(hostEl.el.nativeElement.isSameNode(target) || hostEl.el.nativeElement.contains(target) || (hostEl.overlay && hostEl.overlay.contains(<Node>target)));
  }
}

@Directive({
  selector: '[psdDropdown]',
})
export class psdDropdownDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Dropdown
  ) {
    overrideDropdownFunctions(this.hostEl)
  }
}