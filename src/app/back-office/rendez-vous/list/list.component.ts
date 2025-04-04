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
  selectedStatus = new FormControl<'pending' | 'confirmed' | 'cancelled'>(
    'pending'
  );
  searchControl = new FormControl('');
  selectedRDV: IRendez_vous | null = null;
  userConnected = signal<IUser | null>(null);

  currentPage = signal(1);
  totalPage = signal(1);

  constructor(
    private rendezVousService: RendezVousService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData(this.selectedStatus.value || 'pending');
    this.userConnected.set(this.authService.getUserConnected());

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        this.currentPage.set(1);
        this.loadData(this.selectedStatus.value || 'pending');
      });
  }

  onStatusChange(status: 'pending' | 'confirmed' | 'cancelled'): void {
    this.currentPage.set(1);
    this.loadData(status);
  }

  loadData(status: 'pending' | 'confirmed' | 'cancelled') {
    this.loading.set(true);
    this.rendezVousService
      .getPaginate(status, this.currentPage(), this.searchControl.value || '')
      .then((resp) => {
        this.rendez_vous.set(resp.data);
        this.totalPage.set(resp.totalPages);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadData(this.selectedStatus.value || 'pending');
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
}
