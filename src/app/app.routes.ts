import { Routes } from '@angular/router';

const sportsCentersRoutes = () =>
  import('./sport-centers/sports-centers.routes').then((m) => m.sportsCentersRoutes);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);
const baseTitle = 'UrbanFit Sports Centers';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', loadChildren: sportsCentersRoutes },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
