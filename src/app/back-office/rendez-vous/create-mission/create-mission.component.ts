import { Component, effect, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendezVousService } from '../../services/rendez_vous/rendez-vous.service';
import { IPrestation, IRendez_vous, IUser } from '@/types/output';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrestationService } from '../../services/prestation/prestation.service';
import { MissionService } from '../../services/mission/mission.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-create-mission',
  standalone: false,
  templateUrl: './create-mission.component.html',
  styleUrl: './create-mission.component.css',
})
export class CreateMissionComponent implements OnInit {
  rendez_vous = signal<IRendez_vous | null>(null);
  currentPrestations = signal<IPrestation[]>([]);
  state = signal<'closed' | 'open'>('closed');
  clientState = signal<'closed' | 'open'>('closed');
  users = signal<IUser[]>([]);
  selectablePrestations = signal<IPrestation[]>([]);
  connectedUser = signal<IUser | null>(null);

  form = new FormGroup({
    manager: new FormControl('', [Validators.required]),
    client: new FormControl<IUser | null>(null, [Validators.required]),
    marque: new FormControl('', [Validators.required]),
    modele: new FormControl('', [Validators.required]),
    serial_number: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    dateDebut: new FormControl('', [Validators.required]),
    services: new FormControl<IPrestation[]>([], [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService,
    private prestationService: PrestationService,
    private missionService: MissionService,
    private userService: UserService,
    private authService: AuthService
  ) {
    effect(() => {
      this.form.get('services')?.setValue(this.currentPrestations());
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const rdvId = params.get('rdvId');

      if (rdvId) {
        this.getRendezVous(rdvId).then((rendez_vous) => {
          this.rendez_vous.set(rendez_vous);
        });
      }
      this.prestationService.getAllPrestations().then((prestations) => {
        this.selectablePrestations.set(prestations);
      });
      this.loadUser();
      const userConnected = this.authService.getUserConnected();
      this.connectedUser.set(userConnected);
      if (
        userConnected &&
        userConnected.roles.some((role) => role.name === 'manager')
      ) {
        this.form.get('manager')?.setValue(userConnected._id);
      }
    });
  }

  loadUser() {
    this.userService.getAllUsers('client').then((users) => {
      this.users.set(users);
    });
  }

  async getRendezVous(id: string) {
    try {
      const resp = await this.rendezVousService.findById(id);
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const data = {
        client: this.form.value.client?._id,
        manager: this.form.value.manager,
        services: this.form.value.services,
        dateDebut: this.form.value.dateDebut,
        infoMission: {
          marque: this.form.value.marque,
          modele: this.form.value.modele,
          serial_number: this.form.value.serial_number,
          description: this.form.value.description,
        },
      };
      try {
        console.log(data);
        //const resp = await this.missionService.add(mission);
      } catch (error) {
        console.error(error);
      }
    }
  }

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  clientStateChanged(state: 'open' | 'closed') {
    this.clientState.set(state);
  }

  commandSelected(prestation: IPrestation) {
    this.state.set('closed');
    this.currentPrestations.update((value) => [...value, prestation]);
    this.selectablePrestations.update((value) =>
      value.filter((p) => p._id !== prestation._id)
    );
  }

  commandSelectedClient(user: IUser) {
    this.clientState.set('closed');
    this.form.get('client')?.setValue(user);
  }

  removePrestation(prestation: IPrestation) {
    this.currentPrestations.update((value) =>
      value.filter((p) => p._id !== prestation._id)
    );
    this.selectablePrestations.update((value) => [...value, prestation]);
  }
}
