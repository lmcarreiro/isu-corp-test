import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-reservation-detail',
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
export class ReservationDetailComponent implements OnInit {
  @Input()
  reservation!: Reservation;

  constructor() {}

  ngOnInit(): void {}
}
