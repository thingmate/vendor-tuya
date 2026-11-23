import { type Decoder } from '@xstd/codec';
import { decodeTuyaZigbeeDataPointDataLength } from '../length/decode-tuya-zigbee-data-point-data-length.ts';

/**
 * Decodes a raw data point value: `len` bytes passed through uninterpreted.
 */
export function decodeTuyaZigbeeDataPointDataTypeRaw(decoder: Decoder): Uint8Array {
  const length: number = decodeTuyaZigbeeDataPointDataLength(decoder);
  return decoder.bytes(length);
}
