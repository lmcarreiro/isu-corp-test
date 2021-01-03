import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="content">
      <div class="padding-top-20 hide-on-mobile"></div>
      <router-outlet></router-outlet>
      <app-messages></app-messages>
    </div>
  `,
  styles: [
    `
      .content {
        max-width: 1024px;
        margin: 0px auto;
      }
    `,
  ],
})
export class AppComponent {}
