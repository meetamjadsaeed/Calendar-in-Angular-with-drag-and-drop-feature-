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

  currentDate = new Date();
  currentMonthIndex: number = new Date().getMonth();
  currentYearIndex: number = new Date().getFullYear();

  ngOnInit() {
    this.generateCalendar(new Date().getMonth(), new Date().getFullYear());
    this.draggingId = this.generateDraggableId();
    // console.log(new Date().getMonth());
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

  nextMonth() {
    const currentMonth = this.currentMonthIndex;
    const currentYear = this.currentYearIndex;

    this.currentMonthIndex = (currentMonth + 1) % 12;

    if (currentMonth === 11) {
      this.currentYearIndex = currentYear + 1;
    }

    // console.log('nextMonth', this.currentMonthIndex, this.currentYearIndex);

    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
  }
  prevMonth() {
    const currentMonth = this.currentMonthIndex;
    const currentYear = this.currentYearIndex;

    // Ensure not going back beyond the current date
    const now = new Date();
    const initialMonth = now.getMonth();
    const initialYear = now.getFullYear();

    if (currentYear === initialYear && currentMonth === initialMonth) {
      alert('Cannot go back beyond the current month and year');
      console.log('Cannot go back beyond the current month and year');
      return;
    }

    if (currentMonth === 0) {
      this.currentMonthIndex = 11;
      this.currentYearIndex = currentYear - 1;
    } else {
      this.currentMonthIndex = currentMonth - 1;
    }

    // console.log('previousMonth', this.currentMonthIndex, this.currentYearIndex);
    this.generateCalendar(this.currentMonthIndex, this.currentYearIndex);
  }

  openEventModal(date: number, i: number) {
    // Set the event date and make the modal visible
    this.eventDate = `${this.monthYear} ${date}`;
    this.modalVisible = true;
    this.currentIndex = i;
    this.eventDescription = this.appointments[i]?.description || '';
  }

  closeEventModal() {
    // Clear the event description and hide the modal
    this.eventDescription = '';
    this.modalVisible = false;
  }

  saveEvent() {
    console.log('Event saved:', this.eventDate, this.eventDescription);

    // before push check if content is empty
    if (this.eventDescription === '') {
      const userChoice = confirm('Are you sure you want to delete this event?');
      if (userChoice) {
        // PUSH ON THE BASED ON THE INDEX OF THE DATE
        this.appointments[this.currentIndex] = {
          date: this.eventDate,
          description: this.eventDescription,
        };
        this.eventDescription = '';
        this.modalVisible = false;
      } else {
        this.modalVisible = false;
      }
    } else {
      this.appointments[this.currentIndex] = {
        date: this.eventDate,
        description: this.eventDescription,
      };
      this.eventDescription = '';
      this.modalVisible = false;
    }
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
