import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPack, IUser } from '@/types/output';
import { PackService } from '@/app/back-office/services/pack/pack.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  packs: IPack[] = [];
  filteredPacks: IPack[] = [];
  searchControl = new FormControl('');
  loading: boolean = false;
  selectedPack: IPack | null = null;

  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  private destroy$ = new Subject<void>();
  userConnected: IUser | null = null;

  constructor(
    private packService: PackService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.userConnected = this.authService.getUserConnected();

    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterPacks(searchTerm || '');
      });
  }

  loadData() {
    this.loading = true;
    this.packService
      .getAll()
      .then((packs) => {
        this.packs = packs;
        this.filterPacks(this.searchControl.value || '');
      })
      .finally(() => {
        this.loading = false;
      });
  }

  selectPackForUpdate(pack: IPack) {
    this.selectedPack = pack;
  }

  deletePack(id: string): void {
    if (confirm('Are you sure you want to delete this pack?')) {
      this.loading = true;
      this.packService
        .delete(id)
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.error('Error deleting pack:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  filterPacks(searchTerm: string) {
    this.filteredPacks = this.packs.filter((pack) =>
      pack.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
