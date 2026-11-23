import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

export function encodeTuyaZigbeeDataPointDataTypeString(encoder: Encoder, input: string): void {
  // from zigbee-herdsman-converters
  encoder
    .encode(input.length, encodeTuyaZigbeeDataPointDataLength)
    .string(input, { encoding: 'binary' });
}
