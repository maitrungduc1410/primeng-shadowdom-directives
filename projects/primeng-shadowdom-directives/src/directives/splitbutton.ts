import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { SplitButton } from 'primeng/splitbutton';

@Directive({
  standalone: false,
  selector: '[psdSplitButton]',
})
export class psdSplitButtonDirective implements AfterViewInit {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SplitButton,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }
    // PrimeNG 20+: dropdown toggle already uses host el.nativeElement.
    // Keep outside-click patch on the nested menu in ngAfterViewInit.
  }

  ngAfterViewInit(): void {
    const menu = this.hostEl?.menu as any;
    if (!menu) {
      return;
    }
    menu.bindOutsideClickListener = () => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }
      if (!menu.outsideClickListener) {
        menu.outsideClickListener = menu.renderer.listen(
          document,
          'click',
          (event: any) => {
            const path =
              event.path || (event.composedPath && event.composedPath());
            const target = event.target?.shadowRoot ? path?.[0] : event.target;
            const containerEl =
              typeof menu.containerViewChild === 'function'
                ? menu.containerViewChild()?.nativeElement
                : menu.containerViewChild?.nativeElement;
            const isOutsideContainer =
              containerEl && !containerEl.contains(target);
            const isOutsideTarget = menu.popup
              ? !(
                  menu.target &&
                  (menu.target === target || menu.target.contains(target))
                )
              : true;
            if (isOutsideContainer && isOutsideTarget) {
              menu.hide();
            }
          }
        );
      }
    };
  }
}
