import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { ActivityType } from './activity-type';

export class SportsCenter implements BaseEntity {
  readonly #id: number;
  readonly #name: string;
  readonly #activityType: ActivityType;
  readonly #capacity: number;
  readonly #latitude: number;
  readonly #longitude: number;

  constructor(props: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
  }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#activityType = props.activityType;
    this.#capacity = props.capacity;
    this.#latitude = props.latitude;
    this.#longitude = props.longitude;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get activityType(): ActivityType {
    return this.#activityType;
  }

  get capacity(): number {
    return this.#capacity;
  }

  get latitude(): number {
    return this.#latitude;
  }

  get longitude(): number {
    return this.#longitude;
  }
}
