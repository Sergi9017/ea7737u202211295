import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { environment } from '../../../environments/environment';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { SportsCenterAssembler } from './sports-center-assembler';
import { SportsCenterResource, SportsCentersResponse } from './sports-centers-response';

export class SportsCentersApiEndpoint extends BaseApiEndpoint<
  SportsCenter,
  SportsCenterResource,
  SportsCentersResponse,
  SportsCenterAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderSportsCentersEndpointPath}`,
      new SportsCenterAssembler(),
    );
  }
}
