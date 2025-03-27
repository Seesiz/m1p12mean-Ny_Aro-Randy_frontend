import { LocaleService } from '@/app/services/locale.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  langueValue: 'fr' | 'en' = 'fr';

  constructor(
    private localeService: LocaleService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('langue')) {
      this.setLangue(localStorage.getItem('langue') === 'fr' ? 'fr' : 'en');
    }
  }

  setLangue(langue: 'fr' | 'en') {
    this.langueValue = langue;
    this.localeService.setLocale(langue);
    this.translate.use(langue);
  }
}
