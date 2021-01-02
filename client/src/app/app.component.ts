import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <nav>
      <a routerLink="/reservations-list">Reservations</a><br />
      <a routerLink="/reservation">Create reservation</a><br />
    </nav>
    <router-outlet></router-outlet>
    <app-messages></app-messages>
  `,
  styles: [],
})
export class AppComponent {}
