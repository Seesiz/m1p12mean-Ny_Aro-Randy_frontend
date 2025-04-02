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
  styleUrls: ['./suivi.component.css'],
})
export class SuiviComponent {
  mission = signal<IMission | null>(null);
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
      this.mission.set(mission);
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

      this.save();
    }
  }

  save() {
    const currentMission = this.mission();
    const pendingServices = this.pending();
    const inProgressServices = this.inProgress();
    const doneServices = this.done();

    if (!currentMission) return;

    const updatedMission: IMission = {
      ...currentMission,
      services: [
        ...pendingServices.map((s) => ({ ...s, status: 'pending' })),
        ...inProgressServices.map((s) => ({ ...s, status: 'in_progress' })),
        ...doneServices.map((s) => ({ ...s, status: 'done' })),
      ],
    };

    this.missionService.update(updatedMission).then((mission) => {
      this.mission.set(mission);
    });
  }
}
