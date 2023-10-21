import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { SplitButton } from 'primeng/splitbutton';

@Directive({
  selector: '[psdSplitButton]',
})
export class psdSplitButtonDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: SplitButton,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    hostEl.onDropdownButtonClick = (event?: MouseEvent) => {
      hostEl.onDropdownClick.emit(event);
      hostEl.menu?.toggle({
        currentTarget: hostEl.containerViewChild?.nativeElement,
        relativeAlign: hostEl.appendTo == null,
      });
      hostEl.isExpanded.set(hostEl.menu?.visible!);
    };
  }

  ngAfterViewInit() {
    const menu = this.hostEl.menu!;
    menu.bindOutsideClickListener = () => {
      if (isPlatformBrowser(this.platformId)) {
        if (!menu.outsideClickListener) {
          menu.outsideClickListener = menu.renderer.listen(
            document,
            'click',
            (event) => {
              const path =
                event.path || (event.composedPath && event.composedPath());
              const target = event.target.shadowRoot ? path[0] : event.target;

              const isOutsideContainer =
                menu.containerViewChild &&
                !menu.containerViewChild.nativeElement.contains(target);
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
      }
    };
  }
}
