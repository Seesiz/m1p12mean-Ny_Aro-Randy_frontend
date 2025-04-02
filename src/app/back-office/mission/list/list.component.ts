import { Component, signal } from '@angular/core';
import { IMission } from '@/types/output';
import { MissionService } from '@/app/back-office/services/mission/mission.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  missions = signal<IMission[]>([]);
  loading = signal<boolean>(true);

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.loadMission();
  }

  loadMission() {
    this.loading.set(true);
    this.missionService
      .getAll()
      .then((mi) => {
        this.missions.set(mi);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
