import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ActivityType } from './activity-type';

export class Reservation implements BaseEntity {
  readonly #id: number;
  readonly #sportsCenterId: number;
  readonly #activityType: ActivityType;
  readonly #participantName: string;
  readonly #participants: number;
  readonly #weatherTemperature: number;
  readonly #reservedAt: string;

  constructor(props: {
    id: number;
    sportsCenterId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: string;
  }) {
    this.#id = props.id;
    this.#sportsCenterId = props.sportsCenterId;
    this.#activityType = props.activityType;
    this.#participantName = props.participantName;
    this.#participants = props.participants;
    this.#weatherTemperature = props.weatherTemperature;
    this.#reservedAt = props.reservedAt;
  }

  get id(): number {
    return this.#id;
  }

  get sportsCenterId(): number {
    return this.#sportsCenterId;
  }

  get activityType(): ActivityType {
    return this.#activityType;
  }

  get participantName(): string {
    return this.#participantName;
  }

  get participants(): number {
    return this.#participants;
  }

  get weatherTemperature(): number {
    return this.#weatherTemperature;
  }

  get reservedAt(): string {
    return this.#reservedAt;
  }
}
