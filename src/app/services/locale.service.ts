import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private localeSubject = new BehaviorSubject<string>(
    localStorage.getItem('langue') || 'fr'
  );
  locale$ = this.localeSubject.asObservable();

  setLocale(locale: string) {
    localStorage.setItem('langue', locale);
    this.localeSubject.next(locale);
  }

  getLocale(): string {
    return this.localeSubject.getValue();
  }
}
