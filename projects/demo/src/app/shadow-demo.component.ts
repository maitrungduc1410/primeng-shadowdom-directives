import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, TreeNode } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TooltipModule } from 'primeng/tooltip';
import { TreeSelectModule } from 'primeng/treeselect';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@Component({
  selector: 'app-shadow-demo',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [ConfirmationService],
  imports: [
    FormsModule,
    ButtonModule,
    MenuModule,
    PopoverModule,
    DatePickerModule,
    SelectModule,
    MultiSelectModule,
    TooltipModule,
    AutoCompleteModule,
    CascadeSelectModule,
    ColorPickerModule,
    MegaMenuModule,
    MenubarModule,
    ConfirmPopupModule,
    SplitButtonModule,
    TieredMenuModule,
    TreeSelectModule,
    InputMaskModule,
    PaginatorModule,
    PrimeNGShadowDOMDirective,
  ],
  templateUrl: './shadow-demo.component.html',
  styleUrl: './shadow-demo.component.scss',
})
export class ShadowDemoComponent {
  private readonly confirm = inject(ConfirmationService);

  date: Date | null = null;
  city: string | null = null;
  cities = [
    { label: 'Hanoi', value: 'hn' },
    { label: 'Ho Chi Minh', value: 'hcm' },
    { label: 'Da Nang', value: 'dn' },
  ];

  multiCities: string[] = [];
  color: string = '#dd0031';
  maskValue = '';
  autoValue: string | null = null;
  autoSuggestions: string[] = [];
  cascadeValue: Record<string, string> | null = null;
  treeValue: TreeNode | TreeNode[] | null = null;

  cascadeOptions = [
    {
      name: 'Vietnam',
      code: 'VN',
      cities: [
        { name: 'Hanoi', code: 'HN' },
        { name: 'Da Nang', code: 'DN' },
        { name: 'Ho Chi Minh', code: 'HCM' },
      ],
    },
    {
      name: 'Japan',
      code: 'JP',
      cities: [
        { name: 'Tokyo', code: 'TYO' },
        { name: 'Osaka', code: 'OSA' },
      ],
    },
  ];

  treeNodes: TreeNode[] = [
    {
      label: 'Documents',
      key: '0',
      children: [
        { label: 'Work', key: '0-0' },
        { label: 'Home', key: '0-1' },
      ],
    },
    {
      label: 'Photos',
      key: '1',
      children: [
        { label: 'Travel', key: '1-0' },
        { label: 'Family', key: '1-1' },
      ],
    },
  ];

  menuItems: MenuItem[] = [
    { label: 'Profile', icon: 'pi pi-user' },
    { label: 'Settings', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out' },
  ];

  splitItems: MenuItem[] = [
    { label: 'Update', icon: 'pi pi-refresh' },
    { label: 'Delete', icon: 'pi pi-trash' },
  ];

  tieredItems: MenuItem[] = [
    {
      label: 'File',
      icon: 'pi pi-file',
      items: [
        { label: 'New', icon: 'pi pi-plus' },
        { label: 'Open', icon: 'pi pi-folder-open' },
      ],
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      items: [
        { label: 'Cut', icon: 'pi pi-times' },
        { label: 'Copy', icon: 'pi pi-copy' },
      ],
    },
  ];

  megaItems: MegaMenuItem[] = [
    {
      label: 'Products',
      items: [
        [
          {
            label: 'Platform',
            items: [{ label: 'Angular' }, { label: 'PrimeNG' }],
          },
        ],
        [
          {
            label: 'Tools',
            items: [{ label: 'CLI' }, { label: 'Docs' }],
          },
        ],
      ],
    },
    { label: 'About', url: '#' },
  ];

  menubarItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
      items: [
        { label: 'Overlays', icon: 'pi pi-window-maximize' },
        { label: 'Forms', icon: 'pi pi-pencil' },
      ],
    },
  ];

  searchAuto(event: { query: string }): void {
    const q = (event.query || '').toLowerCase();
    const pool = ['Angular', 'PrimeNG', 'Shadow DOM', 'composedPath', 'VitePress'];
    this.autoSuggestions = pool.filter((s) => s.toLowerCase().includes(q));
  }

  confirmPopup(event: Event): void {
    this.confirm.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Dismiss with outside click under Shadow DOM?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => undefined,
      reject: () => undefined,
    });
  }
}
