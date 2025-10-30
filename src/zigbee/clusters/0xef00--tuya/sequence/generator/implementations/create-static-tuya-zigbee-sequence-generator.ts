import { type TuyaZigbeeSequenceGenerator } from '../tuya-zigbee-sequence-generator.js';

export function createStaticTuyaZigbeeSequenceGenerator(
  seq: number /* u16 */,
): TuyaZigbeeSequenceGenerator {
  return (): number /* u16 */ => seq;
}
