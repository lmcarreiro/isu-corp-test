import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationsListComponent } from './components/reservations-list.component';
import { ReservationDetailComponent } from './components/reservation-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/reservations-list', pathMatch: 'full' },
  { path: 'reservations-list', component: ReservationsListComponent },
  { path: 'reservation', component: ReservationDetailComponent },
  { path: 'reservation/:id', component: ReservationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
