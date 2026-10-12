import { Directive, Host, Optional, Self } from '@angular/core';
import { InputMask } from 'primeng/inputmask';

function inputEl(host: InputMask): HTMLInputElement | undefined {
  const child = (host as any).inputViewChild;
  const ref = typeof child === 'function' ? child() : child;
  return ref?.nativeElement as HTMLInputElement | undefined;
}

@Directive({
  standalone: false,
  selector: '[psdInputMask]',
})
export class psdInputMaskDirective {
  constructor(@Host() @Self() @Optional() private readonly hostEl: InputMask) {
    if (!hostEl) {
      return;
    }
    // @ts-ignore — caret typing differs across PrimeNG majors
    hostEl.caret = (first?: number, last?: number) => {
      let range: any, begin: any, end: any;
      const el = inputEl(hostEl);
      const root = el?.getRootNode() as Document | ShadowRoot | undefined;
      const active = root && 'activeElement' in root ? root.activeElement : null;
      if (!el?.offsetParent || el !== active) {
        return;
      }

      if (typeof first == 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;
        if (typeof el.setSelectionRange === 'function') {
          el.setSelectionRange(begin, end);
        } else if (typeof (el as any)['createTextRange'] === 'function') {
          range = (el as any)['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (typeof el.setSelectionRange === 'function') {
          begin = el.selectionStart;
          end = el.selectionEnd;
        } else if (
          (document as any)['selection'] &&
          (document as any)['selection'].createRange
        ) {
          range = (document as any)['selection'].createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }
        return { begin, end };
      }
    };
  }
}
