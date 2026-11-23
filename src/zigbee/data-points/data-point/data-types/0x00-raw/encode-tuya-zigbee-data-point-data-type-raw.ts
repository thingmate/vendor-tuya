import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

export function encodeTuyaZigbeeDataPointDataTypeRaw(encoder: Encoder, input: Uint8Array): void {
  encoder.encode(input.length, encodeTuyaZigbeeDataPointDataLength).bytes(input);
}
