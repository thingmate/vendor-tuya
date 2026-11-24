import { type Encoder } from '@xstd/codec';

/**
 * Writes the 2-byte big-endian length prefix of a data point value.
 */
export function encodeTuyaZigbeeDataPointDataLength(encoder: Encoder, length: number): void {
  encoder.uint16BE(length);
}
