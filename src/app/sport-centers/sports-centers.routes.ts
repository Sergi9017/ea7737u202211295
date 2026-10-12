import { Routes } from '@angular/router';

const home = () => import('./presentation/views/home/home').then((m) => m.Home);
const reservationForm = () =>
  import('./presentation/views/reservation-form/reservation-form').then((m) => m.ReservationForm);
const baseTitle = 'UrbanFit Sports Centers';

export const sportsCentersRoutes: Routes = [
  { path: 'home', loadComponent: home, title: `${baseTitle} - Home` },
  {
    path: 'reservations',
    children: [
      { path: 'new', loadComponent: reservationForm, title: `${baseTitle} - New Reservation` },
    ],
  },
];
