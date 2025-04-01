import { Component, signal } from '@angular/core';
import { MissionService } from '../../services/mission/mission.service';
import { ActivatedRoute } from '@angular/router';
import { IMission } from '@/types/output';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-suivi',
  standalone: false,
  templateUrl: './suivi.component.html',
  styleUrl: './suivi.component.css',
})
export class SuiviComponent {
  missions = signal<IMission | null>(null);
  pending = signal<IMission['services']>([]);
  inProgress = signal<IMission['services']>([]);
  done = signal<IMission['services']>([]);
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
      this.inProgress.set(
        mission.services?.filter((s) => s.status === 'in_progress') || []
      );
      this.done.set(mission.services?.filter((s) => s.status === 'done') || []);
    });
  }

  drop(event: CdkDragDrop<IMission['services']>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the status based on the container
      const item = event.container.data[event.currentIndex];
      if (event.container.id === 'pendingList') {
        item.status = 'pending';
      } else if (event.container.id === 'progressList') {
        item.status = 'in_progress';
      } else if (event.container.id === 'doneList') {
        item.status = 'done';
      }

      // TODO: Update the backend with the new status
      // this.missionService.updateMissionService(item);
    }
  }
}
