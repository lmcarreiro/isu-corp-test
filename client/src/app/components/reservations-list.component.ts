import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ReservationListItem } from '../models/reservation-list-item';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations-list',
  template: `
    <div class="container">
      <div class="sorting-dropdown full-width-on-mobile" style="width: 260px;">
        <util-dropdown
          [options]="sortingOptions"
          [(selected)]="sorting"
          icon="sorting"
        ></util-dropdown>
      </div>
      <table class="reservations-table">
        <tbody>
          <tr *ngFor="let reservation of reservationsList">
            <td class="hide-on-mobile">
              <img
                style="display: block; margin-left: 3px;"
                src="../../assets/icon-reservation.jpg"
              />
            </td>
            <td>
              <div>
                <div class="title">{{ reservation.contactName }}</div>
                <div class="date">{{ reservation.reservationDate }}</div>
              </div>
            </td>
            <td class="hide-on-mobile">
              <div style="font-size: 0.9em;">Ranking</div>
              <div>
                <star-rating
                  [value]="reservation.ranking"
                  [totalstars]="5"
                  [readonly]="true"
                  checkedcolor="#f0d20f"
                  uncheckedcolor="grey"
                  size="18px"
                ></star-rating>
              </div>
            </td>
            <td>
              <div class="favorite favorite-{{ reservation.favorite ? 'enabled' : 'disabled' }}">
                <span class="favorite-text hide-on-mobile">Add Favorites</span>
                <span class="favorite-icon"></span>
              </div>
            </td>
            <td>
              <button routerLink="/reservation/{{ reservation.id }}" class="btn secondary">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pager">
        <button class="btn-pager">&lt;</button>
        <button class="btn-pager">1</button>
        <button class="btn-pager selected">2</button>
        <button class="btn-pager">3</button>
        <button class="btn-pager">4</button>
        ...
        <button class="btn-pager">50</button>
        <button class="btn-pager">&gt;</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        background: white;
        padding: 15px;
      }
      .sorting-dropdown {
        padding-bottom: 10px;
      }
      .reservations-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 5px;
      }
      .reservations-table tr {
        background: #eee;
      }
      .reservations-table td {
        padding: 3px;
        text-align: center;
        vertical-align: middle;
      }
      .reservations-table tr td:nth-child(1) {
        width: 42px;
      }
      .reservations-table tr td:nth-child(2) {
        text-align: left;
      }
      .reservations-table tr td:nth-child(5) {
        width: 100px;
      }

      .date {
        color: grey;
        font-size: 0.8em;
      }

      .btn-pager {
        margin: 0px 1px;
        border: 1px solid grey;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
      }
      .btn-pager.selected {
        color: white;
        background-color: grey;
      }

      .favorite {
        display: flex;
        cursor: pointer;
      }
      .favorite-enabled {
      }
      .favorite-disabled {
        color: #aaa;
      }
      .favorite-text {
        display: flex;
        align-items: center;
        height: 28px;
        margin-right: 10px;
      }
      .favorite-icon {
        display: inline-block;
        width: 28px;
        height: 28px;
      }
      .favorite-enabled .favorite-icon {
        background-image: url(../../assets/icon-heart-enabled.jpg);
      }
      .favorite-disabled .favorite-icon {
        background-image: url(../../assets/icon-heart-disabled.jpg);
      }
    `,
  ],
})
export class ReservationsListComponent implements OnInit {
  reservationsList: ReservationListItem[] = [];

  sorting = 'date-asc';

  sortingOptions = [
    { id: 'date-asc', name: 'By Date Ascending' },
    { id: 'date-desc', name: 'By Date Descending' },
    { id: 'name-asc', name: 'By Alphabetic Ascending' },
    { id: 'name-desc', name: 'By Alphabetic Descending' },
    { id: 'ranking', name: 'By Ranking' },
  ];

  constructor(private appService: AppService, private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.appService.setHeaderData({
      title: 'Reservations List',
      navigationLabel: 'Create reservation',
      navigationTarget: '/reservation',
      navigationArrow: 'right',
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
