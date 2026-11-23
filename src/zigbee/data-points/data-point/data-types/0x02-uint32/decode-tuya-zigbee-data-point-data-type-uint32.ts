import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

export function decodeTuyaZigbeeDataPointDataTypeUint32(decoder: Decoder): number {
  if (decodeTuyaZigbeeDataPointDataLength(decoder) !== 4) {
    throw new Error('Invalid length.');
  }
  return decoder.uint32BE();
}
