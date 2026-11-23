import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

/**
 * Encodes a raw data point value: `len` bytes passed through uninterpreted.
 */
export function encodeTuyaZigbeeDataPointDataTypeRaw(encoder: Encoder, input: Uint8Array): void {
  encoder.encode(input.length, encodeTuyaZigbeeDataPointDataLength).bytes(input);
}
