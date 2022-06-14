import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';
import { CalendarModule } from 'primeng/calendar';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditorModule } from 'primeng/editor';
import { TreeSelectModule } from 'primeng/treeselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    CalendarModule,
    PrimeNGShadowDOMDirective,
    MenuModule,
    MultiSelectModule,
    TooltipModule,
    AutoCompleteModule,
    HttpClientModule,
    FormsModule,
    CascadeSelectModule,
    ColorPickerModule,
    MegaMenuModule,
    MenubarModule,
    ConfirmPopupModule,
    SlideMenuModule,
    TieredMenuModule,
    ContextMenuModule,
    OverlayPanelModule,
    SplitButtonModule,
    SpeedDialModule,
    EditorModule,
    TreeSelectModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
