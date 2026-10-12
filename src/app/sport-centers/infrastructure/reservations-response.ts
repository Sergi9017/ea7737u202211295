import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { ActivityType } from '../domain/model/activity-type';

export interface ReservationResource extends BaseResource {
  id: number;
  sportsCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export interface ReservationsResponse extends BaseResponse {
  reservations: ReservationResource[];
}
