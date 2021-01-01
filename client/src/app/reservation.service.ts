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

  getReservationById(id: number): Observable<Reservation | undefined> {
    // TODO: send the message _after_ fetching the reservation
    this.messageService.add(`ReservationService: fetched reservation id=${id}`);
    return of(RESERVATIONS.find(r => r.id === id));
  }

  getReservations(): Observable<Reservation[]> {
    // TODO: send the message _after_ fetching the reservations
    this.messageService.add('ReservationService: fetched reservations');
    return of(RESERVATIONS);
  }
}
