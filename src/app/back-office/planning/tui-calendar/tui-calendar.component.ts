import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  signal,
  effect,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
// @ts-ignore
import Calendar from '@toast-ui/calendar';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tui-calendar',
  templateUrl: './tui-calendar.component.html',
  styleUrls: ['./tui-calendar.component.css'],
  imports: [
    HlmButtonDirective,
    FormsModule,
    TranslateModule,
    BrnSelectImports,
    HlmSelectImports,
  ],
})
export class TuiCalendarComponent implements AfterViewInit {
  @ViewChild('calendarContainer', { static: false })
  calendarContainer!: ElementRef;
  viewType: 'month' | 'week' | 'day' = 'month';
  private calendar!: Calendar;

  ngAfterViewInit() {
    this.calendar = new Calendar(this.calendarContainer.nativeElement, {
      defaultView: this.viewType,
      usageStatistics: false,
      isReadOnly: false,
      useDetailPopup: true,
      useFormPopup: true,
      month: {
        startDayOfWeek: 1,
      },
      week: {
        startDayOfWeek: 1,
      },
    });

    this.calendar.createEvents([
      {
        id: '1',
        calendarId: '1',
        title: "Réunion d'équipe",
        category: 'time',
        start: new Date().toISOString(),
        end: new Date(
          new Date().setHours(new Date().getHours() + 2)
        ).toISOString(),
      },
    ]);
  }

  setViewType(viewType: 'month' | 'week' | 'day') {
    this.viewType = viewType;
    this.calendar.changeView(viewType);
  }
}
