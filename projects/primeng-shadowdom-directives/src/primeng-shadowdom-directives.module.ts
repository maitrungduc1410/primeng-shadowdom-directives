import { NgModule } from '@angular/core';
import {
  psdOverlayPanelDirective,
  psdInputMaskDirective,
  psdMenuDirective,
  psdSlideMenuDirective,
  psdSplitButtonDirective,
  psdTieredMenuDirective,
} from './directives';
import { DomHandler } from 'primeng/dom';

DomHandler.getScrollableParents = (element: any) => {
  let scrollableParents = [];

  if (element) {
    let parents = DomHandler.getParents(element).filter(
      (item: any) => !(item instanceof ShadowRoot)
    );
    const overflowRegex = /(auto|scroll)/;
    const overflowCheck = (node: any) => {
      let styleDeclaration = window['getComputedStyle'](node, null);
      return (
        overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
        overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
        overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
      );
    };

    for (let parent of parents) {
      let scrollSelectors =
        parent.nodeType === 1 && parent.dataset['scrollselectors'];
      if (scrollSelectors) {
        let selectors = scrollSelectors.split(',');
        for (let selector of selectors) {
          let el = DomHandler.findSingle(parent, selector);
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

@NgModule({
  declarations: [
    psdMenuDirective,
    psdOverlayPanelDirective,
    psdInputMaskDirective,
    psdSlideMenuDirective,
    psdSplitButtonDirective,
    psdTieredMenuDirective,
  ],
  exports: [
    psdMenuDirective,
    psdOverlayPanelDirective,
    psdInputMaskDirective,
    psdSlideMenuDirective,
    psdSplitButtonDirective,
    psdTieredMenuDirective,
  ],
})
export class PrimeNGShadowDOMDirective {}
