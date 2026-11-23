import { type Decoder } from '@xstd/codec';

export function decodeTuyaZigbeeDataPointDataLength(decoder: Decoder): number {
  return decoder.uint16BE();
}
