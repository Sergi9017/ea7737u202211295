import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCentersStore } from '../../../application/sports-centers.store';
import { WeatherStore } from '../../../../weather/application/weather.store';
import { ACTIVITY_TYPES, ActivityType } from '../../../domain/model/activity-type';
import { notBlankValidator } from '../../../../shared/presentation/validators/not-blank.validator';

@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css',
})
export class ReservationForm {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly sportsCentersStore = inject(SportsCentersStore);
  protected readonly weatherStore = inject(WeatherStore);

  protected readonly activityTypes = ACTIVITY_TYPES;
  protected readonly submitting = signal<boolean>(false);
  protected readonly errorKey = signal<string | null>(null);

  private readonly selectedActivity = signal<ActivityType | null>(null);

  protected readonly availableCapacity = computed<number | null>(() => {
    const activity = this.selectedActivity();
    if (!activity) return null;
    return this.sportsCentersStore.getSummaryByActivityType(activity)?.availableCapacity ?? null;
  });

  private readonly capacityValidator = (control: AbstractControl): ValidationErrors | null => {
    const capacity = this.availableCapacity();
    if (capacity === null || control.value === null || control.value === '') return null;
    return Number(control.value) > capacity ? { capacity: true } : null;
  };

  protected readonly form = this.fb.group({
    activityType: this.fb.control<ActivityType | null>(null, Validators.required),
    participantName: this.fb.nonNullable.control('', [Validators.required, notBlankValidator]),
    participants: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
      this.capacityValidator,
    ]),
  });

  constructor() {
    this.weatherStore.reset();

    this.form.controls.activityType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((activity) => {
        this.selectedActivity.set(activity);
        const center = activity
          ? this.sportsCentersStore.getSummaryByActivityType(activity)?.center
          : undefined;
        if (center) {
          this.weatherStore.loadCurrent(center.latitude, center.longitude);
        } else {
          this.weatherStore.reset();
        }
      });

    effect(() => {
      this.availableCapacity();
      this.form.controls.participants.updateValueAndValidity();
    });
  }

  protected submit(): void {
    const weather = this.weatherStore.weather();
    if (this.form.invalid || !weather) return;

    const value = this.form.getRawValue();
    this.submitting.set(true);
    this.errorKey.set(null);

    this.sportsCentersStore
      .createReservation({
        activityType: value.activityType!,
        participantName: value.participantName,
        participants: value.participants!,
        weatherTemperature: weather.temperature,
      })
      .subscribe({
        next: () => this.router.navigate(['/home']).then(),
        error: (error: Error) => {
          this.errorKey.set(
            error.message.startsWith('reservation-error-')
              ? error.message
              : 'reservation-error-save-failed',
          );
          this.submitting.set(false);
        },
      });
  }

  protected cancel(): void {
    this.weatherStore.reset();
    this.router.navigate(['/home']).then();
  }
}
