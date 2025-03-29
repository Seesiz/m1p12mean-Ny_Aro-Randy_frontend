import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NoteRoutingModule } from './note.routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, NoteRoutingModule],
})
export class NoteModule {}
