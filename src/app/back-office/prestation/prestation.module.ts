import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PrestationRoutingModule } from './prestation.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { ModalComponent } from './modal/modal.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [ListComponent, ModalComponent, UpdateComponent],
  imports: [
    CommonModule,
    PrestationRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ...UI_MODULE_IMPORTS,
  ],
})
export class PrestationModule {}
