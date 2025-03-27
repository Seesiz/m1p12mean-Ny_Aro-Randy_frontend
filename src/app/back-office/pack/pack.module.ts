import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PackRoutingModule } from './pack.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideEye,
  lucideLoaderCircle,
  lucideSearch,
  lucideX,
} from '@ng-icons/lucide';
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
  declarations: [ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    PackRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    [BrnCommandImports],
    [HlmCommandImports],
    HlmIconDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    ...UI_MODULE_IMPORTS,
  ],
  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideEye,
      lucideChevronsUpDown,
      lucideSearch,
      lucideX,
    }),
  ],
})
export class PackModule {}
