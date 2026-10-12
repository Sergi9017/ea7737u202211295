import { Weather } from '../domain/model/weather.entity';
import { WeatherResponse } from './weather-response';

export class WeatherAssembler {
  toEntityFromResponse = (response: WeatherResponse): Weather =>
    new Weather({
      temperature: response.current.temperature_2m,
      unit: response.current_units.temperature_2m,
      time: response.current.time,
    });
}
