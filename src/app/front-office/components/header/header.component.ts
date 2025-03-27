import { LocaleService } from '@/app/services/locale.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDarkMode: boolean = false;
  langueValue: 'fr' | 'en' = 'fr';

  constructor(
    private localeService: LocaleService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme') === 'dark');
    }
    if (localStorage.getItem('langue')) {
      this.setLangue(localStorage.getItem('langue') === 'fr' ? 'fr' : 'en');
    }
  }

  setLangue(langue: 'fr' | 'en') {
    this.langueValue = langue;
    this.localeService.setLocale(langue);
    this.translate.use(langue);
  }

  setTheme(value: boolean) {
    this.isDarkMode = value;
    localStorage.setItem('theme', value ? 'dark' : 'light');
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
