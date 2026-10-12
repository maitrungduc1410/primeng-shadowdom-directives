import { NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import {
  psdDatePickerDirective,
  psdInputMaskDirective,
  psdMenuDirective,
  psdPopoverDirective,
  psdSplitButtonDirective,
  psdTieredMenuDirective,
} from './directives';

DomHandler.getScrollableParents = (element: any) => {
  const scrollableParents: any[] = [];
  if (element) {
    const parents = DomHandler.getParents(element).filter(
      (item: any) => !(item instanceof ShadowRoot)
    );
    const overflowRegex = /(auto|scroll)/;
    const overflowCheck = (node: any) => {
      const styleDeclaration = window.getComputedStyle(node, null);
      return (
        overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
        overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
        overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
      );
    };
    for (const parent of parents) {
      const scrollSelectors =
        parent.nodeType === 1 && parent.dataset?.['scrollselectors'];
      if (scrollSelectors) {
        for (const selector of scrollSelectors.split(',')) {
          const el = DomHandler.findSingle(parent, selector);
          if (el && overflowCheck(el)) scrollableParents.push(el);
        }
      }
      if (parent.nodeType !== 9 && overflowCheck(parent)) {
        scrollableParents.push(parent);
      }
    }
  }
  return scrollableParents;
};

const DIRECTIVES = [
  psdMenuDirective,
  psdPopoverDirective,
  psdInputMaskDirective,
  psdSplitButtonDirective,
  psdTieredMenuDirective,
  psdDatePickerDirective,
];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
export class PrimeNGShadowDOMDirective {}
