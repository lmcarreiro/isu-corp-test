import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reservation-detail',
  template: `
    <h2>{{ reservation.name | uppercase }} Details</h2>
    <div><span>id: </span>{{ reservation.id }}</div>
    <div><span>name: </span>{{ reservation.name }}</div>
    <div>
      <label>name:</label>
      <input [(ngModel)]="reservation.name" placeholder="name" />
    </div>
    <button (click)="save()">save</button>
    <button (click)="goBack()">go back</button>
  `,
  styles: [],
})
export class ReservationDetailComponent implements OnInit {
  emptyReservation: Reservation = {
    id: 0,
    name: '',
  };

  reservation: Reservation = this.emptyReservation;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.appService.setHeaderData({
      title: 'Create Reservation',
      navigationLabel: 'Reservations List',
      navigationTarget: '/reservations-list',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    });
    this.getReservation();
  }

  goBack(): void {
    this.location.back();
  }

  getReservation(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reservationService.getReservationById(parseInt(id)).subscribe(reservation => {
        this.reservation = reservation || this.emptyReservation;
      });
    }
  }

  save(): void {
    this.reservationService.updateReservation(this.reservation).subscribe(() => this.goBack());
  }
}
