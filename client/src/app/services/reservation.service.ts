import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { ReservationListItemModel } from '../models/reservation-list-item.model';
import { emptyPagedResult, PagedResultModel } from '../models/paged-result.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService {
  constructor(http: HttpClient, messageService: MessageService) {
    super('Reservation', http, messageService);
  }

  // TODO: replace the model to get detailed reservation and contact info
  getReservationById(id: number): Observable<ReservationListItemModel | undefined> {
    // TODO: send the message _after_ fetching the reservation
    return this.http.get<ReservationListItemModel>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched reservation id=${id}`)),
      catchError(this.handleError<ReservationListItemModel>(`getReservationById id=${id}`))
    );
  }

  getReservations(page: number): Observable<PagedResultModel<ReservationListItemModel>> {
    // TODO: send the message _after_ fetching the reservations
    return this.http
      .get<PagedResultModel<ReservationListItemModel>>(`${this.baseUrl}?page=${page}`)
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

  // TODO: replace the model to get detailed reservation and contact info
  updateReservation(reservation: ReservationListItemModel): Observable<void> {
    return this.http.put(this.baseUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`updated reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('updateReservation'))
    );
  }
}
