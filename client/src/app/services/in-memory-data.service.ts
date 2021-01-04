import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RESERVATIONS } from '../mock/mock-reservations';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      reservations: RESERVATIONS,
    };
  }

  // Overrides the genId method to ensure that a reservation always has an id.
  // If the reservations array is empty,
  // the method below returns the initial number (11).
  // if the reservations array is not empty, the method below returns the highest
  // reservation id + 1.
  genId(array: { id: number }[]): number {
    return array.length > 0 ? Math.max(...array.map(element => element.id)) + 1 : 11;
  }
}
