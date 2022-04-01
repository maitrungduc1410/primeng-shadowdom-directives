import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import "@angular/compiler";
import { ProfileComponent } from './profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ConfirmPopupModule,
    ToastModule,
    ButtonModule,
    HttpClientModule
    // BrowserAnimationsModule
    // RouterModule.forChild(routes)
  ],
  providers: [ConfirmationService, MessageService],
  exports: []
})
export class ProfileModule { }
