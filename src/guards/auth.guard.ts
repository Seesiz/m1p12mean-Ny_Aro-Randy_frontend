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
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const type = route.paramMap.get('type');
    //Mila asiana vérification backend eto
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate([`dashboard/${type}/login`]);
      return false;
    }
    const userRole = localStorage.getItem('role') as Role;
    if (!userRole || !type) {
      this.router.navigate([`dashboard/${type}/login`]);
      return false;
    }
    if (type && Role[type as keyof typeof Role] !== userRole) {
      this.router.navigate([`dashboard/${type}/login`]);
      return false;
    }
    return true;
  }
}
