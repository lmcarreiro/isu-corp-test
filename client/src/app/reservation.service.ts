import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RESERVATIONS } from './mock-reservations';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  getReservations(): Observable<Reservation[]> {
    return of(RESERVATIONS);
  }
}
