import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation',
  template: `
    <h2>{{ reservation.name | uppercase }} Details</h2>
    <div><span>id: </span>{{ reservation.id }}</div>
    <div><span>name: </span>{{ reservation.name }}</div>

    <div>
      <label>name:</label>
      <input [(ngModel)]="reservation.name" placeholder="name" />
    </div>
  `,
  styles: [],
})
export class ReservationComponent implements OnInit {
  reservation: Reservation = {
    id: 1,
    name: 'Test Reservation',
  };

  constructor() {}

  ngOnInit(): void {}
}
