import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { SportsCentersApiEndpoint } from './sports-centers-api-endpoint';
import { ReservationsApiEndpoint } from './reservations-api-endpoint';

@Service()
export class SportsCentersService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly sportsCentersEndpoint = new SportsCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getSportsCenters = (): Observable<SportsCenter[]> => this.sportsCentersEndpoint.getAll();

  getReservations = (): Observable<Reservation[]> => this.reservationsEndpoint.getAll();

  createReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(reservation);
}
