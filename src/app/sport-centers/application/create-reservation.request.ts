import { ActivityType } from '../domain/model/activity-type';

export interface CreateReservationRequest {
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
}
