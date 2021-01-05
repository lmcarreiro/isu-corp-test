import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsListComponent } from './components/route/reservations-list.component';
import { ReservationDetailComponent } from './components/route/reservation-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/reservations-list', pathMatch: 'full' },
  { path: 'reservations-list', component: ReservationsListComponent },
  { path: 'reservations-list/:page/:sorting', component: ReservationsListComponent },
  { path: 'reservation', component: ReservationDetailComponent },
  { path: 'reservation/:id', component: ReservationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
