import { Role } from '@/types/roles';
import { Injectable } from '@angular/core';
import { Router, CanMatch, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchGuard implements CanMatch {
  constructor(private router: Router) {}

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    const roleRequired: Role = route.data?.['role'];
    const urlParts = window.location.pathname.split('/');
    const type = urlParts.find((part) => Object.keys(Role).includes(part));

    if (
      type &&
      roleRequired &&
      Role[type as keyof typeof Role] === roleRequired
    ) {
      return true;
    }
    return false;
  }
}
