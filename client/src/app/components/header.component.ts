import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="header-content">
        <div class="name">
          <h1><strong>ISU</strong>Corp</h1>
        </div>
        <div class="slogan">
          <h6>World Class</h6>
          <h6>Software Development</h6>
        </div>
      </div>
    </div>
    <div class="title">
      <div class="title-content">
        <div class="text">Reservations List</div>
        <div class="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
        <div class="nav-button">
          <a routerLink="/reservation"><button class="secondary">Create reservation</button></a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .header {
        background-image: url(../../assets/header-background.jpg);
        color: white;
      }
      .header-content {
        max-width: 1200px;
        margin: 0px auto;
        font-size: 1.5em;
        padding: 50px 0px;
      }
      .header h1,
      .header h6 {
        font-weight: normal;
        margin: 0;
        padding: 0px 0px 0px 20px;
      }
      .name {
        display: inline-block;
      }
      .slogan {
        display: inline-block;
      }

      .title {
        background-color: white;
        color: grey;
      }
      .title-content {
        max-width: 1200px;
        margin: 0px auto;
        display: flex;
        align-items: center;
      }
      .title-content > div {
        padding: 5px 20px;
      }

      .title .text {
        font-weight: bold;
        color: #c00;
        font-size: 1.3em;
        white-space: nowrap;
      }
      .title .description {
        font-size: 0.9em;
      }
      .title .nav-button {
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
