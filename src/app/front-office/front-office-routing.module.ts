import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontOfficeComponent } from './front-office.component';

const routes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      {
        path: 'accueil',
        component: HomePageComponent,
      },
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontOfficeRoutingModule {}
