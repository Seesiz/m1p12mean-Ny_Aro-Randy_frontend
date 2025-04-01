import { Component, OnInit, signal } from '@angular/core';
import { IRendez_vous, IUser } from '@/types/output';
import { RendezVousService } from '@/app/back-office/services/rendez_vous/rendez-vous.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  loading = signal(false);
  rendez_vous = signal<IRendez_vous[]>([]);
  filteredRendezVous = signal<IRendez_vous[]>([]);
  selectedStatus = new FormControl<'pending' | 'confirmed' | 'cancelled'>(
    'pending'
  );
  searchControl = new FormControl('');
  selectedRDV: IRendez_vous | null = null;
  userConnected = signal<IUser | null>(null);

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private rendezVousService: RendezVousService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData(this.selectedStatus.value || 'pending');
    this.userConnected.set(this.authService.getUserConnected());

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterRendezVous(searchTerm || '');
      });
  }

  onStatusChange(status: 'pending' | 'confirmed' | 'cancelled'): void {
    this.currentPage = 1;
    this.loadData(status);
  }

  loadData(status: 'pending' | 'confirmed' | 'cancelled') {
    this.loading.set(true);
    this.rendezVousService
      .getAllWithStatus(status)
      .then((rendez_vous) => {
        this.rendez_vous.set(rendez_vous);
        this.filterRendezVous(this.searchControl.value || '');
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  filterRendezVous(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    this.filteredRendezVous.set(
      this.rendez_vous().filter(
        (rdv) =>
          rdv.info.fullname.toLowerCase().includes(term) ||
          rdv.info.contact.toLowerCase().includes(term)
      )
    );
    this.totalItems = this.filteredRendezVous().length;
    this.updateDisplayedItems();
  }

  updateDisplayedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.filteredRendezVous.set(this.filteredRendezVous().slice(start, end));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedItems();
  }

  onItemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.updateDisplayedItems();
  }

  onConfirm(_id: string) {
    if (!this.userConnected) return;
    const rendezVous: IRendez_vous | undefined = this.rendez_vous().find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'confirmed';
    rendezVous.manager = this.userConnected() || undefined;

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.loadData(this.selectedStatus.value || 'pending');
    });
  }

  onRefuse(_id: string) {
    if (!this.userConnected) return;
    const rendezVous: IRendez_vous | undefined = this.rendez_vous().find(
      (rdv) => rdv._id === _id
    );

    if (!rendezVous) {
      return;
    }

    rendezVous.status = 'cancelled';
    rendezVous.manager = this.userConnected() || undefined;

    this.rendezVousService.updateRendezVous(_id, rendezVous).then(() => {
      this.loadData(this.selectedStatus.value || 'pending');
    });
  }

  selectRDVForView(rendez_vous: IRendez_vous): void {
    this.selectedRDV = rendez_vous;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
