import { Component, signal } from '@angular/core';
import { RendezVousService } from '../../services/rendez_vous/rendez-vous.service';
import { EventObject } from '@/types/event';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  planning = signal<EventObject[]>([]);

  constructor(private rendez_vous: RendezVousService) {}

  ngOnInit() {
    Promise.all([this.initMission(), this.initRendezVous()]).then(
      ([mission, rendezVous]) => {
        // ...(mission || []).map((m) => ({ ...m, type: 'mission' })),
        this.planning.set([
          ...(rendezVous || []).map(
            (r): EventObject => ({
              start: r.date,
              end: new Date(
                new Date(r.date).setMinutes(
                  (new Date(r.date)?.getMinutes() || 0) + (r.duree || 0)
                )
              ),
              title: 'Rendez-vous',
              attendees: [
                r.manager?.firstname + ' ' + r.manager?.lastname + ' [MANAGER]',
                r.info?.fullname,
              ],
              calendarId: 'RENDEZ_VOUS',
              state: 'Busy',
              body: r.info?.message,
              isVisible: true,
              id: r._id,
              color: 'var(--color-primary-foreground)',
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              data: r,
            })
          ),
        ]);
      }
    );
  }

  async initMission() {}

  async initRendezVous() {
    try {
      const resp = await this.rendez_vous.getAllWithStatus('confirmed');
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
