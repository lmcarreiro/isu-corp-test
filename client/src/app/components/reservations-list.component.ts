import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
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

  constructor(private appService: AppService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.appService.setHeaderData({
      title: 'Reservations List',
      navigationLabel: 'Create reservation',
      navigationTarget: '/reservation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    });
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService
      .getReservations()
      .subscribe(reservationsList => (this.reservationsList = reservationsList));
  }
}
