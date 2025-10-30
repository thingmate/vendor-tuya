import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.js';

export function decodeTuyaZigbeeDataPointDataTypeString(decoder: Decoder): string {
  const length: number = decodeTuyaZigbeeDataPointDataLength(decoder);
  return decoder.string(length, { encoding: 'binary' });
}
