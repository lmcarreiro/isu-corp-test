import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { RESERVATIONS } from './mock-reservations';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private messageService: MessageService) {}

  getReservations(): Observable<Reservation[]> {
    // TODO: send the message _after_ fetching the reservations
    this.messageService.add('ReservationService: fetched reservations');
    return of(RESERVATIONS);
  }
}
