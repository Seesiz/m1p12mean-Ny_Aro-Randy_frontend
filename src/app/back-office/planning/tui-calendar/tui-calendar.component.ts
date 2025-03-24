import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// @ts-ignore
import Calendar from '@toast-ui/calendar';

@Component({
  selector: 'app-tui-calendar',
  templateUrl: './tui-calendar.component.html',
  styleUrls: ['./tui-calendar.component.css'],
  standalone: false,
})
export class TuiCalendarComponent implements AfterViewInit {
  @ViewChild('calendarContainer', { static: false })
  calendarContainer!: ElementRef;
  private calendar!: Calendar;

  ngAfterViewInit() {
    this.calendar = new Calendar(this.calendarContainer.nativeElement, {
      defaultView: 'month',
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
}
