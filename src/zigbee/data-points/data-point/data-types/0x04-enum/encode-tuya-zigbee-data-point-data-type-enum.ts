import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

export function encodeTuyaZigbeeDataPointDataTypeEnum(encoder: Encoder, input: number): void {
  encoder.encode(1, encodeTuyaZigbeeDataPointDataLength).uint8(input);
}
