import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RendezVousRoutingModule } from './rendez-vous.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { InfoComponent } from './info/info.component';

import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { LocalizedDatePipe } from '@/pipe/localized-date.pipe';
import { provideIcons } from '@ng-icons/core';
import { lucideEye, lucideLoaderCircle } from '@ng-icons/lucide';

@NgModule({
  declarations: [ListComponent, InfoComponent],
  imports: [
    CommonModule,
    RendezVousRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    [...BrnSelectImports],
    [...HlmSelectImports],
    ...UI_MODULE_IMPORTS,
    LocalizedDatePipe,
  ],
  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideEye,
    }),
  ],
})
export class RendezVousModule {}
