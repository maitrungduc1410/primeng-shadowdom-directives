import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShadowDemoComponent } from './shadow-demo.component';

@Component({
    selector: 'app-root',
    imports: [ShadowDemoComponent],
    changeDetection: ChangeDetectionStrategy.Eager,
    template: `<app-shadow-demo />`
})
export class AppComponent {}
