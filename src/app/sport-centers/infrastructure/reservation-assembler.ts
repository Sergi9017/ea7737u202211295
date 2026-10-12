import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Reservation } from '../domain/model/reservation.entity';
import { ReservationResource, ReservationsResponse } from './reservations-response';

export class ReservationAssembler implements BaseAssembler<
  Reservation,
  ReservationResource,
  ReservationsResponse
> {
  toEntitiesFromResponse = (response: ReservationsResponse): Reservation[] =>
    response.reservations.map((resource) => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: ReservationResource): Reservation =>
    new Reservation({
      id: resource.id,
      sportsCenterId: resource.sportsCenterId,
      activityType: resource.activityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: resource.reservedAt,
    });

  toResourceFromEntity = (entity: Reservation): ReservationResource => {
    const resource = {
      sportsCenterId: entity.sportsCenterId,
      activityType: entity.activityType,
      participantName: entity.participantName,
      participants: entity.participants,
      weatherTemperature: entity.weatherTemperature,
      reservedAt: entity.reservedAt,
    };
    return (entity.id ? { id: entity.id, ...resource } : resource) as ReservationResource;
  };
}
