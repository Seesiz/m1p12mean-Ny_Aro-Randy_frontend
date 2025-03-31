import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NoteRoutingModule } from './note.routing.module';
import { UI_MODULE_IMPORTS } from '@/types/ui.module.import';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateComponent } from './update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { RatingComponent } from '@/app/front-office/components/rating/rating.component';

@NgModule({
  declarations: [ListComponent, UpdateComponent],
  imports: [
    RatingComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    CommonModule,
    NoteRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ...UI_MODULE_IMPORTS,
  ],
})
export class NoteModule {}
