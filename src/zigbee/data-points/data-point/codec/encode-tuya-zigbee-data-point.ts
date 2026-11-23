import { type Encoder } from '@xstd/codec';
import { encodeTuyaZigbeeDataPointDataTypeUnknown } from '../data-types/unknown/encode-tuya-zigbee-data-point-data-type-unknown.ts';
import { type TuyaZigbeeDataPoint } from '../tuya-zigbee-data-point.ts';

export function encodeTuyaZigbeeDataPoint(
  encoder: Encoder,
  { id, type, value }: TuyaZigbeeDataPoint,
): void {
  encoder.uint8(id);
  encoder.uint8(type);
  encodeTuyaZigbeeDataPointDataTypeUnknown(encoder, type, value);
}
