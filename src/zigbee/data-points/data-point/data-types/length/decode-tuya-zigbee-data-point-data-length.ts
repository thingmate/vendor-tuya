import { type Decoder } from '@xstd/codec';

/**
 * Reads the 2-byte big-endian length prefix of a data point value.
 */
export function decodeTuyaZigbeeDataPointDataLength(decoder: Decoder): number {
  return decoder.uint16BE();
}
