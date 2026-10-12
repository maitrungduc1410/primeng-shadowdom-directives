import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { MenuModule } from 'primeng/menu';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@Component({
  selector: 'app-shadow-demo',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [
    FormsModule,
    ButtonModule,
    MenuModule,
    PopoverModule,
    DatePickerModule,
    SelectModule,
    PrimeNGShadowDOMDirective,
  ],
  templateUrl: './shadow-demo.component.html',
  styleUrl: './shadow-demo.component.scss',
})
export class ShadowDemoComponent {
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
}
