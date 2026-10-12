import { SportsCenter } from './sports-center.entity';
import { Reservation } from './reservation.entity';

export class SportsCenterSummary {
  readonly center: SportsCenter;
  readonly reservations: Reservation[];

  constructor(center: SportsCenter, reservations: Reservation[]) {
    this.center = center;
    this.reservations = reservations;
  }

  get totalParticipants(): number {
    return this.reservations.reduce((total, reservation) => total + reservation.participants, 0);
  }

  get availableCapacity(): number {
    return this.center.capacity - this.totalParticipants;
  }
}
