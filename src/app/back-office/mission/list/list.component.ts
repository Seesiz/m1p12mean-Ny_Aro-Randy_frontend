import { Component, signal } from '@angular/core';
import { IMission, IUser } from '@/types/output';
import { MissionService } from '@/app/back-office/services/mission/mission.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  missions = signal<IMission[]>([]);
  loading = signal<boolean>(true);
  userConnected = signal<IUser | null>(null);

  searchControl = new FormControl('');
  currentPage = signal(1);
  totalPage = signal(1);

  constructor(
    private missionService: MissionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userConnected.set(this.authService.getUserConnected());
    this.loadMission();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        this.currentPage.set(1);
        this.loadMission();
      });
  }

  loadMission() {
    this.loading.set(true);
    this.missionService
      .getAllPaginate(
        this.currentPage(),
        this.searchControl.value || '',
        this.userConnected()?.roles?.some((r) => r.name === 'CLIENT')
          ? this.userConnected()?._id
          : ''
      )
      .then((mi) => {
        this.missions.set(mi.data);
        this.totalPage.set(mi.totalPages);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadMission();
  }
}
