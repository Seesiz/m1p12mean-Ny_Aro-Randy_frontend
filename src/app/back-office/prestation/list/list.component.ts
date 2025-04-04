import { Component, signal } from '@angular/core';
import { IPrestation } from '@/types/output';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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

  searchControl = new FormControl('');
  currentPage = signal(1);
  totalPage = signal(1);

  constructor(private prestationsService: PrestationService) {}

  ngOnInit(): void {
    this.loadServices();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadServices();
      });
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
      .getAllPrestationsPaginate(
        this.currentPage(),
        this.searchControl.value || ''
      )
      .then((response) => {
        this.prestations.set(response.data);
        this.totalPage.set(response.totalPages);
      })
      .catch((error) => {
        console.error('Error loading prestations:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadServices();
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
