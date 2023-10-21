import { Directive, Host, Optional, Self } from '@angular/core';
import { InputMask } from 'primeng/inputmask';

/*
  In angular 15, primeNg uses document from inject, but the logic is still same
*/

@Directive({
  selector: '[psdInputMask]',
})
export class psdInputMaskDirective {
  constructor(@Host() @Self() @Optional() private readonly hostEl: InputMask) {
    // @ts-ignore
    hostEl.caret = (first?: number, last?: number) => {
      let range, begin, end;

      if (
        !hostEl.inputViewChild?.nativeElement.offsetParent ||
        hostEl.inputViewChild.nativeElement !==
          hostEl.inputViewChild.nativeElement.getRootNode().activeElement
      ) {
        return;
      }

      if (typeof first == 'number') {
        begin = first;
        end = typeof last === 'number' ? last : begin;
        if (hostEl.inputViewChild.nativeElement.setSelectionRange) {
          hostEl.inputViewChild.nativeElement.setSelectionRange(begin, end);
        } else if (hostEl.inputViewChild.nativeElement['createTextRange']) {
          range = hostEl.inputViewChild.nativeElement['createTextRange']();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', begin);
          range.select();
        }
      } else {
        if (hostEl.inputViewChild.nativeElement.setSelectionRange) {
          begin = hostEl.inputViewChild.nativeElement.selectionStart;
          end = hostEl.inputViewChild.nativeElement.selectionEnd;
        } else if (
          (document as any)['selection'] &&
          (document as any)['selection'].createRange
        ) {
          range = (document as any)['selection'].createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }

        return { begin: begin, end: end };
      }
    };
  }
}
