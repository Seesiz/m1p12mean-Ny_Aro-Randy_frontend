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
  lucideTrash,
  lucidePencil,
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
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/brain/alert-dialog';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { AlertComponent } from "../components/alert/alert.component";

@NgModule({
  declarations: [ListComponent, UpdateComponent],
  imports: [
    CommonModule,
    PackRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    [BrnCommandImports],
    [HlmCommandImports],
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
    HlmIconDirective,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    HlmBadgeDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogTitleDirective,
    ...UI_MODULE_IMPORTS,
    AlertComponent
],
  providers: [
    provideIcons({
      lucideLoaderCircle,
      lucideEye,
      lucideChevronsUpDown,
      lucideSearch,
      lucideX,
      lucideTrash,
      lucidePencil,
    }),
  ],
})
export class PackModule {}
