import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PackRoutingModule } from './pack.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { provideIcons } from '@ng-icons/core';
import { lucideEye, lucideLoaderCircle } from '@ng-icons/lucide';

@NgModule({
  declarations: [ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    PackRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideEye,
    }),
  ],
})
export class PackModule {}
