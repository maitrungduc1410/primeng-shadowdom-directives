import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNgOverrideModule } from 'primeng-shadowdom-directives';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    CalendarModule,
    PrimeNgOverrideModule,
    MenuModule,
    MultiSelectModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
