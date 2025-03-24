import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { TuiCalendarComponent } from './tui-calendar/tui-calendar.component';

@NgModule({
  declarations: [CalendarComponent, TuiCalendarComponent],
  imports: [CommonModule, PlanningRoutingModule],
})
export class PlanningModule {}
