import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ReservationListItemModel } from '../models/reservation-list-item.model';
import { emptyPagedResult, PagedResultModel } from '../models/paged-result.model';
import { BaseService } from './base.service';
import { ReservationModel } from '../models/reservation.model';
import { languageFormatSettings } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class ReservationService extends BaseService {
  constructor(http: HttpClient) {
    super('Reservation', http);
  }

  async getReservationById(id: number): Promise<ReservationModel | undefined> {
    try {
      const reservation = await this.http
        .get<ReservationModel>(`${this.baseUrl}/${id}`)
        .toPromise();

      console.log(`fetched reservation id=${id}`);

      return {
        ...reservation,
        contact: {
          ...reservation.contact,
          birthDate: moment(reservation.contact.birthDate).format(
            languageFormatSettings.dateMomentFormat
          ),
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
        tap(_ => console.log('fetched reservations')),
        catchError(
          this.handleError<PagedResultModel<ReservationListItemModel>>(
            'getReservations',
            emptyPagedResult
          )
        )
      );
  }

  createReservation(reservation: ReservationModel): Observable<void> {
    const convertedReservation: ReservationModel = {
      ...reservation,
      contact: {
        ...reservation.contact,
        birthDate: moment(
          reservation.contact.birthDate,
          languageFormatSettings.dateMomentFormat
        ).toISOString(),
      },
    };

    return this.http.post(this.baseUrl, convertedReservation, this.httpOptions).pipe(
      tap(_ => console.log(`created reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('createReservation'))
    );
  }

  toggleFavorite(id: number, flag: boolean): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/${id}/ToggleFavorite/${flag}`, {}, this.httpOptions)
      .pipe(
        tap(_ => console.log(`fetched reservation id=${id}`)),
        catchError(this.handleError<void>(`getReservationById id=${id}`))
      );
  }
}
