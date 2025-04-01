import { Component, signal } from '@angular/core';
import { MissionService } from '../../services/mission/mission.service';
import { ActivatedRoute } from '@angular/router';
import { IMission } from '@/types/output';

@Component({
  selector: 'app-suivi',
  standalone: false,
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css',
})
export class SuiviComponent {
  missions = signal<IMission | null>(null);
  pending = signal<IMission['services']>([]);
  constructor(
    private missionService: MissionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.initMission(params['id']);
    });
  }

  initMission(id: string) {
    this.missionService.getMission(id).then((mission) => {
      this.missions.set(mission);
      this.pending.set(
        mission.services?.filter((s) => s.status === 'pending') || []
      );
    });
  }
}
