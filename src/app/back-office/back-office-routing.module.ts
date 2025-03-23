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
        path: 'rendez-vous',
        loadChildren: () =>
          import('./rendez-vous/rendez-vous.module').then(
            (m) => m.RendezVousModule
          ),
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
          import('./planning/planning.module').then((m) => m.PlanningModule),
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager, Role.mechanic],
          label: 'planning',
          icon: 'calendar',
        },
      },
      {
        path: 'user/:role',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager],
          label: 'users',
          icon: 'users',
          hasDropDown: true,
          dropDown: [
            {
              label: 'client',
              path: 'user/client',
            },
            {
              label: 'manager',
              path: 'user/manager',
            },
            {
              label: 'mechanic',
              path: 'user/mechanic',
            },
          ],
        },
      },
      {
        path: 'config',
        canActivate: [AccessGuard],
        data: {
          role: [Role.manager],
          label: 'config',
          icon: 'config',
          hasDropDown: true,
          dropDown: [
            {
              label: 'service',
              path: 'config/service',
            },
            {
              label: 'pack',
              path: 'config/pack',
            },
          ],
        },
        children: [
          {
            path: 'service',
            loadChildren: () =>
              import('./prestation/prestation.module').then(
                (m) => m.PrestationModule
              ),
          },
          {
            path: 'pack',
            loadChildren: () =>
              import('./prestation/prestation.module').then(
                (m) => m.PrestationModule
              ),
          },
        ],
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
