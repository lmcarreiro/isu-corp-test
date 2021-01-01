import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

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
  reservationsList: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService
      .getReservations()
      .subscribe(reservationsList => (this.reservationsList = reservationsList));
  }

  onSelect(reservation: Reservation): void {
    this.selectedReservation = reservation;
    this.messageService.add(`ReservationsListComponent: Selected reservation id=${reservation.id}`);
  }
}
