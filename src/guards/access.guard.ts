import { Role } from '@/types/roles';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const roleRequired = route.data['role'];
    const userRole = localStorage.getItem('role') as Role;

    if (!userRole || !roleRequired.includes(userRole)) {
      this.router.navigate([
        `dashboard/${userRole.toLowerCase()}/access_denied`,
      ]);
      return false;
    }
    return true;
  }
}
