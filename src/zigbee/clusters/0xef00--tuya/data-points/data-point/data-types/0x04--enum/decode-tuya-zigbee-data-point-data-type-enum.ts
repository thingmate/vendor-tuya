import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.js';

export function decodeTuyaZigbeeDataPointDataTypeEnum(decoder: Decoder): number {
  if (decodeTuyaZigbeeDataPointDataLength(decoder) !== 1) {
    throw new Error('Invalid length.');
  }
  return decoder.uint8();
}
