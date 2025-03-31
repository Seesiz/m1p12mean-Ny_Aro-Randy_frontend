import { EventObject } from '@/types/event';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideX } from '@ng-icons/lucide';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  lucideChevronsUpDown,
  lucideCheck,
  lucideSearch,
} from '@ng-icons/lucide';
import { IMission, IUser } from '@/types/output';
import { MissionService } from '@/app/back-office/services/mission/mission.service';
import { TranslateModule } from '@ngx-translate/core';
import { UserService } from '@/app/back-office/services/user/user.service';
import { PlaningService } from '@/app/back-office/services/planing/planing.service';
import { IPlaning } from '@/types/output';

@Component({
  selector: 'app-form-popup',
  standalone: true,
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css',
  imports: [
    CommonModule,
    FormsModule,
    HlmButtonDirective,
    NgIcon,
    HlmInputDirective,
    HlmLabelDirective,
    [BrnCommandImports],
    [HlmCommandImports],
    HlmIconDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    TranslateModule,
  ],
  providers: [
    provideIcons({
      lucideX,
      lucideUser,
      lucideChevronsUpDown,
      lucideSearch,
      lucideCheck,
    }),
  ],
})
export class FormPopupComponent {
  @Input() data: EventObject | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() updatePlaningHandler = new EventEmitter<EventObject>();
  currentMission = signal<IMission | undefined>(undefined);
  state = signal<'closed' | 'open'>('closed');

  selectableMechanics = signal<IUser[]>([]);
  currentMechanic = signal<IUser[]>([]);
  mechanics = signal<IUser[]>([]);
  mechanicState = signal<'closed' | 'open'>('closed');

  missions = signal<IMission[]>([]);

  constructor(
    private missionService: MissionService,
    private userService: UserService,
    private planingService: PlaningService
  ) {}

  ngOnInit() {
    this.loadMissions();
    this.loadMechanics();
  }

  loadMissions() {
    try {
      this.missionService.getAll().then((missions) => {
        this.missions.set(missions);
      });
    } catch (error) {
      console.error(error);
    }
  }

  loadMechanics() {
    try {
      this.userService.getAllUsers('MECANIC').then((mechanics) => {
        this.mechanics.set(mechanics);
        this.selectableMechanics.set(mechanics);
      });
    } catch (error) {
      console.error(error);
    }
  }

  closeData() {
    this.close.emit();
  }

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  mechanicStateChanged(state: 'open' | 'closed') {
    this.mechanicState.set(state);
  }

  commandSelected(mission: IMission) {
    this.state.set('closed');
    this.currentMission.set(mission);
  }

  mechanicsSelected(mechanic: IUser) {
    this.mechanicState.set('closed');
    this.currentMechanic.update((mechanics) => [...mechanics, mechanic]);
    this.selectableMechanics.update((mechanics) =>
      mechanics.filter((m) => m._id !== mechanic._id)
    );
  }

  removeMechanic(mechanic: IUser) {
    this.currentMechanic.update((mechanics) =>
      mechanics.filter((m) => m._id !== mechanic._id)
    );
    this.selectableMechanics.update((mechanics) => [...mechanics, mechanic]);
  }

  save() {
    if (this.currentMission() !== undefined) {
      const data: Omit<IPlaning, '_id'> = {
        dateDebut: new Date(this.data?.start || ''),
        duree: Math.floor(
          (new Date(this.data?.end || '').getTime() -
            new Date(this.data?.start || '').getTime()) /
            (1000 * 60)
        ),
        mecaniciens: this.currentMechanic(),
        services: [],
        mission: this.currentMission()!,
      };

      if (this.data && this.data.id) {
        this.planingService.updatePlaning(this.data.id, data).then(() => {
          this.data!.planing = { _id: this.data!.id || '', ...data };
          this.updatePlaningHandler.emit(this.data || {});
          this.closeData();
        });
      } else {
        this.planingService.save(data).then(() => {
          this.closeData();
        });
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.currentMission.set(undefined);
      this.currentMechanic.set([]);
      this.selectableMechanics.set(this.mechanics());
      if (this.data?.calendarId === 'MISSION') {
        this.currentMission.set((this.data?.planing as IPlaning).mission);
        this.currentMechanic.set((this.data?.planing as IPlaning).mecaniciens);
        this.selectableMechanics.set(
          this.mechanics().filter(
            (mechanic) =>
              !this.currentMechanic().some((m) => m._id === mechanic._id)
          )
        );
      }
    }
  }
}
