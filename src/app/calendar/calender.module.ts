import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './calender-routing.module';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [CommonModule, FeatureRoutingModule, CalendarComponent],
})
export class CalenderModule {}
