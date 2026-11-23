import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

/**
 * Decodes a string data point value.
 *
 * Bytes are decoded as single-byte characters (latin-1), like zigbee2mqtt does.
 */
export function decodeTuyaZigbeeDataPointDataTypeString(decoder: Decoder): string {
  return decoder.string(decodeTuyaZigbeeDataPointDataLength(decoder), { encoding: 'binary' });
}
