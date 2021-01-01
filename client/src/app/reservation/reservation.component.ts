import { Component, OnInit } from '@angular/core';
import { RESERVATIONS } from '../mock-reservations';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation',
  template: `
    <h2>My Reservations</h2>
    <ul class="heroes">
      <li *ngFor="let reservation of reservationsList" (click)="onSelect(reservation)">
        <span class="badge">{{ reservation.id }}</span> {{ reservation.name }}
      </li>
    </ul>

    <div *ngIf="selectedReservation">
      <h2>{{ selectedReservation.name | uppercase }} Details</h2>
      <div><span>id: </span>{{ selectedReservation.id }}</div>
      <div><span>name: </span>{{ selectedReservation.name }}</div>
      <div>
        <label>name:</label>
        <input [(ngModel)]="selectedReservation.name" placeholder="name" />
      </div>
    </div>
  `,
  styles: [],
})
export class ReservationComponent implements OnInit {
  selectedReservation?: Reservation;

  onSelect(reservation: Reservation): void {
    this.selectedReservation = reservation;
  }

  reservationsList: Reservation[] = RESERVATIONS;

  constructor() {}

  ngOnInit(): void {}
}
