import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RatingModule } from 'ng-starrating';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReservationsListComponent } from './components/reservations-list.component';
import { ReservationDetailComponent } from './components/reservation-detail.component';
import { MessagesComponent } from './components/messages.component';
import { HeaderComponent } from './components/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsListComponent,
    ReservationDetailComponent,
    MessagesComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    NgSelectModule,
    RatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
