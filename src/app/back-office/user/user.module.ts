import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { ListComponent } from './list/list.component';
import { ModalComponent } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { provideIcons } from '@ng-icons/core';
import { lucideLoaderCircle, lucidePencil } from '@ng-icons/lucide';

@NgModule({
  declarations: [ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    ModalComponent,
    UserRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucidePencil,
      lucideLoaderCircle,
    }),
  ],
  exports: [ModalComponent],
})
export class UserModule {}
