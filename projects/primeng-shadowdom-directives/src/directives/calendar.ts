import { Directive, Host, Optional, Self } from '@angular/core';
import { Calendar } from 'primeng/calendar';

/**
 * Shadow-aware outside-click for legacy p-calendar (still shipped in PrimeNG 18).
 * Prefer psdDatePicker with p-datepicker for new code.
 */
@Directive({
  selector: '[psdCalendar]',
  standalone: false,
})
export class psdCalendarDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Calendar
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
