import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { FooterComponent } from './components/footer/footer.component';
import { FormPopupComponent } from './components/tui-calendar/form-popup/form-popup.component';

@NgModule({
  declarations: [
    BackOfficeComponent,
    StatistiqueClientComponent,
    HeaderComponent,
    AccessDeniedComponent,
    LoginComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackOfficeRoutingModule,
    TranslateModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [...UI_MODULE_PROVIDERS],
})
export class BackOfficeModule {}
