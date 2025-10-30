import { type TuyaZigbeeSequenceGenerator } from '../tuya-zigbee-sequence-generator.js';
import { SHARED_INCREMENTAL_TUYA_ZIGBEE_SEQUENCE_GENERATOR } from './create-incremental-tuya-zigbee-sequence-generator.js';
import { createStaticTuyaZigbeeSequenceGenerator } from './create-static-tuya-zigbee-sequence-generator.js';
import { type TuyaZigbeeSequenceLike } from './tuya-zigbee-sequence-like.js';

export function createTuyaZigbeeSequenceGenerator(
  seq: TuyaZigbeeSequenceLike | undefined = 'auto',
): TuyaZigbeeSequenceGenerator /* u16 */ {
  if (seq === 'auto') {
    return SHARED_INCREMENTAL_TUYA_ZIGBEE_SEQUENCE_GENERATOR;
  } else {
    return createStaticTuyaZigbeeSequenceGenerator(seq);
  }
}
