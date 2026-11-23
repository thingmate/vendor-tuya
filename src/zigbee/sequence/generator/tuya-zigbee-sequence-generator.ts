import type { HavingTuyaZigbeeSequenceGeneratorAbilities } from './having-tuya-zigbee-sequence-generator-abilities.ts';

export class TuyaZigbeeSequenceGenerator implements HavingTuyaZigbeeSequenceGeneratorAbilities {
  static #shared: TuyaZigbeeSequenceGenerator;

  static get shared(): TuyaZigbeeSequenceGenerator {
    return this.#shared ?? (this.#shared = new TuyaZigbeeSequenceGenerator());
  }

  #sequence: number;

  constructor() {
    this.#sequence = 0xffff;
  }

  next(): number {
    return (this.#sequence = (this.#sequence + 1) & 0xffff);
  }
}
