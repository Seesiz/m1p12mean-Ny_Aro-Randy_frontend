import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@/app/back-office/services/user/user.service';
import { IUser } from '@/types/output';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  users = signal<IUser[]>([]);
  currentRole = signal('');
  type!: 'MANAGER' | 'CLIENT' | 'MECANIC';
  selectedUser: IUser | null = null;
  loading = signal(false);

  searchControl = new FormControl('');
  currentPage = signal(1);
  totalPage = signal(1);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('role') as 'MANAGER' | 'CLIENT' | 'MECANIC';
      this.currentRole.set(this.type);
      this.loadUsers();
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadUsers();
      });
  }

  selectUserForUpdate(user: IUser): void {
    this.selectedUser = user;
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService
      .getAllUsersPaginate(
        this.type,
        this.currentPage(),
        this.searchControl.value || ''
      )
      .then((response) => {
        this.users.set(response.data);
        this.totalPage.set(response.totalPages);
      })
      .catch((error) => {
        console.error('Error loading users:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadUsers();
  }
}
