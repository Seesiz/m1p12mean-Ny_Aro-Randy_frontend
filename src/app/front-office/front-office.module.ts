import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideIcons } from '@ng-icons/core';
import {
  lucideArrowUpLeft,
  lucideLanguages,
  lucideMoon,
  lucideSettings,
  lucideSunDim,
} from '@ng-icons/lucide';
import { PrestationComponent } from './prestation/prestation.component';
import { ContactComponent } from './contact/contact.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    PrestationComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    TranslateModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucideArrowUpLeft,
      lucideSettings,
      lucideMoon,
      lucideSunDim,
      lucideLanguages,
    }),
  ],
})
export class FrontOfficeModule {}
