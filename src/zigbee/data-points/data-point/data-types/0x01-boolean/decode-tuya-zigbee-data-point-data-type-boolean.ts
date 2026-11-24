import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

/**
 * Decodes a boolean data point value, rejecting any length other than 1.
 */
export function decodeTuyaZigbeeDataPointDataTypeBoolean(decoder: Decoder): boolean {
  if (decodeTuyaZigbeeDataPointDataLength(decoder) !== 1) {
    throw new Error('Invalid length.');
  }
  return decoder.uint8() === 0x01;
}
