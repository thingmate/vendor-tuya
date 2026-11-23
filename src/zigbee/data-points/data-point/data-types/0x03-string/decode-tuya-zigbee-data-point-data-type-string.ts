import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

export function decodeTuyaZigbeeDataPointDataTypeString(decoder: Decoder): string {
  return decoder.string(decodeTuyaZigbeeDataPointDataLength(decoder), { encoding: 'binary' });
}
