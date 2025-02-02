import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
// import { EventFormComponent } from './event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventListComponent } from './event-list/event-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CalendarComponent,
    FormsModule,
    DragDropModule,
    // EventFormComponent,
    EventListComponent,

    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
