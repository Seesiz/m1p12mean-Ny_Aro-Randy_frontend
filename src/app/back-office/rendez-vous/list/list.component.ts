import { Component } from '@angular/core';
import { IRendez_vous, IUser } from '@/types/output';
import { RendezVousService } from '@/app/back-office/services/rendez_vous/rendez-vous.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  loading: boolean = false;
  rendez_vous: IRendez_vous[] = [];
  selectedStatus = new FormControl('pending');
  selectedRDV: IRendez_vous | null = null;
  userConnected: IUser | null = null;
  constructor(
    private rendezVousService: RendezVousService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData(this.selectedStatus.value || 'pending');
    this.userConnected = this.authService.getUserConnected();
  }

  onStatusChange(status: string): void {
    this.loadData(status);
  }

  loadData(status: string) {
    this.loading = true;
    this.rendezVousService
      .getAllWithStatus(status)
      .then((rendez_vous) => {
        this.rendez_vous = rendez_vous;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onConfirm(_id: string) {
    if (!this.userConnected) return;
    const rendezVous: IRendez_vous | undefined = this.rendez_vous.find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'confirmed';
    rendezVous.manager = this.userConnected;

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.loadData(this.selectedStatus.value || 'pending');
    });
  }

  onRefuse(_id: string) {
    if (!this.userConnected) return;
    const rendezVous: IRendez_vous | undefined = this.rendez_vous.find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'cancelled';
    rendezVous.manager = this.userConnected;

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.loadData(this.selectedStatus.value || 'pending');
    });
  }

  selectRDVForView(rendez_vous: IRendez_vous): void {
    this.selectedRDV = rendez_vous;
  }
}
