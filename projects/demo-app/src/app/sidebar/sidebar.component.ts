import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [
    './sidebar.component.scss',
    "../../../../../node_modules/primeicons/primeicons.css",
    "../../../../../node_modules/primeng/resources/themes/saga-blue/theme.css",
    "../../../../../node_modules/primeng/resources/primeng.min.css",
  ],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class SidebarComponent {
  text: string = '';

  results: string[] = [];

  async search(event) {
    await new Promise((re, rj) => {
      setTimeout(() => {
        this.results = ['Test 1', 'Test 2'];
        re(true);
      }, 500);
    });
    // this.http.get('https://primefaces.org/primeng/showcase/assets/showcase/data/countries.json')
    //   .subscribe((res: any) => {
    //     this.results = res.data;
    //   })
  }
}
