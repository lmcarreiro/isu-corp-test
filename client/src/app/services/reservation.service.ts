import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { ReservationListItem } from '../models/reservation-list-item';
import { emptyPagedResult, PagedResult } from '../models/paged-result';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService {
  constructor(http: HttpClient, messageService: MessageService) {
    super('Reservation', http, messageService);
  }

  // TODO: replace the model to get detailed reservation and contact info
  getReservationById(id: number): Observable<ReservationListItem | undefined> {
    // TODO: send the message _after_ fetching the reservation
    return this.http.get<ReservationListItem>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched reservation id=${id}`)),
      catchError(this.handleError<ReservationListItem>(`getReservationById id=${id}`))
    );
  }

  getReservations(page: number): Observable<PagedResult<ReservationListItem>> {
    // TODO: send the message _after_ fetching the reservations
    return this.http.get<PagedResult<ReservationListItem>>(`${this.baseUrl}?page=${page}`).pipe(
      tap(_ => this.log('fetched reservations')),
      catchError(
        this.handleError<PagedResult<ReservationListItem>>('getReservations', emptyPagedResult)
      )
    );
  }

  // TODO: replace the model to get detailed reservation and contact info
  updateReservation(reservation: ReservationListItem): Observable<void> {
    return this.http.put(this.baseUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`updated reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('updateReservation'))
    );
  }
}
