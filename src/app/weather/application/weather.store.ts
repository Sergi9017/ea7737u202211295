import { inject, Service, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../domain/model/weather.entity';
import { WeatherService } from '../infrastructure/weather.service';

@Service()
export class WeatherStore {
  private readonly weatherService = inject(WeatherService);
  private subscription: Subscription | null = null;

  private readonly weatherSignal = signal<Weather | null>(null);
  readonly weather = this.weatherSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly failedSignal = signal<boolean>(false);
  readonly failed = this.failedSignal.asReadonly();

  loadCurrent = (latitude: number, longitude: number): void => {
    this.reset();
    this.loadingSignal.set(true);
    this.subscription = this.weatherService.getCurrentWeather({ latitude, longitude }).subscribe({
      next: (weather) => {
        this.weatherSignal.set(weather);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.failedSignal.set(true);
        this.loadingSignal.set(false);
      },
    });
  };

  reset = (): void => {
    this.subscription?.unsubscribe();
    this.subscription = null;
    this.weatherSignal.set(null);
    this.loadingSignal.set(false);
    this.failedSignal.set(false);
  };
}
