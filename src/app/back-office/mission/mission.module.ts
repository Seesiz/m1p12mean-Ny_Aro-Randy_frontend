import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';

import { MissionRoutingModule } from './mission-routing.module';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  lucideEye,
  lucideLoaderCircle,
  lucidePlus,
  lucideChevronsUpDown,
  lucideCheck,
  lucideSearch,
  lucideEllipsis,
  lucideArchive,
  lucideArchiveRestore,
} from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { SuiviComponent } from './suivi/suivi.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/brain/popover';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';

@NgModule({
  declarations: [ListComponent, SuiviComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    TranslateModule,
    DragDropModule,
    ReactiveFormsModule,
    [BrnCommandImports],
    [HlmCommandImports],
    HlmIconDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    FormsModule,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucideEye,
      lucidePlus,
      lucideLoaderCircle,
      lucideChevronsUpDown,
      lucideCheck,
      lucideSearch,
      lucideEllipsis,
      lucideArchive,
      lucideArchiveRestore,
    }),
  ],
})
export class MissionModule {}
