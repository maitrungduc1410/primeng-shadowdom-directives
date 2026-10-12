import { Component } from '@angular/core';
import { ShadowDemoComponent } from './shadow-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShadowDemoComponent],
  template: `<app-shadow-demo />`,
})
export class AppComponent {}
