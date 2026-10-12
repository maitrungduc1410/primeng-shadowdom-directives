import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  Host,
  Inject,
  Optional,
  PLATFORM_ID,
  Self,
} from '@angular/core';
import { Menu } from 'primeng/menu';

function containerElement(host: Menu): HTMLElement | undefined {
  const child = (host as any).containerViewChild;
  const ref = typeof child === 'function' ? child() : child;
  return ref?.nativeElement as HTMLElement | undefined;
}

function readFlag(host: Menu, key: string): boolean {
  const value = (host as any)[key];
  return typeof value === 'function' ? !!value() : !!value;
}

function shadowAwareTarget(event: Event): EventTarget | null {
  const path =
    (event as any).path ||
    (typeof event.composedPath === 'function' ? event.composedPath() : null);
  if ((event.target as any)?.shadowRoot && path?.length) {
    return path[0];
  }
  return event.target;
}

@Directive({
  standalone: false,
  selector: '[psdMenu]',
})
export class psdMenuDirective {
  constructor(
    @Host() @Self() @Optional() private readonly hostEl: Menu,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (!hostEl) {
      return;
    }
    hostEl.bindDocumentClickListener = () => {
      if (hostEl.documentClickListener || !isPlatformBrowser(this.platformId)) {
        return;
      }
      const documentTarget: any = hostEl.el
        ? hostEl.el.nativeElement.ownerDocument
        : 'document';

      hostEl.documentClickListener = hostEl.renderer.listen(
        documentTarget,
        'click',
        (event: Event) => {
          const target = shadowAwareTarget(event) as Node;
          const containerEl = containerElement(hostEl);
          const isOutsideContainer =
            !!containerEl && !containerEl.contains(target);
          const isOutsideTarget = !(
            hostEl.target &&
            (hostEl.target === target || hostEl.target.contains(target))
          );
          if (!readFlag(hostEl, 'popup') && isOutsideContainer && isOutsideTarget) {
            hostEl.onListBlur(event as MouseEvent);
          }
          if (
            hostEl.preventDocumentDefault &&
            readFlag(hostEl, 'overlayVisible') &&
            isOutsideContainer &&
            isOutsideTarget
          ) {
            hostEl.hide();
            hostEl.preventDocumentDefault = false;
          }
        }
      );
    };
  }
}