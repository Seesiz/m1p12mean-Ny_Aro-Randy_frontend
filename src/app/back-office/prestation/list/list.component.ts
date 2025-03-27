import { Component, signal } from '@angular/core';
import { IPrestation } from '@/types/output';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  prestations = signal<IPrestation[]>([]);
  loading = signal(false);
  selectedPrestation: IPrestation | null = null;

  constructor(private prestationsService: PrestationService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  async selectPrestationForUpdate(prestation: IPrestation): Promise<void> {
    try {
      this.selectedPrestation = await this.prestationsService.getPrestation(
        prestation._id
      );
    } catch (error) {
      console.error('Error fetching prestation:', error);
    }
  }

  loadServices(): void {
    this.loading.set(true);
    this.prestationsService
      .getAllPrestations()
      .then((prestations) => {
        this.prestations.set(prestations);
      })
      .catch((error) => {
        console.error('Error loading prestations:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  deletePrestation(id: string): void {
    this.loading.set(true);
    this.prestationsService
      .deletePrestation(id)
      .then(() => {
        this.loadServices();
      })
      .catch((error) => {
        console.error('Error deleting prestation:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
