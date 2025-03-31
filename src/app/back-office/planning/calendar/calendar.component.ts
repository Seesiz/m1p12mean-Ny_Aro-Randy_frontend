import { Component, signal } from '@angular/core';
import { RendezVousService } from '../../services/rendez_vous/rendez-vous.service';
import { EventObject } from '@/types/event';
import { IRendez_vous, IPlaning } from '@/types/output';
import { PlaningService } from '../../services/planing/planing.service';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  planning = signal<EventObject[]>([]);

  constructor(
    private rendez_vous: RendezVousService,
    private planningService: PlaningService
  ) {}

  ngOnInit() {
    Promise.all([this.initMission(), this.initRendezVous()]).then(
      ([mission, rendezVous]) => {
        this.planning.set([
          ...(mission || []).map(
            (m): EventObject => ({
              start: m.dateDebut,
              end: new Date(
                new Date(m.dateDebut).setMinutes(
                  (new Date(m.dateDebut)?.getMinutes() || 0) + (m.duree || 0)
                )
              ),
              title: 'Mission',
              calendarId: 'MISSION',
              state: 'Busy',
              isVisible: true,
              id: m._id,
              color: 'var(--color-primary)',
              backgroundColor: '#6af900',
              borderColor: '#6af900',
              planing: m,
            })
          ),
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
              rendezVous: r,
            })
          ),
        ]);
      }
    );
  }

  async initMission() {
    try {
      const resp = await this.planningService.getAll();
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async initRendezVous() {
    try {
      const resp = await this.rendez_vous.getAllWithStatus('confirmed');
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateRendezVous(rendez_vous: IRendez_vous) {
    try {
      const resp = await this.rendez_vous.updateRendezVous(
        rendez_vous._id,
        rendez_vous
      );
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updatePlaning(planing: IPlaning) {
    try {
      const resp = await this.planningService.updatePlaning(
        planing._id,
        planing
      );
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
