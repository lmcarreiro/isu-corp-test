import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ReservationService } from '../../services/reservation.service';
import { AppService } from '../../app.service';
import { ReservationModel } from '../../models/reservation.model';

@Component({
  selector: 'route-reservation-detail',
  template: `
    <div class="main">
      <div class="contact-form">
        <div class="contact-form-field full-width-on-mobile">
          <util-input [(value)]="reservation.contact.name" icon="users"></util-input>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-dropdown-contact-type [(selected)]="typeId"></util-dropdown-contact-type>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-input [(value)]="reservation.contact.phone" icon="phone"></util-input>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-input [(value)]="reservation.contact.birthDate" icon="calendar"></util-input>
        </div>
      </div>
      <div class="padding-top-20 hide-on-mobile"></div>
      <div>
        <util-rich-textarea [(text)]="reservation.description"></util-rich-textarea>
      </div>
      <div class="buttons">
        <button (click)="save()" class="btn primary full-width-on-mobile">Send</button>
      </div>
    </div>
  `,
  styles: [
    `
      .main {
        padding: 10px;
      }

      .contact-form {
        background-color: white;
        padding: 10px;
      }

      .contact-form-field {
        display: inline-block;
        vertical-align: middle;
        padding: 3px;
        width: calc(25% - 6px);
      }

      .buttons {
        text-align: right;
        margin-top: 20px;
      }
    `,
  ],
})
export class ReservationDetailComponent implements OnInit {
  get emptyReservation() {
    return <ReservationModel>{
      id: 0,
      description: '',
      contact: {
        id: 0,
        name: '',
        typeId: 0,
        phone: '',
        birthDate: '',
      },
    };
  }

  get typeId(): string {
    return this.reservation.contact.typeId.toString();
  }
  set typeId(value: string) {
    this.reservation.contact.typeId = parseInt(value);
  }

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
      showDescriptionOnMobile: true,
      navigationLabel: 'Reservations List',
      navigationTarget: '/reservations-list',
      navigationArrow: 'left',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
    this.reservationService.createReservation(this.reservation).subscribe(() => this.goBack());
  }
}
