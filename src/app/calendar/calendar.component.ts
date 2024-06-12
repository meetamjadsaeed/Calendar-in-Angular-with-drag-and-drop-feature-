import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  constructor() {}

  monthYear: string = '';
  eventDate: string = '';
  eventDescription: string = '';
  dates: number[] = [];
  modalVisible: boolean = false;
  appointments: any[] = [
    {
      date: 'January 1, 2021',
      description: 'AppointMent 1',
    },
    {
      date: 'January 15, 2021',
      description: 'AppointMent 2',
    },
  ];
  currentIndex: number = 0;
  draggingId: any = 0;

  ngOnInit() {
    this.generateCalendar(new Date().getMonth(), new Date().getFullYear());
    this.draggingId = this.generateDraggableId();
  }

  generateDraggableId() {
    return (Math.random() + '').replace(/\D/g, '');
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

  generateCalendar(month: number, year: number) {
    // Clear the dates array
    this.dates = [];

    // Set the month and year for display
    this.monthYear = `${this.getMonthName(month)} ${year}`;

    // Get the number of days in the specified month
    const numDays = new Date(year, month + 1, 0).getDate();

    // Generate an array of dates for the specified month
    for (let i = 1; i <= numDays; i++) {
      this.dates.push(i);
    }
  }

  prevMonth() {
    // Decrease the month by 1
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Generate calendar for the previous month
    this.generateCalendar(prevMonth, prevYear);
  }

  nextMonth() {
    // Increase the month by 1
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    // Generate calendar for the next month
    this.generateCalendar(nextMonth, nextYear);
  }

  openEventModal(date: number, i: number) {
    // Set the event date and make the modal visible
    this.eventDate = `${this.monthYear} ${date}`;
    this.modalVisible = true;
    this.currentIndex = i;
  }

  closeEventModal() {
    // Clear the event description and hide the modal
    this.eventDescription = '';
    this.modalVisible = false;
  }

  saveEvent() {
    console.log('Event saved:', this.eventDate, this.eventDescription);

    // PUSH ON THE BASED ON THE INDEX OF THE DATE
    this.appointments[this.currentIndex] = {
      date: this.eventDate,
      description: this.eventDescription,
    };
    this.eventDescription = '';
    this.modalVisible = false;
  }

  dragEventDetails(currentIndex: number, nextCardIndex: number) {
    const temp = this.appointments[currentIndex];
    this.appointments[currentIndex] = this.appointments[nextCardIndex];
    this.appointments[nextCardIndex] = temp;
  }

  onDragStart(event: DragEvent, currentIndex: number) {
    event.dataTransfer?.setData('text/plain', currentIndex.toString());
  }

  onDragOver(event: DragEvent, nextIndex: number) {
    event.preventDefault();
    this.dragEventDetails(0, nextIndex);
    const currentIndex = parseInt(
      event.dataTransfer?.getData('text/plain') || '',
      10
    );
    console.log(this.currentIndex, 'nextIndex');
  }

  onDrop(event: DragEvent, nextIndex: number) {
    event.preventDefault();

    const currentIndex = parseInt(
      event.dataTransfer?.getData('text/plain') || '',
      10
    );
    this.dragEventDetails(1, nextIndex);
  }

  drop(event: CdkDragDrop<any[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;
    moveItemInArray(this.appointments, previousIndex, currentIndex);
  }
}
