import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class EventListComponent implements OnInit {
  searchText: string = '';
  filteredEventsData: any[] = []; // Store the filtered events here

  events = [
    {
      date: '2024-06-12',
      name: 'Meeting',
      description: 'Team meeting',
      remindBefore: '15 mins',
    },
    {
      date: '2024-06-13',
      name: 'Presentation',
      description: 'Client presentation',
      remindBefore: '30 mins',
    },
    // Add more events as needed
  ];

  ngOnInit() {
    this.filterEvents();
  }

  filterEvents() {
    this.filteredEventsData = this.events.filter((event) =>
      event.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
