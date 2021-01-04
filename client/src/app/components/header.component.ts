import { Component, OnInit } from '@angular/core';
import { AppService, HeaderData } from '../app.service';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <div class="desktop-margin hide-on-mobile"></div>
      <div class="header-content">
        <div class="name hide-on-mobile">
          <h1><strong>ISU</strong>Corp</h1>
        </div>
        <div class="name only-on-mobile" style="flex: 1;">
          <h2><strong>ISU</strong>Corp</h2>
        </div>
        <div class="slogan hide-on-mobile">
          <h6>World Class</h6>
          <h6>Software Development</h6>
        </div>
        <div class="nav-link only-on-mobile">
          <a routerLink="{{ headerData?.navigationTarget }}">
            {{ headerData?.navigationArrow === 'left' ? '&#x2bc7;' : '' }}
            {{ headerData?.navigationLabel }}
            {{ headerData?.navigationArrow === 'right' ? '&#x2bc8;' : '' }}
          </a>
        </div>
      </div>
      <div class="desktop-margin hide-on-mobile"></div>
    </div>
    <div class="title">
      <div *ngIf="headerData" class="title-content wrap-on-mobile">
        <div class="text full-width-on-mobile">{{ headerData?.title }}</div>
        <div
          class="description full-width-on-mobile"
          [class.hide-on-mobile]="!headerData?.showDescriptionOnMobile"
        >
          {{ headerData?.description }}
        </div>
        <div class="nav-button  hide-on-mobile">
          <button routerLink="{{ headerData?.navigationTarget }}" class="btn secondary">
            {{ headerData?.navigationLabel }}
          </button>
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
      .header .desktop-margin {
        height: 40px;
      }
      .header-content {
        display: flex;
        align-items: center;
        max-width: 1024px;
        margin: 0px auto;
        font-size: 1.5em;
        padding: 0px 0px 12px;
      }
      .header h1,
      .header h2,
      .header h6 {
        font-weight: normal;
        margin: 0;
        padding: 0px 0px 0px 20px;
      }
      .header .nav-link {
        padding: 10px 10px 0px 0px;
      }
      .header .nav-link a {
        color: white;
        text-decoration: none;
      }
      .name {
        display: inline-block;
      }
      .slogan {
        display: inline-block;
        padding-top: 12px;
        font-size: 1em;
        line-height: 15px;
      }

      .title {
        background-color: white;
        color: grey;
      }
      .title-content {
        max-width: 1024px;
        margin: 0px auto;
        padding: 10px 0px;
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
  headerData?: HeaderData;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.headerData$.subscribe(headerData => {
      this.headerData = headerData;
    });
  }
}
