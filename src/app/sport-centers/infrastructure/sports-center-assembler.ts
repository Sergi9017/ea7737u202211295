import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { SportsCenterResource, SportsCentersResponse } from './sports-centers-response';

export class SportsCenterAssembler implements BaseAssembler<
  SportsCenter,
  SportsCenterResource,
  SportsCentersResponse
> {
  toEntitiesFromResponse = (response: SportsCentersResponse): SportsCenter[] =>
    response.sportsCenters.map((resource) => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: SportsCenterResource): SportsCenter =>
    new SportsCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude,
    });

  toResourceFromEntity = (entity: SportsCenter): SportsCenterResource => ({
    id: entity.id,
    name: entity.name,
    activityType: entity.activityType,
    capacity: entity.capacity,
    latitude: entity.latitude,
    longitude: entity.longitude,
  });
}
