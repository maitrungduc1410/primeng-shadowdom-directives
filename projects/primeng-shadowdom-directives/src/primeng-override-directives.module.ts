import { NgModule } from "@angular/core";
import { psdCalendarDirective } from "./directives/calendar";
import { psdDropdownDirective } from "./directives/dropdown";
import { psdMenuDirective } from "./directives/menu";
import { psdMultiSelectDirective } from "./directives/multiselect";
import { psdTooltipDirective } from "./directives/tooltip";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    psdDropdownDirective,
    psdCalendarDirective,
    psdTooltipDirective,
    psdMultiSelectDirective,
    psdMenuDirective
  ],
  imports: [
    BrowserAnimationsModule
  ],
  exports: [
    psdDropdownDirective,
    psdCalendarDirective,
    psdTooltipDirective,
    psdMultiSelectDirective,
    psdMenuDirective
  ]
})
export class PrimeNgOverrideModule { }