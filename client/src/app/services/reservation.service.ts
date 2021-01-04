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

  getReservationById(id: number): Observable<ReservationModel | undefined> {
    // TODO: send the message _after_ fetching the reservation
    return this.http.get<ReservationModel>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched reservation id=${id}`)),
      catchError(this.handleError<ReservationModel>(`getReservationById id=${id}`))
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

  createReservation(reservation: ReservationModel): Observable<void> {
    return this.http.post(this.baseUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`created reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('createReservation'))
    );
  }
}
