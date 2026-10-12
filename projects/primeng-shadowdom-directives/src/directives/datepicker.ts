import { Directive, Host, Optional, Self } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';

@Directive({
  selector: '[psdDatePicker]',
  standalone: false,
})
export class psdDatePickerDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: DatePicker
  ) {
    if (!hostEl) {
      return;
    }
    hostEl.isOutsideClicked = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());
      const target = event.target?.shadowRoot ? path?.[0] : event.target;
      return !(
        this.hostEl.el.nativeElement.isSameNode(target) ||
        this.hostEl.el.nativeElement.contains(target) ||
        (this.hostEl.overlay && this.hostEl.overlay.contains(target as Node))
      );
    };
  }
}
