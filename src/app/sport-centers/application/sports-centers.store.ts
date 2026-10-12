import { computed, inject, Service, signal } from '@angular/core';
import { Observable, switchMap, tap, throwError } from 'rxjs';
import { SportsCenter } from '../domain/model/sports-center.entity';
import { Reservation } from '../domain/model/reservation.entity';
import { ActivityType } from '../domain/model/activity-type';
import { SportsCenterSummary } from '../domain/model/sports-center-summary';
import { SportsCentersService } from '../infrastructure/sports-centers.service';
import { CreateReservationRequest } from './create-reservation.request';

@Service()
export class SportsCentersStore {
  private readonly sportsCentersService = inject(SportsCentersService);

  private readonly sportsCentersSignal = signal<SportsCenter[]>([]);
  readonly sportsCenters = this.sportsCentersSignal.asReadonly();

  private readonly reservationsSignal = signal<Reservation[]>([]);
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  readonly summaries = computed(() =>
    this.sportsCentersSignal().map((center) =>
      this.buildSummary(center, this.reservationsSignal()),
    ),
  );

  constructor() {
    this.loadAll();
  }

  getSummaryByActivityType = (activityType: ActivityType): SportsCenterSummary | undefined =>
    this.summaries().find((summary) => summary.center.activityType === activityType);

  loadAll = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.sportsCentersService.getSportsCenters().subscribe({
      next: (centers) => this.sportsCentersSignal.set(centers),
      error: (err) => this.handleLoadError(err),
    });
    this.sportsCentersService.getReservations().subscribe({
      next: (reservations) => {
        this.reservationsSignal.set(reservations);
        this.loadingSignal.set(false);
      },
      error: (err) => this.handleLoadError(err),
    });
  };

  createReservation = (request: CreateReservationRequest): Observable<Reservation> => {
    const center = this.sportsCentersSignal().find((c) => c.activityType === request.activityType);
    if (!center) {
      return throwError(() => new Error('reservation-error-center-not-found'));
    }
    return this.sportsCentersService.getReservations().pipe(
      switchMap((freshReservations) => {
        const summary = this.buildSummary(center, freshReservations);
        if (request.participants <= 0 || request.participants > summary.availableCapacity) {
          return throwError(() => new Error('reservation-error-capacity-exceeded'));
        }
        this.reservationsSignal.set(freshReservations);
        const reservation = new Reservation({
          id: 0,
          sportsCenterId: center.id,
          activityType: request.activityType,
          participantName: request.participantName.trim(),
          participants: request.participants,
          weatherTemperature: request.weatherTemperature,
          reservedAt: new Date().toISOString(),
        });
        return this.sportsCentersService.createReservation(reservation);
      }),
      tap((created) => this.reservationsSignal.update((list) => [...list, created])),
    );
  };

  private buildSummary = (center: SportsCenter, reservations: Reservation[]): SportsCenterSummary =>
    new SportsCenterSummary(
      center,
      reservations.filter((r) => r.sportsCenterId === center.id),
    );

  private handleLoadError = (error: unknown): void => {
    this.errorSignal.set(error instanceof Error ? error.message : 'Failed to load data');
    this.loadingSignal.set(false);
  };
}
