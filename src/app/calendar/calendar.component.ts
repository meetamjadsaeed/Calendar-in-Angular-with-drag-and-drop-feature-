import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';

import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  monthYear: string = '';
  eventDate: string = '';
  eventDescription: string = '';
  dates: number[] = [];
  modalVisible: boolean = false;
  appointments: any[] = [
    { date: 'Jun 1, 2024', description: 'AppointMent 1' },
    { date: 'Jun 2, 2024', description: 'AppointMent 2' },
  ];
  currentIndex: number = 0;
  currentDate = new Date();
  currentMonthIndex: number = new Date().getMonth();
  currentYearIndex: number = new Date().getFullYear();

  ngOnInit() {
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
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

  // generateCalendar(month: number, year: number) {
  //   this.dates = [];
  //   this.monthYear = `${this.getMonthName(month)} ${year}`;
  //   const numDays = new Date(year, month + 1, 0).getDate();
  //   for (let i = 1; i <= numDays; i++) {
  //     this.dates.push(i);
  //   }
  // }

  generateCalendar(month: number, year: number): void {
    this.dates = [];
    this.monthYear = `${this.getMonthName(month)} ${year}`;
    const numDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= numDays; i++) {
      this.dates.push(i);
    }

    // Filter appointments using RxJS
    this.filterAppointments(month, year).subscribe(
      (filteredAppointments: any) => {
        this.appointments = filteredAppointments;
      }
    );
  }

  filterAppointments(month: number, year: number) {
    return of(this.appointments).pipe(
      // Filter based on month and year
      map((appointments: any) =>
        appointments.filter((appointment: any) => {
          const appointmentDate = new Date(appointment.date);
          return (
            appointmentDate.getMonth() === month &&
            appointmentDate.getFullYear() === year
          );
        })
      )
    );
  }

  nextMonth() {
    this.currentMonthIndex = (this.currentMonthIndex + 1) % 12;
    if (this.currentMonthIndex === 0) {
      this.currentYearIndex++;
    }
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
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
  }

  openEventModal(date: number, i: number) {
    this.eventDate = `${this.monthYear} ${date}`;
    this.modalVisible = true;
    this.currentIndex = i;
    this.eventDescription = this.appointments[i]?.description || '';
  }

  closeEventModal() {
    this.eventDescription = '';
    this.modalVisible = false;
  }

  saveEvent() {
    if (this.eventDescription === '') {
      const userChoice = confirm('Are you sure you want to delete this event?');
      if (userChoice) {
        this.appointments[this.currentIndex] = {
          date: this.eventDate,
          description: this.eventDescription,
        };
        this.modalVisible = false;
      } else {
        this.modalVisible = false;
      }
    } else {
      this.appointments[this.currentIndex] = {
        date: this.eventDate,
        description: this.eventDescription,
      };
      this.modalVisible = false;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}
