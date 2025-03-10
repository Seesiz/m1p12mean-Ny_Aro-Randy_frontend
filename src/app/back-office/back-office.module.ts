import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { StatistiqueClientComponent } from './statistique-client/statistique-client.component';
import { StatistiqueManagerComponent } from './statistique-manager/statistique-manager.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    StatistiqueClientComponent,
    StatistiqueManagerComponent,
  ],
  imports: [CommonModule, BackOfficeRoutingModule],
})
export class BackOfficeModule {}
