import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IPack, IPrestation, IUser, PaginatedResponse } from '@/types/output';
import { PackService } from '@/app/back-office/services/pack/pack.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PrestationService } from '../../services/prestation/prestation.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  packs = signal<IPack[]>([]);
  searchControl = new FormControl('');
  loading = signal(false);
  selectedPack: IPack | null = null;
  prestations: IPrestation[] = [];

  currentPage = signal(1);
  totalPage = signal(1);
  private destroy$ = new Subject<void>();
  userConnected: IUser | null = null;

  constructor(
    private packService: PackService,
    private authService: AuthService,
    private prestationService: PrestationService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.userConnected = this.authService.getUserConnected();

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadData();
      });
  }

  loadData() {
    this.loading.set(true);
    this.packService
      .getAllPacksPaginate(
        this.currentPage(),
        this.searchControl.value || ''
      )
      .then((response: PaginatedResponse<IPack>) => {
        this.packs.set(response.data);
        this.totalPage.set(response.totalPages);
      })
      .finally(() => {
        this.loading.set(false);
      });
    this.prestationService
      .getAllPrestations()
      .then((prestations) => {
        this.prestations = prestations;
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  selectPackForUpdate(pack: IPack) {
    this.selectedPack = pack;
  }

  deletePack(id: string): void {
    this.loading.set(true);
    this.packService
      .delete(id)
      .then(() => {
        this.loadData();
      })
      .catch((error) => {
        console.error('Error deleting pack:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
