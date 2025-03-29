import { Component } from '@angular/core';
import { IMission } from '@/types/output';
import { MissionService } from '@/app/back-office/services/mission/mission.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  missions: IMission[] = [];

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.missionService.getAll().then((missions) => {
      this.missions = missions;
    });
  }
}
