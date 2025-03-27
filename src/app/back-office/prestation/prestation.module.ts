import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { PrestationRoutingModule } from './prestation.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { ModalComponent } from './modal/modal.component';
import { UpdateComponent } from './update/update.component';
import { provideIcons } from '@ng-icons/core';
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
import {
  lucideEye,
  lucideLoaderCircle,
  lucidePencil,
  lucideTrash,
} from '@ng-icons/lucide';
import { AlertComponent } from "../components/alert/alert.component";

@NgModule({
  declarations: [ListComponent, ModalComponent, UpdateComponent],
  imports: [
    CommonModule,
    PrestationRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    BrnAlertDialogContentDirective,
    BrnAlertDialogTriggerDirective,
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
      lucidePencil,
      lucideTrash,
    }),
  ],
})
export class PrestationModule {}
