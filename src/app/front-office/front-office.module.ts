import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideIcons } from '@ng-icons/core';
import { lucideArrowUpLeft, lucideSettings } from '@ng-icons/lucide';

@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [CommonModule, FrontOfficeRoutingModule, ...UI_MODULE_IMPORTS],
  providers: [provideIcons({ lucideArrowUpLeft, lucideSettings })],
})
export class FrontOfficeModule {}
