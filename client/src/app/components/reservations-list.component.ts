import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations-list',
  template: `
    <h2>My Reservations</h2>
    <ul>
      <li *ngFor="let reservation of reservationsList">
        <a routerLink="/reservation/{{ reservation.id }}">
          <span class="badge">{{ reservation.id }}</span> {{ reservation.name }}
        </a>
      </li>
    </ul>
  `,
  styles: [],
})
export class ReservationsListComponent implements OnInit {
  reservationsList: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService
      .getReservations()
      .subscribe(reservationsList => (this.reservationsList = reservationsList));
  }
}
