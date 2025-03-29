import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';

import { MissionRoutingModule } from './mission-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    TranslateModule,
    ...UI_MODULE_IMPORTS,
  ],
})
export class MissionModule {}
