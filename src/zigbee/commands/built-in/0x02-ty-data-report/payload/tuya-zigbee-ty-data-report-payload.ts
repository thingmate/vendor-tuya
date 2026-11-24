import { type TuyaZigbeeDataPoint } from '../../../../data-points/data-point/tuya-zigbee-data-point.js';

/**
 * Payload of a `TY_DATA_REPORT` (0x02) command: a sequence number followed by the
 * data points the device reports.
 * @see https://developer.tuya.com/en/docs/iot/tuya-zigbee-universal-docking-access-standard
 */
export interface TuyaZigbeeTyDataReportPayload {
  /** Transaction sequence number of this report. */
  readonly seq: number; // u16;
  readonly dataPoints: readonly TuyaZigbeeDataPoint[]; // NOTE: some devices don't support multiple dataPoints
}
