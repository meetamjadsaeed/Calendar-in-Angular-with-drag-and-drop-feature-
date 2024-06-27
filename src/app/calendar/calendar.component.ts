import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  CdkDropList,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { Subject, of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../material/material.module';
import { Appointment } from '../interfaces/appointment';

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
    MaterialModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendarForm: FormGroup;
  monthYear: string = '';
  eventDate: string = '';
  eventDescription: string = '';
  dates: number[] = [];
  modalVisible: boolean = false;
  appointments: Appointment[] = [];
  currentIndex: number = 0;
  currentDate = new Date();
  currentMonthIndex: number = new Date().getMonth();
  currentYearIndex: number = new Date().getFullYear();
  isFormError: boolean = false;
  formError: string = '';
  selectedDate: string = '';

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.calendarForm = this.fb.group({
      eventDescription: ['', [Validators.required, Validators.minLength(5)]],
      eventTime: ['', [Validators.required]],
    });

    this.onChanges();
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChanges(): void {
    this.calendarForm.valueChanges
      .pipe(
        map((val) => {
          console.log(val, 'form value');
          return val;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
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
    const numDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
      this.dates.push(i);
    }
  }

  filterAppointments(month: number, year: number): Appointment[] {
    return this.appointments.filter(
      (appointment: Appointment) =>
        new Date(appointment.date).getMonth() === month &&
        new Date(appointment.date).getFullYear() === year
    );
  }

  nextMonth() {
    this.currentMonthIndex = (this.currentMonthIndex + 1) % 12;
    if (this.currentMonthIndex === 0) {
      this.currentYearIndex++;
    }
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
    console.log(this.dates, 'calendar dates');
    console.log(this.appointments, 'calendar dates');
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
    console.log(this.dates, 'calendar dates');
    console.log(this.appointments, 'calendar dates');
  }

  getAppointmentForDate(date: number, id: number): Appointment | undefined {
    const formattedDate = `${this.currentYearIndex}-${this.currentMonthIndex}-${date}`;
    return this.appointments.find(
      (app: Appointment) => app?.id === id && app?.id === id
    );
  }

  openEventModal(date: number, i: number) {
    this.eventDate = `${this.monthYear} ${date}`;
    this.modalVisible = true;
    this.currentIndex = i;
    this.eventDescription =
      this.getAppointmentForDate(date, i)?.description || '';
  }

  closeEventModal() {
    this.eventDescription = '';
    this.modalVisible = false;
  }

  saveEvent() {
    of(this.calendarForm.valid)
      .pipe(
        map((valid) => {
          if (valid) {
            const formattedDate = `${this.currentYearIndex}-${
              this.currentMonthIndex
            }-${this.currentIndex + 1}`;
            const appointmentIndex = this.appointments.findIndex(
              (app: Appointment) =>
                app.date === formattedDate && app.id === this.currentIndex
            );
            if (appointmentIndex !== -1) {
              this.appointments[appointmentIndex] = {
                id: this.currentIndex,
                date: formattedDate,
                description: this.calendarForm.value.eventDescription,
                time: this.calendarForm.value.eventTime,
              };
            } else {
              this.appointments.push({
                id: this.currentIndex,
                date: formattedDate,
                description: this.calendarForm.value.eventDescription,
                time: this.calendarForm.value.eventTime,
              });
            }
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
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.calendarForm.valid) {
      const formattedDate = `${this.currentYearIndex}-${
        this.currentMonthIndex
      }-${this.currentIndex + 1}`;
      const appointmentIndex = this.appointments.findIndex(
        (app: Appointment) =>
          app.date === formattedDate && app.id === this.currentIndex
      );
      if (appointmentIndex !== -1) {
        this.appointments[appointmentIndex] = {
          id: this.currentIndex,
          date: formattedDate,
          description: this.calendarForm.value.eventDescription,
          time: this.calendarForm.value.eventTime,
        };
      } else {
        this.appointments.push({
          id: this.currentIndex,
          date: formattedDate,
          description: this.calendarForm.value.eventDescription,
          time: this.calendarForm.value.eventTime,
        });
      }

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
    const dsdsd = this.getAppointmentForDate(
      parseInt(this.eventDate),
      this.currentIndex
    );
    console.log(dsdsd, 'dsdsddsdsddsdsd');
  }

  get eventName() {
    return this.calendarForm.get('eventDescription');
  }

  getFormError({ formData = '' }: { formData: string }) {
    if (formData?.length < 5) {
      this.formError = 'Length must be greater than 5';
    }
  }

  onReset(): void {
    this.calendarForm.reset();
  }

  deleteEvent() {
    of(confirm('Are you sure you want to delete this event?'))
      .pipe(
        map((confirmed) => {
          if (confirmed) {
            const formattedDate = `${this.currentYearIndex}-${
              this.currentMonthIndex
            }-${this.currentIndex + 1}`;
            this.appointments = this.appointments.filter(
              (appointment: Appointment) =>
                !(
                  appointment.date === formattedDate &&
                  appointment.id === this.currentIndex
                )
            );
            this.modalVisible = false;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }

  parseInt(value: string): number {
    return parseInt(value, 10);
  }
}
