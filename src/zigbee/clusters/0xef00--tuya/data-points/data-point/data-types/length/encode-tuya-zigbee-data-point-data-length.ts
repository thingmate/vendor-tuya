import { type Encoder } from '@xstd/codec';

export function encodeTuyaZigbeeDataPointDataLength(encoder: Encoder, length: number): void {
  encoder.uint16BE(length);
}
