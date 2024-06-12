import { Component } from '@angular/core';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent {
  eventName: string = '';
  eventDescription: string = '';
  remindMe: boolean = false;
  remindBefore: string = '';

  constructor() {}

  addEvent() {
    // Here you can implement the logic to add the event
    if (this.eventName.trim() === '' || this.eventDescription.trim() === '') {
      alert('Please enter event name and description.');
      return;
    }

    // You can create an event object with the entered details
    const newEvent = {
      name: this.eventName,
      description: this.eventDescription,
      remindBefore: this.remindBefore,
      // You may want to add date information here as well
    };

    // Here you can emit this newEvent to a service or parent component to handle it
    // For now, let's just log it
    console.log('New Event:', newEvent);

    // Clear the input fields after adding the event
    this.clearFields();
  }

  clearFields() {
    // Reset all fields to empty values
    this.eventName = '';
    this.eventDescription = '';
    this.remindMe = false;
    this.remindBefore = '';
  }
}
