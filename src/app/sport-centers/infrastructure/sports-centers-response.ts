import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';
import { ActivityType } from '../domain/model/activity-type';

export interface SportsCenterResource extends BaseResource {
  id: number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
}

export interface SportsCentersResponse extends BaseResponse {
  sportsCenters: SportsCenterResource[];
}
