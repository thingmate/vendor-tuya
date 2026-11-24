/**
 * The ability to generate the transaction sequence numbers of Tuya command payloads.
 */
export interface HavingTuyaZigbeeSequenceGeneratorAbilities {
  next(): number;
}
