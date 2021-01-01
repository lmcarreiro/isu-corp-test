import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1><strong>ISU</strong>Corp</h1>
      <h2>World Class<br />Software Development</h2>
    </div>
    <nav>
      <a routerLink="/reservations-list">Reservations</a><br />
      <a routerLink="/reservation">Create new reservation</a><br />
    </nav>
    <router-outlet></router-outlet>
    <app-messages></app-messages>
  `,
  styles: [],
})
export class AppComponent {}
