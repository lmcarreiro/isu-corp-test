import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { PagedResultModel, emptyPagedResult } from '../../models/paged-result.model';
import { ReservationListItemModel } from '../../models/reservation-list-item.model';
import { ReservationService } from '../../services/reservation.service';
import { PAGE_MARKER } from '../util/paginator.component';

@Component({
  selector: 'route-reservations-list',
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
          <tr *ngFor="let reservation of reservations.pagedRecords">
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
              <div
                class="favorite favorite-{{ reservation.favorite ? 'selected' : 'unselected' }}"
                (click)="toggleFavorite(reservation)"
              >
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
      <util-paginator [results]="reservations" [targetLink]="routerLink"></util-paginator>
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

      .favorite {
        display: flex;
        cursor: pointer;
      }
      .favorite-selected {
        color: #aaa;
      }
      .favorite-unselected {
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
      .favorite-selected .favorite-icon {
        background-image: url(../../assets/icon-heart-enabled.jpg);
      }
      .favorite-unselected .favorite-icon {
        background-image: url(../../assets/icon-heart-disabled.jpg);
      }
    `,
  ],
})
export class ReservationsListComponent implements OnInit {
  get routerLink() {
    return `/reservations-list/${PAGE_MARKER}/${this.sorting}`;
  }

  reservations: PagedResultModel<ReservationListItemModel> = emptyPagedResult;

  currentPage = 1;

  #sorting = 'date-asc';
  get sorting(): string {
    return this.#sorting;
  }
  set sorting(value: string) {
    if (value !== this.#sorting) {
      this.#sorting = value;
      this.currentPage = 1;
      this.router.navigateByUrl(this.routerLink.replace(PAGE_MARKER, this.currentPage.toString()));
    }
  }

  sortingOptions = [
    { id: 'date-asc', name: 'By Date Ascending' },
    { id: 'date-desc', name: 'By Date Descending' },
    { id: 'contactName-asc', name: 'By Alphabetic Ascending' },
    { id: 'contactName-desc', name: 'By Alphabetic Descending' },
    { id: 'ranking-desc', name: 'By Ranking' },
  ];

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.appService.setHeaderData({
      title: 'Reservations List',
      showDescriptionOnMobile: false,
      navigationLabel: 'Create reservation',
      navigationTarget: '/reservation',
      navigationArrow: 'right',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    });

    this.route.params.subscribe(params => {
      this.currentPage = parseInt(params['page']) || this.currentPage;
      this.sorting = params['sorting'] || this.sorting;
      this.getReservations();
      window.scroll(0, 0);
    });
  }

  getReservations(): void {
    this.reservationService
      .getReservations(this.currentPage, this.sorting)
      .subscribe(reservations => (this.reservations = reservations));
  }

  togglingFavorite = new Set<number>();
  async toggleFavorite(reservation: ReservationListItemModel) {
    // Condition to avoid duplicate call on the same item
    if (this.togglingFavorite.has(reservation.id)) {
      return;
    }

    this.togglingFavorite.add(reservation.id);
    try {
      await this.reservationService
        .toggleFavorite(reservation.id, !reservation.favorite)
        .toPromise();
      reservation.favorite = !reservation.favorite;
    } finally {
      this.togglingFavorite.delete(reservation.id);
    }
  }
}
