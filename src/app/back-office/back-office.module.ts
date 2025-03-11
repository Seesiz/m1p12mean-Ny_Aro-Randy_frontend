import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { StatistiqueClientComponent } from './statistique-client/statistique-client.component';
import { StatistiqueManagerComponent } from './statistique-manager/statistique-manager.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { LoginComponent } from './components/login/login.component';
import {
  UI_MODULE_IMPORTS,
  UI_MODULE_PROVIDERS,
} from '@/types/ui.module.import';

@NgModule({
  declarations: [
    BackOfficeComponent,
    StatistiqueClientComponent,
    StatistiqueManagerComponent,
    HeaderComponent,
    AccessDeniedComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    TranslateModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [...UI_MODULE_PROVIDERS],
})
export class BackOfficeModule {}
