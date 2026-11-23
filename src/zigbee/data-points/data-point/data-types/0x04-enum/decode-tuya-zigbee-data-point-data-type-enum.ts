import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

/**
 * Decodes an enumeration data point value (0 to 255), rejecting any length other than 1.
 */
export function decodeTuyaZigbeeDataPointDataTypeEnum(decoder: Decoder): number {
  if (decodeTuyaZigbeeDataPointDataLength(decoder) !== 1) {
    throw new Error('Invalid length.');
  }
  return decoder.uint8();
}
