import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';

@NgModule({
  declarations: [FrontOfficeComponent, HomePageComponent],
  imports: [CommonModule, FrontOfficeRoutingModule, ...UI_MODULE_IMPORTS],
})
export class FrontOfficeModule {}
