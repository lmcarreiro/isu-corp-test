import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { ReservationListItem } from '../models/reservation-list-item';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationsUrl = 'api/reservations';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  // TODO: replace the model to get detailed reservation and contact info
  getReservationById(id: number): Observable<Reservation | undefined> {
    // TODO: send the message _after_ fetching the reservation
    return this.http.get<Reservation>(`${this.reservationsUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched reservation id=${id}`)),
      catchError(this.handleError<Reservation>(`getReservationById id=${id}`))
    );
  }

  getReservations(): Observable<ReservationListItem[]> {
    // TODO: send the message _after_ fetching the reservations
    return this.http.get<ReservationListItem[]>(this.reservationsUrl).pipe(
      tap(_ => this.log('fetched reservations')),
      catchError(this.handleError<ReservationListItem[]>('getReservations', []))
    );
  }

  // TODO: replace the model to get detailed reservation and contact info
  updateReservation(reservation: Reservation): Observable<void> {
    return this.http.put(this.reservationsUrl, reservation, this.httpOptions).pipe(
      tap(_ => this.log(`updated reservation id=${reservation.id}`)),
      catchError(this.handleError<any>('updateReservation'))
    );
  }

  /** Log a ReservationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ReservationService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
