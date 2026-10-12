export class Weather {
  readonly #temperature: number;
  readonly #unit: string;
  readonly #time: string;

  constructor(props: { temperature: number; unit: string; time: string }) {
    this.#temperature = props.temperature;
    this.#unit = props.unit;
    this.#time = props.time;
  }

  get temperature(): number {
    return this.#temperature;
  }

  get unit(): string {
    return this.#unit;
  }

  get time(): string {
    return this.#time;
  }
}
