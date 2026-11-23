import type { HavingTuyaZigbeeSequenceGeneratorAbilities } from './having-tuya-zigbee-sequence-generator-abilities.ts';

/**
 * Generates the 2-byte transaction sequence numbers of Tuya command payloads,
 * wrapping around at `0xffff`.
 */
export class TuyaZigbeeSequenceGenerator implements HavingTuyaZigbeeSequenceGeneratorAbilities {
  static #shared: TuyaZigbeeSequenceGenerator;

  /** Process-wide generator, shared by every command by default. */

  static get shared(): TuyaZigbeeSequenceGenerator {
    return this.#shared ?? (this.#shared = new TuyaZigbeeSequenceGenerator());
  }

  #sequence: number;

  constructor() {
    this.#sequence = 0xffff;
  }

  /**
   * Returns the next sequence number, wrapping around at `0xffff`.
   */
  next(): number {
    return (this.#sequence = (this.#sequence + 1) & 0xffff);
  }
}
