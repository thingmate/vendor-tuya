import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.js';

export function encodeTuyaZigbeeDataPointDataTypeUint32(encoder: Encoder, input: number): void {
  encoder.encode(4, encodeTuyaZigbeeDataPointDataLength).uint32BE(input);
}
