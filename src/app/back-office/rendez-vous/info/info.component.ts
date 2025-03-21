import { Component } from '@angular/core';
import { IRendez_vous } from '@/types/output';
import { RendezVousService } from '@/app/back-office/services/rendez_vous/rendez-vous.service';
@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  selectedRDV: IRendez_vous | null = null;
  constructor(private rendezVousService: RendezVousService) {}

  ngOnInit(): void {
    this.findRendezVousById(this.selectedRDV?._id || '');
  }

  findRendezVousById(_id: string): void {
    this.rendezVousService.findById(_id).then((rendez_vous) => {
      this.selectedRDV = rendez_vous;
    });
  }
}
