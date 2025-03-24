import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PackRoutingModule } from './pack.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    PackRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ...UI_MODULE_IMPORTS,
  ],
})
export class PackModule {}
