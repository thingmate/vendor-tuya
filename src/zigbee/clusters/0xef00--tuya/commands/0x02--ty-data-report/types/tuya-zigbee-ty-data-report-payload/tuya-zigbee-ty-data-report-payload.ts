import { type TuyaZigbeeDataPoint } from '../../../../data-points/data-point/tuya-zigbee-data-point.js';

export interface TuyaZigbeeTyDataReportPayload {
  readonly seq: number; // u16;
  readonly dataPoints: readonly TuyaZigbeeDataPoint[]; // NOTE: some devices don't support multiple dataPoints
}
