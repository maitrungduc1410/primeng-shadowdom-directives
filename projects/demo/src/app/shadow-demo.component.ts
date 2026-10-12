import {
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectModule } from 'primeng/select';
import {
  PrimeNGShadowDOMDirective,
  attachPrimeNgStylesToShadowRoot,
} from 'primeng-shadowdom-directives';

@Component({
  selector: 'app-shadow-demo',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [
    FormsModule,
    ButtonModule,
    MenuModule,
    OverlayPanelModule,
    DatePickerModule,
    SelectModule,
    PrimeNGShadowDOMDirective,
  ],
  templateUrl: './shadow-demo.component.html',
  styleUrl: './shadow-demo.component.scss',
})
export class ShadowDemoComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private detachStyles: (() => void) | null = null;

  date: Date | null = null;
  city: string | null = null;
  cities = [
    { label: 'Hanoi', value: 'hn' },
    { label: 'Ho Chi Minh', value: 'hcm' },
    { label: 'Da Nang', value: 'dn' },
  ];

  menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];

  constructor() {
    queueMicrotask(() => {
      const root = this.host.nativeElement.shadowRoot;
      if (root) {
        this.detachStyles = attachPrimeNgStylesToShadowRoot(root);
      }
    });
  }

  ngOnDestroy(): void {
    this.detachStyles?.();
  }
}