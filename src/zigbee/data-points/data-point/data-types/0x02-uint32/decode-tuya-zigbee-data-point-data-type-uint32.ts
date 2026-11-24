import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

/**
 * Decodes a 32-bit unsigned integer data point value (big-endian), rejecting any length other than 4.
 */
export function decodeTuyaZigbeeDataPointDataTypeUint32(decoder: Decoder): number {
  if (decodeTuyaZigbeeDataPointDataLength(decoder) !== 4) {
    throw new Error('Invalid length.');
  }
  return decoder.uint32BE();
}
