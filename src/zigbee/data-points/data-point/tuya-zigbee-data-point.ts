import { type TuyaZigbeeDataPointType } from './data-types/tuya-zigbee-data-point-type.ts';

export interface TuyaZigbeeDataPoint {
  readonly id: number; // u8;
  readonly type: TuyaZigbeeDataPointType; // u8;
  readonly value: unknown;
}
