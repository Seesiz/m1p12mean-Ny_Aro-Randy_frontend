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
import {
  lucideEye,
  lucideFilePen,
  lucideLoaderCircle,
  lucideChevronsUpDown,
  lucideCheck,
  lucideSearch,
  lucideX,
} from '@ng-icons/lucide';
import { CreateMissionComponent } from './create-mission/create-mission.component';
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
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';

@NgModule({
  declarations: [ListComponent, InfoComponent, CreateMissionComponent],
  imports: [
    CommonModule,
    RendezVousRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    HlmBadgeDirective,
    [BrnCommandImports],
    [HlmCommandImports],
    HlmIconDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    [...BrnSelectImports],
    [...HlmSelectImports],
    ...UI_MODULE_IMPORTS,
    LocalizedDatePipe,
  ],
  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideEye,
      lucideFilePen,
      lucideChevronsUpDown,
      lucideSearch,
      lucideCheck,
      lucideX,
    }),
  ],
})
export class RendezVousModule {}
