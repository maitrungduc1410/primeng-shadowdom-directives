import { NgModule } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import {
  psdCalendarDirective,
  psdDatePickerDirective,
  psdInputMaskDirective,
  psdMenuDirective,
  psdOverlayPanelDirective,
  psdSplitButtonDirective,
  psdTieredMenuDirective,
} from './directives';

/**
 * Patch scroll-parent walk so ShadowRoot nodes are skipped (PrimeNG default
 * breaks when an overlay lives under a shadow host).
 */
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
        const selectors = scrollSelectors.split(',');
        for (const selector of selectors) {
          const el = DomHandler.findSingle(parent, selector);
          if (el && overflowCheck(el)) {
            scrollableParents.push(el);
          }
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
  psdOverlayPanelDirective,
  psdInputMaskDirective,
  psdSplitButtonDirective,
  psdTieredMenuDirective,
  psdCalendarDirective,
  psdDatePickerDirective,
];

@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES,
})
export class PrimeNGShadowDOMDirective {}
