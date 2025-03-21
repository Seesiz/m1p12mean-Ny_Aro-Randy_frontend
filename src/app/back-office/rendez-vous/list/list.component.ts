import { Component } from '@angular/core';
import { IRendez_vous } from '@/types/output';
import { RendezVousService } from '@/app/back-office/services/rendez_vous/rendez-vous.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  rendez_vous: IRendez_vous[] = [];
  selectedStatus = new FormControl('pending');
  selectedRDV: IRendez_vous | null = null;
  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.rendezVousService.getAllStatus('pending').then((rendez_vous) => {
      this.rendez_vous = rendez_vous;
    });
  }

  onStatusChange(status: string): void {
    this.rendezVousService.getAllStatus(status).then((rendez_vous) => {
      this.rendez_vous = rendez_vous;
    });
  }

  onConfirm(_id: string) {
    const rendezVous: IRendez_vous | undefined = this.rendez_vous.find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'confirmed';
    //TO DO : mba reccupérena automatique amin'ny alalany leh connecté
    // asina formulaire de validation ny date proposé + durée
    rendezVous.manager = {
      _id: '67d1d37241db8519351a22d1',
      lastname: 'ANDRIAMPARANY',
      firstname: 'Ny Aro',
      email: 'nyarodina@gmail.com',
      roles: [{ _id: '67ce96aedd77ba0a7c340eb0', name: 'MANAGER' }],
    };

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.rendezVousService
        .getAllStatus(this.selectedStatus.value || 'pending')
        .then((rendez_vous) => {
          this.rendez_vous = rendez_vous;
        });
    });
  }

  onRefuse(_id: string) {
    const rendezVous: IRendez_vous | undefined = this.rendez_vous.find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'cancelled';
    //TO DO : mba reccupérena automatique amin'ny alalany leh connecté
    // asina formulaire de validation ny date proposé + durée
    rendezVous.manager = {
      _id: '67d1d37241db8519351a22d1',
      lastname: 'ANDRIAMPARANY',
      firstname: 'Ny Aro',
      email: 'nyarodina@gmail.com',
      roles: [{ _id: '67ce96aedd77ba0a7c340eb0', name: 'MANAGER' }],
    };

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.rendezVousService
        .getAllStatus(this.selectedStatus.value || 'pending')
        .then((rendez_vous) => {
          this.rendez_vous = rendez_vous;
        });
    });
  }

  viewRDV(_id: string) {
    this.rendezVousService.findById(_id).then((rendez_vous) => {
      this.selectedRDV = rendez_vous;
    });
  }

  selectRDVForView(rendez_vous: IRendez_vous): void {
    this.selectedRDV = rendez_vous;
    this.viewRDV(rendez_vous._id);
  }
}
