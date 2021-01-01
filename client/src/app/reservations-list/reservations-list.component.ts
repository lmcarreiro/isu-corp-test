import { Component, OnInit } from '@angular/core';
import { RESERVATIONS } from '../mock-reservations';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservations-list',
  template: `
    <h2>My Reservations</h2>
    <ul>
      <li *ngFor="let reservation of reservationsList" (click)="onSelect(reservation)">
        <span class="badge">{{ reservation.id }}</span> {{ reservation.name }}
      </li>
    </ul>

    <div *ngIf="selectedReservation">
      <app-reservation-detail [reservation]="selectedReservation"></app-reservation-detail>
    </div>
  `,
  styles: [],
})
export class ReservationsListComponent implements OnInit {
  selectedReservation?: Reservation;
  reservationsList: Reservation[] = RESERVATIONS;

  constructor() {}

  ngOnInit(): void {}

  onSelect(reservation: Reservation): void {
    this.selectedReservation = reservation;
  }
}
