import { Directive, ElementRef } from "@angular/core";
import { Dropdown } from "primeng/dropdown";
import { overrideDropdownFunctions } from "./dropdown";

declare const ng: any

@Directive({
  selector: '[psdPaginator]',
})
export class psdPaginatorDirective {
  constructor(
    private readonly elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    if (!this.elementRef.nativeElement.children.length) return
    
    const el1 = this.elementRef.nativeElement.children[0]

    if (!el1) return

    const dropdowns = el1.getElementsByTagName('p-dropdown')
    for (const dropdownEl of dropdowns) {
      const dropdown = ng.getComponent(dropdownEl) as Dropdown
      overrideDropdownFunctions(dropdown)
    }
  }
}