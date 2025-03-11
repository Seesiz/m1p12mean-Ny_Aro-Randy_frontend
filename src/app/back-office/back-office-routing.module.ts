import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office.component';
import { LoginComponent } from './components/login/login.component';
import { Role } from '@/types/roles';
import { AuthGuard } from '@/guards/auth.guard';
import { StatistiqueClientComponent } from './statistique-client/statistique-client.component';
import { StatistiqueManagerComponent } from './statistique-manager/statistique-manager.component';
import { SwitchGuard } from '@/guards/switch.guard';
import { AccessGuard } from '@/guards/access.guard';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const backOfficeRoutes: Routes = [
  {
    path: ':type',
    component: BackOfficeComponent,
    canActivate: [AuthGuard],
    data: {
      name: 'back-office',
    },
    children: [
      {
        path: 'access_denied',
        component: AccessDeniedComponent,
      },
      {
        path: 'statistique',
        canActivate: [AccessGuard],
        data: {
          role: [Role.client, Role.manager, Role.mechanic],
          label: 'statistics',
          icon: 'chart-bar',
        },
        children: [
          {
            path: '',
            component: StatistiqueClientComponent,
            data: {
              role: Role.client,
            },
            canMatch: [SwitchGuard],
          },
          {
            path: '',
            component: StatistiqueManagerComponent,
            data: {
              role: Role.manager,
            },
            canMatch: [SwitchGuard],
          },
        ],
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager],
          label: 'users',
          icon: 'users',
        },
      },
      {
        path: 'rendez-vous',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager],
          label: 'rendez-vous',
          icon: 'rendez-vous',
        },
      },
      {
        path: 'planning',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager, Role.mechanic],
          label: 'planning',
          icon: 'calendar',
        },
      },
    ],
  },
  {
    path: ':type/login',
    component: LoginComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(backOfficeRoutes)],
  exports: [RouterModule],
})
export class BackOfficeRoutingModule {}
