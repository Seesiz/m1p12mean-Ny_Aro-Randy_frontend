import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  signal,
  Input,
  SimpleChanges,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
// @ts-ignore
import Calendar from '@toast-ui/calendar';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { FormsModule } from '@angular/forms';
import { EventObject } from '@/types/event';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { FormPopupComponent } from '../../components/tui-calendar/form-popup/form-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tui-calendar',
  templateUrl: './tui-calendar.component.html',
  styleUrls: ['./tui-calendar.component.css'],
  imports: [
    CommonModule,
    HlmButtonDirective,
    FormsModule,
    TranslateModule,
    BrnSelectImports,
    HlmSelectImports,
    NgIcon,
    FormPopupComponent,
  ],
  providers: [provideIcons({ lucideChevronRight, lucideChevronLeft })],
})
export class TuiCalendarComponent implements AfterViewInit {
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  private calendar = signal<Calendar | null>(null);
  viewType = signal<'month' | 'week' | 'day'>('month');
  selectedDate = signal<Date | null>(null);
  show_data = signal<EventObject | null>(null);
  @Input() events: EventObject[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      if (this.calendar()) {
        this.calendar().createEvents(this.events);
      }
    }
  }

  ngAfterViewInit() {
    this.calendar.set(
      new Calendar(this.calendarContainer.nativeElement, {
        defaultView: this.viewType(),
        usageStatistics: false,
        isReadOnly: false,
        taskView: false,
        scheduleView: true,
        useCreationPopup: false,
        useDetailPopup: false,
        useFormPopup: false,
        theme: {
          common: {
            backgroundColor: 'var(--color-background)',
            dayName: { color: 'var(--color-primary)' },
          },
        },
        month: {
          dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          startDayOfWeek: 1,
        },
        week: {
          dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
          startDayOfWeek: 1,
          taskView: false,
        },
        calendars: [
          {
            id: 'MISSION',
            name: 'Mission',
            color: 'var(--color-primary-foreground)',
            bgColor: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
          },
          {
            id: 'RENDEZ_VOUS',
            name: 'Rendez-vous',
            color: 'var(--color-primary-foreground)',
            bgColor: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
          },
        ],
        template: {
          popupDetailTitle: (event: any) => `
        <div class="popup-title">
          <span class="text-lg font-bold">${event.title}</span>
        </div>
      `,
          popupDetailAttendees({ attendees = [] }) {
            return attendees.join(', ');
          },
          popupDetailBody: (event: any) => `
        <div class="popup-body">
          <p>${event.body || ''}</p>
        </div>
      `,
          popupEdit: () => `
        <button hlmBtn class="custom-edit-button">Modifier</button>
      `,
          popupDelete: () => `
        Supprimer
      `,
        },
      })
    );

    this.calendar().on('selectDateTime', (selectedDate: any) => {
      this.show_data.set({
        start: this.formatDateForInput(selectedDate.start),
        end: this.formatDateForInput(selectedDate.end),
      });
      this.calendar().clearGridSelections();
    });
    this.calendar().on('clickEvent', (selectedDate: any) => {
      this.show_data.set({
        ...selectedDate.event,
        start: this.formatDateForInput(selectedDate.event.start),
        end: this.formatDateForInput(selectedDate.event.end),
        data: this.events.find((event) => event.id === selectedDate.event.id)
          ?.data,
      });
      this.calendar().clearGridSelections();
    });
  }

  private formatDateForInput(date: Date): string {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  setViewType(viewType: 'month' | 'week' | 'day') {
    this.viewType.set(viewType);
    this.calendar().changeView(viewType);
  }

  goToPreviousMonth() {
    this.calendar().prev();
  }

  goToNextMonth() {
    this.calendar().next();
  }

  goToToday() {
    this.calendar().today();
  }

  closeData() {
    this.show_data.set(null);
  }
}
