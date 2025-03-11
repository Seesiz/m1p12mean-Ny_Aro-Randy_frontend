import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListComponent, ModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    ...UI_MODULE_IMPORTS,
  ],
})
export class UserModule {}
