import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';
import { IPrestation } from '@/types/output';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-prestation',
  standalone: false,
  templateUrl: './prestation.component.html',
  styleUrl: './prestation.component.css',
})
export class PrestationComponent {
  prestations = signal<IPrestation[]>([]);

  constructor(private prestationService: PrestationService) {}

  ngOnInit(): void {
    this.loadPrestation();
  }

  loadPrestation() {
    this.prestationService.getAllPrestations().then((prestations) => {
      this.prestations.set(prestations);
    });
  }
}
