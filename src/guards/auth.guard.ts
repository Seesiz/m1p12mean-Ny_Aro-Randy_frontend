import { AuthService } from '@/app/back-office/services/auth/auth.service';
import { Role } from '@/types/roles';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const type = route.paramMap.get('type');
    const token = localStorage.getItem('token');

    if (!token || !type) {
      this.redirectToLogin(type);
      return of(false);
    }

    return from(this.authService.getConnectedByToken(token)).pipe(
      map((user) => {
        if (!user || !user.roles) {
          this.redirectToLogin(type);
          return false;
        }

        const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];

        if (
          !userRoles.some(
            (role) => role.name === Role[type as keyof typeof Role]
          )
        ) {
          this.redirectToLogin(type);
          return false;
        }

        return true;
      }),
      catchError(() => {
        this.redirectToLogin(type);
        return of(false);
      })
    );
  }

  private redirectToLogin(type: string | null): void {
    this.router.navigate([`dashboard/${type}/login`]);
  }
}
