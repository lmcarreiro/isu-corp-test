import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { ReservationListItemModel } from '../models/reservation-list-item.model';
import { emptyPagedResult, PagedResultModel } from '../models/paged-result.model';
import { BaseService } from './base.service';
import { ReservationModel } from '../models/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService {
  constructor(http: HttpClient, messageService: MessageService) {
    super('Reservation', http, messageService);
  }

  async getReservationById(id: number): Promise<ReservationModel | undefined> {
    try {
      const reservation = await this.http
        .get<ReservationModel>(`${this.baseUrl}/${id}`)
        .toPromise();

      this.log(`fetched reservation id=${id}`);

      return {
        ...reservation,
        contact: {
          ...reservation.contact,
          birthDate: reservation.contact.birthDate.substr(0, 10),
        },
      };
    } catch {
      this.handleError<ReservationModel>(`getReservationById id=${id}`);
      return;
    }
  }

  getReservations(
    page: number,
    sorting: string
  ): Observable<PagedResultModel<ReservationListItemModel>> {
    return this.http
      .get<PagedResultModel<ReservationListItemModel>>(
        `${this.baseUrl}?page=${page}&sorting=${sorting}`
      )
      .pipe(
        tap(_ => this.log('fetched reservations')),
        catchError(
          this.handleError<PagedResultModel<ReservationListItemModel>>(
            'getReservations',
            emptyPagedResult
          )
        )
      );
  }

  createReservation(reservation: ReservationModel): Observable<void> {
    return this.http.post(this.baseUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`created reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('createReservation'))
    );
  }

  toggleFavorite(id: number, flag: boolean): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/${id}/ToggleFavorite/${flag}`, {}, this.httpOptions)
      .pipe(
        tap(_ => this.log(`fetched reservation id=${id}`)),
        catchError(this.handleError<void>(`getReservationById id=${id}`))
      );
  }
}
