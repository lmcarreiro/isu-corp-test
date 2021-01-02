import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ReservationListItem } from '../models/reservation-list-item';
import { ReservationService } from '../services/reservation.service';

@Component({
  selector: 'app-reservations-list',
  template: `
    <div class="container">
      <div style="width: 260px;">
        <ng-select
          [items]="sortingOptions"
          [searchable]="false"
          [clearable]="false"
          bindLabel="name"
          bindValue="id"
          [(ngModel)]="sorting"
        >
          <ng-template ng-label-tmp let-item="item">
            <div style="display: flex; align-items: center;">
              <img src="../../assets/icon-sorting.jpg" />
              <span>{{ item.name }}</span>
            </div>
          </ng-template>
        </ng-select>
      </div>
      <table class="reservations-table">
        <tbody>
          <tr *ngFor="let reservation of reservationsList">
            <td>
              <img
                style="display: block; margin-left: 3px;"
                src="../../assets/icon-reservation.jpg"
              />
            </td>
            <td>
              <div>
                <div class="title">{{ reservation.name }}</div>
                <div class="date">{{ reservation.date }}</div>
              </div>
            </td>
            <td>
              {{ reservation.ranking }}
            </td>
            <td>
              {{ reservation.favorite }}
            </td>
            <td>
              <button routerLink="/reservation/{{ reservation.id }}" class="secondary">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .container {
        background: white;
        padding: 15px;
      }
      .reservations-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;
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
