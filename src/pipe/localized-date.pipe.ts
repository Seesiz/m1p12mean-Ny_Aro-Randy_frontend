import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocaleService } from '../app/services/locale.service';

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private localeService: LocaleService) {}

  transform(
    value: Date | string | number | undefined,
    format: string = 'fullDate'
  ): string | null {
    if (!value) return null;
    const locale = this.localeService.getLocale();
    const datePipe = new DatePipe(locale);
    return datePipe.transform(value, format);
  }
}
