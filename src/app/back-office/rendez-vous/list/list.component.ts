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
  selectedRDV?: IRendez_vous;

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

  viewRDV(_id: string) {
    this.rendezVousService.findById(_id).then((rendez_vous) => {
      this.selectedRDV = rendez_vous;
    });
  }
}
