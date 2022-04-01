import { NgModule } from "@angular/core";
import {
  psdCalendarDirective,
  psdDropdownDirective,
  psdMenuDirective,
  psdMultiSelectDirective,
  psdTooltipDirective,
  psdAutoCompleteDirective,
  psdCascadeSelectDirective,
  psdColorPickerDirective,
  psdMegaMenuDirective,
  psdMenuBarDirective,
  psdSlideMenuDirective,
  psdTieredMenuDirective,
  psdOverlayPanelDirective,
  psdSplitButtonDirective,
  psdTreeSelectDirective,
} from "./directives";
import { psdConfirmPopupDirective } from "./directives/confirmpopup";

@NgModule({
  declarations: [
    psdDropdownDirective,
    psdCalendarDirective,
    psdTooltipDirective,
    psdMultiSelectDirective,
    psdMenuDirective,
    psdAutoCompleteDirective,
    psdCascadeSelectDirective,
    psdColorPickerDirective,
    psdMegaMenuDirective,
    psdMenuBarDirective,
    psdConfirmPopupDirective,
    psdSlideMenuDirective,
    psdTieredMenuDirective,
    psdOverlayPanelDirective,
    psdSplitButtonDirective,
    psdTreeSelectDirective,
  ],
  exports: [
    psdDropdownDirective,
    psdCalendarDirective,
    psdTooltipDirective,
    psdMultiSelectDirective,
    psdMenuDirective,
    psdAutoCompleteDirective,
    psdCascadeSelectDirective,
    psdColorPickerDirective,
    psdMegaMenuDirective,
    psdMenuBarDirective,
    psdConfirmPopupDirective,
    psdSlideMenuDirective,
    psdTieredMenuDirective,
    psdOverlayPanelDirective,
    psdSplitButtonDirective,
    psdTreeSelectDirective,
  ]
})
export class PrimeNGShadowDOMDirective { }