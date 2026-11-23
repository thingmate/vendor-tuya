import { type Decoder } from '@xstd/codec';
import { type TuyaZigbeeDataPointType } from '../data-types/tuya-zigbee-data-point-type.ts';
import { decodeTuyaZigbeeDataPointDataTypeUnknown } from '../data-types/unknown/decode-tuya-zigbee-data-point-data-type-unknown.ts';
import { type TuyaZigbeeDataPoint } from '../tuya-zigbee-data-point.ts';

export function decodeTuyaZigbeeDataPoint(decoder: Decoder): TuyaZigbeeDataPoint {
  const id: number = decoder.uint8();
  const type: TuyaZigbeeDataPointType = decoder.uint8() as TuyaZigbeeDataPointType;
  const value: unknown = decodeTuyaZigbeeDataPointDataTypeUnknown(decoder, type);

  return {
    id,
    type,
    value,
  };
}
