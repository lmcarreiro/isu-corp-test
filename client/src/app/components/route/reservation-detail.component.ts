import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ReservationService } from '../../services/reservation.service';
import { AppService } from '../../app.service';
import { ReservationModel } from '../../models/reservation.model';
import { ContactService } from 'src/app/services/contact.service';
import { ContactModel } from 'src/app/models/contact.model';
import { languageFormatSettings } from 'src/config';
import { dateIsValid, phoneIsValid } from 'src/app/helpers/validation';

@Component({
  selector: 'route-reservation-detail',
  template: `
    <div class="main">
      <div class="contact-form">
        <div class="contact-form-field full-width-on-mobile">
          <util-input-autocomplete
            icon="users"
            [(value)]="reservation.contact.name"
            [getDataCallback]="getContacts"
            (selectItem)="selectContact($event)"
            field="name"
            placeholder="Contact Name ..."
            i18n-placeholder
            [invalid]="validated && invalidFields.includes('contact.name')"
          ></util-input-autocomplete>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-dropdown-contact-type
            [(selected)]="typeId"
            [invalid]="validated && invalidFields.includes('contact.typeId')"
          ></util-dropdown-contact-type>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-input
            [(value)]="reservation.contact.phone"
            icon="phone"
            placeholder="Phone"
            i18n-placeholder
            [mask]="mask"
            [invalid]="validated && invalidFields.includes('contact.phone')"
          ></util-input>
        </div>
        <div class="contact-form-field full-width-on-mobile">
          <util-input-datepicker
            [(value)]="reservation.contact.birthDate"
            placeholder="Birth Date"
            i18n-placeholder
            [invalid]="validated && invalidFields.includes('contact.birthDate')"
          ></util-input-datepicker>
        </div>
      </div>
      <div class="padding-top-20 hide-on-mobile"></div>
      <div>
        <util-rich-textarea
          [(text)]="reservation.description"
          [invalid]="validated && invalidFields.includes('description')"
        ></util-rich-textarea>
      </div>
      <div class="buttons">
        <button (click)="save()" class="btn primary full-width-on-mobile" i18n>Send</button>
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

  validated = false;

  get typeId(): string {
    return this.reservation.contact.typeId.toString();
  }
  set typeId(value: string) {
    this.reservation.contact.typeId = parseInt(value);
  }

  reservation = this.emptyReservation;

  mask = languageFormatSettings.phoneMaskFormat;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private contactService: ContactService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.appService.setHeaderData({
      title: $localize`Create Reservation`,
      showDescriptionOnMobile: true,
      navigationLabel: $localize`Reservations List`,
      navigationTarget: '/reservations-list',
      navigationArrow: 'left',
      description: $localize`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    });
    this.getReservation();
  }

  goBack(): void {
    this.location.back();
  }

  async getReservation() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const reservation = await this.reservationService.getReservationById(parseInt(id));
      this.reservation = reservation || this.emptyReservation;
    }
  }

  getContacts = (name: string) => {
    return this.contactService.getContactsByName(name);
  };

  selectContact(contact: ContactModel): void {
    this.reservation.contact = contact;
  }

  get invalidFields() {
    // Using a spread (...) + generator (function*) here to have a strongly typed array with a
    // union of string literals on the `invalidFields` field, so we can see compiler error on typos
    return [
      ...(function* (reservation: ReservationModel) {
        if (!reservation.contact.name) yield 'contact.name';
        if (!reservation.contact.typeId) yield 'contact.typeId';
        if (!phoneIsValid(reservation.contact.phone)) yield 'contact.phone';
        if (!dateIsValid(reservation.contact.birthDate)) yield 'contact.birthDate';
        if (!reservation.description) yield 'description';
      })(this.reservation),
    ];
  }

  save(): void {
    if (this.invalidFields.length) {
      this.validated = true;
      return;
    }

    this.reservationService.createReservation(this.reservation).subscribe(() => {
      // TODO: show error in case it doesn't create the record.
      this.goBack();
    });
  }
}
