import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="content">
      <router-outlet></router-outlet>
      <app-messages></app-messages>
    </div>
  `,
  styles: [
    `
      .content {
        padding-top: 20px;
        max-width: 1200px;
        margin: 0px auto;
      }
    `,
  ],
})
export class AppComponent {}
