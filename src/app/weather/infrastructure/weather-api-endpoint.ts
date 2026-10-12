import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { Weather } from '../domain/model/weather.entity';
import { WeatherAssembler } from './weather-assembler';
import { WeatherRequest } from './weather-request';
import { WeatherResponse } from './weather-response';

export class WeatherApiEndpoint extends ErrorHandlingEnabledBaseType {
  private readonly endpointUrl = `${environment.weatherProviderApiBaseUrl}${environment.weatherProviderForecastEndpointPath}`;
  private readonly assembler = new WeatherAssembler();

  constructor(private readonly http: HttpClient) {
    super();
  }

  getCurrent(request: WeatherRequest): Observable<Weather> {
    const params = new HttpParams()
      .set('latitude', request.latitude)
      .set('longitude', request.longitude)
      .set('current', 'temperature_2m');
    return this.http.get<WeatherResponse>(this.endpointUrl, { params }).pipe(
      map((response) => this.assembler.toEntityFromResponse(response)),
      catchError(this.handleError('Failed to fetch weather')),
    );
  }
}
