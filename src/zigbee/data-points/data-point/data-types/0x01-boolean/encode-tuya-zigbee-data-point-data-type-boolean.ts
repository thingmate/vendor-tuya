import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataLength } from '../length/encode-tuya-zigbee-data-point-data-length.ts';

export function encodeTuyaZigbeeDataPointDataTypeBoolean(encoder: Encoder, input: boolean): void {
  encoder.encode(1, encodeTuyaZigbeeDataPointDataLength).uint8(input ? 0x01 : 0x00);
}
