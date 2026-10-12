import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Weather } from '../domain/model/weather.entity';
import { WeatherApiEndpoint } from './weather-api-endpoint';
import { WeatherRequest } from './weather-request';

@Service()
export class WeatherService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly weatherEndpoint = new WeatherApiEndpoint(this.http);

  getCurrentWeather = (request: WeatherRequest): Observable<Weather> =>
    this.weatherEndpoint.getCurrent(request);
}
