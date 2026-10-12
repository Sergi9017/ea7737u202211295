import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationAssembler } from './reservation-assembler';
import { ReservationResource, ReservationsResponse } from './reservations-response';

export class ReservationsApiEndpoint extends BaseApiEndpoint<
  Reservation,
  ReservationResource,
  ReservationsResponse,
  ReservationAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReservationsEndpointPath}`,
      new ReservationAssembler(),
    );
  }
}
