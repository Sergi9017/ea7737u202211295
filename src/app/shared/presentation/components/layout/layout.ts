import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

type Language = 'en' | 'es';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    TranslatePipe,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private readonly translate = inject(TranslateService);

  protected readonly currentLanguage = signal<Language>('en');
  protected readonly navigationOptions = [
    { link: '/home', labelKey: 'nav-home', icon: 'home' },
    { link: '/reservations/new', labelKey: 'nav-new-reservation', icon: 'add_circle' },
  ];

  protected changeLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.translate.use(language);
  }
}
