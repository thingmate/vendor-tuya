import { type TuyaZigbeeSequenceGenerator } from '../tuya-zigbee-sequence-generator.js';

export function createIncrementalTuyaZigbeeSequenceGenerator(): TuyaZigbeeSequenceGenerator {
  let seq: number /* u16 */ = 0xffff;
  return (): number /* u16 */ => {
    return (seq = (seq + 1) & 0xffff);
  };
}

export const SHARED_INCREMENTAL_TUYA_ZIGBEE_SEQUENCE_GENERATOR: TuyaZigbeeSequenceGenerator =
  createIncrementalTuyaZigbeeSequenceGenerator();
