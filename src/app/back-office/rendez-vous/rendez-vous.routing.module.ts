import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateMissionComponent } from './create-mission/create-mission.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'create-mission',
    component: CreateMissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RendezVousRoutingModule {}
