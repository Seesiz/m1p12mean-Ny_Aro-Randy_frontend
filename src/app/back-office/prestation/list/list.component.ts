import { Component, ViewChild } from '@angular/core';
import { IPrestation } from '@/types/output';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';
import { BrnDialogComponent } from '@spartan-ng/brain/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  prestations: IPrestation[] = [];
  loading: boolean = false;
  @ViewChild(BrnDialogComponent) dialogRef!: BrnDialogComponent; // Fixed viewChild to ViewChild
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
    this.loading = true;
    this.prestationsService
      .getAllPrestations()
      .then((prestations) => {
        this.prestations = prestations;
      })
      .catch((error) => {
        console.error('Error loading prestations:', error); // Fixed error message
      })
      .finally(() => {
        this.loading = false;
        if (this.dialogRef) {
          this.dialogRef.close({});
        }
      });
  }

  deletePrestation(id: string): void {
    // Added method for delete button functionality
    if (confirm('Are you sure you want to delete this prestation?')) {
      this.loading = true;
      this.prestationsService
        .deletePrestation(id)
        .then(() => {
          this.loadServices();
        })
        .catch((error) => {
          console.error('Error deleting prestation:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
