import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontOffcieComponent } from './front-offcie.component';

const routes: Routes = [
  {
    path: '',
    component: FrontOffcieComponent,
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
