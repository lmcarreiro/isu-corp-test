import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ReservationListItem } from '../models/reservation-list-item';
import { ReservationService } from '../services/reservation.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reservation-detail',
  template: `
    <div><span>id: </span>{{ reservation.id }}</div>
    <div class="contact-info">
      <util-input [(value)]="reservation.contact.name" icon="users"></util-input>
      <util-input [(value)]="reservation.contact.type" icon="globe"></util-input>
    </div>
    <div class="buttons">
      <button (click)="save()" class="btn primary">save</button>
    </div>
  `,
  styles: [
    `
      .contact-info {
        background-color: white;
        padding: 10px;
      }
    `,
  ],
})
export class ReservationDetailComponent implements OnInit {
  // TODO: use another model for this
  emptyReservation = {
    id: 0,
    description: '',
    contact: {
      id: 0,
      name: '',
      type: '',
      phone: '',
      birthDate: '',
    },
  };

  reservation = this.emptyReservation;

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
      navigationArrow: 'left',
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
        //this.reservation = reservation || this.emptyReservation;
      });
    }
  }

  save(): void {
    this.reservationService
      .updateReservation(this.reservation as any)
      .subscribe(() => this.goBack());
  }
}
