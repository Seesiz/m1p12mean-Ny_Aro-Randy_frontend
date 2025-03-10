import { SideBarMenuOption } from '@/types/side-bar-menu-option';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { backOfficeRoutes } from './back-office-routing.module';
import { Role } from '@/types/roles';

@Component({
  selector: 'app-back-office',
  standalone: false,
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.css',
})
export class BackOfficeComponent {
  options: SideBarMenuOption[] = [];
  role?: Role;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role) {
      this.role = Role[role.toLowerCase() as keyof typeof Role];
      this.initMenu();
    }
  }

  initMenu(): void {
    const routes = backOfficeRoutes.find(
      (route) => route.data?.['name'] === 'back-office'
    );
    routes?.children?.forEach((route) => {
      if (route.data?.['role'].includes(this.role))
        this.options.push({
          label: route.data?.['label'],
          icon: route.data?.['icon'],
          path: route.path || '',
        });
    });
  }
}
