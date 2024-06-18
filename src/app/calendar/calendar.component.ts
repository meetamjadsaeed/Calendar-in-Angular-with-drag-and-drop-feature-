import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarForm: FormGroup;
  monthYear: string = '';
  eventDate: string = '';
  eventDescription: string = '';
  dates: number[] = [];
  modalVisible: boolean = false;
  appointments: { [key: string]: any[] } = {
    '2024-7': [
      {
        id: 1,
        date: Date.now,
        description: 'appointment 1',
      },
    ],
    '2024-8': [
      {
        id: 2,
        date: Date.now,
        description: 'appointment 2',
      },
    ],
  };
  currentIndex: number = 0;
  currentDate = new Date();
  currentMonthIndex: number = new Date().getMonth();
  currentYearIndex: number = new Date().getFullYear();
  isFormError: boolean = false;
  formError: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calendarForm = this.fb.group({
      eventDescription: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.onChanges();
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
  }

  onChanges(): void {
    this.isFormError = false;
    this.calendarForm.valueChanges.subscribe((val) => {
      console.log(val, 'form value');
    });
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  }

  generateCalendar(month: number, year: number): void {
    this.dates = [];
    this.monthYear = `${this.getMonthName(month)} ${year}`;
    const key = `${year}-${month}`;
    if (!this.appointments[key]) {
      this.appointments[key] = this.filterAppointments(month, year);
    }
    const numDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
      this.dates.push(i);
    }
  }

  filterAppointments(month: number, year: number): any[] {
    return this.appointments[`${year}-${month}`] || [];
  }

  nextMonth() {
    this.currentMonthIndex = (this.currentMonthIndex + 1) % 12;
    if (this.currentMonthIndex === 0) {
      this.currentYearIndex++;
    }
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
    console.log(this.dates, 'calender dates');
    console.log(this.appointments, 'calender dates');
  }

  prevMonth() {
    const now = new Date();
    const initialMonth = now.getMonth();
    const initialYear = now.getFullYear();
    if (
      this.currentYearIndex === initialYear &&
      this.currentMonthIndex === initialMonth
    ) {
      alert('Cannot go back beyond the current month and year');
      return;
    }
    if (this.currentMonthIndex === 0) {
      this.currentMonthIndex = 11;
      this.currentYearIndex--;
    } else {
      this.currentMonthIndex--;
    }
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
    console.log(this.dates, 'calender dates');
    console.log(this.appointments, 'calender dates');
  }

  getAppointmentForDate(date: number, id: number) {
    const key = `${this.currentYearIndex}-${this.currentMonthIndex}`;
    const formattedDate = `${this.getMonthName(
      this.currentMonthIndex
    )} ${date}, ${this.currentYearIndex}`;
    return this.appointments[key]?.find((app) => app?.id === id);
  }

  openEventModal(date: number, i: number) {
    this.eventDate = `${this.monthYear} ${date}`;
    this.modalVisible = true;
    this.currentIndex = i;
    this.eventDescription =
      this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`][i]
        ?.description || '';
  }

  closeEventModal() {
    this.eventDescription = '';
    this.modalVisible = false;
  }

  saveEvent() {
    if (this.eventDescription === '') {
      const userChoice = confirm('Are you sure you want to delete this event?');
      if (userChoice) {
        this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`][
          this.currentIndex
        ] = {
          id: this.currentIndex,
          date: this.eventDate,
          description: this.eventDescription,
        };
        this.modalVisible = false;
      }
    } else {
      this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`][
        this.currentIndex
      ] = {
        id: this.currentIndex,
        date: this.eventDate,
        description: this.eventDescription,
      };
      this.modalVisible = false;
    }
  }

  onSubmit(): void {
    if (this.calendarForm.valid) {
      this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`][
        this.currentIndex
      ] = {
        id: this.currentIndex,
        date: this.eventDate,
        description: this.calendarForm.value.eventDescription,
      };

      this.modalVisible = false;
      this.onReset();
      console.log('Form Submitted!', this.calendarForm.value);
    } else {
      this.isFormError = true;
      this.getFormError(this.calendarForm.value);
      console.log(
        'Form Not Valid',
        this.calendarForm.controls.eventDescription
      );
    }
  }

  get eventName() {
    return this.calendarForm.get('eventDescription');
  }

  getFormError({ formData = '' }) {
    if (formData?.length < 5) {
      this.formError = 'Length must be greater than 5';
    }
  }

  onReset(): void {
    this.calendarForm.reset();
  }

  deleteEvent() {
    const userChoice = confirm('Are you sure you want to delete this event?');
    if (userChoice) {
      this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`][
        this.currentIndex
      ] = { date: '', description: '' };
      this.modalVisible = false;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.appointments[`${this.currentYearIndex}-${this.currentMonthIndex}`],
      event.previousIndex,
      event.currentIndex
    );
  }

  parseInt(value: string): number {
    return parseInt(value, 10);
  }
}
