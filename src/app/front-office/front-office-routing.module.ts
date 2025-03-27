import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontOfficeComponent } from './front-office.component';
import { PrestationComponent } from './prestation/prestation.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'service',
        component: PrestationComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: '',
        redirectTo: 'home',
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
