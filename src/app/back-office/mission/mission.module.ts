import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';

import { MissionRoutingModule } from './mission-routing.module';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { lucideEye, lucidePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { SuiviComponent } from './suivi/suivi.component';

@NgModule({
  declarations: [ListComponent, SuiviComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    TranslateModule,
    DragDropModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucidePlus,
    }),
  ],
})
export class MissionModule {}
