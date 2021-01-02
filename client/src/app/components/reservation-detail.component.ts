import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';

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
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private location: Location
  ) {}

  ngOnInit(): void {
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
