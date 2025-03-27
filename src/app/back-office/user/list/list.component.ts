import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@/app/back-office/services/user/user.service';
import { IUser } from '@/types/output';

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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('role') as 'MANAGER' | 'CLIENT' | 'MECANIC';
      this.currentRole.set(this.type);
      this.loadUsers();
    });
  }

  selectUserForUpdate(user: IUser): void {
    this.selectedUser = user;
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService
      .getAllUsers(this.type)
      .then((users) => {
        this.users.set(users);
      })
      .catch((error) => {
        console.error('Error loading users:', error);
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
