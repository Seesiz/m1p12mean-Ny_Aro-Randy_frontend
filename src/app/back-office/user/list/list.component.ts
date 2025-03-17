import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@/app/back-office/services/user/user.service';
import { IUser } from '@/types/output';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {}

  users: IUser[] = [];
  currentRole: string = '';
  type!: 'MANAGER' | 'CLIENT' | 'MECANIC';
  selectedUser: IUser | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('role') as 'MANAGER' | 'CLIENT' | 'MECANIC';
      this.currentRole = this.type;
      this.loadUsers();
    });
  }

  trackById(index: number, user: IUser): string {
    return user._id;
  }

  selectUserForUpdate(user: IUser): void {
    this.selectedUser = user;
    console.log('User selected for update:', user);
  }

  private loadUsers(): void {
    this.userService
      .getAllUsers(this.type)
      .then((users) => {
        this.users = users;
      })
      .catch((error) => {
        console.error('Error loading users:', error);
      });
  }
}
